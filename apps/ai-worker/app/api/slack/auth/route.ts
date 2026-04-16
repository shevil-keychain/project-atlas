import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const clientId = process.env.SLACK_CLIENT_ID?.trim()
  if (!clientId) {
    return NextResponse.json(
      { error: "SLACK_CLIENT_ID is not configured" },
      { status: 500 }
    )
  }

  const url = new URL(request.url)
  const redirectUri = `${url.origin}/api/slack/callback`

  const slackAuthUrl = new URL("https://slack.com/oauth/v2/authorize")
  slackAuthUrl.searchParams.set("client_id", clientId)
  slackAuthUrl.searchParams.set("user_scope", "chat:write,channels:read,groups:read,im:write,users:read")
  slackAuthUrl.searchParams.set("redirect_uri", redirectUri)

  return NextResponse.redirect(slackAuthUrl.toString())
}
