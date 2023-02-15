import { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";

export const useCartData = () => {
  const [{ cart }, dispatch] = useStateValue();
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  const calculateSubtotal = (cart) => {
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      let itemPrice = 0;
      if (item.newPrice) {
        itemPrice = item.newPrice;
      } else if (item.price) {
        itemPrice = item.price;
      }
      subtotal += itemPrice;
    }
    return Math.ceil(subtotal * 100) / 100;
  };

  const calculateQty = (cart) => {
    let qty = 0;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      if (item.qty) {
        qty += item.qty;
      }
    }
    return qty;
  };

  useEffect(() => {
    setSubtotalPrice(calculateSubtotal(cart));
    setTotalQty(calculateQty(cart));
  }, [cart]);

  return {
    subtotalPrice,
    totalQty,
  };
};
