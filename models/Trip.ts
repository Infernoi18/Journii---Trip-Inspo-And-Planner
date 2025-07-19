import mongoose from "mongoose"

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    destinations: [
      {
        type: String,
        required: true,
      },
    ],
    dates: {
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
    budget: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["upcoming", "active", "completed"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Trip || mongoose.model("Trip", TripSchema)
