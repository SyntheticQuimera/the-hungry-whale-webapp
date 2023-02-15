import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { updateItem } from "../../utils/firebaseFunctions";
import { useStateValue } from "../../context/StateProvider";
import { useFetchData, useUploadImage } from "../../hooks";
import { CircleButton, ErrorIconMessage } from "../shared";

export const UpdateItem = ({
  item,
  setImageAsset,
  imageAsset,
  setEditingItem,
}) => {
  const { fetchData } = useFetchData();
  const [{ categories }] = useStateValue();
  const [uploadProgressInfo, setUploadProgressInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { uploadImage, deleteImage } = useUploadImage({
    imageAsset,
    setImageAsset,
    setUploadProgressInfo,
    setIsLoading,
  });

  const initialValues = {
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    file: item.file,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(20, "Title should not exceed 20 characters")
      .required("Title is a required field"),
    price: Yup.number()
      .min(0.1, "Minimum price should contain at least one digit")
      .required("Price is a required field"),
    description: Yup.string()
      .max(140, "Description should not exceed 140 characters")
      .required("Description is a required field"),
    category: Yup.string().required("Category is a required field"),
    ...(item.file
      ? { file: Yup.mixed().required("An image is required") }
      : {
          file: Yup.mixed()
            .test(
              "fileType",
              "Unsupported file format, only jpg, jpeg, png, svg and gif are allowed",
              (value) => {
                if (value) {
                  const extension = value.name.split(".").pop();
                  return ["jpg", "jpeg", "png", "gif", "svg"].includes(
                    extension
                  );
                }
                return true;
              }
            )
            .required("An image is required"),
        }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);
    setTimeout(() => {
      const data = {
        id: item.id,
        title: values.title,
        price: values.price,
        description: values.description,
        category: values.category,
        file: imageAsset,
      };
      updateItem(data);
      setIsLoading(false);
      setSubmitting(false);
      fetchData();
      setEditingItem(null);
    }, 400);
  };

  return (
    <div key={item.id} className='card-item-container'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form className='flex h-full w-full flex-col gap-2 px-6 pt-6 pb-4'>
          {/* Image update */}
          <Field name='file'>
            {({ form }) => (
              <div
                className='group flex h-48 max-h-[184px] cursor-pointer flex-col items-center justify-center
                  overflow-hidden rounded-lg border-4 border-dotted bg-slate-100 md:h-340'>
                <div className='z-10 -mb-10 h-10 self-end pt-3'>
                  <ErrorMessage name='file'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>
                {isLoading ? (
                  <div className='relative top-0 w-[60%] overflow-hidden rounded-full bg-gray-200'>
                    <div
                      className='rounded-l-full bg-orange-600 p-0.5 text-center text-xs font-medium 
                          leading-none text-blue-100 transition-all delay-300 duration-300 ease-in-out'
                      style={{ width: uploadProgressInfo + "%" }}
                    />
                  </div>
                ) : (
                  <>
                    {!imageAsset ? (
                      <label className='relative flex h-full w-full cursor-pointer flex-col items-center justify-center'>
                        <div className='absolute flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100/60'>
                          <IoCloudUploadOutline className='text-3xl text-gray-500 hover:text-gray-700' />
                          <p className='text-center text-gray-500 hover:text-gray-700'>
                            Click here to upload an image
                          </p>
                        </div>
                        <img
                          className='h-full w-full object-cover'
                          src={item.file}
                          alt=''
                        />
                        <input
                          className='h-0 w-0'
                          type='file'
                          onChange={(e) => {
                            form.setFieldValue("file", e.target.files[0]);
                            uploadImage(e);
                          }}
                        />
                      </label>
                    ) : (
                      <div className='relative h-full w-full'>
                        <img
                          src={imageAsset}
                          alt='Selected'
                          className='h-full w-full object-cover'
                        />
                        <CircleButton
                          type='delete'
                          className='absolute bottom-3 right-3'
                          onClick={() => {
                            setImageAsset(null);
                            deleteImage();
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </Field>

          <div className='input-container'>
            <Field
              name='title'
              type='text'
              className='input-field'
              placeholder='Title'
            />
            <ErrorMessage name='title'>
              {(msg) => <ErrorIconMessage msg={msg} />}
            </ErrorMessage>
          </div>

          <div className='input-container'>
            <Field
              rows='6'
              name='description'
              as='textarea'
              className='input-field'
              placeholder='Description'
            />
            <ErrorMessage name='description'>
              {(msg) => <ErrorIconMessage msg={msg} />}
            </ErrorMessage>
          </div>

          <div className='input-container'>
            <BsCurrencyDollar className='ml-2 mb-[2px] text-xl text-lightText' />
            <Field
              name='price'
              type='number'
              className='input-field'
              placeholder='Price'
            />
            <ErrorMessage name='price'>
              {(msg) => <ErrorIconMessage msg={msg} />}
            </ErrorMessage>
          </div>
          <div className='input-container'>
            <Field
              name='category'
              as='select'
              className='input-field cursor-pointer'>
              <option value='' disabled className='text-lightText'>
                Select a category
              </option>
              {categories &&
                categories.map((e) => (
                  <option key={e.id} value={e.name} className='text-textColor'>
                    {e.name}
                  </option>
                ))}
            </Field>
            <ErrorMessage name='category'>
              {(msg) => <ErrorIconMessage msg={msg} />}
            </ErrorMessage>
          </div>

          <div className='flex items-center justify-end gap-4'>
            <CircleButton type='cancel' onClick={() => setEditingItem(null)} />
            <CircleButton type='check' />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
