import { ActionGetResponse, ACTIONS_CORS_HEADERS } from "@solana/actions";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import Event from "@/models/event";

type Context = { params: { id: string } };

export async function GET(req: NextRequest, res: NextResponse, context: Context) {
  // Log the entire context object to see what it contains
  console.log("Context Params:", context.params);

  const eventId = context.params.id;

  // Check if the eventId is undefined
  if (!eventId || typeof eventId !== "string") {
    console.error("Invalid or missing event ID");
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  try {
    // Connect to MongoDB
    await dbConnect();

    // Fetch the event from the database
    const event = await Event.findOne({ _id: eventId });

    // If no event found, return a 404 error
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Destructure the required fields
    const { name, description } = event;

    // Prepare the response payload
    const payload: ActionGetResponse = {
      type: "action",
      icon: `${new URL(req.url).origin}/logo.jpg`,
      description,
      title: name,
      label: "Sign",
    };

    // Return the response with CORS headers
    return NextResponse.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the event" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request (for CORS pre-flight requests)
export const OPTIONS = GET;
