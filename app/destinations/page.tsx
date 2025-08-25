import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Star, Heart, Search } from "lucide-react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

// Mock data
const destinations = [
  {
    id: "1",
    name: "Tokyo Ramen Street",
    type: "restaurant",
    location: "Tokyo, Japan",
    rating: 4.8,
    description: "Famous ramen street with authentic Japanese noodle shops",
    image: "/placeholder.svg?height=200&width=300",
    saved: true,
  },
  {
    id: "2",
    name: "Blue Bottle Coffee",
    type: "cafe",
    location: "San Francisco, USA",
    rating: 4.5,
    description: "Artisanal coffee roaster with minimalist aesthetic",
    image: "/placeholder.svg?height=200&width=300",
    saved: false,
  },
  {
    id: "3",
    name: "Louvre Museum",
    type: "attraction",
    location: "Paris, France",
    rating: 4.9,
    description: "World-famous art museum housing the Mona Lisa",
    image: "/placeholder.svg?height=200&width=300",
    saved: true,
  },
  {
    id: "4",
    name: "Central Park",
    type: "park",
    location: "New York, USA",
    rating: 4.7,
    description: "Iconic urban park in the heart of Manhattan",
    image: "/placeholder.svg?height=200&width=300",
    saved: false,
  },
]

const typeColors = {
  restaurant: "bg-red-100 text-red-800",
  cafe: "bg-yellow-100 text-yellow-800",
  attraction: "bg-blue-100 text-blue-800",
  park: "bg-green-100 text-green-800",
}

export default function DestinationsPage() {
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                  <Badge className={typeColors[destination.type as keyof typeof typeColors]}>{destination.type}</Badge>
                </div>

                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>

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

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">Load More Destinations</Button>
        </div>
      </main>
    </div>
  )
}
