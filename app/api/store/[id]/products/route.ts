import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { auth } from '@/lib/auth'
import StoreModel from '@/lib/models/StoreModel'
import ProductModel from '@/lib/models/ProductModel'

export const GET = (async (...request: any) => {
    console.log('------starting api/store/[id]/products----------------')
    // After console.log (request) and asking chatgpt, this is how to get id
    const { params } = request[1];
      const { id } = params;
      console.log(`req.id`,id);
    // const { storeId } = request.query;
    // console.log(storeId)

    try {
      const [req, { params }] = request

    await dbConnect()
    // const order = await OrderModel.findById(params.id)
    const Products = await ProductModel.find({ store: id })
    // const payload = await req.json()
    // console.log('This is payload', payload)
    // const newStore = new StoreModel({
    //   name: payload.name ,
    //   address: payload.address,
    //   zip: payload.zip,
    //   city: payload.city,
    //   user: payload.user
    // })
    // const createdStore = await newStore.save()
    // // const order = await StoreModel.save()
    return Response.json({message: 'Store Created', products: Products})

    } catch (err) {
      console.log('error')
    }

  }) as any



