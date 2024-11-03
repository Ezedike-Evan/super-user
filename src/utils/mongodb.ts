import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

const connection: { isConnected?: number } = {}

const dbConnect = async () => {
    if (connection.isConnected) {
        console.log('Connection already established');
        return
    }

    const db = await mongoose.connect(MONGODB_URI)
    console.log('DB connected')

    connection.isConnected = db.connection.readyState
}

export default dbConnect