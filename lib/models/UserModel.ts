import mongoose from 'mongoose'

export type user = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean
}

const UserSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, },
    email:      { type: String, required: true, unique: true,},
    password:   { type: String, required: true,},
    isAdmin:    { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

// I think it's a good idea to always puts question mark like below
const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema)

export default UserModel