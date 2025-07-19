import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db-connect"
import Trip from "@/models/Trip"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    const trips = await Trip.find({ userId }).sort({ createdAt: -1 })

    return NextResponse.json(trips)
  } catch (error) {
    console.error("Get trips error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { userId, title, description, destinations, dates, budget } = await request.json()

    // Validate input
    if (!userId || !title || !destinations || !dates) {
      return NextResponse.json({ message: "Required fields are missing" }, { status: 400 })
    }

    const trip = await Trip.create({
      userId,
      title,
      description,
      destinations,
      dates,
      budget,
      status: "upcoming",
    })

    return NextResponse.json(trip, { status: 201 })
  } catch (error) {
    console.error("Create trip error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
