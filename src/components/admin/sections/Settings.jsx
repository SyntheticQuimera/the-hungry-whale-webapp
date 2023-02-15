import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { RiInstagramLine, RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandTiktok } from "react-icons/tb";
import { saveSettings, updateSettings } from "../../../utils/firebaseFunctions";
import { useFetchData, useUploadImage } from "../../../hooks";
import { Title, HwButton, ErrorIconMessage, FileField } from "../../shared";
import { useStateValue } from "../../../context/StateProvider";

export const Settings = () => {
  const [{ settings }] = useStateValue();
  const { fetchSettings } = useFetchData();
  const [uploadProgressLogoInfo, setUploadProgressLogoInfo] = useState(null);
  const [uploadProgressInfo, setUploadProgressInfo] = useState(null);
  const [logoIsLoading, setLogoIsLoading] = useState(false);
  const [aboutUsIsLoading, setAboutUsIsLoading] = useState(false);
  const [logo, setLogo] = useState(
    settings && settings.logo ? settings.logo : null
  );
  const [aboutUsImage, setAboutUsImage] = useState(
    settings && settings.aboutUsImage ? settings.aboutUsImage : null
  );

  const { uploadImage: uploadLogo, deleteImage: deleteLogo } = useUploadImage({
    imageAsset: logo,
    setImageAsset: setLogo,
    setUploadProgressInfo: setUploadProgressLogoInfo,
    setIsLoading: setLogoIsLoading,
  });

  const { uploadImage: uploadAboutUsImage, deleteImage: deleteAboutUsImage } =
    useUploadImage({
      imageAsset: aboutUsImage,
      setImageAsset: setAboutUsImage,
      setUploadProgressInfo,
      setIsLoading: setAboutUsIsLoading,
    });

  const initialValues = settings
    ? {
        homeTitle: settings.homeTitle || "",
        homeDescription: settings.homeDescription || "",
        aboutUsDescription: settings.aboutUsDescription || "",
        logo: "",
        aboutUsImage: "",
        facebook: settings.facebook || "",
        instagram: settings.instagram || "",
        tiktok: settings.tiktok || "",
      }
    : {
        homeTitle: "",
        homeDescription: "",
        aboutUsDescription: "",
        logo: "",
        aboutUsImage: "",
        facebook: "",
        instagram: "",
        tiktok: "",
      };

  const validationSchema = Yup.object().shape({
    homeTitle: Yup.string()
      .max(40, "Title must not exceed 40 characters")
      .required("Title is required"),
    homeDescription: Yup.string()
      .max(400, "Home description must not exceed 400 characters")
      .required("Home description is required"),
    aboutUsDescription: Yup.string()
      .max(800, "About Us description must not exceed 800 characters")
      .required("About Us description is required"),
    ...(logo
      ? ""
      : {
          logo: Yup.mixed()
            .test(
              "fileType",
              "Unsupported file format, only jpg, jpeg, png, svg, and gif are allowed",
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
            .required("Upload a image"),
        }),
    ...(aboutUsImage
      ? ""
      : {
          aboutUsImage: Yup.mixed()
            .test(
              "fileType",
              "Unsupported file format, only jpg, jpeg, png, svg, and gif are allowed",
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
            .required("Upload a image"),
        }),
    facebook: Yup.string().url("Facebook field must contain a valid URL"),
    instagram: Yup.string().url("Instagram field must contain a valid URL"),
    tiktok: Yup.string().url("TikTok field must contain a valid URL"),
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
        facebook: values.facebook,
        instagram: values.instagram,
        tiktok: values.tiktok,
      };
      if (settings) {
        data = { ...data, id: settings.id };
      }
      if (!settings) {
        data = { ...data, id: `${Date.now()}` };
      }
      if (settings) {
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
      <div className='flex w-full items-start justify-center '>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form
            className='flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 
          bg-white p-8 shadow-lg shadow-slate-200 lg:w-[70%]'>
            <div className='flex w-full flex-col gap-8'>
              <div className='flex w-full flex-col gap-4'>
                <div className='flex w-full flex-col items-center gap-4 '>
                  <p className='w-full text-xl font-semibold text-textColor '>
                    Social media
                  </p>
                  <div className='w-full border-b-2' />
                </div>

                <div className='input-container'>
                  <RiFacebookCircleLine className='ml-2 mb-[2px] text-xl text-lightText' />
                  <Field
                    name='facebook'
                    type='text'
                    className='input-field'
                    placeholder='Facebook'
                  />
                  <ErrorMessage name='facebook'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>

                <div className='input-container'>
                  <RiInstagramLine className='ml-2 mb-[2px] text-xl text-lightText' />
                  <Field
                    name='instagram'
                    type='text'
                    className='input-field'
                    placeholder='Instagram'
                  />
                  <ErrorMessage name='instagram'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>

                <div className='input-container'>
                  <TbBrandTiktok className='ml-2 mb-[2px] text-xl text-lightText' />

                  <Field
                    name='tiktok'
                    type='text'
                    className='input-field'
                    placeholder='Tiktok'
                  />
                  <ErrorMessage name='tiktok'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>
              </div>

              <div className='flex w-full flex-col gap-4'>
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
                  <ErrorMessage name='homeTitle'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>

                <div className='input-container'>
                  <Field
                    rows='6'
                    name='homeDescription'
                    as='textarea'
                    className='input-field'
                    placeholder='Home Description'
                  />
                  <ErrorMessage name='homeDescription'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>

                <div className='flex h-full w-full flex-col gap-4'>
                  <Field name='logo'>
                    {({ form }) => (
                      <FileField
                        title='Click here to upload an logo'
                        form={form}
                        errorName='logo'
                        isLoading={logoIsLoading}
                        uploadProgressInfo={uploadProgressLogoInfo}
                        imageAsset={logo}
                        setImageAsset={setLogo}
                        deleteImage={deleteLogo}
                        uploadImage={uploadLogo}
                      />
                    )}
                  </Field>
                </div>
              </div>

              <div className='flex w-full flex-col gap-4'>
                <div className='flex w-full flex-col items-center gap-4 '>
                  <p className='w-full text-xl font-semibold text-textColor '>
                    About us info
                  </p>
                  <div className='w-full border-b-2' />
                </div>
                <div className='input-container'>
                  <Field
                    rows='6'
                    name='aboutUsDescription'
                    as='textarea'
                    className='input-field'
                    placeholder='About Us Description'
                  />
                  <ErrorMessage name='aboutUsDescription'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>

                <div className='flex h-full w-full flex-col gap-4'>
                  <Field name='aboutUsImage'>
                    {({ form }) => (
                      <FileField
                        title='Click here to upload an image'
                        form={form}
                        errorName='aboutUsImage'
                        isLoading={aboutUsIsLoading}
                        uploadProgressInfo={uploadProgressInfo}
                        imageAsset={aboutUsImage}
                        setImageAsset={setAboutUsImage}
                        deleteImage={deleteAboutUsImage}
                        uploadImage={uploadAboutUsImage}
                      />
                    )}
                  </Field>
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
