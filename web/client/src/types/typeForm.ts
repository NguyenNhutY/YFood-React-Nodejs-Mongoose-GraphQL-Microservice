// types.ts

export interface FormValues {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface LoginPopupProps {
  setShowLogin: (show: boolean) => void;
  currState: "Login" | "Sign Up";
  setCurrState: (state: "Login" | "Sign Up") => void;
  showModalPolicy: boolean;
  setShowModalPolicy: (show: boolean) => void;
  showPasswordGenerator: boolean;
  setShowPasswordGenerator: (show: boolean) => void;
  passwordValidation: {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
  validatePassword: (password: string) => void;
  showPasswordCriteria: boolean;
  setShowPasswordCriteria: (show: boolean) => void;
  handleOverlayClick: () => void;
  handleSubmit: (values: FormValues) => void;
  loginPopupIntroSteps: any; // Thay đổi `any` thành kiểu dữ liệu cụ thể nếu có
  assets: {
    cross_icon: string;
  };
}
