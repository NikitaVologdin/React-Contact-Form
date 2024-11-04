import { containsNumbers, validEmail } from "./validation-utils";

const nameValidation = (value: string) => {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return { isValid: false, message: "This field is required" };
  }

  if (containsNumbers(trimmedValue)) {
    return { isValid: false, message: "Should not contain numbers" };
  }

  return { isValid: true, message: "" };
};

const emailValidation = (value: string) => {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0)
    return { isValid: false, message: "This field is required" };

  if (!validEmail(trimmedValue))
    return { isValid: false, message: "Please enter a valid email address." };

  return { isValid: true, message: "" };
};

const messageValidation = (value: string) => {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return { isValid: false, message: "This field is required" };
  }

  return { isValid: true, message: "" };
};

export { nameValidation, emailValidation, messageValidation };
