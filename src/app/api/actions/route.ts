import { ActionGetResponse, ACTIONS_CORS_HEADERS } from "@solana/actions"

export async function GET( req : Request ){
    const res : ActionGetResponse = {
        type: "action",
        icon : `${new URL(req.url).origin}/logo.jpg`,
        description : 'This is the description of the blinks',
        title : 'This is the title of the blinks',
        label : 'Clickie'
    }
    return Response.json(res, {headers: ACTIONS_CORS_HEADERS })
}

export const OPTIONS = GET;

// export async function POST(req : Request) {
//     const res : ActionPostResponse = {
//         transaction : "",
//         message : 'This blinks is not implemented yet'
//     }
//     return Response.json(res)
// }