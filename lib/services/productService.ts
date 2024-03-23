import { cache } from 'react'
import dbConnect from '@/lib/dbConnect'
import ProductModel, { Product } from '@/lib/models/ProductModel'

export const revalidate = 3600



const getLatest = cache(async (limit?: number) => {
  await dbConnect()

  let products: Product[];

  if (limit !== undefined) {
    products = await ProductModel.find({ name: { $regex: /^sample/i } }).sort({ _id: -1 }).limit(limit).lean();
} else {
    products = await ProductModel.find({ name: { $regex: /^sample/i } }).sort({ _id: -1 }).lean();
}


  return products;
}) as (limit?: number) => Promise<Product[]>;

const getFeatured = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({ isFeatured: true }).limit(3).lean()
  return products as Product[]
})

const getBySlug = cache(async (slug: string) => {
  await dbConnect()
  const product = await ProductModel.findOne({ slug }).lean()
  return product as Product
})

const productService = {
    getLatest,
    getFeatured,
    getBySlug,
    // getByQuery,
    // getCategories,
  }
  export default productService