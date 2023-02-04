import React from "react";
import image from "../../../assets/images/aboutUsimage.jpg";
import { Title } from "../../shared";

export const AboutUs = () => {
  return (
    <>
      <Title title='About Us' />
      <div className='mb-12 flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-slate-200 md:flex-row'>
        <div className='flex w-full'>
          <img src={image} alt='' className='object-cover' />
        </div>
        <div className='bg- p-6 text-base font-light text-textColor md:p-12'>
          <p>
            "Hungry Whale" is a family-owned restaurant located in the heart of
            the city. We serve a variety of dishes that reflect our passion for
            fresh and local ingredients. Our menu features classic favorites
            with a modern twist, created by our talented chef and kitchen team.
            <br />
            <br />
            At the Hungry Whale, we believe that dining should be a memorable
            experience. Our warm and welcoming atmosphere is the perfect setting
            for intimate dinners, family gatherings, and special events. Our
            friendly and knowledgeable staff is dedicated to making sure each
            and every guest feels at home.
            <br />
            <br />
            We are committed to sourcing sustainable and responsible
            ingredients, and to supporting local farms and suppliers. Our menu
            changes with the seasons, allowing us to offer the freshest and most
            flavorful ingredients available.
            <br />
            <br />
          </p>
        </div>
      </div>
    </>
  );
};
