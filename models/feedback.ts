// models/feedback.ts
import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  text: { type: String, required: true },
  name: { type: String, required: true },
  sentiment: { type: Number, required: true }, // Ensure this is Number type
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
