import React from "react";
import { ErrorMessage } from "formik";
import { BsCloudUpload } from "react-icons/bs";
import { ErrorIconMessage } from "./ErrorIconMessage";
import { CircleButton } from "../shared";

export const FileField = ({
  title,
  form,
  errorName,
  isLoading,
  uploadProgressInfo,
  imageAsset,
  setImageAsset,
  deleteImage,
  uploadImage,
}) => {
  return (
    <>
      <div className='input-file'>
        <div className='z-10 -mb-10 h-10 self-end pt-3'>
          <ErrorMessage name={errorName}>
            {(msg) => <ErrorIconMessage msg={msg} />}
          </ErrorMessage>
        </div>
        {isLoading ? (
          <div className='relative top-0 w-[60%] overflow-hidden rounded-full bg-gray-200'>
            <div
              className='bg-orange-600 p-0.5 leading-none duration-300'
              style={{ width: uploadProgressInfo + "%" }}></div>
          </div>
        ) : (
          <>
            {!imageAsset ? (
              <>
                <label className='flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-center'>
                  <BsCloudUpload className='text-3xl text-gray-500 hover:text-gray-700' />
                  <p className='text-gray-500 hover:text-gray-700'>{title}</p>
                  <input
                    className='h-0 w-0'
                    type='file'
                    onChange={(e) => {
                      form.setFieldValue("file", e.target.files[0]);
                      uploadImage(e);
                    }}
                  />
                </label>
              </>
            ) : (
              <>
                <div className='relative h-full w-full'>
                  <img
                    src={imageAsset}
                    alt='Selected Image'
                    className='h-full w-full object-contain'
                  />

                  <CircleButton
                    className='absolute bottom-3 right-3'
                    type='delete'
                    onClick={() => {
                      setImageAsset(null);
                      deleteImage();
                    }}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
