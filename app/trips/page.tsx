import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, DollarSign, Plus } from "lucide-react"
import Link from "next/link"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

// Mock data - in real app, this would come from your API
const trips = [
  {
    id: "1",
    title: "Tokyo Adventure",
    destinations: ["Tokyo", "Kyoto", "Osaka"],
    dates: { start: "2024-03-15", end: "2024-03-25" },
    status: "upcoming",
    totalExpenses: 1200,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "European Explorer",
    destinations: ["Paris", "Rome", "Barcelona"],
    dates: { start: "2024-02-01", end: "2024-02-14" },
    status: "completed",
    totalExpenses: 2100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Weekend in NYC",
    destinations: ["New York"],
    dates: { start: "2024-01-20", end: "2024-01-22" },
    status: "active",
    totalExpenses: 450,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
            <p className="text-gray-600">Manage and track all your travel adventures</p>
          </div>
          <Link href="/trips/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Trip
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="w-full h-full object-cover" />
                <Badge
                  className={`absolute top-2 right-2 ${
                    trip.status === "active"
                      ? "bg-green-500"
                      : trip.status === "upcoming"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                  }`}
                >
                  {trip.status}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="flex items-center justify-between">{trip.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{trip.destinations.join(", ")}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {trip.dates.start} - {trip.dates.end}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>${trip.totalExpenses}</span>
                  </div>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex space-x-2">
                  <Link href={`/trips/${trip.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/trips/${trip.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {trips.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-600 mb-4">Start planning your first adventure!</p>
            <Link href="/trips/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Trip
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
