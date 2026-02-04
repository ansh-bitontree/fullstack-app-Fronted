import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../utils/regex";
import { validateDOB } from "../validators/dob.validator";

export function validateLogin(values){
    const errors = {};

    if(!EMAIL_REGEX.test(values.email)) errors.email = "Invalid E-mail";
    if(!values.email) errors.email = "E-mail required";
    if (!values.password) errors.password = "Password required";
    return errors
}

export function validateSingup(values) {
  const errors = {};

  if (!values.username?.trim()) {
    errors.username = "Username required";
  }

  if (!values.email) {
    errors.email = "E-mail required";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Invalid E-mail";
  }

  if (!values.address?.trim()) {
    errors.address = "Address required";
  }

  const dobError = validateDOB(values.dob);
  if (dobError) errors.dob = dobError;

  if (!values.gender) {
    errors.gender = "Gender required";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (!PASSWORD_REGEX.test(values.password)) {
    errors.password =
      "Password must be at least 8 characters and include uppercase, lowercase, and number";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}




