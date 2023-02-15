import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { heroData } from "../../utils/data";
import { useStateValue } from "../../context/StateProvider";
import { CircleButton } from "../shared";

export const Carousel = () => {
  const [{ foodItems }] = useStateValue();
  const data = foodItems?.filter((n) => n.category === "Presentation");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data && data[index].file) {
      setIsLoading(true);
      const image = new Image();
      image.src = data[index].file;
      image.onload = () => {
        setIsLoading(false);
      };
    }
  }, [index, foodItems]);

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= data.length ? 0 : newIndex);
  };

  const handlePrev = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? data.length - 1 : newIndex);
  };

  const rightDirection = () => {
    setDirection(true);
  };
  const leftDirection = () => {
    setDirection(false);
  };

  return (
    <div
      key={index}
      className='relative flex h-370 w-656 items-center justify-center overflow-hidden p-6 sm:h-510 '>
      <CircleButton
        onClick={() => {
          handlePrev();
          leftDirection();
        }}
        type='chevronLeft'
        className='absolute left-2 z-20 pr-1'
      />
      <CircleButton
        onClick={() => {
          handleNext();
          rightDirection();
        }}
        type='chevronRight'
        className='absolute right-2 z-20 pl-1'
      />
      {isLoading ? (
        <BeatLoader size={20} color={"#ffa801"} loading={isLoading} />
      ) : (
        <>
          <motion.img
            initial={[
              { opacity: 0.5 },
              direction ? { rotate: -360 } : { rotate: 360 },
            ]}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            src={data[index].file}
            alt={data[index].title}
            className='relative z-0 h-full w-full object-contain'
          />
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
            src={heroData[index].motionFood}
            alt={heroData[index].name}
            className='absolute z-10 h-full w-full object-contain opacity-90 drop-shadow-lg'
          />

          {/* Carousel Card */}

          <div className='absolute top-8 left-8 z-20 flex items-center justify-center'>
            <div className='flex w-full overflow-hidden rounded-xl border-l-4 border-l-orange-600 bg-cardOverlay shadow-lg backdrop-blur-md'>
              <div className='flex flex-col justify-center space-y-1 px-4 py-2'>
                <p className='text-lg font-semibold text-textColor'>
                  {data[index].title}
                </p>
                <p className='text-sm font-semibold text-hoverTextColor'>
                  <span className='text-xs text-lime-600'>$</span>
                  {data[index].price}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
