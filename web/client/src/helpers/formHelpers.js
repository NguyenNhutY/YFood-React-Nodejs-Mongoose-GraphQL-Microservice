// src/helpers/formHelpers.js
export const validateForm = (values) => {
  const errors = {};
  const {
    firstName,
    lastName,
    emailAddress,
    street,
    city,
    state,
    zipCode,
    country,
    phone,
  } = values;

  if (!firstName) errors.firstName = "First name is required";
  if (!lastName) errors.lastName = "Last name is required";
  if (!emailAddress) errors.emailAddress = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(emailAddress))
    errors.emailAddress = "Invalid email address";
  if (!street) errors.street = "Street is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!zipCode) errors.zipCode = "Zip code is required";
  if (!country) errors.country = "Country is required";
  if (!phone) errors.phone = "Phone is required";
  else if (!/^[0-9]{10,15}$/.test(phone))
    errors.phone = "Phone number must be between 10 and 15 digits";

  return errors;
};

export const handleFormSubmit = (values, setShowModalCompleted) => {
  console.log("Order submitted:", values);
  setShowModalCompleted(true);
};
