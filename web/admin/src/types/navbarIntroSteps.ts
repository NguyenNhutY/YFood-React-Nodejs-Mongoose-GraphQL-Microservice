// Định nghĩa kiểu dữ liệu cho từng bước trong hướng dẫn
interface IntroStep {
  element: string;
  intro: string;
  position?: "top" | "bottom" | "left" | "right"; // Có thể thêm nếu cần
}

// Khai báo mảng các bước với kiểu dữ liệu IntroStep[]
export const navbarIntroSteps: IntroStep[] = [
  {
    element: ".menu-toggle",
    intro: "This button toggles the menu.",
  },
  {
    element: ".navbar-menu",
    intro: "Navigate to different sections using these menu items.",
  },
  {
    element: ".navbar-search",
    intro: "Search for items here. Suggestions will appear as you type.",
  },
  {
    element: ".navbar-search-icon",
    intro: "View your cart and check out here.",
  },
  {
    element: ".btn-sign-in",
    intro: "Click here to sign in to your account.",
  },
];
