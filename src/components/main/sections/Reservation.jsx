import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { HwButton, Title, MapView, ErrorIconMessage } from "../../shared";
import { saveReservation } from "../../../utils/firebaseFunctions";
import { BsClock, BsCalendar4Week } from "react-icons/bs";

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
      .max(20, "Name should not exceed 20 characters")
      .required("Full name is required"),
    date: Yup.date().required("Date field is mandatory"),
    hour: Yup.string().required("Hour field is mandatory"),
    amount: Yup.string().required("Amount is a required field"),
    phone: Yup.string()
      .matches(/^\d{9}$/, "Phone number must be a 9 digit numeric value")
      .required("Phone number is mandatory"),
    email: Yup.string()
      .email("Please provide a valid email address")
      .max(40, "Email address should not exceed 40 characters")
      .required("Email is a required field"),
    ssn: Yup.string()
      .matches(
        /^\d{9}$/,
        "Social security number must be a 9 digit numeric value"
      )
      .required("Social security number is mandatory"),
    note: Yup.string().max(140, "Note should not exceed 140 characters"),
  });

  return (
    <>
      <Title title='Reservation' />
      <div
        className='flex w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg
           shadow-slate-200  lg:flex-row '>
        <div className='flex h-auto w-full '>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                const data = {
                  id: `${Date.now()}`,
                  name: values.name,
                  date: values.date,
                  amount: values.amount,
                  email: values.email,
                  phone: values.phone,
                  ssn: values.ssn,
                  note: values.note,
                };
                saveReservation(data);
                setSubmitting(false);
                resetForm();
              }, 400);
            }}>
            <Form className='flex w-full flex-col items-center justify-center gap-4 p-8 '>
              <div className='input-container'>
                <Field
                  name='name'
                  type='text'
                  className='input-field'
                  placeholder='Enter your full name'
                />
                <ErrorMessage name='name'>
                  {(msg) => <ErrorIconMessage msg={msg} />}
                </ErrorMessage>
              </div>

              <div className='flex w-full flex-col gap-6 md:flex-row'>
                <div className='input-container'>
                  <Field
                    name='amount'
                    as='select'
                    className='input-field cursor-pointer'>
                    <option value='' disabled>
                      Amount of people
                    </option>
                    {peopleAmount &&
                      peopleAmount.map((e, i) => (
                        <option key={i} value={e} className='text-textColor'>
                          {e}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage name='amount'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>

                <div className='input-container'>
                  <Field
                    name='email'
                    type='email'
                    className='input-field'
                    placeholder='example@mail.com'
                  />

                  <ErrorMessage name='email'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>
              </div>

              <div className='flex w-full flex-col gap-6 md:flex-row'>
                <div className='input-container'>
                  <Field
                    name='phone'
                    type='tel'
                    className='input-field'
                    placeholder='+1-000-000-0000'
                  />
                  <ErrorMessage name='phone'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>
                <div className='input-container'>
                  <Field
                    name='ssn'
                    type='text'
                    className='input-field'
                    placeholder='Security Social Number'
                  />
                  <ErrorMessage name='ssn'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>
              </div>

              <div className='flex w-full flex-col gap-6 md:flex-row'>
                <div className='input-container'>
                  <BsCalendar4Week className='ml-2 mb-[2px] text-xl text-lightText sm:hidden' />
                  <Field
                    name='date'
                    type='date'
                    min={getDates().today}
                    max={getDates().threeWeeksFromToday}
                    className='input-field'
                    placeholder='Add a date'
                  />
                  <ErrorMessage name='date'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>

                <div className='input-container'>
                  <BsClock className='ml-2 mb-[2px] text-xl text-lightText sm:hidden' />
                  <Field
                    name='hour'
                    type='time'
                    min='09:00'
                    max='18:00'
                    className='input-field'
                    placeholder='Add a hour'
                  />
                  <ErrorMessage name='hour'>
                    {(msg) => <ErrorIconMessage msg={msg} />}
                  </ErrorMessage>
                </div>
              </div>

              <div className='input-container'>
                <Field
                  name='note'
                  type='text'
                  as='textarea'
                  rows='5'
                  className='input-field'
                  placeholder='Note - Not Required'
                />
                <ErrorMessage name='note'>
                  {(msg) => <ErrorIconMessage msg={msg} />}
                </ErrorMessage>
              </div>
              <div className='flex w-full justify-end'>
                <HwButton title='Reserve' type='solidFull' />
              </div>
            </Form>
          </Formik>
        </div>

        <MapView />
      </div>
    </>
  );
};
