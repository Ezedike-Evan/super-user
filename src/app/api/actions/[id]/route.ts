import { ActionGetResponse, ACTIONS_CORS_HEADERS } from "@solana/actions"
import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/utils/mongodb"
import Event from "@/models/event"

type Context = { params: {  id: string; } }

export const GET = async (
	req: NextRequest,
	res: NextResponse,
	context: Context,
) {
    const eventId = context.params.id;
    
    await dbConnect()
    const event = await Event.findOne({ _id:eventId })
    const {name , description } = event

    const payload : ActionGetResponse = {
        type: "action",
        icon : `${new URL(req.url).origin}/logo.jpg`,
        description,
        title : name,
        label : 'Sign'
    }
    return Response.json(payload, {headers: ACTIONS_CORS_HEADERS })
}

export const OPTIONS = GET;
