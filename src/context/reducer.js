export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_SIDEBAR_SWITCH: "SET_SIDEBAR_SWITCH",
  SET_CATEGORIES_DATA: "SET_CATEGORIES_DATA",
  SET_CART_SWITCH: "SET_CART_SWITCH",
  SET_SETTINGS_DATA: "SET_SETTINGS_DATA",
  SET_ADD_ITEM_CART: "SET_ADD_ITEM_CART",
  SET_REMOVE_ITEM_CART: "SET_REMOVE_ITEM_CART",
  SET_INCREMENT_ITEM_CART: "SET_INCREMENT_ITEM_CART",
  SET_DECREMENT_ITEM_CART: "SET_DECREMENT_ITEM_CART",
  SET_EMPTY_CART: "SET_EMPTY_CART",
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
        cartOpen: action.cartOpen,
      };

    case actionType.SET_ADD_ITEM_CART:
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item.id === existingItem.id) {
              return {
                ...item,
                qty: item.qty ? item.qty + 1 : 1,
                newPrice: item.price ? item.price * (item.qty + 1) : item.price,
              };
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }
    case actionType.SET_REMOVE_ITEM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.cart.id),
      };
    case actionType.SET_INCREMENT_ITEM_CART:
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.cart.id) {
            return {
              ...item,
              qty: item.qty ? item.qty + 1 : 1,
              newPrice: item.price ? item.price * (item.qty + 1) : item.price,
            };
          }
          return item;
        }),
      };
    case actionType.SET_DECREMENT_ITEM_CART:
      return {
        ...state,
        cart: state.cart
          .map((item) => {
            if (item.id === action.cart.id) {
              return {
                ...item,
                qty: item.qty ? item.qty - 1 : 0,
                newPrice: item.price ? item.price * (item.qty - 1) : item.price,
              };
            }
            return item;
          })
          .filter((item) => item.qty !== 0),
      };
    case actionType.SET_EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
