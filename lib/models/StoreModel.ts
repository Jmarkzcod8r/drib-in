import mongoose from 'mongoose'


export type store = {
  _id: string;
  name: string;
  address?: string;
  zip: number
  city: string
  user: string
  banner?: string
  category: string
  storeprofilepic?: string

  facebook?: string
  instagram?: string
  phone?: number
  telephone?: number
  email?: string

  connect?: string []
}

const StoreSchema = new mongoose.Schema(
  {
    // name:           { type: String, required: true, unique: true},
    name:           { type: String, required: true},
    address:         { type: String, required: false},
    zip:            { type: Number, required: true, default: 9500},
    city:           { type: String, required: true , default: 'Gensan' },
    user:           { type: String, required: true }, // This is like a primary key since this a unique identifier
    banner:           { type: String, required: false },
    // Below properties added on Jul. 16, 2024
    category:       { type: String, required: true },
    storeprofilepic: { type: String, required: true, default: 'profpic'},

    facebook:       { type: String, required: false },
    instagram:       { type: String, required: false },
    phone:       { type: Number, required: false},
    telephone:       { type: Number, required: false},
    email:       { type: String, required: false},

    connect:         [{ type: String, required: false }],
  },

  // Putting timestamps:true created two additional properties which are:
  // `createdAt` and `updatedAt`
  { timestamps: true }
)

// I think it's a good idea to always puts question mark like below
const StoreModel = mongoose.models?.Store || mongoose.model('Store', StoreSchema)

export default StoreModel