export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_SIDEBAR_SWITCH: "SET_SIDEBAR_SWITCH",
  SET_CATEGORIES_DATA: "SET_CATEGORIES_DATA",
  SET_CART_SWITCH: "SET_CART_SWITCH",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_SETTINGS_DATA: "SET_SETTINGS_DATA",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };
    case actionType.SET_SIDEBAR_SWITCH:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
    case actionType.SET_CATEGORIES_DATA:
      return {
        ...state,
        categories: action.categories,
      };
    case actionType.SET_SETTINGS_DATA:
      return {
        ...state,
        settings: action.settings,
      };
    case actionType.SET_CART_SWITCH:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    default:
      return state;
  }
};
