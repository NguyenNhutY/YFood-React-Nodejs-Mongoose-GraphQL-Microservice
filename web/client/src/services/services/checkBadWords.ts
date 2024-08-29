import { Filter } from "bad-words";

const filter = new Filter();

const containsForbiddenWords = (text: string): boolean => {
  return filter.isProfane(text);
};

// Sử dụng trong biểu mẫu phản hồi
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .required("Message is required")
    .test("no-forbidden-words", "Message contains forbidden words", (value) => {
      if (!value) return true; // Skip if no value
      return !containsForbiddenWords(value); // Valid if no forbidden words
    }),
});
