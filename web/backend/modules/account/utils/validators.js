import validator from "validator";
import bcrypt from "bcrypt"; // Đảm bảo import bcrypt
import { ApolloError } from "apollo-server-express"; // Đảm bảo import ApolloError

export const isValidPassword = (password) => {
  const minLength = validator.isLength(password, { min: 8, max: 100 });
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
  );
};

export const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw new ApolloError("Invalid email format", "INVALID_EMAIL_FORMAT"); // Sử dụng ApolloError để thống nhất với các lỗi khác
  }
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new ApolloError(
      "ConfirmPassword does not match",
      "PASSWORD_MISMATCH"
    );
  }
};

export const validatePassword = async (inputPassword, storedPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, storedPassword);
  if (!isMatch) {
    throw new ApolloError("Invalid password", "INVALID_PASSWORD");
  }
};
