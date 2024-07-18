import { Metadata } from 'next'
import ShowAllProducts from '../allProducts'
import productService from '@/lib/services/productService'
// import Form from './Form'

export const metadata: Metadata = {
  title: 'Register',
}

export default async function Bakery() {

  const allProducts = await productService.getAll()

  const bakeries = [
    { name: 'Eps corner' },
    { name: 'mine' }
  ]



  return (
    <div>
      <div className='flex w-full flex-row '>

        <div className='w-[15em] bg-slate-500 m-2'>
          <div>
            <h2>Stores</h2>
            {bakeries.map((bake, index) => (
              <h2 key={index}>&nbsp; &nbsp; &nbsp; {bake.name}</h2>
            ))}
          </div>

        </div>

        <div className='bg-pink-800 w-full m-2'><h2>Products</h2>
              <ShowAllProducts allProducts={allProducts} />
        </div>

      </div>
    </div>
  )
}
