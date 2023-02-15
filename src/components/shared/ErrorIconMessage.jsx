import React, { useState } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";

export const ErrorIconMessage = ({ msg }) => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className='flex items-center justify-end px-3'>
      {showMessage && (
        <p className='absolute -translate-x-3 -translate-y-6 rounded-lg rounded-br-none bg-red-500 px-2 py-1 text-xs text-white'>
          {msg}
        </p>
      )}
      <BsFillExclamationCircleFill
        className='text-md text-red-500'
        onMouseEnter={() => setShowMessage(true)}
        onFocus={() => setShowMessage(true)}
        onClick={() => setShowMessage(true)}
        onMouseLeave={() => setShowMessage(false)}
        onBlur={() => setShowMessage(false)}
      />
    </div>
  );
};
