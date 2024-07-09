import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    email: {type: String, trim: true, required: true, unique: true },
    fullName: { type: String, trim: true },
    phoneNumber: { type: String },
    createdByEmail:{ type: String },
    myFriends: [{name:{type:String}}],
    createdAt: { type: Date },
    modifiedAt: { type: Date },
    modifiedBy: { type: String }
},{ timestamps: true })

export const UserModel = mongoose.model("user", UserSchema);