// Định nghĩa kiểu dữ liệu cho từng bước trong hướng dẫn
interface LoginPopupStep {
  element: string;
  intro: string;
  position?: "top" | "bottom" | "left" | "right"; // Có thể thêm nếu cần
}

// Khai báo mảng các bước với kiểu dữ liệu LoginPopupStep[]
export const loginPopupIntroSteps: LoginPopupStep[] = [
  {
    element: ".login-popup-inputs",
    intro: "Fill in your login details here.",
  },
  {
    element: '.input-login[name="name"]',
    intro:
      "Enter your name here. This field is required only for the Sign Up page.",
  },
  {
    element: '.input-login[name="email"]',
    intro: "Enter your email address here.",
  },
  {
    element: '.input-login[name="password"]',
    intro:
      "Enter your password here. Make sure it meets the password criteria.",
  },
  {
    element: ".password-criteria",
    intro:
      "These are the password criteria that your password must meet for Sign Up.",
  },
  {
    element: 'button[type="submit"]',
    intro: "Click here to submit your login or sign up details.",
  },
  {
    element: ".container-terms",
    intro:
      "If you are signing up, you need to accept the terms and conditions.",
  },
  {
    element: ".btn-pass-generator",
    intro: "Click here to generate a strong password.",
  },
  {
    element: ".text-sign-up",
    intro: "Don't have an account? Create one here.",
  },
  {
    element: ".form-login-bottom",
    intro: "Here you can switch between Login and Sign Up.",
  },
];
