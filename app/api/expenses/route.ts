import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db-connect"
import Expense from "@/models/Expense"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const tripId = searchParams.get("tripId")

    const query: any = {}
    if (userId) query.userId = userId
    if (tripId) query.tripId = tripId

    const expenses = await Expense.find(query).sort({ date: -1 })

    return NextResponse.json(expenses)
  } catch (error) {
    console.error("Get expenses error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { userId, tripId, amount, category, description, date } = await request.json()

    // Validate input
    if (!userId || !amount || !category || !description || !date) {
      return NextResponse.json({ message: "Required fields are missing" }, { status: 400 })
    }

    const expense = await Expense.create({
      userId,
      tripId,
      amount,
      category,
      description,
      date,
    })

    return NextResponse.json(expense, { status: 201 })
  } catch (error) {
    console.error("Create expense error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
