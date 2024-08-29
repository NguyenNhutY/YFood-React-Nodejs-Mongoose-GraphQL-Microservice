// Định nghĩa kiểu dữ liệu cho từng bước trong hướng dẫn
interface IntroStep {
  element: string;
  intro: string;
  position?: "top" | "bottom" | "left" | "right"; // Có thể thêm nếu cần
}

// Khai báo mảng các bước với kiểu dữ liệu IntroStep[]
export const homeIntroSteps: IntroStep[] = [
  {
    element: ".header",
    intro:
      "Welcome to the Header! This section contains the main navigation and branding.",
  },

  {
    element: ".explore-menu",
    intro: "Explore the menu options here to find your favorite food items.",
  },
  {
    element: ".food-display",
    intro:
      "This section displays the food items based on your selected category and search criteria.",
  },
  {
    element: ".app-download",
    intro: "Download our app to get more features and benefits.",
  },
  {
    element: ".cta",
    intro: "Click this button to Quiz have Promo Code",
  },
  {
    element: ".btn-top",
    intro: "Click this button to quickly return to the top of the page.",
  },
  {
    element: ".toggle-btn",
    intro: "Click this button to quickly contract with chatbot.",
  },
];
