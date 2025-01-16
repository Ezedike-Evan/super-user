import mongoose, { Document, Schema} from 'mongoose'

export interface IEvent extends Document{
    name : string,
    // expirationDate:Date,
    description : string,
}

const EventSchema:Schema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    // expirationDate:{
    //     type : Date,
    //     required : true
    // },
    description:{
        type : String,
        required : true
    }
})

const Event = mongoose.models.event || mongoose.model<IEvent>('event',EventSchema)

export default Event