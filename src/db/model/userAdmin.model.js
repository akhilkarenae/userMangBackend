import mongoose from 'mongoose';

const UserAdminSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName:  { type: String },
  email: { type: String }
},{timestamps:true});

export const UserAdminModel = mongoose.model("userAdmin", UserAdminSchema);