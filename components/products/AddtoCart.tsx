// 'use client'

// import useCartService from "@/lib/hooks/useCartStore";
// import { OrderItem } from "@/lib/models/OrderModel";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function AddToCart ({item} : {item: OrderItem}) {
//     // const router = useRouter ()
//     const {items, increase} = useCartService()
//     const [existItem , setExistItem] = useState<OrderItem | undefined>()
//     // const [existItem , setExistItem] = useState(item)


//     useEffect(() => {
//         setExistItem(items.find((x) => x.slug === item.slug))
//     }, [item, items])

//     const addToCartHandler = () => {
//       console.log('hi');
//         increase(item)
//     }
//     return existItem ?
//         ( <div>
//       <button className="btn" type="button"
//       // onClick={() => decrease(existItem)}
//       >
//         -
//       </button>
//       <span className="px-2">{existItem.qty}</span>
//       <button className="btn" type="button"
//       // onClick={() => increase(existItem)}
//       >
//         +
//       </button>
//     </div>
//   ):(
//     <button
//       className="btn btn-primary w-full"
//       type="button"
//       onClick={addToCartHandler}
//     >
//       Add to cart
//     </button>
//   )

//     }

'use client'

import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel"; //This is for typescript
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

export default function AddToCart ({item} : {item: OrderItem}) {
  //  const router = useRouter ()
  // items => properties while increase and decrease are functionalities
    const { items, increase , decrease } = useCartService();
    const [existItem , setExistItem] = useState<OrderItem | undefined>();



    const addToCartHandler = () => {
        // console.log('hi');
        increase(item);
    };

    useEffect(() => {
      setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  return existItem ? (
    <div>
      <button className="btn" type="button"
      onClick={() => decrease(existItem)}
      >
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button
      className="btn btn-primary w-full"
      type="button"
      onClick={addToCartHandler}
    >
      Add to cart
    </button>
  )
}