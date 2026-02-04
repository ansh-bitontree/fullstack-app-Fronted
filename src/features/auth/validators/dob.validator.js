
function calculateAge(dob) {
  if (!dob) return null;

  const birthDate = new Date(dob);
  const today = new Date();

  if (birthDate > today) return null;

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export const validateDOB = (dob) => {
  if (!dob) return "Date of birth is required";

  const age = calculateAge(dob);

  if (age === null) return "Invalid date of birth";
  if (age < 18) return "You must be at least 18 years old";
  if (age > 110) return "Age cannot be greater than 110";

  return null;
};
