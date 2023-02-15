import React from "react";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import { useCartData } from "../../../../hooks";

export const Header = () => {
  const { totalQty, subtotalPrice } = useCartData();

  return (
    <div className='fixed z-50 h-16 w-screen border-b border-slate-200 bg-white p-4 px-3 shadow-md shadow-slate-200 sm:p-6 sm:px-16 md:px-10 lg:px-16'>
      <DesktopHeader totalQty={totalQty} subtotalPrice={subtotalPrice} />
      <MobileHeader totalQty={totalQty} subtotalPrice={subtotalPrice} />
    </div>
  );
};
