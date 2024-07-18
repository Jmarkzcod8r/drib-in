import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import CommentModel from "@/lib/models/CommentModels";

export async function POST(req: NextRequest) {
  try {
    // Connect to the MongoDB database
    await dbConnect();

    // Extract data from the request body
    const data = await req.json();

    // Insert the data into the database using the Mongoose model
    const newComment = await CommentModel.create(data);

    // Log the inserted product
    console.log('Inserted product:', newComment);

    // Respond with a success message
    return NextResponse.json({ success: true , newComment: newComment});
  } catch (error) {
    console.error('Error inserting product:', error);
    // Respond with an error message
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  }
}