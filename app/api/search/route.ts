import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import StoreModel from "@/lib/models/StoreModel";

export async function POST(req: NextRequest) {
  try {
    console.log('backend api/search');
    // Connect to the MongoDB database
    await dbConnect();

    // Extract data from the request body
    const { name } = await req.json();
    console.log('Search query:', name);

    // Find the store with the given name (case-insensitive)
    const store = await StoreModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

    if (!store) {
      console.log('Store not found');
      return NextResponse.json({ success: false, message: 'Store not found' });
    }

    console.log('Found store:', store);

    // Respond with the found store
    return NextResponse.json({ success: true, store });
  } catch (error) {
    console.error('Error searching for store:', error);
    // Respond with an error message
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  }
}
