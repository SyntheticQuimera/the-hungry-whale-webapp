import React from "react";
import { Link } from "react-router-dom";
import {
  BsBarChart,
  BsFileEarmarkPlus,
  BsGear,
  BsDiagram3,
  BsFiles,
  BsInboxes,
  BsArrowLeft,
  BsBoxArrowRight,
  BsList,
} from "react-icons/bs";
import { useStateValue } from "../../../context/StateProvider";
import { useAuth } from "../../../hooks";

export const AdminNav = ({ setActiveSection }) => {
  const { logout } = useAuth();

  const menus = [
    {
      name: "Add Item",
      section: "addItems",
      icon: BsFileEarmarkPlus,
      margin: true,
    },
    {
      name: "Manage Items",
      section: "manageItems",
      icon: BsFiles,
    },
    {
      name: "Categories",
      section: "manageCategories",
      icon: BsDiagram3,
    },
    {
      name: "analytics",
      section: "/",
      icon: BsBarChart,
      margin: true,
    },
    { name: "Buy Orders", section: "/", icon: BsInboxes },
    { name: "Settings", section: "settings", icon: BsGear },
  ];

  const [{ sidebarOpen }, dispatch] = useStateValue();

  return (
    <div
      className={`min-h-screen bg-white ${
        sidebarOpen ? "w-72" : "w-16"
      } fixed z-[101] border-r border-slate-200 px-4 text-textColor duration-500`}>
      <div className='flex justify-end py-3'>
        <BsList
          size={26}
          className='cursor-pointer font-normal'
          onClick={() => dispatch({ type: "SET_SIDEBAR_SWITCH" })}
        />
      </div>
      <Link
        to='/'
        className={`
            ${sidebarOpen && "hover:bg-slate-200"} group
            mt-9 flex cursor-pointer items-center gap-3.5 rounded-md p-2 text-sm font-normal `}>
        <div>
          <BsArrowLeft className='text-xl' />
        </div>
        <h2
          style={{
            transitionDelay: `${0 + 3}00ms`,
          }}
          className={`whitespace-pre duration-500 ${
            !sidebarOpen && "translate-x-28 overflow-hidden opacity-0"
          }`}>
          Go Back
        </h2>
        <h2
          className={`${
            sidebarOpen && "hidden"
          } absolute left-48 ml-4 w-0 overflow-hidden whitespace-pre rounded-md bg-slate-50 px-0 py-0  text-textColor shadow-md shadow-slate-200 group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300  `}>
          Go Back
        </h2>
      </Link>

      <div className='relative mt-4 flex flex-col gap-4'>
        {menus?.map((menu, i) => (
          <div
            onClick={() => setActiveSection(menu?.section)}
            key={i}
            className={` ${menu?.margin && "mt-5"} 
            ${sidebarOpen && "hover:bg-slate-200"}
            group flex cursor-pointer items-center gap-3.5 rounded-md p-2 text-sm font-normal `}>
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !sidebarOpen && "translate-x-28 overflow-hidden opacity-0"
              }`}>
              {menu?.name}
            </h2>
            <h2
              className={`${
                sidebarOpen && "hidden"
              } absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-slate-50 px-0 py-0  text-textColor shadow-md shadow-slate-200 group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300  `}>
              {menu?.name}
            </h2>
          </div>
        ))}
      </div>
      <Link
        to='/'
        onClick={logout}
        className={`${sidebarOpen && "hover:bg-slate-200"} group
            mt-9 flex cursor-pointer items-center gap-3.5 rounded-md p-2 text-sm font-normal `}>
        <div>
          <BsBoxArrowRight className='text-xl' />
        </div>
        <h2
          style={{
            transitionDelay: `${6 + 3}00ms`,
          }}
          className={`whitespace-pre duration-500 ${
            !sidebarOpen && "translate-x-28 overflow-hidden opacity-0"
          }`}>
          Logout
        </h2>
        <h2
          className={`${
            sidebarOpen && "hidden"
          } absolute left-48 ml-4 w-0 overflow-hidden whitespace-pre rounded-md bg-slate-50 px-0 py-0  text-textColor shadow-md shadow-slate-200 group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300  `}>
          Logout
        </h2>
      </Link>
    </div>
  );
};
