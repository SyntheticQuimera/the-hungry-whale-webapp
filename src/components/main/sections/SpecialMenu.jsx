import React from "react";
import { ItemsRow, Title } from "../../shared";
import { useStateValue } from "../../../context/StateProvider";

export const SpecialMenu = () => {
  const [{ foodItems }] = useStateValue();

  return (
    <div className='w-full'>
      <Title title='Our special selection' />
      <ItemsRow
        flag={true}
        data={foodItems?.filter((n) => n.category === "Specials")}
      />
    </div>
  );
};
