import { List } from "immutable";

export const SortingStrategy = (foodList: List<any>, order: "asc" | "desc") => {
  return foodList.sort((a, b) =>
    order === "asc"
      ? a.get("price") - b.get("price")
      : b.get("price") - a.get("price")
  );
};
