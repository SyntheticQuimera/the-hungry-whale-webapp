import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { actionType } from "../../../context/reducer";
import { useStateValue } from "../../../context/StateProvider";
import { useAuth } from "../../../hooks";
import { HwButton, CartItem, CircleButton } from "../../shared";

export const Cart = () => {
  const [{ cartOpen, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const { login } = useAuth();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SWITCH,
      cartOpen: !cartOpen,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className='fixed top-0 right-0 z-[101] flex h-screen w-full flex-col bg-slate-100 bg-opacity-60 drop-shadow-md backdrop-blur-md md:w-375'>
      <div className='flex h-16 w-full cursor-pointer items-center justify-between p-4'>
        <CircleButton type='arrowLeft' onClick={showCart} />
        <CircleButton type='delete' onClick={clearCart} />
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div className='flex h-full w-full flex-col'>
          <div className='md:h-42 flex h-340 w-full flex-col gap-3 overflow-y-scroll px-6 py-6 scrollbar-none'>
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>
          {/* Total */}
          <div className='flex w-full flex-1 flex-col items-center justify-evenly rounded-t-2xl border-t bg-white px-8 py-2'>
            <div className='flex w-full items-center justify-between'>
              <p className='text-lg text-textColor'>Sub Total</p>
              <p className='text-lg text-textColor'>${tot}</p>
            </div>
            <div className='flex w-full items-center justify-between'>
              <p className='text-lg text-textColor'>Delivery</p>
              <p className='text-lg text-textColor'>$2.5</p>
            </div>
            <div className='my-2 w-full border-b ' />

            <div className='flex w-full items-center justify-between'>
              <p className='text-lg text-hoverTextColor'>Total</p>
              <p className='text-lg text-hoverTextColor'>${tot + 2.5}</p>
            </div>

            {user ? (
              <HwButton title='Check Out' type='solidFull' />
            ) : (
              <HwButton title='Login' type='solidFull' onClick={login} />
            )}
          </div>
        </div>
      ) : (
        <div className='flex h-full w-full items-center justify-center px-6'>
          <div className='flex rounded-xl border-4 border-dashed border-lightText p-6 text-center sm:p-6'>
            <p className='text-3xl text-lightText'>
              Add some items to your cart
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
