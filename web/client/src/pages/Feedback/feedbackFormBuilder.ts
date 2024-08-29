// feedbackFormBuilder.ts
import * as Yup from "yup";

export interface FeedbackFormValues {
  name: string;
  email: string;
  message: string;
}

export class FeedbackFormBuilder {
  private readonly initialValues = {
    name: "",
    email: "",
    message: "",
  };

  public getInitialValues(): FeedbackFormValues {
    return this.initialValues;
  }

  public getValidationSchema() {
    return Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      message: Yup.string()
        .required("Message is required")
        .test(
          "no-forbidden-words",
          "Message contains forbidden words",
          (value) => {
            if (!value) return true; // Skip if no value
            const cleanedValue = cleanText(value);
            const forbiddenWordsInMessage = extractForbiddenWords(cleanedValue);
            return forbiddenWordsInMessage.length === 0; // Valid if no forbidden words
          }
        ),
    });
  }
}

// Utility functions for cleaning and extracting forbidden words
const cleanText = (text: string): string => {
  return text.replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ");
};

const normalizeForbiddenWords = (text: string): string[] => {
  return forbiddenWords.map((word) => word.replace(/\s+/g, "").toLowerCase());
};

const extractForbiddenWords = (text: string): string[] => {
  const cleanedText = cleanText(text).toLowerCase();
  const normalizedForbiddenWords = normalizeForbiddenWords(cleanedText);
  const foundWords = normalizedForbiddenWords.filter((word) =>
    cleanedText.includes(word)
  );
  return [...new Set(foundWords)];
};
