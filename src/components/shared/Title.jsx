import React from "react";

export const Title = ({ title }) => {
  return (
    <div className='mb-6 mt-20 flex w-full flex-col items-center gap-4 '>
      <p className='w-full text-2xl font-semibold text-hoverTextColor'>
        {title}
      </p>
      <div className='w-full border-b' />
    </div>
  );
};
