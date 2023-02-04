import React from "react";
import { motion } from "framer-motion";
import { BiEditAlt, BiCheck, BiX } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import {
  HiOutlineShoppingBag,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { IoMdArrowBack } from "react-icons/io";

export const HwButton = ({ type, icon: Icon, onClick, title }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
      ${type === "solid" ? " bg-lime-500 text-white sm:w-auto" : ""}
      ${
        type === "outline"
          ? " border-2 border-lime-500 bg-gradient-to-r text-lime-500 sm:w-auto"
          : ""
      }
      ${type === "solidFull" ? " bg-lime-500 text-white" : ""}
      ${
        type === "outlineFull"
          ? " border-2 border-lime-500 bg-gradient-to-r text-lime-500"
          : ""
      }
      w-full rounded-lg px-4 py-3 text-base font-normal  outline-none hover:brightness-110
    `}>
      <div
        className={`flex h-full w-full items-center  ${
          Icon ? "justify-between gap-4" : "justify-center"
        }`}>
        <p>{title}</p>
        {Icon && <Icon className='text-xl' />}
      </div>
    </motion.button>
  );
};

export const CircleButton = ({ type, onClick, className }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className={`${
        type === "buy" || type === "check"
          ? "bg-lime-500"
          : type === "delete" || type === "cancel"
          ? "bg-red-500"
          : type === "edit"
          ? "bg-orange-500"
          : type === "chevronLeft" ||
            type === "chevronRight" ||
            type === "arrowLeft"
          ? "bg-white"
          : ""
      } ${className} ${
        type === "chevronLeft" ||
        type === "chevronRight" ||
        type === "arrowLeft"
          ? "hover:bg-slate-100"
          : "hover:brightness-110"
      } flex h-10 w-10 items-center justify-center rounded-full shadow-md shadow-slate-200`}
      onClick={onClick}>
      {type === "check" ? (
        <BiCheck className='text-xl text-white' />
      ) : type === "edit" ? (
        <BiEditAlt className='text-xl text-white' />
      ) : type === "delete" ? (
        <IoTrashOutline className='text-xl text-white' />
      ) : type === "buy" ? (
        <HiOutlineShoppingBag className='text-xl text-white' />
      ) : type === "cancel" ? (
        <BiX className='text-xl text-white' />
      ) : type === "chevronLeft" ? (
        <HiChevronLeft className='text-xl text-hoverTextColor' />
      ) : type === "chevronRight" ? (
        <HiChevronRight className='text-xl text-hoverTextColor' />
      ) : type === "arrowLeft" ? (
        <IoMdArrowBack className='text-xl text-hoverTextColor' />
      ) : (
        ""
      )}
    </motion.button>
  );
};
