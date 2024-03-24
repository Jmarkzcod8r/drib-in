// pages/api/shorten.js

import dbConnect from '@/lib/dbConnect';
import Url from '@/lib/models/UrlModel';
import { NextRequest, NextResponse } from 'next/server';
import shortid from 'shortid';

dbConnect();

export const POST = (async (...request: any) => {

    const [req, { params }] = request
    console.log('method',req.method)
    console.log('body',req.body)
    console.log('params', params)
    // console.log('payload', await req.json())
    const payload = await req.json()


    console.log('initializing api/url-short')

    const shortUrl = shortid.generate();
        const newUrl = new Url({
        originalUrl: payload.originalUrl,
        shortUrl: shortUrl
        });
    const url = await newUrl.save();



    return Response.json ({message:'hi', data: url})


}
    // if (req.method === 'POST') {
    //     //     const { originalUrl } = req.body;
    //     //     if (!originalUrl) {
    //     //       return res.status(400).json({ error: 'Original URL is required' });
    //     //     }

    //     //     try {
    //     //       let url = await Url.findOne({ originalUrl });
    //     //       if (url) {
    //     //         return res.json(url);
    //     //       }

    //     //       const shortUrl = shortid.generate();
    //     //       const newUrl = new Url({
    //     //         originalUrl,
    //     //         shortUrl
    //     //       });
    //     //       url = await newUrl.save();
    //     //       res.json(url);
    //     //     } catch (error) {
    //     //       console.error(error);
    //     //       res.status(500).json({ error: 'Server error' });
    //     //     }
    //     //   } else {
    //     //     res.status(405).json({ error: 'Method not allowed' });
    //     //   }
    //     // }



)


// export default async function handler(req: NextRequest, res: NextResponse) {
//     console.log('initializing api/url-short')
//   if (req.method === 'POST') {
//     const { originalUrl } = req.body;
//     if (!originalUrl) {
//       return res.status(400).json({ error: 'Original URL is required' });
//     }

//     try {
//       let url = await Url.findOne({ originalUrl });
//       if (url) {
//         return res.json(url);
//       }

//       const shortUrl = shortid.generate();
//       const newUrl = new Url({
//         originalUrl,
//         shortUrl
//       });
//       url = await newUrl.save();
//       res.json(url);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }
