import { NextResponse } from "next/server"

const titleModel = "gpt-4.1-mini"

export async function POST(request: Request) {
  let body: { message?: string }
  try {
    body = (await request.json()) as { message?: string }
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const message = body.message?.trim()
  if (!message) {
    return NextResponse.json({ error: "message is required." }, { status: 400 })
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json({ title: message.slice(0, 50) })
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: titleModel,
        input: [
          {
            role: "developer",
            content: [
              "Generate a short, descriptive title (3-7 words) for a chat conversation that starts with the user message below.",
              "The title should capture the intent or topic, not repeat the message verbatim.",
              "Do not use quotes, punctuation at the end, or filler words like 'Request for' or 'Question about'.",
              "Strip any @mentions of worker/agent names — focus only on the user's actual question or task.",
              "Return ONLY the title text, nothing else.",
            ].join(" "),
          },
          { role: "user", content: message },
        ],
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      return NextResponse.json({ title: message.slice(0, 50) })
    }

    const payload = (await response.json()) as {
      output_text?: string
      output?: Array<{
        type?: string
        content?: Array<{ type?: string; text?: string }>
      }>
    }
    const title = (
      payload.output_text ??
      payload.output
        ?.find((item) => item.type === "message")
        ?.content?.find((part) => part.type === "output_text")
        ?.text
    )?.trim()

    if (!title || title.length > 60) {
      return NextResponse.json({ title: message.slice(0, 50) })
    }

    return NextResponse.json({ title })
  } catch {
    return NextResponse.json({ title: message.slice(0, 50) })
  }
}
