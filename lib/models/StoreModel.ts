import mongoose from 'mongoose'


export type store = {
  _id: string;
  name: string;
  address: string;
  zip: number
  city: string
  user: string
  banner: string
}

const StoreSchema = new mongoose.Schema(
  {
    name:           { type: String, required: true, unique: true},
    address:         { type: String, required: true},
    zip:            { type: Number, required: true,},
    city:           { type: String, required: true },
    user:           { type: String, required: true },
    banner:           { type: String, required: false },
  },

  // Putting timestamps:true created two additional properties which are:
  // `createdAt` and `updatedAt`
  { timestamps: true }
)

// I think it's a good idea to always puts question mark like below
const StoreModel = mongoose.models?.Store || mongoose.model('Store', StoreSchema)

export default StoreModel