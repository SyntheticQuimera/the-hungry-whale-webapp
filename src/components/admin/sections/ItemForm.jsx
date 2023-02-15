import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { BsCurrencyDollar } from "react-icons/bs";
import { saveItem } from "../../../utils/firebaseFunctions";
import { useStateValue } from "../../../context/StateProvider";
import { useFetchData, useUploadImage } from "../../../hooks";
import { Title, HwButton, ErrorIconMessage, FileField } from "../../shared";

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
      .max(20, "Title should not exceed 20 characters")
      .required("Title is a required field"),
    price: Yup.number()
      .min(0.1, "Minimum price should contain at least one digit")
      .required("Price is a required field"),
    description: Yup.string()
      .max(140, "Description should not exceed 140 characters")
      .required("Description is a required field"),
    category: Yup.string().required("Category is a required field"),
    file: Yup.mixed()
      .test(
        "fileType",
        "Unsupported file format, only jpg, jpeg, png, svg and gif are allowed",
        (value) => {
          if (value) {
            const extension = value.name.split(".").pop();
            return ["jpg", "jpeg", "png", "gif", "svg"].includes(extension);
          }
          return true;
        }
      )
      .required("An image is required"),
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
                  <ErrorMessage name='title'>
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
                    rows={5}
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
                  <Field
                    name='category'
                    as='select'
                    className='input-field cursor-pointer'>
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
                  <ErrorMessage name='category'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>
              </div>
              <div className='flex h-full w-full'>
                <Field name='file'>
                  {({ form }) => (
                    <FileField
                      title='Click here to upload an image'
                      form={form}
                      errorName='file'
                      isLoading={isLoading}
                      uploadProgressInfo={uploadProgressInfo}
                      imageAsset={imageAsset}
                      setImageAsset={setImageAsset}
                      deleteImage={deleteImage}
                      uploadImage={uploadImage}
                    />
                  )}
                </Field>
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
