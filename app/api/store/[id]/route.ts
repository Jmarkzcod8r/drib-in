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
    banner: payload.banner,
    category: payload.category,

    facebook: payload.facebook,
    instagram: payload.instagram,
    phone: payload.phone,
    telephone: payload.telephone,
    email: payload.email



  })
  const createdStore = await newStore.save()
  // const order = await StoreModel.save()
  return Response.json({message: 'Store Created', store: createdStore})
}) as any

//




  export const GET = (async (...request: any) => {
    console.log('--------------getting store details----------------');

    const [req] = request;

    await dbConnect(); // Logs 'connect to MongoDB'

    const payload = await req.json().catch(() => null); // Get payload if available
    let Storedetails;

    const { params } = request[1];
    const id = payload?.id || params.id; // Get id from payload or params

    console.log('ID:', id);

    if (payload) {
      // If there is a payload, find by store ID
      Storedetails = await StoreModel.find({ _id: id });
      return Response.json({ message: 'Store Details Retrieved', store: Storedetails });
    } else {
      // If no payload, find by user ID
      Storedetails = await StoreModel.find({ user: id });
      return Response.json({ message: 'Store Lists Retrieved', store: Storedetails });
    }
  }) as any;


