import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log('-------------Deleting Producs----------------');

    const payload = await req.json()

    console.log('payload', payload)
    await dbConnect();
    const product = await ProductModel.findOneAndDelete({ slug: payload.slug });

    if (!product) {
        // If the product with the given slug doesn't exist, return a 404 response
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Delete the product
    // await ProductModel.deleteOne({ slug });

    return NextResponse.json({messasge:'Product deleted', product})

}
