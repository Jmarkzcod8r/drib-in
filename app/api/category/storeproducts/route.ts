import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log('-------------Getting Store Products----------------');

    await dbConnect();

    try {
        const payload = await req.json();
        const { storeid } = payload;

        // Find the product by its slug
        const products = await ProductModel.find({ storeid});

        if (!products) {
            // If the product with the given slug doesn't exist, return a 404 response
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        console.log('product',products)
        // console.log('product.otherImages',product.otherimages)
        // console.log('product.ame',product.name)
        // // Add the URL to the otherImages array
        // product.otherimages.push(url);

        // // Save the updated product
        // await product.save();

        // Return the updated product along with the success message
        return NextResponse.json({ message: 'Secondary picture added successfully', products });
    } catch (error) {
        // If an error occurs during the process, return a 500 response with the error message
        console.error('Error adding secondary picture:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
