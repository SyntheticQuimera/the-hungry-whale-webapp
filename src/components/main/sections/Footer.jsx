import React from "react";
import { useStateValue } from "../../../context/StateProvider";
import { HwButton } from "../../shared/Buttons";

export const Footer = () => {
  const [{ settings }] = useStateValue();
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className='static mt-16 border-t bg-white p-4 lg:px-10'>
      <div className='container mx-auto flex flex-col items-center lg:flex-row lg:justify-between'>
        <div className='flex flex-col items-center lg:flex-row lg:gap-8'>
          {settings && (
            <img src={settings.logo} alt='Logo' className='mb-4 h-8 lg:mb-0' />
          )}
          <div className='mb-4 flex flex-col gap-2 text-center lg:mb-0 lg:flex-row lg:gap-6'>
            <p className='text-textColor'>P. Sherman, 42 Wallaby Way, Sydney</p>
            <p className='text-textColor'>Phone: +1-000-000-0000</p>
          </div>
        </div>
        <HwButton title='Back to top' type='solid' onClick={handleClick} />
      </div>
    </footer>
  );
};
