import { NextResponse } from "next/server"

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
    if (lastExact && firstName.startsWith(queryParts[0])) return 88
    if (firstExact) return 78
  }

  if (queryParts.length === 1) {
    const q = queryParts[0]
    if (firstName === q) return 85
    if (lastName === q) return 80
    if (displayName === q) return 80
    if (firstName && firstName.startsWith(q) && q.length >= 3) return 70
    if (lastName && lastName.startsWith(q) && q.length >= 3) return 68
    if (displayName && displayName.startsWith(q) && q.length >= 3) return 65
  }

  return 0
}

async function fetchAllSlackUsers(
  token: string
): Promise<{ users: SlackUser[]; error: string | null }> {
  const allMembers: SlackUser[] = []
  let cursor: string | undefined

  for (let page = 0; page < 20; page++) {
    const url = new URL("https://slack.com/api/users.list")
    url.searchParams.set("limit", "500")
    if (cursor) url.searchParams.set("cursor", cursor)

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = (await res.json()) as {
      ok: boolean
      members?: SlackUser[]
      error?: string
      response_metadata?: { next_cursor?: string }
    }

    if (!data.ok) {
      return { users: [], error: data.error || "Could not fetch users" }
    }

    if (data.members) {
      allMembers.push(...data.members)
    }

    const nextCursor = data.response_metadata?.next_cursor
    if (!nextCursor) break
    cursor = nextCursor
  }

  return { users: allMembers, error: null }
}

export async function POST(request: Request) {
  let body: { token?: string; recipient?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { token, recipient } = body
  if (!token || !recipient) {
    return NextResponse.json(
      { error: "token and recipient are required" },
      { status: 400 }
    )
  }

  try {
    const { users: allMembers, error: fetchError } = await fetchAllSlackUsers(token)
    if (fetchError) {
      return NextResponse.json({
        found: false,
        candidates: [],
        error: fetchError,
        totalUsers: 0,
      })
    }

    const activeUsers = allMembers.filter(
      (u) => !u.deleted && !u.is_bot
    )
    const cleanName = normalizeForMatch(recipient)

    const scored = activeUsers
      .map((u) => ({ user: u, score: scoreUserMatch(u, cleanName) }))
      .filter((s) => s.score >= 65)
      .sort((a, b) => b.score - a.score)

    if (scored.length === 0) {
      return NextResponse.json({
        found: false,
        totalUsers: activeUsers.length,
      })
    }

    const best = scored[0]
    return NextResponse.json({
      found: true,
      user: {
        userId: best.user.id,
        name: best.user.profile?.real_name || best.user.real_name || best.user.name,
        avatar: best.user.profile?.image_72 || null,
        score: best.score,
      },
      totalUsers: activeUsers.length,
    })
  } catch {
    return NextResponse.json(
      { error: "Network error while calling Slack API" },
      { status: 502 }
    )
  }
}
