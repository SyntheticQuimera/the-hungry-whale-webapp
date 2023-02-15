import React from "react";
import { motion } from "framer-motion";
import { actionType } from "../../../context/reducer";
import { useStateValue } from "../../../context/StateProvider";
import { useAuth, useCartData } from "../../../hooks";
import { HwButton, CartItem, CircleButton } from "../../shared";

export const Cart = () => {
  const [{ cartOpen, cart, user }, dispatch] = useStateValue();
  const { login } = useAuth();
  const { subtotalPrice } = useCartData();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SWITCH,
      cartOpen: !cartOpen,
    });
  };

  const clearCart = () => {
    dispatch({
      type: actionType.SET_EMPTY_CART,
    });
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
      {cart && cart.length > 0 ? (
        <div className='flex h-full w-full flex-col'>
          <div className='md:h-42 flex h-340 w-full flex-col gap-3 overflow-y-scroll px-6 py-6 scrollbar-none'>
            {cart &&
              cart.length > 0 &&
              cart.map((item) => <CartItem key={item.id} item={item} />)}
          </div>
          {/* Total */}
          <div className='flex w-full flex-1 flex-col items-center justify-evenly rounded-t-2xl border-t bg-white px-8 py-2'>
            <div className='flex w-full items-center justify-between'>
              <p className='text-lg text-textColor'>Sub Total</p>
              <p className='text-lg text-textColor'>${subtotalPrice}</p>
            </div>
            <div className='flex w-full items-center justify-between'>
              <p className='text-lg text-textColor'>Delivery</p>
              <p className='text-lg text-textColor'>$2.50</p>
            </div>
            <div className='my-2 w-full border-b ' />

            <div className='flex w-full items-center justify-between'>
              <p className='text-lg text-hoverTextColor'>Total</p>
              <p className='text-lg text-hoverTextColor'>
                ${(subtotalPrice + 2.5).toFixed(1)}0
              </p>
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
