import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Plus } from "lucide-react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

// Mock data
const posts = [
  {
    id: "1",
    author: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40", username: "@sarahj" },
    content:
      "Just had the most amazing ramen in Tokyo! The broth was so rich and flavorful. Definitely a must-visit spot for any food lover visiting Japan. 🍜",
    image: "/placeholder.svg?height=300&width=400",
    location: "Tokyo, Japan",
    likes: 24,
    comments: 8,
    timestamp: "2 hours ago",
    tags: ["food", "tokyo", "japan"],
  },
  {
    id: "2",
    author: { name: "Mike Chen", avatar: "/placeholder.svg?height=40&width=40", username: "@mikec" },
    content:
      "Sunset views from the Eiffel Tower never get old. Paris, you have my heart! ❤️ Planning to come back next spring for the cherry blossoms.",
    image: "/placeholder.svg?height=300&width=400",
    location: "Paris, France",
    likes: 156,
    comments: 23,
    timestamp: "5 hours ago",
    tags: ["paris", "sunset", "eiffeltower"],
  },
  {
    id: "3",
    author: { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40", username: "@emmaw" },
    content:
      "Found this hidden gem of a coffee shop in the backstreets of Barcelona. The cortado here is perfection! ☕️",
    image: "/placeholder.svg?height=300&width=400",
    location: "Barcelona, Spain",
    likes: 67,
    comments: 12,
    timestamp: "1 day ago",
    tags: ["coffee", "barcelona", "hiddengem"],
  },
]

export default function CommunityPage() {
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
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
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
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-900">{post.content}</p>

                {post.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img src={post.image || "/placeholder.svg"} alt="Post image" className="w-full h-64 object-cover" />
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
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">Load More Posts</Button>
        </div>
      </main>
    </div>
  )
}
