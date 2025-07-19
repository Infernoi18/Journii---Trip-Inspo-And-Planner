"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Plus, Filter, TrendingUp, TrendingDown } from "lucide-react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

// Mock data
const expenses = [
  { id: "1", amount: 120, category: "accommodation", description: "Hotel booking", date: "2024-01-15", tripId: "1" },
  { id: "2", amount: 45, category: "food", description: "Dinner at local restaurant", date: "2024-01-16", tripId: "1" },
  { id: "3", amount: 25, category: "transport", description: "Taxi to airport", date: "2024-01-17", tripId: "1" },
  { id: "4", amount: 200, category: "activities", description: "Museum tickets", date: "2024-01-18", tripId: "2" },
]

const categories = [
  { value: "accommodation", label: "Accommodation", color: "bg-blue-500" },
  { value: "food", label: "Food & Dining", color: "bg-green-500" },
  { value: "transport", label: "Transportation", color: "bg-yellow-500" },
  { value: "activities", label: "Activities", color: "bg-purple-500" },
  { value: "shopping", label: "Shopping", color: "bg-pink-500" },
  { value: "other", label: "Other", color: "bg-gray-500" },
]

export default function ExpensesPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const getCategoryInfo = (category: string) => {
    return categories.find((cat) => cat.value === category) || categories[categories.length - 1]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Expenses</h1>
            <p className="text-gray-600">Track and manage your travel expenses</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {expenses
                  .filter((e) => new Date(e.date).getMonth() === new Date().getMonth())
                  .reduce((sum, e) => sum + e.amount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">4 transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average per Trip</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(totalExpenses / 3)}</div>
              <p className="text-xs text-muted-foreground">Based on 3 trips</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
              <CardDescription>Record a new expense for your trip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="What was this for?"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button>Add Expense</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Expenses List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Your latest travel expenses</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.map((expense) => {
                const categoryInfo = getCategoryInfo(expense.category)
                return (
                  <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${categoryInfo.color}`}></div>
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-sm text-gray-500">{expense.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{categoryInfo.label}</Badge>
                      <span className="font-bold text-lg">${expense.amount}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
