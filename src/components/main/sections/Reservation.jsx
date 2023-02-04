import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { HwButton, Title, MapView, ErrorMessageForm } from "../../shared";

export const Reservation = () => {
  const peopleAmount = [
    "1 person",
    "2 people",
    "3 people",
    "4 people",
    "5 people",
    "6 people",
    "7 people",
    "8 people",
    "9 people",
    "10 people",
  ];

  const getDates = () => {
    const today = new Date();
    const threeWeeksFromToday = new Date(
      today.getTime() + 21 * 24 * 60 * 60 * 1000
    );
    return {
      today: today.toISOString().substring(0, 10),
      threeWeeksFromToday: threeWeeksFromToday.toISOString().substring(0, 10),
    };
  };

  const initialValues = {
    name: "",
    date: "",
    amount: "",
    email: "",
    phone: "",
    ssn: "",
    note: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("You must add your full name"),
    date: Yup.date().required("A date is required"),
    hour: Yup.string().required("A hour is required"),

    amount: Yup.string().required("Assign a number is necessary"),
    phone: Yup.string()
      .matches(/^\d{9}$/, "Must contain a valid phone number")
      .required("A phone number is required"),
    email: Yup.string()
      .email("Must be a valid email address")
      .max(40, "Must be 40 characters or less")
      .required("You must add an email address"),
    ssn: Yup.string()
      .matches(/^\d{9}$/, "Must contain a valid social security number")
      .required("A social security number is required"),
    note: Yup.string().max(140, "Must be 140 characters or less"),
  });

  return (
    <>
      <MapView />

      <Title title='Reservation' />

      <div className='flex w-full justify-start'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setSubmitting(false);
              resetForm();
            }, 400);
          }}>
          <Form
            className='flex w-full flex-col items-center justify-center gap-4 rounded-xl border
           border-slate-200 bg-white p-8 shadow-lg shadow-slate-200 lg:w-[50%]'>
            <div className='flex w-full gap-6'>
              <div className='flex w-full'>
                <div className='input-container'>
                  <Field
                    name='date'
                    type='date'
                    min={getDates().today}
                    max={getDates().threeWeeksFromToday}
                    className='input-field'
                  />
                </div>

                <div className='input-container'>
                  <Field
                    name='hour'
                    type='time'
                    min='09:00'
                    max='18:00'
                    className='input-field'
                  />
                </div>
              </div>

              <Field
                name='amount'
                as='select'
                className='input-field cursor-pointer border-b-2'>
                <option value='' disabled>
                  Select a amount
                </option>
                {peopleAmount &&
                  peopleAmount.map((e, i) => (
                    <option key={i} value={e} className='text-textColor'>
                      {e}
                    </option>
                  ))}
              </Field>
            </div>
            <ErrorMessage name='date'>{ErrorMessageForm}</ErrorMessage>
            <ErrorMessage name='hour'>{ErrorMessageForm}</ErrorMessage>
            <ErrorMessage name='amount'>{ErrorMessageForm}</ErrorMessage>

            <div className='flex w-full gap-6'>
              <div className='input-container'>
                <Field
                  name='name'
                  type='text'
                  className='input-field'
                  placeholder='name'
                />
              </div>
              <div className='input-container'>
                <Field
                  name='email'
                  type='email'
                  className='input-field'
                  placeholder='example@mail.com'
                />
              </div>
            </div>
            <ErrorMessage name='name'>{ErrorMessageForm}</ErrorMessage>
            <ErrorMessage name='email'>{ErrorMessageForm}</ErrorMessage>

            <div className='flex w-full gap-6'>
              <div className='input-container'>
                <Field
                  name='phone'
                  type='tel'
                  className='input-field'
                  placeholder='+1-000-000-0000'
                />
              </div>
              <div className='input-container'>
                <Field
                  name='ssn'
                  type='text'
                  className='input-field'
                  placeholder='Security Social Number'
                />
              </div>
            </div>
            <ErrorMessage name='phone'>{ErrorMessageForm}</ErrorMessage>
            <ErrorMessage name='ssn'>{ErrorMessageForm}</ErrorMessage>

            <div className='input-container rounded-lg border-2'>
              <Field
                name='note'
                type='text'
                as='textarea'
                rows='5'
                className='input-field'
                placeholder='Note - Not Required'
              />
            </div>
            <ErrorMessage name='note'>{ErrorMessageForm}</ErrorMessage>

            <div className='flex w-full justify-end'>
              <HwButton title='Reserve' type='solidFull' />
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};
