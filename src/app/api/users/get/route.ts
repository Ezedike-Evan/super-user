import { NextResponse } from "next/server"
import dbConnect from "@/utils/mongodb"
import User from "@/models/user"

export async function GET(req:any){
    const url  = new URL(req.url)
    const walletPublicAddress = new URLSearchParams(url.searchParams).get('walletPublicAddress')
    console.log(walletPublicAddress)
    await dbConnect()

    try {
        const user = await User.findOne({ walletPublicAddress })

        if(user){
            return NextResponse.json({
                message:'user found',
                user
            },{ status : 200 })
        }else {
            return NextResponse.json({
                message : 'user not found'
            },{ status : 404 })
        }
    } catch (error) {
        console.log('error',error)
    }
}