import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineDashboard } from "react-icons/md";
import {
  HiOutlineShoppingBag,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { RiInstagramLine, RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandTiktok } from "react-icons/tb";
import logo from "../../../../assets/logo.svg";
import avatar from "../../../../assets/Icons/orca.png";

import { useCloseModal, useAuth } from "../../../../hooks";
import { useStateValue } from "../../../../context/StateProvider";
import { actionType } from "../../../../context/reducer";

const headerNav = [
  { title: "Home", link: "#home" },
  { title: "Menu", link: "#menu" },
  { title: "About Us", link: "#aboutus" },
  { title: "Reservation", link: "#reservation" },
];

const NavLink = ({ link, children }) => {
  const handleClick = () => {
    const targetSection = document.querySelector(link);
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Link to={link} onClick={handleClick}>
      {children}
    </Link>
  );
};

const icons = [RiFacebookCircleLine, RiInstagramLine, TbBrandTiktok];

export const DesktopHeader = () => {
  const { user, login, userMenu, setUserMenu, userName, logout } = useAuth();

  const [{ cartOpen, cartItems }, dispatch] = useStateValue();

  const userMenuRef = useRef();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SWITCH,
      cartOpen: !cartOpen,
    });
  };

  useCloseModal(setUserMenu, userMenuRef);

  return (
    <div className='hidden h-full w-full md:flex'>
      {/* Logo */}

      <div className='flex items-center justify-center'>
        <Link to={"/"}>
          <img className='w-28 min-w-[112px]' src={logo} alt='logo' />
        </Link>
      </div>

      {/* Navigation */}

      <ul className='ml-auto flex items-center gap-6 lg:gap-14'>
        {headerNav.map((item, i) => (
          <NavLink key={i} title={item.title} link={item.link}>
            <li
              key={i}
              className='cursor-pointer text-base text-textColor transition-all duration-100
              ease-in-out hover:text-hoverTextColor'>
              {item.title}
            </li>
          </NavLink>
        ))}
      </ul>

      {/* Icons */}

      <div className='ml-auto flex items-center gap-6 lg:gap-8'>
        {icons.map((Icon, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}>
            <Icon className='cursor-pointer text-xl text-textColor duration-100 hover:text-hoverTextColor' />
          </motion.div>
        ))}
        <motion.div
          whileTap={{ scale: 0.8 }}
          onClick={showCart}
          className='relative flex cursor-pointer items-center justify-center gap-2'>
          <HiOutlineShoppingBag className='text-[22px] text-textColor duration-100 hover:text-hoverTextColor' />
          {cartItems && cartItems.length > 0 && (
            <div className='absolute bottom-4 -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 shadow-md shadow-slate-200'>
              <p className='mt-[1px] text-[10px] text-white'>
                {cartItems.length}
              </p>
            </div>
          )}
        </motion.div>

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

          {/* User Menu */}

          {userMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
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
                    <MdOutlineDashboard className='text-xl' />
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
