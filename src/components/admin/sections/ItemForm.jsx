import React, { useState } from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";
import { saveItem } from "../../../utils/firebaseFunctions";
import { useStateValue } from "../../../context/StateProvider";
import { useFetchData, useUploadImage } from "../../../hooks";
import { Title, HwButton, ErrorMessageForm } from "../../shared";

export const ItemForm = () => {
  const { fetchData } = useFetchData();
  const [{ categories }] = useStateValue();
  const [imageAsset, setImageAsset] = useState(null);
  const [uploadProgressInfo, setUploadProgressInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { uploadImage, deleteImage } = useUploadImage({
    imageAsset,
    setImageAsset,
    setUploadProgressInfo,
    setIsLoading,
  });

  const initialValues = {
    title: "",
    price: "",
    description: "",
    category: "",
    file: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("You must add a title"),
    price: Yup.number()
      .min(0.1, "Must contain a minimum amount of one digit")
      .required("A minimum price is required"),
    description: Yup.string()
      .max(140, "Must be 140 characters or less")
      .required("You must add a description"),
    category: Yup.string().required("Assign a category is necessary"),
    file: Yup.mixed()
      .test("fileType", "Unsupported File Format", (value) => {
        if (value) {
          const extension = value.name.split(".").pop();
          return ["jpg", "jpeg", "png", "gif"].includes(extension);
        }
        return true;
      })
      .required("Upload a image"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    setTimeout(() => {
      const data = {
        id: `${Date.now()}`,
        title: values.title,
        price: values.price,
        description: values.description,
        category: values.category,
        file: imageAsset,
        qty: 1,
        stars: 0,
      };
      saveItem(data);
      setIsLoading(false);
      setSubmitting(false);
      resetForm();
      fetchData();
      setImageAsset(null);
    }, 400);
  };

  return (
    <>
      <Title title='Add New Item' />
      <div className='flex w-full items-start justify-center'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form
            className='flex w-full flex-col items-center justify-center gap-4 rounded-xl border 
          border-slate-200 bg-white p-8 shadow-lg shadow-slate-200'>
            <div className='flex w-full flex-col gap-8 sm:flex-row-reverse'>
              <div className='flex h-full w-full flex-col gap-4'>
                <div className='input-container'>
                  <Field
                    name='title'
                    type='text'
                    className='input-field'
                    placeholder='Title'
                  />
                </div>
                <ErrorMessage name='title'>{ErrorMessageForm}</ErrorMessage>

                <div className='input-container'>
                  <BiDollar className='ml-2 mb-[2px] text-xl text-lightText' />
                  <Field
                    name='price'
                    type='number'
                    className='input-field pl-1'
                    placeholder='Price'
                  />
                </div>
                <ErrorMessage name='price'>{ErrorMessageForm}</ErrorMessage>

                <div className='input-container rounded-lg border-2'>
                  <Field
                    name='description'
                    as='textarea'
                    className='input-field'
                    placeholder='Description'
                  />
                </div>
                <ErrorMessage name='description'>
                  {ErrorMessageForm}
                </ErrorMessage>

                <Field
                  name='category'
                  as='select'
                  className='input-field cursor-pointer border-b-2'>
                  <option value='' disabled>
                    Select a category
                  </option>
                  {categories &&
                    categories.map((e) => (
                      <option
                        key={e.id}
                        value={e.name}
                        className='text-textColor'>
                        {e.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage name='category'>{ErrorMessageForm}</ErrorMessage>
              </div>
              <div className='flex h-full w-full'>
                <Field name='file'>
                  {({ form }) => (
                    <div
                      className='group flex h-225 w-full cursor-pointer flex-col items-center justify-center
                 overflow-hidden rounded-lg border-2 border-dotted border-gray-300 md:h-340'>
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
                                <IoCloudUploadOutline className='text-3xl text-gray-500 hover:text-gray-700' />
                                <p className='text-gray-500 hover:text-gray-700'>
                                  Click here to upload an image
                                </p>
                                <input
                                  className='h-0 w-0'
                                  type='file'
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      "file",
                                      e.target.files[0]
                                    );
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
                                  className='h-full w-full object-cover'
                                />
                                <motion.button
                                  whileTap={{ scale: 0.8 }}
                                  type='button'
                                  className='absolute bottom-3 right-3 cursor-pointer rounded-full bg-red-500 
                              p-3 text-xl outline-none duration-300 hover:bg-red-400 hover:shadow-md'
                                  onClick={() => {
                                    setImageAsset(null);
                                    deleteImage();
                                  }}>
                                  <IoTrashOutline className='text-white' />
                                </motion.button>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </Field>
                <ErrorMessage name='file'>{ErrorMessageForm}</ErrorMessage>
              </div>
            </div>

            <div className='flex w-full justify-end'>
              <HwButton title='Upload' type='solid' />
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};
