import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db-connect"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject()

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
