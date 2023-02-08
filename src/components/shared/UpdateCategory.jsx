import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { BiEditAlt, BiCheck } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import {
  removeCategory,
  updateCategory,
  updateItemCategory,
} from "../../utils/firebaseFunctions";
import { useStateValue } from "../../context/StateProvider";
import { useFetchData } from "../../hooks";
import { ErrorMessageForm } from "./ErrorMessageForm";

export const UpdateCategory = ({ category }) => {
  const [{ foodItems }] = useStateValue();
  const { fetchCategories, fetchData } = useFetchData();
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  const validationSchema = Yup.object().shape({
    updateCategory: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("You must add a category"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      foodItems.forEach((item) => {
        if (item.category === category.name) {
          const itemData = {
            id: item.id,
            category: values.updateCategory,
          };
          updateItemCategory(itemData);
        }
      });
      const data = {
        id: category.id,
        name: values.updateCategory,
      };

      updateCategory(data);
      setSubmitting(false);
      fetchCategories();
      fetchData();
      setEditingCategory(null);
    }, 400);
  };

  return (
    <div
      key={category.id}
      className='mb-4 flex min-w-fit items-center justify-between gap-4 rounded-lg border-none bg-white px-4 py-3 text-xs font-semibold tracking-wider text-hoverTextColor shadow-md shadow-slate-200 outline-none'>
      {editingCategory === category.id ? (
        <Formik
          initialValues={{
            updateCategory: category.name,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <Field
              className='border-b bg-transparent pb-2 outline-none'
              name='updateCategory'
              type='text'
              placeholder={category.name}
            />
            <button className='relative top-[6px]'>
              <BiCheck className='cursor-pointer text-lg duration-300 hover:scale-150 hover:text-lime-500' />
            </button>
            <ErrorMessage name='updateCategory'>
              {ErrorMessageForm}
            </ErrorMessage>
          </Form>
        </Formik>
      ) : (
        <>
          <p>{category.name}</p>
          <BiEditAlt
            onClick={() => setEditingCategory(category.id)}
            className='cursor-pointer text-lg duration-300 hover:scale-150 hover:text-orange-600'
          />
        </>
      )}
      <TiDelete
        onClick={() => {
          setDeleteModal(category.id);
          fetchCategories();
        }}
        className='cursor-pointer text-lg duration-300 hover:scale-150 hover:text-red-500'
      />
      {deleteModal === category.id && (
        <div className='fixed left-0 top-0 z-50 flex h-full w-screen items-center justify-center bg-slate-100/60 backdrop-blur-md'>
          <div className='flex w-80 flex-col gap-4 rounded-lg bg-white p-6 shadow-md shadow-slate-200 '>
            <p className='text-base text-textColor '>
              This action delete the category and all items in there. Are you
              sure?
            </p>
            <div className=' flex items-center justify-end gap-6'>
              <button
                onClick={() => {
                  removeCategory(category);
                  setDeleteModal(null);
                }}
                className='flex w-20 justify-center rounded-lg border-2 border-orange-600 py-[6px] px-[14px] text-center text-orange-600'>
                Yes
              </button>
              <button
                onClick={() => setDeleteModal(null)}
                className='flex w-20 justify-center rounded-lg bg-lime-500 py-2 px-4 text-center text-white'>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
