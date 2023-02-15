import React, { useEffect, useState } from "react";
import { useDragging } from "../../hooks";
import { BeatLoader } from "react-spinners";
import { UpdateItem, CardItem } from "../shared";

export const ItemsRow = ({ flag, data, editable }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDragging();

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`flex w-full select-none gap-3 px-1 scrollbar-none sm:gap-6 ${
        flag
          ? "cursor-grab overflow-x-scroll"
          : "cursor-grab overflow-x-scroll sm:cursor-default sm:flex-wrap sm:overflow-x-hidden"
      }`}>
      {isLoading ? (
        <div className='flex h-96 w-full items-center justify-center'>
          <BeatLoader size={20} color={"#ffa801"} loading={isLoading} />
        </div>
      ) : data && data.length > 0 ? (
        data.map((item) => (
          <>
            {editable ? (
              <>
                {editingItem === item.id ? (
                  <UpdateItem
                    key={item.id}
                    item={item}
                    setImageAsset={setImageAsset}
                    imageAsset={imageAsset}
                    setEditingItem={setEditingItem}
                  />
                ) : (
                  <CardItem
                    key={item.id}
                    item={item}
                    editable
                    onClickEdit={() => {
                      setEditingItem(item.id);
                      setImageAsset(item.file);
                    }}
                  />
                )}
              </>
            ) : (
              <>
                <CardItem key={item.id} item={item} />
              </>
            )}
            {data && data.length === 0 && (
              <div className='flex h-96 w-full items-center justify-center'>
                <div className='flex rounded-xl border-4 border-dashed border-lightText p-6 text-center sm:p-12'>
                  <p className='text-3xl text-lightText'>Items Not Available</p>
                </div>
              </div>
            )}
          </>
        ))
      ) : (
        <div className='flex h-96 w-full items-center justify-center'>
          <div className='flex rounded-xl border-4 border-dashed border-lightText p-6 text-center sm:p-12'>
            <p className='text-3xl text-lightText'>Items Not Available</p>
          </div>
        </div>
      )}
    </div>
  );
};
