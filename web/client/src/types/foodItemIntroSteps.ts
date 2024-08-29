// Định nghĩa interface cho từng bước giới thiệu
interface FoodItemIntroStep {
  element: string;
  intro: string;
  position?: string; // position là tùy chọn, có thể không có
  // Có thể thêm các thuộc tính khác nếu cần
}

// Khai báo foodItemIntroSteps với kiểu dữ liệu là mảng của FoodItemIntroStep
export const foodItemIntroSteps: FoodItemIntroStep[] = [
  {
    element: ".food-item-image",
    intro: "This is the image of the food item.",
    position: "bottom",
  },
  {
    element: ".add",
    intro: "Click here to add this item to your cart.",
    position: "bottom",
    // This step will be conditional
  },
  {
    element: ".food-item-counter",
    intro: "Here you can adjust the quantity of the item in your cart.",
    position: "top",
    // This step will be conditional
  },
  {
    element: ".food-item-info",
    intro: "This section provides details about the food item.",
    position: "right",
  },
  {
    element: ".food-item-btn-toggle-modal",
    intro: "Click to view more details about the food item.",
    position: "left",
  },
];

export default foodItemIntroSteps;
