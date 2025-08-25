import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db-connect"
import Destination from "@/models/Destination"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const destinations = await Destination.find({}).sort({ createdAt: -1 })

    return NextResponse.json(destinations)
  } catch (error) {
    console.error("Get destinations error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()

    // Basic validation
    if (!body.name || !body.type || !body.location) {
      return NextResponse.json({ message: "Required fields are missing" }, { status: 400 })
    }

    const destination = await Destination.create(body)

    return NextResponse.json(destination, { status: 201 })
  } catch (error) {
    console.error("Create destination error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}