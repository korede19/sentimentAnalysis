import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Feedback from "@/models/feedback";
import { analyzeSentiment } from "@/lib/sentiment";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const data = await request.json();

    if (!data || !data.text || !data.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure sentiment is a number
    const sentiment = analyzeSentiment(data.text);

    console.log("Creating feedback with sentiment:", sentiment); // Debug log

    const feedback = await Feedback.create({
      text: data.text,
      name: data.name,
      sentiment: sentiment, // This should now be a number
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Feedback creation error:", error);
    return NextResponse.json(
      {
        error: "Failed to create feedback",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
