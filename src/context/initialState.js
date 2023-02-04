import { fetchCart, fetchUser } from "../utils/fetchLocalStorage";

const userData = fetchUser();
const cartData = fetchCart();

export const initialState = {
  user: userData,
  foodItems: null,
  sidebarOpen: false,
  cartOpen: false,
  categories: null,
  cartItems: cartData,
};
