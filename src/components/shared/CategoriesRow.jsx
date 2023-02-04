import React from "react";
import { useDragging } from "../../hooks";

export const CategoriesRow = ({ categories, setFilter, filter }) => {
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDragging();

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className='flex w-full items-center justify-start gap-4 overflow-x-scroll py-6 px-1 pt-8 scrollbar-none'>
      {categories &&
        categories.map((category) => (
          <button
            key={category.id}
            className={`
        ${
          filter === category.name
            ? "mx-2 -translate-y-1 scale-110 bg-lime-500 text-white shadow-lg"
            : "bg-white hover:mx-2 hover:-translate-y-1 hover:scale-110 hover:bg-lime-500 hover:text-white hover:shadow-lg"
        }
        min-w-fit rounded-lg border-none px-4 py-3 text-xs font-semibold 
        tracking-wider shadow-md shadow-slate-200 outline-none duration-300`}
            onClick={() => setFilter(category.name)}>
            <p>{category.name}</p>
          </button>
        ))}
    </div>
  );
};
