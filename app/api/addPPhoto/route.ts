
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from 'next';
import ProductModel from "@/lib/models/ProductModel";

// import { MongoClient} from "mongodb"
// import { Getuserinfo } from "../../../functions global/Getuserinfo";
import { useEffect } from "react";
import mongoose from "mongoose";
// import Credemail from "../mongodb/Credemail";

import { NextResponse , NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  const data = await req.json()

  try {
    console.log('Received data', data);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err)
  }
}



// Oh so, I see the name isn't necessarily have to be 'index'
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log(`req mthod`, req.method)
//   const { method } = req;
// //   const {name} = req.body;
//   switch (method) {

//     case "POST": //---> when 'axios.post' is called in our frontend, the system
//     // goes to this .. POST & CREATE ... IF-THROW

//       try {
//         const { name } = req.body;
//         console.log('req.body.name',name)
//         dbConnect(); //---> This setups the database for this page.
//         // const {name } = req.body;

// //         await dbConnect()
// //   // await UserModel.deleteMany()
// //   // await UserModel.insertMany(users)

//         // await ProductModel.deleteMany()
//         // await ProductModel.insertMany(products)

//         // const Clientnew =
//         //       mongoose.models.log
//         //     || mongoose.model(log, ClientSchema);
//         // new Clientnew({log}).save()
//         // await
//         // new ModelFeed({feedback,date, credemail }).save();
//         // calling res gives a response to the screen.
//         // await Client.save()
//         // if (feedback){
//         //   var status = 'Your feedback have been accounted for. Thank You!';
//         // } else {
//         //   var status = 'Uh-Oh. Something seems to be wrong. Try again later.'
//         // }




//         res.status(200).json({success:true, body:req.body , status})
//       } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, error });
//       };
//       // await Client.create({ 'name':'bbbbbccctestname' });
//       break;
//   };


// }
