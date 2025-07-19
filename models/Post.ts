import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        userId: String,
        content: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Post || mongoose.model("Post", PostSchema)
