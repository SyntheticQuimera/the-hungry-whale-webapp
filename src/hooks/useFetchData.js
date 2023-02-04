import { useStateValue } from "../context/StateProvider";
import { getAllCategories, getAllFoodItems } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";

export const useFetchData = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  const fetchCategories = async () => {
    await getAllCategories().then((data) => {
      dispatch({
        type: actionType.SET_CATEGORIES_DATA,
        categories: data,
      });
    });
  };

  return {
    foodItems,
    fetchData,
    fetchCategories,
  };
};
