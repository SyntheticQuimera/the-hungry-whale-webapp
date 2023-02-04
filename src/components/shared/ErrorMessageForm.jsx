import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

export const ErrorMessageForm = (msg) => {
  return (
    <div className='flex w-full items-center justify-start gap-2 text-sm text-red-500'>
      <FaExclamationCircle className='text-md' />
      {msg}
    </div>
  );
};
