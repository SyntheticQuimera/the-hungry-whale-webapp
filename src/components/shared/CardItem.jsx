import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useStateValue } from "../../context/StateProvider";
import { CircleButton } from "../shared";

export const CardItem = ({ item, setItems, editable, onClickEdit }) => {
  const [{ cartItems }] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (item && item.file) {
      setIsLoading(true);
      const image = new Image();
      image.src = item.file;
      image.onload = () => {
        setIsLoading(false);
      };
    }
  }, [item]);

  return (
    <div key={item.id} className='card-item-container'>
      {isLoading ? (
        <div className='flex h-48 max-h-[184px] w-full items-center justify-center'>
          <BeatLoader size={16} color={"#ffa801"} loading={isLoading} />
        </div>
      ) : (
        <img
          className='h-48 max-h-[184px] w-full select-none rounded-t-lg object-contain'
          src={item.file}
          alt={item.file}
        />
      )}

      <div className='flex h-full w-full flex-col gap-4 px-6 py-2'>
        <h5 className='text-lg font-medium text-hoverTextColor'>
          {item.title}
        </h5>
        <div className='h-[100px]'>
          <p className='text-sm text-textColor'>{item.description}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold text-textColor'>
            <span className='text-[22px] text-lime-500'>$</span>
            {item.price}
          </p>
          {editable ? (
            <div className='mb-2 flex items-center justify-center gap-4'>
              <CircleButton type='edit' onClick={onClickEdit} />
              <CircleButton type='delete' />
            </div>
          ) : (
            <CircleButton
              className='mb-2'
              type='buy'
              onClick={() => setItems([...cartItems, item])}
            />
          )}
        </div>
      </div>
    </div>
  );
};
