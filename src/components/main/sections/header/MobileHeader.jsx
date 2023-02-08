import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineSquaresPlus,
  HiOutlineArrowRightOnRectangle,
  HiBars3,
} from "react-icons/hi2";
import { RiInstagramLine, RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandTiktok } from "react-icons/tb";
import logo from "../../../../assets/logo.svg";
import avatar from "../../../../assets/icons/orca.png";
import { useCloseModal, useAuth } from "../../../../hooks";
import { useStateValue } from "../../../../context/StateProvider";
import { actionType } from "../../../../context/reducer";

const headerNav = ["Home", "Menu", "About Us", "Service"];

const socialNav = [
  {
    name: "Facebook",
    icon: RiFacebookCircleLine,
  },
  {
    name: "Instagram",
    icon: RiInstagramLine,
  },
  {
    name: "TikTok",
    icon: TbBrandTiktok,
  },
];

export const MobileHeader = () => {
  const { user, login, userMenu, setUserMenu, logout, userName } = useAuth();

  const [showNavMenu, setShowNavMenu] = useState(false);

  const userMenuRef = useRef();

  const navMenuRef = useRef();

  useCloseModal(setUserMenu, userMenuRef);

  useCloseModal(setShowNavMenu, navMenuRef);

  const [{ cartOpen, cartItems }, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SWITCH,
      cartOpen: !cartOpen,
    });
  };

  return (
    <div className='flex h-full w-full justify-between md:hidden'>
      {/* Logo */}

      <div className='flex items-center justify-center'>
        <Link to={"/"}>
          <img className='w-28 min-w-[112px]' src={logo} alt='logo' />
        </Link>
      </div>

      <div className='ml-auto flex items-center gap-6'>
        {/* Icons */}

        <motion.div
          whileTap={{ scale: 0.8 }}
          className='relative flex cursor-pointer items-center justify-center gap-2'
          onClick={showCart}>
          <HiOutlineShoppingBag className='text-[22px] text-textColor duration-100 hover:text-hoverTextColor' />
          {cartItems && cartItems.length > 0 && (
            <div className='absolute bottom-4 -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 shadow-md shadow-slate-200'>
              <p className='mt-[1px] text-[10px] text-white'>
                {cartItems.length}
              </p>
            </div>
          )}
        </motion.div>

        {/* Menu */}

        <div className='relative ml-auto flex items-center'>
          <motion.div whileTap={{ scale: 0.8 }}>
            <div
              className='absolute h-7 w-7 cursor-pointer'
              ref={navMenuRef}
              onClick={() => setShowNavMenu(!showNavMenu)}
            />
            <HiBars3 className='text-2xl text-textColor' />
          </motion.div>
          {showNavMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className='absolute top-14 right-0 flex w-40 flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-slate-200'>
              <ul>
                {headerNav.map((item, i) => (
                  <li
                    key={i}
                    className='cursor-pointer px-4 py-2 text-sm text-textColor transition-all 
                    duration-100 ease-in-out hover:bg-slate-100 hover:text-hoverTextColor'>
                    {item}
                  </li>
                ))}
                <div className='border-t'>
                  {socialNav.map((item, i) => (
                    <li
                      key={i}
                      className='flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-textColor
                    transition-all duration-100 ease-in-out hover:bg-slate-100 hover:text-hoverTextColor'>
                      <item.icon key={i} className='text-xl' />
                      {item.name}
                    </li>
                  ))}
                </div>
              </ul>
            </motion.div>
          )}
        </div>

        {/* Avatar */}

        <div className='relative'>
          <motion.img
            whileTap={{ scale: 0.8 }}
            className='h-7 min-h-[28px] w-7 min-w-[28px] cursor-pointer rounded-full'
            src={user ? user.photoURL : avatar}
            alt='avatar'
            onClick={login}
            ref={userMenuRef}
          />

          {/* User menu */}

          {userMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className='absolute top-14 right-0 flex w-40 flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-slate-200'>
              <p
                className='flex cursor-pointer items-center justify-center border-b px-4 py-1 text-xs text-textColor 
                '>
                {userName.length > 20
                  ? user.displayName.substr(0, 20) + "..."
                  : userName}
              </p>
              {user && user.email === "syntheticquimera@gmail.com" && (
                <Link to={"/admin"}>
                  <p
                    className='flex cursor-pointer items-center  gap-3 px-4 py-2 text-sm text-textColor 
                    transition-all duration-100 ease-in-out hover:bg-slate-100'>
                    <HiOutlineSquaresPlus className='text-xl' />
                    Dashboard
                  </p>
                </Link>
              )}
              <p
                onClick={logout}
                className='flex cursor-pointer items-center  gap-3 px-4 py-2 text-sm text-textColor 
                transition-all duration-100 ease-in-out hover:bg-slate-100'>
                <HiOutlineArrowRightOnRectangle className='text-xl' />
                Logout
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
