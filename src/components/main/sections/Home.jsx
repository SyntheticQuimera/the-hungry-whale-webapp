import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoChevronForwardOutline } from "react-icons/io5";
import { HwButton, Carousel } from "../../shared";

export const Home = () => {
  return (
    <div
      className='grid w-full grid-cols-1 gap-2 bg-opacity-25 pt-24 lg:grid-cols-2 xl:h-screen'
      id='home'>
      <div className='z-10 flex-1 flex-col items-start space-y-4 py-2'>
        <p className='text-[3.5rem] font-bold leading-tight tracking-wide text-hoverTextColor xl:text-[4rem] '>
          Expertly crafted dishes for{" "}
          <span className='text-[4rem] leading-tight tracking-wide text-orange-600 xl:text-[4.5rem]'>
            every palate
          </span>
        </p>
        <p className='text-left text-base text-textColor md:w-[90%]'>
          Our passion for food and service shines through in every aspect of our
          restaurant, from the presentation of our dishes to the attentiveness
          of our team. We take great care in ensuring that every dining
          experience at our restaurant is truly memorable. We hope to see you
          soon for a meal that you won't forget.
        </p>
        <div className='flex gap-4'>
          <HwButton
            title='Order now'
            type='solid'
            icon={HiOutlineShoppingBag}
          />
          <HwButton
            title='Reservation'
            type='outline'
            icon={IoChevronForwardOutline}
          />
        </div>
      </div>
      <div className='flex flex-1 justify-center py-12 lg:py-0'>
        <Carousel />
      </div>
    </div>
  );
};
