import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db-connect"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject()

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
