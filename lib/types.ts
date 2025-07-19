export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface Trip {
  id: string
  userId: string
  title: string
  description?: string
  destinations: string[]
  dates: {
    start: string
    end: string
  }
  budget?: number
  status: "upcoming" | "active" | "completed"
  createdAt: string
  updatedAt: string
}

export interface Expense {
  id: string
  userId: string
  tripId?: string
  amount: number
  category: "accommodation" | "food" | "transport" | "activities" | "shopping" | "other"
  description: string
  date: string
  createdAt: string
  updatedAt: string
}

export interface Destination {
  id: string
  name: string
  type: "restaurant" | "cafe" | "attraction" | "park" | "hotel" | "other"
  location: string
  description?: string
  rating?: number
  image?: string
  coordinates?: {
    lat: number
    lng: number
  }
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  userId: string
  content: string
  image?: string
  location?: string
  tags: string[]
  likes: number
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

export interface Comment {
  userId: string
  content: string
  timestamp: string
}
