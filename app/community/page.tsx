"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Plus } from "lucide-react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"

// Define the Post and Author types
interface Author {
  name: string
  avatar?: string
  username: string
}

interface Post {
  _id: string
  author: Author // In a real app, you'd fetch author details using userId
  userId: string
  content: string
  image?: string
  location?: string
  likes: number
  comments: number // Assuming this is a count for simplicity
  createdAt: string
  tags: string[]
}

// Mock author data since we don't have user profiles yet
const mockAuthors: { [key: string]: Author } = {
  "user1": { name: "Sarah Johnson", avatar: "/placeholder-user.jpg", username: "@sarahj" },
  "user2": { name: "Mike Chen", avatar: "/placeholder-user.jpg", username: "@mikec" },
  "user3": { name: "Emma Wilson", avatar: "/placeholder-user.jpg", username: "@emmaw" },
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/community")
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        const data = await response.json()
        
        // Combine fetched data with mock author details
        const postsWithAuthors = data.map((post: any) => ({
          ...post,
          author: mockAuthors[post.userId] || { name: "Unknown User", username: "@unknown" },
          comments: post.comments.length, // Get comment count
        }));
        setPosts(postsWithAuthors)

      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
            <p className="text-gray-600">Share your travel experiences and get inspired by others</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Share Post
          </Button>
        </div>

        {/* Posts Feed */}
        <div className="max-w-2xl mx-auto space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[200px]" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="aspect-video w-full rounded-lg" />
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post._id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar || "/placeholder-user.jpg"} alt={post.author.name} />
                      <AvatarFallback>
                        {post.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{post.author.name}</h3>
                        <span className="text-sm text-gray-500">{post.author.username}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{post.location}</span>
                        {post.location && <span>•</span>}
                        <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-900">{post.content}</p>

                  {post.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img src={post.image || "/placeholder.svg"} alt="Post image" className="w-full h-auto object-cover" />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-500">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-500">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-500">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">Load More Posts</Button>
        </div>
      </main>
    </div>
  )
}