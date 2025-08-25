"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Plus, Filter, TrendingUp, TrendingDown } from "lucide-react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { useAuth } from "@/components/providers/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

// Define the Expense type
interface Expense {
  _id: string;
  amount: number;
  category: "accommodation" | "food" | "transport" | "activities" | "shopping" | "other";
  description: string;
  date: string;
  tripId?: string;
}

const categories = [
  { value: "accommodation", label: "Accommodation", color: "bg-blue-500" },
  { value: "food", label: "Food & Dining", color: "bg-green-500" },
  { value: "transport", label: "Transportation", color: "bg-yellow-500" },
  { value: "activities", label: "Activities", color: "bg-purple-500" },
  { value: "shopping", label: "Shopping", color: "bg-pink-500" },
  { value: "other", label: "Other", color: "bg-gray-500" },
]

export default function ExpensesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  })

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return
    }

    const fetchExpenses = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/expenses?userId=${user.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch expenses")
        }
        const data = await response.json()
        setExpenses(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchExpenses()
  }, [user])

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const getCategoryInfo = (category: string) => {
    return categories.find((cat) => cat.value === category) || categories[categories.length - 1]
  }

  const handleAddExpense = async () => {
    if (!user) {
        toast({ title: "Error", description: "You must be logged in to add an expense.", variant: "destructive" });
        return;
    }

    // Basic Validation
    if (!newExpense.amount || !newExpense.category || !newExpense.description || !newExpense.date) {
        toast({ title: "Missing Fields", description: "Please fill out all required fields.", variant: "destructive" });
        return;
    }
    
    setIsSubmitting(true);

    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...newExpense,
                userId: user.id,
                amount: parseFloat(newExpense.amount)
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add expense");
        }

        const createdExpense = await response.json();
        
        // Add new expense to the top of the list
        setExpenses([createdExpense, ...expenses]);

        toast({ title: "Success!", description: "Your expense has been added." });
        
        // Reset form and hide it
        setNewExpense({ amount: "", category: "", description: "", date: "" });
        setShowAddForm(false);

    } catch (err) {
        toast({ title: "Error", description: err instanceof Error ? err.message : "An unknown error occurred", variant: "destructive" });
    } finally {
        setIsSubmitting(false);
    }
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
              <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Across all trips</p>
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
                  .reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">So far</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
               <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expenses.length}</div>
              <p className="text-xs text-muted-foreground">Across all trips</p>
            </CardContent>
          </Card>
        </div>

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
                <Button onClick={handleAddExpense} disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Expense"}
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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
            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="space-y-4">
                {expenses.length > 0 ? expenses.map((expense) => {
                    const categoryInfo = getCategoryInfo(expense.category)
                    return (
                    <div key={expense._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${categoryInfo.color}`}></div>
                        <div>
                            <p className="font-medium">{expense.description}</p>
                            <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                        </div>
                        <div className="flex items-center space-x-4">
                        <Badge variant="outline">{categoryInfo.label}</Badge>
                        <span className="font-bold text-lg">${expense.amount.toFixed(2)}</span>
                        </div>
                    </div>
                    )
                }) : (
                  <p className="text-center text-gray-500 py-8">No expenses found. Add one to get started!</p>
                )}
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}