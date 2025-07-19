import mongoose from "mongoose"

const DestinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["restaurant", "cafe", "attraction", "park", "hotel", "other"],
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    image: {
      type: String,
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Destination || mongoose.model("Destination", DestinationSchema)
