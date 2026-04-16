import { NextResponse } from "next/server"

type SlackAPIResponse = {
  ok: boolean
  error?: string
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
  const names = [
    user.name,
    user.real_name,
    user.profile?.display_name,
    user.profile?.real_name,
  ]
    .filter(Boolean)
    .map((n) => n!.toLowerCase())

  for (const name of names) {
    if (name === query) return 100
  }

  for (const name of names) {
    if (name.includes(query) || query.includes(name)) return 80
  }

  const queryParts = query.split(/[\s._-]+/)
  for (const name of names) {
    const nameParts = name.split(/[\s._-]+/)
    const allPartsMatch = queryParts.every((qp) =>
      nameParts.some((np) => np.startsWith(qp) || qp.startsWith(np))
    )
    if (allPartsMatch && queryParts.length > 0) return 60
  }

  const firstName = user.profile?.first_name?.toLowerCase()
  const lastName = user.profile?.last_name?.toLowerCase()
  if (firstName && lastName) {
    const full = `${firstName} ${lastName}`
    if (full === query) return 100
    if (full.includes(query) || query.includes(full)) return 70
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
  }

  if (usersData.ok && usersData.members) {
    const activeUsers = usersData.members.filter(
      (u) => !u.deleted && !u.is_bot
    )

    let bestUser: SlackUser | null = null
    let bestScore = 0

    for (const u of activeUsers) {
      const score = scoreUserMatch(u, cleanName)
      if (score > bestScore) {
        bestScore = score
        bestUser = u
      }
    }

    if (bestUser && bestScore >= 60) {
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
      }
      if (dmData.ok && dmData.channel) {
        return { channelId: dmData.channel.id, error: null }
      }
      return {
        channelId: null,
        error: dmData.error || "Could not open DM with user",
      }
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
      return NextResponse.json(
        { error: slackData.error || "Slack API error" },
        { status: 502 }
      )
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
