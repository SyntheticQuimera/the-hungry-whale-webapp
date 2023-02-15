import React, { useEffect, useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { ItemsRow, Title } from "../../shared";
import { CategoriesRow } from "../../shared";

export const Menu = () => {
  const [{ foodItems, categories }] = useStateValue();
  const [filter, setFilter] = useState("");
  const menuCategories = categories?.filter(
    (n) => n.name !== "Specials" && n.name !== "Presentation"
  );
  const firstCategory =
    (menuCategories && menuCategories[0] && menuCategories[0].name) || "";

  useEffect(() => {
    setFilter(`${firstCategory}`);
  }, [categories]);

  return (
    <>
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
    </>
  );
};
