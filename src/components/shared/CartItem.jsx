import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { HiOutlineMinusCircle, HiPlusCircle } from "react-icons/hi2";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

let items = [];

export const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);

  const [qty, setQty] = useState(item.qty);

  useEffect(() => {
    if (item && item.file) {
      setIsLoading(true);
      const image = new Image();
      image.src = item.file;
      image.onload = () => {
        setIsLoading(false);
      };
    }
  }, [item]);

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      if (qty == 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

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
          ${parseFloat(item.price) * qty}
        </p>
      </div>

      {/* button */}
      <div className='group ml-auto flex cursor-pointer items-center gap-2'>
        <motion.div
          whileTap={{ scale: 0.8 }}
          onClick={() => updateQty("remove", item?.id)}>
          <HiOutlineMinusCircle className='text-[22px] text-lime-500 duration-100' />
        </motion.div>
        <p className='text-textColor'>{qty}</p>
        <motion.div
          whileTap={{ scale: 0.8 }}
          onClick={() => updateQty("add", item?.id)}>
          <HiPlusCircle className='text-[22px] text-lime-500 duration-100' />
        </motion.div>
      </div>
    </div>
  );
};
