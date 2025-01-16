import { NextRequest, NextResponse } from "next/server"
import dbConnect from "../../../../utils/mongodb"
import User from "../../../../models/user"

export async function GET(req:NextRequest){
    const url  = new URL(req.url)
    const walletPublicAddress = new URLSearchParams(url.searchParams).get('walletPublicAddress')
    await dbConnect()

    try {
        const user = await User.findOne({ walletPublicAddress })

        if(user){
            return NextResponse.json({
                message:'user found',
                status: 200,
                user
            })
        }else {
            return NextResponse.json({
                message : 'user not found',
                status : 500
            })
        }
    } catch (error) {
        console.log('error',error)
    }
}