import React from "react";
import { motion } from "framer-motion";
import {
  BsArrowLeft,
  BsCart2,
  BsPencil,
  BsChevronLeft,
  BsChevronRight,
  BsCheck2,
  BsTrash,
  BsX,
} from "react-icons/bs";

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
      w-full rounded-lg px-4 py-2 text-base font-normal  outline-none hover:brightness-110
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
        <BsCheck2 className='text-xl text-white' />
      ) : type === "edit" ? (
        <BsPencil className='text-xl text-white' />
      ) : type === "delete" ? (
        <BsTrash className='text-xl text-white' />
      ) : type === "buy" ? (
        <BsCart2 className='text-xl text-white' />
      ) : type === "cancel" ? (
        <BsX className='text-xl text-white' />
      ) : type === "chevronLeft" ? (
        <BsChevronLeft className='text-xl text-hoverTextColor' />
      ) : type === "chevronRight" ? (
        <BsChevronRight className='text-xl text-hoverTextColor' />
      ) : type === "arrowLeft" ? (
        <BsArrowLeft className='text-xl text-hoverTextColor' />
      ) : (
        ""
      )}
    </motion.button>
  );
};
