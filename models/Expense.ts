import mongoose from "mongoose"

const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    tripId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["accommodation", "food", "transport", "activities", "shopping", "other"],
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema)
