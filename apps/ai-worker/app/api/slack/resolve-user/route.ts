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
        error: usersData.error || "Could not fetch users",
      })
    }

    const activeUsers = usersData.members.filter(
      (u) => !u.deleted && !u.is_bot
    )
    const cleanName = normalizeForMatch(recipient)

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

      return NextResponse.json({
        found: false,
        suggestions: closestMatches.map((m) => ({
          name: m.user.profile?.real_name || m.user.real_name || m.user.name,
          avatar: m.user.profile?.image_72 || null,
          score: m.score,
        })),
      })
    }

    const best = scored[0].user
    return NextResponse.json({
      found: true,
      user: {
        name: best.profile?.real_name || best.real_name || best.name,
        avatar: best.profile?.image_72 || null,
        score: scored[0].score,
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Network error while calling Slack API" },
      { status: 502 }
    )
  }
}
