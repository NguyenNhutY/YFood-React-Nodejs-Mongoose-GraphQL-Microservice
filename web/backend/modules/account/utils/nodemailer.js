import jwt from "jsonwebtoken";
import validator from "validator";

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

export const createToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
    subject: "User Registration",
  });
};
