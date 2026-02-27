import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    interviewer: { type: String, required: true },
    status: { type: String, default: "Upcoming" },
    feedback: { type: String },
    score: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);