export const dynamic = "force-dynamic";

import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { auth } from '@/lib/auth'

export const POST = auth(async (req: any) => {
  // if (!req.auth) {
  //   return Response.json(
  //     { message: 'unauthorized' },
  //     {
  //       status: 401,
  //     }
  //   )
  const payload = await req.json()
  console.log('getching')
  // }
  console.log('payload for oders/mine', payload)
  // const { user } = req.auth
  await dbConnect()
  if (payload.id){
    const orders = await OrderModel.find({ user: payload.id })
    return Response.json(orders)
  }


}) as any
