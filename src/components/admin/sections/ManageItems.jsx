import React, { useState } from "react";
import {
  CategoriesRow,
  ItemsRow,
  ManageItemsContainer,
  Title,
} from "../../shared";
import { useStateValue } from "../../../context/StateProvider";

export const ManageItems = () => {
  const [filter, setFilter] = useState("Presentation");
  const [{ foodItems, categories }] = useStateValue();

  return (
    <>
      <Title title='Manage items' />
      <section className='flex w-full flex-col'>
        <CategoriesRow
          categories={categories}
          setFilter={setFilter}
          filter={filter}
        />
        <ItemsRow
          flag={false}
          data={foodItems?.filter((n) => n.category === filter)}
          editable
        />
      </section>
    </>
  );
};
