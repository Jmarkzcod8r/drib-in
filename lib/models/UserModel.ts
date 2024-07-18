import mongoose from 'mongoose'

export type user = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  profilepic?: string; // I think it's best to put '?' when required is false
  verified: boolean;
}

const UserSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, },
    email:      { type: String, required: true, unique: true,}, // This is a primary key since this is unique
    password:   { type: String, required: true,},
    isAdmin:    { type: Boolean, required: true, default: false },
    // Below properties added on Jul. 16, 2024
    profilepic: { type: String, required: false, },
    verified:   { type: Boolean, required: true, default: false },


  },
  { timestamps: true }
)

// I think it's a good idea to always puts question mark like below
const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema)

export default UserModel