import mongoose from 'mongoose'


export type comment = {
  _id: string;
  comment: string;

  user: string;
  rating?: number;
  target: string;
  targetid: string;
  pics?: string[];
}

const CommentSchema = new mongoose.Schema(
  {
    // name:           { type: String, required: true, unique: true},
    comment:           { type: String, required: true},
    rating:         {type: Number, required: false},
    user:           { type: String, required: true }, // This is like a primary key since this a unique identifier
    target:       {type: String, required: true}, // This is either a store or a product
    targetid:      {type: String, required: true },
    pics:         [  {type: String, required: false} ]
    // Below properties added on Jul. 16, 2024

  },

  // Putting timestamps:true created two additional properties which are:
  // `createdAt` and `updatedAt`
  { timestamps: true }
)

// I think it's a good idea to always puts question mark like below
const CommentModel = mongoose.models?.Comment || mongoose.model('Comment', CommentSchema)

export default CommentModel