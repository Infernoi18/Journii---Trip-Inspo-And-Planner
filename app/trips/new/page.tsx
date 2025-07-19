"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { useRouter } from "next/navigation"
import { Plus, X } from "lucide-react"

export default function NewTripPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [destinations, setDestinations] = useState([""])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [budget, setBudget] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const addDestination = () => {
    setDestinations([...destinations, ""])
  }

  const removeDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index))
  }

  const updateDestination = (index: number, value: string) => {
    const updated = [...destinations]
    updated[index] = value
    setDestinations(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          title,
          description,
          destinations: destinations.filter((d) => d.trim() !== ""),
          dates: { start: startDate, end: endDate },
          budget: budget ? Number.parseFloat(budget) : null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Trip created!",
          description: "Your new trip has been successfully created.",
        })
        router.push("/trips")
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create trip",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Trip</h1>
            <p className="text-gray-600">Plan your next adventure</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
              <CardDescription>Fill in the information about your upcoming trip</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Trip Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Summer in Europe"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your trip..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Destinations</Label>
                  {destinations.map((destination, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        placeholder="Enter destination"
                        value={destination}
                        onChange={(e) => updateDestination(index, e.target.value)}
                        required={index === 0}
                      />
                      {destinations.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeDestination(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addDestination}
                    className="mt-2 bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Destination
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (Optional)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter your budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Creating..." : "Create Trip"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
