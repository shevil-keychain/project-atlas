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
}

async function resolveChannelId(
  token: string,
  recipient: string
): Promise<{ channelId: string | null; error: string | null }> {
  const cleanName = recipient.replace(/^[#@]/, "").trim().toLowerCase()

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

  const usersRes = await fetch("https://slack.com/api/users.list?limit=200", {
    headers: { Authorization: `Bearer ${token}` },
  })
  const usersData = (await usersRes.json()) as {
    ok: boolean
    members?: SlackUser[]
  }

  if (usersData.ok && usersData.members) {
    const match = usersData.members.find(
      (u) =>
        u.name.toLowerCase() === cleanName ||
        u.real_name?.toLowerCase() === cleanName
    )
    if (match) {
      const dmRes = await fetch("https://slack.com/api/conversations.open", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users: match.id }),
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
