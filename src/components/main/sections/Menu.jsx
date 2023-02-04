import React, { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { ItemsRow, Title } from "../../shared";
import { CategoriesRow } from "../../shared";

export const Menu = () => {
  const [filter, setFilter] = useState("Chicken");
  const [{ foodItems, categories }] = useStateValue();
  const menuCategories = categories?.filter(
    (n) => n.name !== "Specials" && n.name !== "Presentation"
  );

  return (
    <div className='my-6 w-full'>
      <Title title='Menu' />
      <CategoriesRow
        categories={menuCategories}
        setFilter={setFilter}
        filter={filter}
      />
      <ItemsRow
        flag={false}
        data={foodItems?.filter((n) => n.category === filter)}
      />
    </div>
  );
};
