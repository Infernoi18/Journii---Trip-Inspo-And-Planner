import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ message: "Message is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a helpful AI travel assistant for Journii, a trip planning app. You help users with:
      - Trip planning and itinerary suggestions
      - Destination recommendations
      - Budget and expense management advice
      - Travel tips and best practices
      - Local culture and customs information
      - Transportation and accommodation suggestions
      
      Keep your responses helpful, friendly, and focused on travel. If asked about non-travel topics, politely redirect the conversation back to travel planning.`,
      prompt: message,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ message: "Sorry, I encountered an error. Please try again." }, { status: 500 })
  }
}
