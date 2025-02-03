import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

const bugSchema = new mongoose.Schema({
  projectName: {
    type: String,
  },
  platform: {
    type: String,
  },
  bugName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Low",
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved", "Closed"],
    default: "Open",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  comments: [commentSchema],
  attachments: [
    {
      filename: String,
      filepath: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Bug", bugSchema);
