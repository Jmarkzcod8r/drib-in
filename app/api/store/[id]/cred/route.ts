
export const POST = (async (...request: any) => {
    console.log('---initializing api//store/${name}/cred')

    // const [req, { params }] = request

    // await dbConnect()
    // const payload = await req.json()
    // console.log('This is payload', payload)
    // // Check the number of existing stores

    // const storeCount = await StoreModel.countDocuments({ user: payload.user })
    // console.log('this  is storeCount', storeCount)
    // // Limit the number of stores to 2
    // const storeLimit = 2

    // if (storeCount >= storeLimit) {
    //   // Return an error response if the limit has been reached
    //   return Response.json({ message: 'Store limit reached. Cannot add more stores.' })
    // }



    // const newStore = new StoreModel({
    //   name: payload.name ,
    //   address: payload.address,
    //   zip: payload.zip,
    //   city: payload.city,
    //   user: payload.user,
    //   banner: payload.banner
    // })
    // const createdStore = await newStore.save()
    // // const order = await StoreModel.save()
    return Response.json({message: 'Store Credentials'})
  }) as any