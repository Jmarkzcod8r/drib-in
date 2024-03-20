import mongoose from 'mongoose'


// This is for Mongodb
const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      // To satify the unique:true of slug, we can use timestamp or uuid or the uniqueness of another property
      // like an email
      slug: { type: String, required: true, unique: true },
      category: { type: String, required: true },
      image: { type: String, required: true },
      otherimages: [{ type: String, required: false }], //-> This makes it an array of strings
      price: { type: Number, required: true },
      brand: { type: String, required: true },
      rating: { type: Number, required: true, default: 0 },
      numReviews: { type: Number, required: true, default: 0 },
      countInStock: { type: Number, required: true, default: 0 },
      description: { type: String, required: true },
      isFeatured: { type: Boolean, default: false },
      banner: String,
    },
    {
      timestamps: true,
    }
  )

  const ProductModel =
  mongoose.models.Product || mongoose.model('Product', productSchema)

  export default ProductModel


//The `?` make the property optional
// This is for TypeScript
export type Product = {

    _id?: string
    name: string
    slug: string
    image: string   // This is a url on most part
    otherimages?: string[] // The question mark `?` makes a property optional
    banner?: string
    price: number
    brand: string
    description: string
    category: string
    rating: number    //dedfault 0
    numReviews: number  //default 0
    countInStock: number  //default 0
    colors?: []
    sizes?: []
}