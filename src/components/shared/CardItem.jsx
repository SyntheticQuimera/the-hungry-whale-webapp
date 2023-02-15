import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useStateValue } from "../../context/StateProvider";
import { CircleButton } from "../shared";
import { removeItem } from "../../utils/firebaseFunctions";
import { useFetchData } from "../../hooks";
import { actionType } from "../../context/reducer";

export const CardItem = ({ item, editable, onClickEdit }) => {
  const [{ cart }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);
  const { fetchData } = useFetchData();

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

  const addItemToCart = (item) => {
    dispatch({
      type: actionType.SET_ADD_ITEM_CART,
      payload: item,
    });
  };

  return (
    <>
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
                <CircleButton
                  type='delete'
                  onClick={() => {
                    setDeleteModal(item.id);
                  }}
                />
              </div>
            ) : (
              <CircleButton
                className='mb-2'
                type='buy'
                onClick={() => addItemToCart(item)}
              />
            )}
          </div>
        </div>
      </div>

      {deleteModal === item.id && (
        <div className='fixed left-0 top-0 z-[103] flex h-full w-screen items-center justify-center bg-slate-100/60 backdrop-blur-md'>
          <div className='flex w-80 flex-col gap-4 rounded-lg bg-white p-6 shadow-md shadow-slate-200 '>
            <p className='text-base text-textColor '>
              This action will remove the "{item.title}" item. Are you sure?
            </p>
            <div className=' flex items-center justify-end gap-6'>
              <button
                onClick={() => {
                  removeItem(item);
                  setDeleteModal(null);
                  fetchData();
                }}
                className='flex w-20 justify-center rounded-lg border-2 border-orange-600 py-[6px] px-[14px] text-center text-orange-600'>
                Yes
              </button>
              <button
                onClick={() => setDeleteModal(null)}
                className='flex w-20 justify-center rounded-lg bg-lime-500 py-2 px-4 text-center text-white'>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
