import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { auth } from '@/lib/auth'
import StoreModel from '@/lib/models/StoreModel'
import ProductModel from '@/lib/models/ProductModel'

export const DELETE = (async (...request: any) => {
    console.log('--------------Deleting for a store----------------')
    // After console.log (request) and asking chatgpt, this is how to get id
    const {req,  params } = request[1];
    console.log(`req`, request)
      // const payload = await req.json()
      // console.log(`payload`, payload)
      console.log(`params`, params)
      const { id } = params;
      console.log(id);
    // const { storeId } = request.query;
    // console.log(storeId)

    try {
        const [req, { params }] = request;

        await dbConnect();

        // Find the store by its _id and delete it
        // const deletedStore = await StoreModel.findByIdAndDelete(params.id);
        const deletedStore = await StoreModel.findOneAndDelete({ name:id });
        const deletedProducts = await ProductModel.deleteMany({ store:id });

        if (!deletedStore) {
          // If the store with the given _id doesn't exist, return a 404 response
          return Response.json({ message: 'Store not found'} );
        }

        // If the store is successfully deleted, return a success response
        return Response.json({ message: 'Store deleted successfully', deletedStore: deletedStore, deletedProducts: deletedProducts });

      } catch (err) {
        // If an error occurs during the deletion process, return a 500 response with the error message
        return Response.json({ message: err });
      }

  }) as any