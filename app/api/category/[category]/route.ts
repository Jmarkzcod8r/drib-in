import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import StoreModel from '@/lib/models/StoreModel'
import { auth } from '@/lib/auth'

export const POST = (async (req, { params }) => {
  await dbConnect(); // Connect to the database

  const payload = await req.json(); // Extract the payload from the request
  console.log('This is payload', payload);

  const category = payload.category; // Get the category from the payload

  try {
    // Find stores with the same category
    const storeDetails = await StoreModel.find({ category });

    if (!storeDetails.length) {
      return new Response(JSON.stringify({ message: 'No stores found in this category' }), { status: 404 });
    }

    // Continue with further processing or return the store details
    return new Response(JSON.stringify({ message: 'Stores Retrieved', stores: storeDetails }), { status: 200 });

  } catch (error) {
    console.error('Error fetching store details:', error);
    return new Response(JSON.stringify({ message: 'Error retrieving store details' }), { status: 500 });
  }
}) as any;
