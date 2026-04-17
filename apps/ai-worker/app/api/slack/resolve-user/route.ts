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
    if (firstName && firstName.startsWith(q) && q.length >= 2) return 70
    if (lastName && lastName.startsWith(q) && q.length >= 2) return 68
    if (displayName && displayName.startsWith(q) && q.length >= 2) return 65
  }

  // Very relaxed: any query part appears as a startsWith on first or last name
  for (const part of queryParts) {
    if (part.length < 2) continue
    if (firstName.startsWith(part) || lastName.startsWith(part)) return 55
    if (displayName.startsWith(part) || username.startsWith(part)) return 50
  }

  // Even more relaxed: firstName or lastName contains query part (min 3 chars to avoid noise)
  for (const part of queryParts) {
    if (part.length < 3) continue
    if (firstName.includes(part) || lastName.includes(part)) return 40
    if (realName.includes(part) || displayName.includes(part)) return 35
  }

  return 0
}

export type ResolveUserCandidate = {
  userId: string
  name: string
  avatar: string | null
  score: number
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
    const usersRes = await fetch("https://slack.com/api/users.list?limit=500", {
      headers: { Authorization: `Bearer ${token}` },
    })
    const usersData = (await usersRes.json()) as {
      ok: boolean
      members?: SlackUser[]
      error?: string
    }

    if (!usersData.ok || !usersData.members) {
      return NextResponse.json({
        found: false,
        candidates: [],
        error: usersData.error || "Could not fetch users",
      })
    }

    const activeUsers = usersData.members.filter(
      (u) => !u.deleted && !u.is_bot
    )
    const cleanName = normalizeForMatch(recipient)

    const scored = activeUsers
      .map((u) => ({ user: u, score: scoreUserMatch(u, cleanName) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)

    if (scored.length === 0) {
      return NextResponse.json({
        found: false,
        candidates: [],
      })
    }

    const toCandidate = (s: { user: SlackUser; score: number }): ResolveUserCandidate => ({
      userId: s.user.id,
      name: s.user.profile?.real_name || s.user.real_name || s.user.name,
      avatar: s.user.profile?.image_72 || null,
      score: s.score,
    })

    // Clear winner: top score >= 95 and well ahead of runner-up
    if (scored[0].score >= 95 && (scored.length === 1 || scored[0].score - scored[1].score >= 5)) {
      return NextResponse.json({
        found: true,
        user: toCandidate(scored[0]),
        candidates: scored.slice(0, 5).map(toCandidate),
      })
    }

    // Multiple viable candidates — let the user pick
    return NextResponse.json({
      found: false,
      ambiguous: true,
      candidates: scored.slice(0, 5).map(toCandidate),
    })
  } catch {
    return NextResponse.json(
      { error: "Network error while calling Slack API" },
      { status: 502 }
    )
  }
}
