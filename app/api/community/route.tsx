import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db-connect"
import Post from "@/models/Post"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const posts = await Post.find({}).sort({ createdAt: -1 })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Get posts error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()

    // Basic validation
    if (!body.userId || !body.content) {
      return NextResponse.json({ message: "User ID and content are required" }, { status: 400 })
    }

    const post = await Post.create(body)

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}