import React from "react";
import { Link } from "react-router-dom";

export const NavLink = ({ link, children }) => {
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
