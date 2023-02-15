import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", data.id), data, {
    merge: true,
  });
};
// Saving new category

export const saveCategory = async (data) => {
  await setDoc(doc(firestore, "category", data.id), data, {
    merge: true,
  });
};

// Saving new reservation

export const saveReservation = async (data) => {
  await setDoc(doc(firestore, "reservation", data.id), data, {
    merge: true,
  });
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "asc"))
  );

  return items.docs.map((doc) => doc.data());
};

// getall food category
export const getAllCategories = async () => {
  const categories = await getDocs(
    query(collection(firestore, "category"), orderBy("id", "asc"))
  );

  return categories.docs.map((doc) => doc.data());
};

// remove food category
export const removeCategory = async (data) => {
  await deleteDoc(doc(firestore, "category", data.id));
};

// remove food category
export const removeItem = async (data) => {
  await deleteDoc(doc(firestore, "foodItems", data.id));
};
// update name field in category doc

export const updateCategory = async (data) => {
  await updateDoc(doc(firestore, "category", data.id), {
    name: data.name,
  });
};

// update fields in foodItems doc
export const updateItem = async (data) => {
  await updateDoc(doc(firestore, "foodItems", data.id), {
    category: data.category,
    description: data.description,
    file: data.file,
    price: data.price,
    title: data.title,
  });
};
export const updateItemCategory = async (data) => {
  await updateDoc(doc(firestore, "foodItems", data.id), {
    category: data.category,
  });
};

// Saving new settings
export const saveSettings = async (data) => {
  await setDoc(doc(firestore, "settings", data.id), data, {
    merge: true,
  });
};

// update fields in settings doc
export const updateSettings = async (data) => {
  await updateDoc(doc(firestore, "settings", data.id), {
    homeTitle: data.homeTitle,
    homeDescription: data.homeDescription,
    aboutUsDescription: data.aboutUsDescription,
    logo: data.logo,
    aboutUsImage: data.aboutUsImage,
    facebook: data.facebook,
    instagram: data.instagram,
    tiktok: data.tiktok,
  });
};

// get settings
export const getSettings = async () => {
  const settings = await getDocs(
    query(collection(firestore, "settings"), orderBy("id", "asc"))
  );

  return settings.docs.map((doc) => doc.data());
};
