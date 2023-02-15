import { fetchUser } from "../utils/fetchLocalStorage";

const userData = fetchUser();

export const initialState = {
  user: userData,
  foodItems: null,
  sidebarOpen: false,
  cartOpen: false,
  categories: null,
  cart: [],
  settings: null,
};
