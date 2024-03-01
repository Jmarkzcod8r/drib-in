import {create} from 'zustand'
import {round2} from '../utils'
import {OrderItem , ShippingAddress} from '../models/OrderModel'
import { persist } from 'zustand/middleware'


// This is the type annotations for Cart properties
type Cart = {
    items: OrderItem[]
    itemsPrice: number
    taxPrice: number
    shippingPrice: number
    totalPrice: number

    paymentMethod: string
    shippingAddress: ShippingAddress
  }

  // This is the initial state of Cart
  const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    paymentMethod: 'PayPal',
    shippingAddress: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  }

  // Using persist means our cart will stay as it is even if we refresh the page
  export const cartStore = create<Cart>()(
    persist(() => initialState, {
      name: 'cartStore',
    })
  )

export default function useCartService() {
    const {items,itemsPrice,taxPrice,shippingPrice,totalPrice,
      paymentMethod,
      shippingAddress,
    } = cartStore()
    return {
      items,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentMethod,
      shippingAddress,

      // This is a function to increase an item
      increase: (item: OrderItem) => {
        const exist = items.find((x) => x.slug === item.slug)
        const updatedCartItems = exist
        // use map function to find that item in the array
          ? items.map((x) =>
              x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
            )
          : [...items, { ...item, qty: 1 }]
        const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
          calcPrice(updatedCartItems)
        cartStore.setState({
          items: updatedCartItems,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        })
      },
      decrease: (item: OrderItem) => {
        const exist = items.find((x) => x.slug === item.slug)
        if (!exist) return
        const updatedCartItems =
          exist.qty === 1
            ? items.filter((x: OrderItem) => x.slug !== item.slug)
            : items.map((x) => (item.slug ? { ...exist, qty: exist.qty - 1 } : x))
        const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
          calcPrice(updatedCartItems)
        cartStore.setState({
          items: updatedCartItems,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        })
      },
      saveShippingAddrress: (shippingAddress: ShippingAddress) => {
        cartStore.setState({
          shippingAddress,
        })
      },
      savePaymentMethod: (paymentMethod: string) => {
        cartStore.setState({
          paymentMethod,
        })
      },
      clear: () => {
        cartStore.setState({
          items: [],
        })
      },
      init: () => cartStore.setState(initialState),
    }
  }

const calcPrice = (items: OrderItem[]) => {
    const itemsPrice = round2(
        items.reduce((acc, item) => acc + item.price * item.qty, 0)
      ),
      shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
      taxPrice = round2(Number(0.15 * itemsPrice)),
      totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
    return { itemsPrice, shippingPrice, taxPrice, totalPrice }
  }