import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { BsDashCircle, BsPlusCircleFill } from "react-icons/bs";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

export const CartItem = ({ item }) => {
  const [{ cart }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (item && item.file) {
      setIsLoading(true);
      const image = new Image();
      image.src = item.file;
      image.onload = () => {
        setIsLoading(false);
      };
    }
  }, []);

  const handleIncrement = () => {
    dispatch({
      type: actionType.SET_INCREMENT_ITEM_CART,
      cart: item,
    });
  };

  const handleDecrement = () => {
    dispatch({
      type: actionType.SET_DECREMENT_ITEM_CART,
      cart: item,
    });
  };
  console.log(cart);

  return (
    <div className='flex w-full items-center gap-2 rounded-lg bg-white p-2 px-2 shadow-sm shadow-slate-200'>
      {isLoading ? (
        <div className='flex h-20 max-h-[60px] w-20 max-w-[60px] items-center justify-center'>
          <BeatLoader size={10} color={"#ffa801"} loading={isLoading} />
        </div>
      ) : (
        <img
          src={item.file}
          alt={item.title}
          className='relative h-20 max-h-[60px] w-20 max-w-[60px] rounded-md object-cover'
        />
      )}
      {/* Name */}
      <div className='flex flex-col'>
        <p className='text-sm text-textColor'>{item.title}</p>
        <p className='block text-sm text-lightText'>
          ${item.newPrice ? item.newPrice : item.price}
        </p>
      </div>

      {/* button */}
      <div className='group ml-auto flex cursor-pointer items-center justify-end gap-2'>
        <motion.div whileTap={{ scale: 0.8 }} onClick={handleDecrement}>
          <BsDashCircle className='text-lg text-lime-500 duration-100' />
        </motion.div>
        <p className='w-6 text-center text-textColor '>{item.qty}</p>
        <motion.div whileTap={{ scale: 0.8 }} onClick={handleIncrement}>
          <BsPlusCircleFill className='text-lg text-lime-500 duration-100' />
        </motion.div>
      </div>
    </div>
  );
};
