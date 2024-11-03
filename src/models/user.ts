import mongoose, { Document, Schema} from 'mongoose'

export interface IUser extends Document{
    walletPublicAddress : string,
    name : string,
    email : string,
    telegram : string,
    discord : string,
    twitter : string,
}

const UserSchema:Schema = new mongoose.Schema({
    walletPublicAddress:{
        type : String,
        required : true,
        unique : true
    },
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    telegram:{
        type : String,
        required : true
    },
    discord:{
        type : String,
        required : true
    },
    twitter:{
        type : String,
        required : true
    }
})

const User = mongoose.models.user || mongoose.model<IUser>('user',UserSchema)

export default User