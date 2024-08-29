// Định nghĩa kiểu dữ liệu cho từng bước trong hướng dẫn
interface CartStep {
  element: string;
  intro: string;
  position?: "top" | "bottom" | "left" | "right"; // Có thể thêm nếu cần
}

// Khai báo mảng các bước với kiểu dữ liệu CartStep[]
export const cartSteps: CartStep[] = [
  {
    element: ".btn-back-history",
    intro: "Click here to go back to the previous page.",
  },
  {
    element: ".cart",
    intro: "This is your cart. Review the items you have added here.",
  },
  {
    element: ".select-all",
    intro: "Click here to select items from your order.",
  },
  {
    element: ".cart-items-item",
    intro: "This is your cart.",
  },
  {
    element: ".cross",
    intro: "Click here to remove this item from your cart.",
  },
  {
    element: ".cart-total",
    intro: "Review your cart totals here.",
  },

  {
    element: ".btn-back-menu",
    intro: "Click here to return to the main menu.",
  },
  {
    element: ".cart-promocode-input",
    intro: "Enter your promo code here for discounts.",
  },
];
