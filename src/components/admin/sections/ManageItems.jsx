import React, { useEffect, useState } from "react";
import { CategoriesRow, ItemsRow, Title } from "../../shared";
import { useStateValue } from "../../../context/StateProvider";

export const ManageItems = () => {
  const [filter, setFilter] = useState("");
  const [{ foodItems, categories }] = useStateValue();

  const firstCategory =
    (categories && categories[0] && categories[0].name) || "";

  useEffect(() => {
    setFilter(`${firstCategory}`);
  }, [categories]);

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
