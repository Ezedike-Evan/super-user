import { NextRequest, NextResponse } from "next/server"
import dbConnect from "../../../../utils/mongodb"
import Event from "../../../../models/event"

export async function POST(req: NextRequest) {
    // Establish a database connection
    await dbConnect()

    try {
        // Parse the request body
        const { description, name } = await req.json()

        // Check if event already exists
        const existingEvent = await Event.findOne({ name })

        if (existingEvent) {
            return NextResponse.json({ 
                message: "Event already exists", 
                event: existingEvent,
                status: 300 
            })
        }

        // Create a new event
        const newEvent = new Event({
            name,
            description,
        })

        // Save the new event to the database
        await newEvent.save()

        return NextResponse.json({
            message: "Event created successfully", 
            event : newEvent,
            status: 200
        })
    } catch (error) {
        console.error("Error creating event: ", error);
        return NextResponse.json({ 
            message: "Internal Server Error",
            status: 500
        })
    }
}