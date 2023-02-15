import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsBoxArrowRight, BsGrid, BsCart2 } from "react-icons/bs";
import { RiInstagramLine, RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandTiktok } from "react-icons/tb";
import avatar from "../../../../assets/icons/orca.png";
import { useCloseModal, useAuth } from "../../../../hooks";
import { useStateValue } from "../../../../context/StateProvider";
import { actionType } from "../../../../context/reducer";
import { NavLink } from "../../../shared";

export const DesktopHeader = ({ totalQty, subtotalPrice }) => {
  const { user, login, userMenu, setUserMenu, userName, logout } = useAuth();

  const [{ cartOpen, cart, settings }, dispatch] = useStateValue();

  const userMenuRef = useRef();

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

  const icons = [
    { icon: RiFacebookCircleLine, link: openFacebook },
    { icon: RiInstagramLine, link: openInstagram },
    { icon: TbBrandTiktok, link: openTiktok },
  ];

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SWITCH,
      cartOpen: !cartOpen,
    });
  };

  useCloseModal(setUserMenu, userMenuRef);

  return (
    <div className='hidden h-full w-full lg:flex'>
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

      <div className='ml-auto flex items-center justify-center gap-6 lg:gap-8'>
        {settings &&
          icons.map((icon, i) => (
            <motion.button
              onClick={icon.link}
              key={i}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}>
              <icon.icon className='cursor-pointer text-xl text-textColor duration-100 hover:text-hoverTextColor' />
            </motion.button>
          ))}
        <motion.div
          whileTap={{ scale: 0.8 }}
          onClick={showCart}
          className='relative flex cursor-pointer items-center justify-center gap-2'>
          <BsCart2 className='text-2xl text-textColor duration-100 hover:text-hoverTextColor' />
          {cart && cart.length > 0 && (
            <div className='absolute bottom-[22px] left-[60px] flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 shadow-md shadow-slate-200'>
              <p className='mt-[1px] text-[10px] text-white'>{totalQty}</p>
            </div>
          )}
          <div className='flex w-12 flex-col justify-center -space-y-[2px] pt-1 text-xs'>
            <p className='text-textColor'>Cart</p>
            <p className='text-lime-500'>${subtotalPrice}</p>
          </div>
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
