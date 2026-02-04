import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../utils/regex";
import { validateDOB } from "../validators/dob.validator"

export function validateUserResetPassword(values){
     const errors = {};

    if(!values.current_password) errors.current_password = "Current Password required"
    if(!values.new_password) errors.new_password = "New Password required"
    

    if(!PASSWORD_REGEX.test(values.new_password))
        errors.new_password = "Password must be 8+ character and should include uppercase, lowercase and number";

    if (values.new_password !== values.confirm_password)
        errors.confirm_password = "Passwords do not match";

    return errors;
}

export function validateUpdatedProfile(values){
  const errors = {};

  const dobError = validateDOB(values.dob);
  if (dobError) errors.dob = dobError;

  if (!EMAIL_REGEX.test(values.email)) {
        errors.email = "Invalid E-mail";
  }

  return errors;
}



export function validateResetPassword(password, confirmPassword) {
  const errors = {};

  if (!password) errors.password = "New password is required";
  else if (!PASSWORD_REGEX.test(password))
    errors.password =
      "Password must be 8+ characters and include uppercase, lowercase and number";

  if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
  else if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  return errors;
}
