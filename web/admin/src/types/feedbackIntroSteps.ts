interface FeedbackIntroStep {
  element: string;
  intro: string;
}

// Khai báo feedbackIntroSteps với kiểu dữ liệu là mảng của FeedbackIntroStep
export const feedbackIntroSteps: FeedbackIntroStep[] = [
  {
    element: ".btn-back-history",
    intro: "Click here to go back to the previous page.",
  },
  {
    element: ".feedback-form-container",
    intro: "This is the feedback form. Please fill out the fields below.",
  },
  {
    element: ".form-group:nth-of-type(1)",
    intro: "Enter your name here.",
  },
  {
    element: ".form-group:nth-of-type(2)",
    intro: "Enter your email address here.",
  },
  {
    element: ".form-group:nth-of-type(3)",
    intro: "Enter your message here.",
  },
  {
    element: ".form-group:nth-of-type(4)",
    intro: "Enter your image or video here.",
  },
  {
    element: 'button[type="submit"]',
    intro: "Click here to submit your feedback.",
  },
];
