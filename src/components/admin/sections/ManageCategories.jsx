import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { saveCategory } from "../../../utils/firebaseFunctions";
import {
  UpdateCategory,
  HwButton,
  Title,
  ErrorMessageForm,
} from "../../shared";
import { useStateValue } from "../../../context/StateProvider";
import { useFetchData } from "../../../hooks";

export const ManageCategories = () => {
  const [{ categories }] = useStateValue();
  const { fetchCategories } = useFetchData();
  const menuCategories = categories?.filter(
    (n) => n.name !== "Specials" && n.name !== "Presentation"
  );

  const initialValues = {
    category: "",
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("You must add a category"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      const data = {
        id: `${Date.now()}`,
        name: values.category,
      };

      saveCategory(data);
      setSubmitting(false);
      resetForm();
      fetchCategories();
    }, 400);
  };

  return (
    <>
      <Title title='Manage Categories' />
      <div className='flex h-full w-full flex-col items-center gap-6'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form
            className='flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white 
          p-8 shadow-lg shadow-slate-200 sm:flex-row md:w-[50%]'>
            <div className='flex w-full flex-col gap-4'>
              <div className='input-container'>
                <Field
                  name='category'
                  type='text'
                  className='input-field'
                  placeholder='Category'
                />
              </div>
              <ErrorMessage name='category'>{ErrorMessageForm}</ErrorMessage>
            </div>
            <div className='flex w-full justify-end sm:w-auto'>
              <HwButton title='Upload' type='solid' />
            </div>
          </Form>
        </Formik>
        <div className='flex w-full flex-wrap items-center gap-4 py-6 md:w-[50%]'>
          {menuCategories &&
            menuCategories.map((category) => (
              <UpdateCategory category={category} />
            ))}
        </div>
      </div>
    </>
  );
};
