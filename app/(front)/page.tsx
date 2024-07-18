import { Metadata } from 'next'
import Front from './front'

export const metadata: Metadata = {
  title: 'GensanHomeBids',
}
export default function OrderHistory() {

  return (
    <>
      {/* <h1 className="text-2xl py-2">Order History</h1> */}
      <Front />
    </>
  )
}