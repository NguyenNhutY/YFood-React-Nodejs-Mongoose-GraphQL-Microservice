// Định nghĩa kiểu dữ liệu cho từng bước trong hướng dẫn
interface IntroStep {
  element: string;
  intro: string;
  position?: "top" | "bottom" | "left" | "right"; // Thêm nếu cần
}

// Khai báo mảng các bước với kiểu dữ liệu IntroStep[]
export const placeOrderIntroSteps: IntroStep[] = [
  {
    element: ".place-order-left",
    intro: "Fill in your delivery information here.",
  },
  {
    element: ".place-order-right .cart-total",
    intro: "Review your cart totals here.",
  },
  {
    element: 'button[type="submit"]',
    intro: "Click here to proceed to checkout.",
  },
  {
    element: ".btn-back-history",
    intro: "Click here to go back to the previous page.",
  },
];
