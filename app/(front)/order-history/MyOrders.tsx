'use client'

import { Order } from '@/lib/models/OrderModel'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'

export default function MyOrders() {
  const router = useRouter()
  const [userid, setUserid] = useState('')

  const uuid = localStorage.getItem('id')
  const payload = { id: uuid};
  // Fetch data using useSWR with custom fetch function using Axios
  const { data: orders, error } = useSWR(`/api/orders/mine`, async (url) => {
    try {
      // Make a POST request using Axios with the payload
      const response = await axios.post(url, payload);

      // Return the response data
      return response.data;
    } catch (error) {
      // Handle errors
      console.log('waiting while in err')
      // Now i see that 'throw' throws a  small notification like a pop-up. It throws a pop-up
      // throw new Error('Failed to fetch data');
    }
  });
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const uid = (localStorage.getItem('id'))
    if(uid) {
      setUserid(uid)
    }

    setMounted(true)
  }, [])

  if (!mounted) return <></>

  if (error) return 'Awaiting Data...'
  if (!orders) return 'Loading...'

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order._id}>
              <td>{order._id.substring(20, 24)}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid && order.paidAt
                  ? `${order.paidAt.substring(0, 10)}`
                  : 'not paid'}
              </td>
              <td>
                {order.isDelivered && order.deliveredAt
                  ? `${order.deliveredAt.substring(0, 10)}`
                  : 'not delivered'}
              </td>
              <td>
                <Link href={`/order/${order._id}`} passHref>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}