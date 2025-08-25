"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Star, Heart, Search } from "lucide-react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Skeleton } from "@/components/ui/skeleton"

// Define the Destination type based on your model
interface Destination {
  _id: string
  name: string
  type: "restaurant" | "cafe" | "attraction" | "park" | "hotel" | "other"
  location: string
  rating?: number
  description?: string
  image?: string
  saved?: boolean // This can be client-side state for now
}

const typeColors = {
  restaurant: "bg-red-100 text-red-800",
  cafe: "bg-yellow-100 text-yellow-800",
  attraction: "bg-blue-100 text-blue-800",
  park: "bg-green-100 text-green-800",
  hotel: "bg-indigo-100 text-indigo-800",
  other: "bg-gray-100 text-gray-800",
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/destinations")
        if (!response.ok) {
          throw new Error("Failed to fetch destinations")
        }
        const data = await response.json()
        setDestinations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Destinations</h1>
          <p className="text-gray-600">Discover amazing places to visit on your travels</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search destinations..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">All</Button>
                <Button variant="outline">Restaurants</Button>
                <Button variant="outline">Cafes</Button>
                <Button variant="outline">Attractions</Button>
                <Button variant="outline">Parks</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Destinations Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Card key={destination._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute top-2 right-2 ${destination.saved ? "text-red-500" : "text-gray-400"}`}
                  >
                    <Heart className={`h-4 w-4 ${destination.saved ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{destination.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{destination.location}</span>
                      </div>
                    </div>
                    <Badge className={typeColors[destination.type]}>{destination.type}</Badge>
                  </div>

                  {destination.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  )}

                  <CardDescription>{destination.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      View Details
                    </Button>
                    <Button variant={destination.saved ? "default" : "outline"}>
                      {destination.saved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">Load More Destinations</Button>
        </div>
      </main>
    </div>
  )
}