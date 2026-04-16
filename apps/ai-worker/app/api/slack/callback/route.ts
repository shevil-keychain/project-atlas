import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const error = url.searchParams.get("error")

  if (error || !code) {
    return new NextResponse(
      buildHTML(null, error || "No authorization code received"),
      { headers: { "Content-Type": "text/html" } }
    )
  }

  const clientId = process.env.SLACK_CLIENT_ID?.trim()
  const clientSecret = process.env.SLACK_CLIENT_SECRET?.trim()
  if (!clientId || !clientSecret) {
    return new NextResponse(
      buildHTML(null, "Slack credentials are not configured on the server"),
      { headers: { "Content-Type": "text/html" } }
    )
  }

  const redirectUri = `${url.origin}/api/slack/callback`

  try {
    const tokenResponse = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    })

    const data = (await tokenResponse.json()) as {
      ok: boolean
      access_token?: string
      team?: { name?: string }
      error?: string
    }

    if (!data.ok || !data.access_token) {
      return new NextResponse(
        buildHTML(null, data.error || "Failed to exchange code for token"),
        { headers: { "Content-Type": "text/html" } }
      )
    }

    return new NextResponse(
      buildHTML(data.access_token, null, data.team?.name),
      { headers: { "Content-Type": "text/html" } }
    )
  } catch (err) {
    return new NextResponse(
      buildHTML(null, "Network error while exchanging token"),
      { headers: { "Content-Type": "text/html" } }
    )
  }
}

function buildHTML(
  token: string | null,
  error: string | null,
  teamName?: string
): string {
  if (error) {
    return `<!DOCTYPE html>
<html><head><title>Slack Authorization</title></head>
<body style="font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
<div style="text-align:center;max-width:400px;">
  <h2 style="color:#e53e3e;">Authorization failed</h2>
  <p style="color:#666;">${error}</p>
  <p style="color:#999;font-size:14px;">You can close this window.</p>
</div>
<script>
  if (window.opener) {
    window.opener.postMessage({ type: "slack_oauth_error", error: "${error}" }, "*");
  }
</script>
</body></html>`
  }

  return `<!DOCTYPE html>
<html><head><title>Slack Connected</title></head>
<body style="font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
<div style="text-align:center;max-width:400px;">
  <h2 style="color:#1a1a1a;">Slack connected</h2>
  <p style="color:#666;">${teamName ? `Connected to <strong>${teamName}</strong>.` : "Successfully connected."} This window will close automatically.</p>
</div>
<script>
  if (window.opener) {
    window.opener.postMessage({ type: "slack_oauth_success", token: "${token}" }, "*");
    setTimeout(() => window.close(), 1500);
  }
</script>
</body></html>`
}
