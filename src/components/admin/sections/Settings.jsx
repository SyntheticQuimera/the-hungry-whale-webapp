import React, { useState } from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { saveSettings, updateSettings } from "../../../utils/firebaseFunctions";
import { useFetchData, useUploadImage } from "../../../hooks";
import { Title, HwButton, ErrorMessageForm } from "../../shared";
import { useStateValue } from "../../../context/StateProvider";

export const Settings = () => {
  const [{ settings }] = useStateValue();
  const settingsData = settings[0];
  const { fetchSettings } = useFetchData();
  const [uploadProgressInfo, setUploadProgressInfo] = useState(null);
  const [logoIsLoading, setLogoIsLoading] = useState(false);
  const [aboutUsIsLoading, setAboutUsIsLoading] = useState(false);
  const [logo, setLogo] = useState(settingsData ? settingsData.logo : null);
  const [aboutUsImage, setAboutUsImage] = useState(
    settingsData ? settingsData.aboutUsImage : null
  );

  const { uploadImage: uploadLogo, deleteImage: deleteLogo } = useUploadImage({
    imageAsset: logo,
    setImageAsset: setLogo,
    setUploadProgressInfo,
    setIsLoading: setLogoIsLoading,
  });

  const { uploadImage: uploadAboutUsImage, deleteImage: deleteAboutUsImage } =
    useUploadImage({
      imageAsset: aboutUsImage,
      setImageAsset: setAboutUsImage,
      setUploadProgressInfo,
      setIsLoading: setAboutUsIsLoading,
    });

  const initialValues = settingsData
    ? {
        homeTitle: settingsData.homeTitle || "",
        homeDescription: settingsData.homeDescription || "",
        aboutUsDescription: settingsData.aboutUsDescription || "",
        logo: logo || "",
        aboutUsImage: aboutUsImage || "",
      }
    : {
        homeTitle: "",
        homeDescription: "",
        aboutUsDescription: "",
        logo: "",
        aboutUsImage: "",
      };

  const validationSchema = Yup.object().shape({
    homeTitle: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("You must add a title"),
    homeDescription: Yup.string()
      .max(400, "Must be 400 characters or less")
      .required("You must add a description"),
    aboutUsDescription: Yup.string()
      .max(800, "Must be 800 characters or less")
      .required("You must add a description"),
    ...(settingsData
      ? {}
      : {
          logo: Yup.mixed()
            .test("fileType", "Unsupported File Format", (value) => {
              if (value) {
                const extension = value.name.split(".").pop();
                return ["jpg", "jpeg", "png", "gif", "svg"].includes(extension);
              }
              return true;
            })
            .required("Upload a image"),
          aboutUsImage: Yup.mixed()
            .test("fileType", "Unsupported File Format", (value) => {
              if (value) {
                const extension = value.name.split(".").pop();
                return ["jpg", "jpeg", "png", "gif", "svg"].includes(extension);
              }
              return true;
            })
            .required("Upload a image"),
        }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setAboutUsIsLoading(true);
    setLogoIsLoading(true);
    setTimeout(() => {
      let data = {
        homeTitle: values.homeTitle,
        homeDescription: values.homeDescription,
        aboutUsDescription: values.aboutUsDescription,
        logo: logo,
        aboutUsImage: aboutUsImage,
      };
      if (settingsData) {
        data = { ...data, id: settingsData.id };
      }
      if (!settingsData) {
        data = { ...data, id: `${Date.now()}` };
      }
      if (settingsData) {
        updateSettings(data);
      } else {
        saveSettings(data);
      }
      setAboutUsIsLoading(false);
      setLogoIsLoading(false);
      setSubmitting(false);
      fetchSettings();
    }, 400);
  };

  return (
    <>
      <Title title='Settings' />
      <div className='flex w-full items-start justify-center'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form
            className='flex w-full flex-col items-center justify-center gap-4 rounded-xl border 
          border-slate-200 bg-white p-8 shadow-lg shadow-slate-200'>
            <div className='flex w-full flex-col gap-8'>
              <div className='flex w-full flex-col gap-8'>
                <div className='flex w-full flex-col items-center gap-4 '>
                  <p className='w-full text-xl font-semibold text-textColor '>
                    Home info
                  </p>
                  <div className='w-full border-b-2' />
                </div>
                <div className='input-container'>
                  <Field
                    name='homeTitle'
                    type='text'
                    className='input-field'
                    placeholder='Home Title'
                  />
                </div>
                <ErrorMessage name='homeTitle'>{ErrorMessageForm}</ErrorMessage>

                <div className='input-container gap-2 rounded-lg border-2'>
                  <Field
                    rows='6'
                    name='homeDescription'
                    as='textarea'
                    className='input-field'
                    placeholder='Home Description'
                  />
                </div>
                <ErrorMessage name='homeDescription'>
                  {ErrorMessageForm}
                </ErrorMessage>
                <div className='flex h-full w-full'>
                  <Field name='logo'>
                    {({ form }) => (
                      <div
                        className='group flex h-225 w-full cursor-pointer flex-col items-center justify-center
                 overflow-hidden rounded-lg border-2 border-dotted border-gray-300 md:h-340'>
                        {logoIsLoading ? (
                          <div className='relative top-0 w-[60%] overflow-hidden rounded-full bg-gray-200'>
                            <div
                              className='bg-orange-600 p-0.5 leading-none duration-300'
                              style={{ width: uploadProgressInfo + "%" }}></div>
                          </div>
                        ) : (
                          <>
                            {!logo ? (
                              <>
                                <label className='flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-center'>
                                  <IoCloudUploadOutline className='text-3xl text-gray-500 hover:text-gray-700' />
                                  <p className='text-gray-500 hover:text-gray-700'>
                                    Click here to upload an logo
                                  </p>
                                  <input
                                    className='h-0 w-0'
                                    type='file'
                                    onChange={(e) => {
                                      form.setFieldValue(
                                        "logo",
                                        e.target.files[0]
                                      );
                                      uploadLogo(e);
                                    }}
                                  />
                                </label>
                              </>
                            ) : (
                              <>
                                <div className='relative h-full w-full'>
                                  <img
                                    src={logo}
                                    alt='Selected Image'
                                    className='h-full w-full object-contain'
                                  />
                                  <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    type='button'
                                    className='absolute bottom-3 right-3 cursor-pointer rounded-full bg-red-500 
                              p-3 text-xl outline-none duration-300 hover:bg-red-400 hover:shadow-md'
                                    onClick={() => {
                                      setLogo(null);
                                      deleteLogo();
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
                  <ErrorMessage name='logo'>{ErrorMessageForm}</ErrorMessage>
                </div>
              </div>

              <div className='flex w-full flex-col gap-8'>
                <div className='flex w-full flex-col items-center gap-4 '>
                  <p className='w-full text-xl font-semibold text-textColor '>
                    About us info
                  </p>
                  <div className='w-full border-b-2' />
                </div>
                <div className='input-container gap-2 rounded-lg border-2'>
                  <Field
                    rows='6'
                    name='aboutUsDescription'
                    as='textarea'
                    className='input-field'
                    placeholder='About Us Description'
                  />
                </div>
                <ErrorMessage name='aboutUsDescription'>
                  {ErrorMessageForm}
                </ErrorMessage>

                <div className='flex h-full w-full'>
                  <Field name='aboutUsImage'>
                    {({ form }) => (
                      <div
                        className='group flex h-225 w-full cursor-pointer flex-col items-center justify-center
                 overflow-hidden rounded-lg border-2 border-dotted border-gray-300 md:h-340'>
                        {aboutUsIsLoading ? (
                          <div className='relative top-0 w-[60%] overflow-hidden rounded-full bg-gray-200'>
                            <div
                              className='bg-orange-600 p-0.5 leading-none duration-300'
                              style={{ width: uploadProgressInfo + "%" }}></div>
                          </div>
                        ) : (
                          <>
                            {!aboutUsImage ? (
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
                                        "aboutUsImage",
                                        e.target.files[0]
                                      );
                                      uploadAboutUsImage(e);
                                    }}
                                  />
                                </label>
                              </>
                            ) : (
                              <>
                                <div className='relative h-full w-full'>
                                  <img
                                    src={aboutUsImage}
                                    alt='Selected Image'
                                    className='h-full w-full object-cover'
                                  />
                                  <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    type='button'
                                    className='absolute bottom-3 right-3 cursor-pointer rounded-full bg-red-500 
                              p-3 text-xl outline-none duration-300 hover:bg-red-400 hover:shadow-md'
                                    onClick={() => {
                                      setAboutUsImage(null);
                                      deleteAboutUsImage();
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
                  <ErrorMessage name='aboutUsImage'>
                    {ErrorMessageForm}
                  </ErrorMessage>
                </div>
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
