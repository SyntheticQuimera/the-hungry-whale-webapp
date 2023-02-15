import React from "react";
import { BeatLoader } from "react-spinners";
import { Title } from "../../shared";
import { useStateValue } from "../../../context/StateProvider";

export const AboutUs = () => {
  const [{ settings }] = useStateValue();

  return (
    <>
      <Title title='About Us' />
      <div className='mb-12 flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-slate-200 lg:flex-row'>
        {!settings ? (
          <div className='flex h-510 w-full items-center justify-center'>
            <BeatLoader size={20} color={"#ffa801"} loading={!settings} />
          </div>
        ) : (
          <>
            <div className='flex-1'>
              <img
                src={settings.aboutUsImage}
                alt=''
                className='h-full w-full object-cover'
              />
            </div>
            <div className='flex-1 whitespace-pre-line p-6 indent-8 text-base font-light text-textColor md:p-12'>
              <p className=''>{settings.aboutUsDescription} </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
