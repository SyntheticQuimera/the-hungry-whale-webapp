import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";
import { storage } from "../../firebase.config";
import { updateItem } from "../../utils/firebaseFunctions";
import { useStateValue } from "../../context/StateProvider";
import { useFetchData } from "../../hooks";
import { CircleButton, ErrorMessageForm } from "../shared";

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

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `Images/${Date.now()}-${e.target.files[0].name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgressInfo(() => uploadProgress.toFixed());
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsLoading(false);
          setImageAsset(downloadURL);
        });
      }
    );
  };

  const deleteImage = () => {
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef)
      .then(() => {
        setIsLoading(false);
        setImageAsset(null);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const initialValues = {
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    file: imageAsset,
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
      // .test("fileType", "Unsupported File Format", (value) => {
      //   if (value) {
      //     const extension = value.name.split(".").pop();
      //     return ["jpg", "jpeg", "png", "gif"].includes(extension);
      //   }
      //   return true;
      // })
      .required("Upload a image"),
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
                  overflow-hidden rounded-lg border-2 border-dotted border-gray-300 md:h-340'>
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
                          alt='Selected Image'
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

          <ErrorMessage name='file'>{ErrorMessageForm}</ErrorMessage>

          <div className='input-container'>
            <Field
              name='title'
              type='text'
              className='input-field'
              placeholder='Title'
            />
          </div>
          <ErrorMessage name='title'>{ErrorMessageForm}</ErrorMessage>

          <div className='input-container rounded-lg'>
            <Field
              rows='6'
              name='description'
              as='textarea'
              className='input-field'
              placeholder='Description'
            />
          </div>
          <ErrorMessage name='description'>{ErrorMessageForm}</ErrorMessage>

          <div className='input-container'>
            <BiDollar className='mb-[2px] text-xl text-lightText' />
            <Field
              name='price'
              type='number'
              className='input-field'
              placeholder='Price'
            />
          </div>
          <ErrorMessage name='price'>{ErrorMessageForm}</ErrorMessage>

          <Field
            name='category'
            as='select'
            className='input-field cursor-pointer border-b-2'>
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
          <ErrorMessage name='category'>{ErrorMessageForm}</ErrorMessage>

          <div className='flex items-center justify-end gap-4'>
            <CircleButton type='cancel' onClick={() => setEditingItem(null)} />
            <CircleButton type='check' />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
