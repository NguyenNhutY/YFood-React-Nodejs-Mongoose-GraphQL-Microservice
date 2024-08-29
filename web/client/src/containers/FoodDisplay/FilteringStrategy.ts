import { List } from "immutable";
import { FoodItemType } from "./FoodDisplay";

export const filterFoodItems = (
  foodList: List<FoodItemType>,
  category: string,
  searchName: string
) => {
  return foodList.filter((item) => {
    const categoryMatch =
      category === "All" || category === item.get("category");
    const searchNameMatch = item
      .get("name")
      .toLowerCase()
      .includes(searchName.toLowerCase());
    console.log("Food List:", foodList);

    return categoryMatch && searchNameMatch;
  });
};
