import { NextResponse } from "next/server"

type SlackAPIResponse = {
  ok: boolean
  error?: string
  needed?: string
  provided?: string
  channel?: string
  ts?: string
}

type SlackChannel = {
  id: string
  name: string
}

type SlackUser = {
  id: string
  name: string
  real_name?: string
  profile?: {
    display_name?: string
    real_name?: string
    first_name?: string
    last_name?: string
    image_72?: string
  }
  deleted?: boolean
  is_bot?: boolean
}

function normalizeForMatch(s: string): string {
  return s.replace(/^[#@]/, "").trim().toLowerCase()
}

function scoreUserMatch(user: SlackUser, query: string): number {
  const firstName = user.profile?.first_name?.toLowerCase() ?? ""
  const lastName = user.profile?.last_name?.toLowerCase() ?? ""
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : ""
  const displayName = user.profile?.display_name?.toLowerCase() ?? ""
  const realName = (user.real_name ?? user.profile?.real_name ?? "").toLowerCase()
  const username = user.name?.toLowerCase() ?? ""

  const allNames = [fullName, realName, displayName, username].filter(Boolean)

  for (const name of allNames) {
    if (name === query) return 100
  }

  if (firstName && lastName) {
    const lastFirst = `${lastName} ${firstName}`
    if (lastFirst === query) return 97
    const firstDotLast = `${firstName}.${lastName}`
    if (firstDotLast === query) return 96
  }

  const queryParts = query.split(/[\s._-]+/).filter(Boolean)

  if (queryParts.length >= 2 && firstName && lastName) {
    const firstExact = queryParts[0] === firstName
    const lastExact = queryParts[1] === lastName
    if (firstExact && lastExact) return 95
    if (firstExact && lastName.startsWith(queryParts[1])) return 90
    if (firstExact && queryParts[1].startsWith(lastName)) return 90
    if (firstExact) return 78
  }

  if (queryParts.length === 1) {
    const q = queryParts[0]
    if (firstName === q) return 85
    if (lastName === q) return 80
    if (displayName === q) return 80
    if (firstName && firstName.startsWith(q) && q.length >= 3) return 75
    if (displayName && displayName.startsWith(q) && q.length >= 3) return 72
  }

  return 0
}

async function resolveChannelId(
  token: string,
  recipient: string
): Promise<{ channelId: string | null; error: string | null }> {
  const cleanName = normalizeForMatch(recipient)

  const channelsRes = await fetch(
    "https://slack.com/api/conversations.list?types=public_channel,private_channel&limit=200",
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const channelsData = (await channelsRes.json()) as {
    ok: boolean
    channels?: SlackChannel[]
    error?: string
    needed?: string
  }

  if (!channelsData.ok && channelsData.error === "missing_scope") {
    return {
      channelId: null,
      error: `missing_scope: need "${channelsData.needed}" — please re-install the Slack plugin`,
    }
  }

  if (channelsData.ok && channelsData.channels) {
    const match = channelsData.channels.find(
      (ch) => ch.name.toLowerCase() === cleanName
    )
    if (match) return { channelId: match.id, error: null }
  }

  const allMembers: SlackUser[] = []
  let usersCursor: string | undefined
  for (let page = 0; page < 20; page++) {
    const url = new URL("https://slack.com/api/users.list")
    url.searchParams.set("limit", "500")
    if (usersCursor) url.searchParams.set("cursor", usersCursor)

    const usersRes = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    })
    const usersData = (await usersRes.json()) as {
      ok: boolean
      members?: SlackUser[]
      error?: string
      needed?: string
      response_metadata?: { next_cursor?: string }
    }

    if (!usersData.ok) {
      if (usersData.error === "missing_scope") {
        return {
          channelId: null,
          error: `missing_scope: need "${usersData.needed}" — please re-install the Slack plugin`,
        }
      }
      return {
        channelId: null,
        error: usersData.error || "Could not fetch users",
      }
    }

    if (usersData.members) allMembers.push(...usersData.members)
    const nextCursor = usersData.response_metadata?.next_cursor
    if (!nextCursor) break
    usersCursor = nextCursor
  }

  if (allMembers.length > 0) {
    const activeUsers = allMembers.filter(
      (u) => !u.deleted && !u.is_bot
    )

    const scored = activeUsers
      .map((u) => ({ user: u, score: scoreUserMatch(u, cleanName) }))
      .filter((s) => s.score >= 70)
      .sort((a, b) => b.score - a.score)

    if (scored.length === 0) {
      const closestMatches = activeUsers
        .map((u) => ({ user: u, score: scoreUserMatch(u, cleanName) }))
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)

      if (closestMatches.length > 0) {
        const suggestions = closestMatches
          .map((m) => {
            const name = m.user.profile?.real_name || m.user.real_name || m.user.name
            return `"${name}"`
          })
          .join(", ")
        return {
          channelId: null,
          error: `No strong match for "${recipient}". Closest matches: ${suggestions}`,
        }
      }

      return {
        channelId: null,
        error: `Could not find a user named "${recipient}" (searched ${activeUsers.length} users)`,
      }
    }

    if (scored.length > 1 && scored[0].score === scored[1].score && scored[0].score < 95) {
      const ambiguous = scored
        .filter((s) => s.score === scored[0].score)
        .slice(0, 5)
        .map((m) => {
          const name = m.user.profile?.real_name || m.user.real_name || m.user.name
          return `"${name}"`
        })
        .join(", ")
      return {
        channelId: null,
        error: `Multiple users match "${recipient}": ${ambiguous}. Please use their full name.`,
      }
    }

    const bestUser = scored[0].user
    const dmRes = await fetch("https://slack.com/api/conversations.open", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users: bestUser.id }),
    })
    const dmData = (await dmRes.json()) as {
      ok: boolean
      channel?: { id: string }
      error?: string
      needed?: string
    }
    if (dmData.ok && dmData.channel) {
      return { channelId: dmData.channel.id, error: null }
    }
    if (dmData.error === "missing_scope") {
      return {
        channelId: null,
        error: `missing_scope: need "${dmData.needed}" — please re-install the Slack plugin`,
      }
    }
    return {
      channelId: null,
      error: dmData.error || "Could not open DM with user",
    }
  }

  return {
    channelId: null,
    error: `Could not find a channel or user named "${recipient}"`,
  }
}

export async function POST(request: Request) {
  let body: { token?: string; recipient?: string; message?: string; userId?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { token, recipient, message, userId } = body
  if (!token || !message || (!recipient && !userId)) {
    return NextResponse.json(
      { error: "token, message, and either recipient or userId are required" },
      { status: 400 }
    )
  }

  try {
    let channelId: string | null = null
    let resolveError: string | null = null

    if (userId) {
      const dmRes = await fetch("https://slack.com/api/conversations.open", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users: userId }),
      })
      const dmData = (await dmRes.json()) as {
        ok: boolean
        channel?: { id: string }
        error?: string
        needed?: string
      }
      if (dmData.ok && dmData.channel) {
        channelId = dmData.channel.id
      } else {
        resolveError = dmData.error === "missing_scope"
          ? `missing_scope: need "${dmData.needed}" — please re-install the Slack plugin`
          : dmData.error || "Could not open DM with user"
      }
    } else {
      const result = await resolveChannelId(token, recipient!)
      channelId = result.channelId
      resolveError = result.error
    }

    if (!channelId) {
      return NextResponse.json(
        { error: resolveError || "Could not resolve recipient" },
        { status: 404 }
      )
    }

    const slackRes = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: channelId,
        text: `${message}\n\n_Sent using Level AI_`,
      }),
    })

    const slackData = (await slackRes.json()) as SlackAPIResponse

    if (!slackData.ok) {
      const detail = slackData.needed
        ? `${slackData.error}: need "${slackData.needed}" — please re-install the Slack plugin`
        : slackData.error || "Slack API error"
      return NextResponse.json({ error: detail }, { status: 502 })
    }

    return NextResponse.json({
      ok: true,
      channel: slackData.channel,
      ts: slackData.ts,
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Network error while calling Slack API" },
      { status: 502 }
    )
  }
}
