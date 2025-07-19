import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, DollarSign, Users, Bot, Plane, Camera } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Journii</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Plan Your Perfect Journey with <span className="text-primary">Journii</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create amazing trips, track expenses, discover destinations, and share your travel stories with a community
            of explorers. Get AI-powered assistance for the perfect travel experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="px-8 py-3">
                Start Planning Now
              </Button>
            </Link>
            <Link href="/destinations">
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Perfect Trips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Trip Planning</CardTitle>
                <CardDescription>
                  Create detailed itineraries, manage destinations, and organize your travel plans effortlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Expense Tracking</CardTitle>
                <CardDescription>
                  Keep track of all your travel expenses with detailed categorization and budget management.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Camera className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Destination Discovery</CardTitle>
                <CardDescription>
                  Find amazing cafes, restaurants, and places to visit with our curated destination database.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Travel Community</CardTitle>
                <CardDescription>
                  Share your travel stories, get inspiration from other travelers, and build connections.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Bot className="h-10 w-10 text-primary mb-2" />
                <CardTitle>AI Travel Assistant</CardTitle>
                <CardDescription>
                  Get personalized recommendations and instant help with our intelligent chatbot assistant.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Plane className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Smart Recommendations</CardTitle>
                <CardDescription>
                  Receive AI-powered suggestions for destinations, activities, and travel optimizations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of travelers who trust Journii for their adventures</p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">Journii</span>
          </div>
          <p className="text-gray-400">© 2024 Journii. All rights reserved. Made with ❤️ for travelers.</p>
        </div>
      </footer>
    </div>
  )
}
