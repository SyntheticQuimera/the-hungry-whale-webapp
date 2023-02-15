import React from "react";
import { BsCart2, BsChevronRight } from "react-icons/bs";
import { HwButton, Carousel, NavLink } from "../../shared";
import { useStateValue } from "../../../context/StateProvider";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";

export const Home = () => {
  const [{ settings }] = useStateValue();

  return (
    <>
      {!settings ? (
        <div className='flex h-screen w-full items-center justify-center'>
          <BeatLoader size={20} color={"#ffa801"} loading={!settings} />
        </div>
      ) : (
        <div
          className='grid w-full grid-cols-1 gap-2 pt-24 lg:h-screen lg:grid-cols-2'
          id='home'>
          <div className='z-10 flex-1 flex-col items-start space-y-4 py-2'>
            <p className='text-[3.5rem] font-bold leading-tight tracking-wide text-textColor xl:text-[4rem] '>
              {settings.homeTitle}
              {/* <span className='text-[4rem] leading-tight tracking-wide text-orange-600 xl:text-[4.5rem]'>
            every palate
          </span> */}
            </p>
            <p className='text-left text-base text-textColor md:w-[90%]'>
              {settings.homeDescription}
            </p>
            <div className='flex gap-4'>
              <NavLink link='#menu'>
                <HwButton title='Order now' type='solid' icon={BsCart2} />
              </NavLink>

              <NavLink link='#reservation'>
                <HwButton
                  title='Reservation'
                  type='outline'
                  icon={BsChevronRight}
                />
              </NavLink>
            </div>
          </div>
          <div className='flex flex-1 justify-center py-12 lg:py-0'>
            <Carousel />
          </div>
        </div>
      )}
    </>
  );
};
