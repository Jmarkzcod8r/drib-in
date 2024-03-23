import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { auth } from '@/lib/auth'
import StoreModel from '@/lib/models/StoreModel'

export const POST = (async (...request: any) => {

  const [req, { params }] = request

  await dbConnect()
  const payload = await req.json()
  console.log('This is payload', payload)
  // Check the number of existing stores

  const storeCount = await StoreModel.countDocuments({ user: payload.user })
  console.log('this  is storeCount', storeCount)
  // Limit the number of stores to 2
  const storeLimit = 2

  if (storeCount >= storeLimit) {
    // Return an error response if the limit has been reached
    return Response.json({ message: 'Store limit reached. Cannot add more stores.' })
  }



  const newStore = new StoreModel({
    name: payload.name ,
    address: payload.address,
    zip: payload.zip,
    city: payload.city,
    user: payload.user,
    banner: payload.banner
  })
  const createdStore = await newStore.save()
  // const order = await StoreModel.save()
  return Response.json({message: 'Store Created', store: createdStore})
}) as any

export const GET = (async (...request: any) => {
  console.log('--------------getting store details----------------')
  // After console.log (request) and asking chatgpt, this is how to get id
  const { params } = request[1];
    const { id } = params;
    console.log(id);
  // const { storeId } = request.query;
  // console.log(storeId)

  try {
    const [req, { params }] = request

  await dbConnect()
  // const order = await OrderModel.findById(params.id)
  const Storedetails = await StoreModel.find({ user: id })
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
  return Response.json({message: 'Store Created', store: Storedetails})

  } catch (err) {
    console.log('error')
  }

}) as any



