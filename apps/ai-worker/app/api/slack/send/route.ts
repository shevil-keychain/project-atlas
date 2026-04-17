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

  if (fullName && fullName === query) return 100
  if (realName && realName === query) return 100
  if (displayName && displayName === query) return 99
  if (username && username === query) return 98

  if (firstName && lastName) {
    const lastFirst = `${lastName} ${firstName}`
    if (lastFirst === query) return 97
    const firstDotLast = `${firstName}.${lastName}`
    if (firstDotLast === query) return 96
  }

  const queryParts = query.split(/[\s._-]+/).filter(Boolean)

  if (queryParts.length >= 2 && firstName && lastName) {
    const matchesFirst = queryParts[0] === firstName || firstName.startsWith(queryParts[0])
    const matchesLast = queryParts[1] === lastName || lastName.startsWith(queryParts[1])
    if (matchesFirst && matchesLast) return 90
  }

  if (queryParts.length === 1) {
    const q = queryParts[0]
    if (firstName === q) return 85
    if (lastName === q) return 80
    if (displayName === q) return 80
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

  const usersRes = await fetch("https://slack.com/api/users.list?limit=500", {
    headers: { Authorization: `Bearer ${token}` },
  })
  const usersData = (await usersRes.json()) as {
    ok: boolean
    members?: SlackUser[]
    error?: string
    needed?: string
  }

  if (!usersData.ok && usersData.error === "missing_scope") {
    return {
      channelId: null,
      error: `missing_scope: need "${usersData.needed}" — please re-install the Slack plugin`,
    }
  }

  if (usersData.ok && usersData.members) {
    const activeUsers = usersData.members.filter(
      (u) => !u.deleted && !u.is_bot
    )

    const scored = activeUsers
      .map((u) => ({ user: u, score: scoreUserMatch(u, cleanName) }))
      .filter((s) => s.score >= 80)
      .sort((a, b) => b.score - a.score)

    if (scored.length === 0) {
      const partialMatches = activeUsers
        .map((u) => ({ user: u, score: scoreUserMatch(u, cleanName) }))
        .filter((s) => s.score >= 50)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)

      if (partialMatches.length > 0) {
        const suggestions = partialMatches
          .map((m) => {
            const name = m.user.profile?.real_name || m.user.real_name || m.user.name
            return `"${name}"`
          })
          .join(", ")
        return {
          channelId: null,
          error: `No strong match for "${recipient}". Did you mean: ${suggestions}?`,
        }
      }

      return {
        channelId: null,
        error: `Could not find a user named "${recipient}"`,
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
  let body: { token?: string; recipient?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { token, recipient, message } = body
  if (!token || !recipient || !message) {
    return NextResponse.json(
      { error: "token, recipient, and message are required" },
      { status: 400 }
    )
  }

  try {
    const { channelId, error: resolveError } = await resolveChannelId(
      token,
      recipient
    )
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
      body: JSON.stringify({ channel: channelId, text: message }),
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
