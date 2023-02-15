import React from "react";
import {
  AboutUs,
  Cart,
  Header,
  Home,
  Menu,
  Reservation,
  SpecialMenu,
  Footer,
} from "../main/sections";
import { useStateValue } from "../../context/StateProvider";

export const Main = () => {
  const [{ cartOpen }] = useStateValue();

  return (
    <>
      <Header />
      <div className='w-full px-4 md:px-10'>
        <div className='flex w-full flex-col'>
          <section id='home'>
            <Home />
          </section>
          <SpecialMenu />
          <section id='menu'>
            <Menu />
          </section>
          <section id='aboutus'>
            <AboutUs />
          </section>
          <section id='reservation'>
            <Reservation />
          </section>
          {cartOpen && <Cart />}
        </div>
      </div>
      <Footer />
    </>
  );
};
