import React, { useState } from "react";
import {
  ItemForm,
  AdminNav,
  ManageCategories,
  ManageItems,
} from "../admin/sections";
import { useStateValue } from "../../context/StateProvider";

export const Admin = () => {
  const [{ sidebarOpen }] = useStateValue();
  const [activeSection, setActiveSection] = useState("addItems");

  return (
    <>
      <AdminNav setActiveSection={setActiveSection} />
      <div className='w-full p-4 md:px-10'>
        <div
          className={`
        ${sidebarOpen ? "pl-16 sm:pl-72" : "pl-16"}
        my-12 flex w-full flex-col duration-500`}>
          {activeSection === "addItems" && <ItemForm />}
          {activeSection === "manageItems" && <ManageItems />}
          {activeSection === "manageCategories" && <ManageCategories />}
        </div>
      </div>
    </>
  );
};
