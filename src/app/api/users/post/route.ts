import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/utils/mongodb"
import User from "@/models/user"

export async function POST(req: NextRequest) {
    // Establish a database connection
    await dbConnect()

    try {
        // Parse the request body
        const { walletPublicAddress, name, email, telegram, discord, twitter } = await req.json()

        // Check if user already exists
        const existingUser = await User.findOne({ walletPublicAddress })

        if (existingUser) {
            return NextResponse.json({ 
                message: "User already exists", user: existingUser,
                status: 200 
            })
        }

        // Create a new user
        const newUser = new User({
            walletPublicAddress,
            name,
            email,
            telegram,
            discord,
            twitter,
        })

        // Save the new user to the database
        await newUser.save()

        return NextResponse.json({
            message: "User created successfully", user: newUser,
            status: 201 
        })
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ 
            message: "Internal Server Error",
            status: 500
        })
    }
}