import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/lib/models/ProductModel";

export async function POST(req: NextRequest) {
  try {
    // Connect to the MongoDB database
    await dbConnect();

    // Extract data from the request body
    const data = await req.json();

    // Insert the data into the database using the Mongoose model
    const newProduct = await ProductModel.create(data);

    // Log the inserted product
    console.log('Inserted product:', newProduct);

    // Respond with a success message
    return NextResponse.json({ success: true , newProduct: newProduct});
  } catch (error) {
    console.error('Error inserting product:', error);
    // Respond with an error message
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  }
}