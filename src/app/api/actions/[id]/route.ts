import { ActionGetResponse, ACTIONS_CORS_HEADERS } from "@solana/actions"
import { NextRequest } from "next/server"
import dbConnect from "@/utils/mongodb"
import Event from "@/models/event"

export async function GET(
	req: NextRequest,
	context: { params: { id: String } }
) {
    const eventId = context.params.id;
    
    await dbConnect()
    const event = await Event.findOne({ _id:eventId })
    const {name , description } = event

    const res : ActionGetResponse = {
        type: "action",
        icon : `${new URL(req.url).origin}/logo.jpg`,
        description,
        title : name,
        label : 'Sign'
    }
    return Response.json(res, {headers: ACTIONS_CORS_HEADERS })
}

export const OPTIONS = GET;
