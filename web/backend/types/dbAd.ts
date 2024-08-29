import { assets } from "../assets/frontend_assets/assets";

// Định nghĩa interface cho cấu trúc của từng đối tượng trong mảng adData
interface AdDataItem {
  imageUrl: string;
  altText: string;
}

// Khai báo adData với kiểu dữ liệu là mảng của AdDataItem
const adData: AdDataItem[] = [
  { imageUrl: assets.food_1, altText: "Food 1" },
  { imageUrl: assets.food_2, altText: "Food 2" },
  { imageUrl: assets.food_3, altText: "Food 3" },
  { imageUrl: assets.food_4, altText: "Food 4" },
  { imageUrl: assets.food_5, altText: "Food 5" },
];

export default adData;
