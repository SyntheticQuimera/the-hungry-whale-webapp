import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsBoxArrowRight, BsGrid, BsCart2, BsList } from "react-icons/bs";
import { RiInstagramLine, RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandTiktok } from "react-icons/tb";
import avatar from "../../../../assets/icons/orca.png";
import { useCloseModal, useAuth } from "../../../../hooks";
import { useStateValue } from "../../../../context/StateProvider";
import { actionType } from "../../../../context/reducer";
import { NavLink } from "../../../shared";

export const MobileHeader = ({ totalQty }) => {
  const { user, login, userMenu, setUserMenu, logout, userName } = useAuth();

  const [showNavMenu, setShowNavMenu] = useState(false);

  const userMenuRef = useRef();

  const navMenuRef = useRef();

  useCloseModal(setUserMenu, userMenuRef);

  useCloseModal(setShowNavMenu, navMenuRef);

  const [{ cartOpen, cart, settings }, dispatch] = useStateValue();

  const headerNav = [
    { title: "Home", link: "#home" },
    { title: "Menu", link: "#menu" },
    { title: "About Us", link: "#aboutus" },
    { title: "Reservation", link: "#reservation" },
  ];

  const openFacebook = () => {
    window.open(settings.facebook, "_blank");
  };

  const openInstagram = () => {
    window.open(settings.instagram, "_blank");
  };

  const openTiktok = () => {
    window.open(settings.tiktok, "_blank");
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SWITCH,
      cartOpen: !cartOpen,
    });
  };

  const socialNav = [
    {
      name: "Facebook",
      icon: RiFacebookCircleLine,
      link: openFacebook,
    },
    {
      name: "Instagram",
      icon: RiInstagramLine,
      link: openInstagram,
    },
    {
      name: "TikTok",
      icon: TbBrandTiktok,
      link: openTiktok,
    },
  ];

  return (
    <div className='flex h-full w-full  justify-between lg:hidden'>
      {/* Logo */}
      {!settings ? (
        ""
      ) : (
        <div className='flex items-center justify-center'>
          <Link to={"/"}>
            <img className='h-14' src={settings.logo} alt='logo' />
          </Link>
        </div>
      )}

      <div className='ml-auto flex items-center gap-6'>
        {/* Icons */}

        <motion.div
          whileTap={{ scale: 0.8 }}
          className='relative flex cursor-pointer items-center justify-center gap-2'
          onClick={showCart}>
          <BsCart2 className='text-2xl text-textColor duration-100 hover:text-hoverTextColor' />
          {cart && cart.length > 0 && (
            <div className='absolute bottom-4 left-6 flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 shadow-md shadow-slate-200'>
              <p className='mt-[1px] text-[10px] text-white'>{totalQty}</p>
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
            <BsList className='text-2xl text-textColor' />
          </motion.div>
          {showNavMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className='absolute top-14 right-0 flex w-40 flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-slate-200'>
              <ul>
                {headerNav.map((item, i) => (
                  <NavLink key={i} link={item.link}>
                    <li
                      key={i}
                      className='cursor-pointer px-4 py-2 text-sm text-textColor transition-all 
                    duration-100 ease-in-out hover:bg-slate-100 hover:text-hoverTextColor'>
                      {item.title}
                    </li>
                  </NavLink>
                ))}
                {settings && (
                  <div className='border-t'>
                    {socialNav.map((item, i) => (
                      <li
                        onClick={item.link}
                        key={i}
                        className='flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-textColor
                    transition-all duration-100 ease-in-out hover:bg-slate-100 hover:text-hoverTextColor'>
                        <item.icon key={i} className='text-xl' />
                        {item.name}
                      </li>
                    ))}
                  </div>
                )}
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
              {/* {user && user.email === "example@gmail.com" && (
                  )} */}
              <Link to={"/admin"}>
                <p
                  className='flex cursor-pointer items-center  gap-3 px-4 py-2 text-sm text-textColor 
                    transition-all duration-100 ease-in-out hover:bg-slate-100'>
                  <BsGrid className='text-xl' />
                  Dashboard
                </p>
              </Link>
              <p
                onClick={logout}
                className='flex cursor-pointer items-center  gap-3 px-4 py-2 text-sm text-textColor 
                transition-all duration-100 ease-in-out hover:bg-slate-100'>
                <BsBoxArrowRight className='text-xl' />
                Logout
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
