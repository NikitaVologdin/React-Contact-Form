import { useState } from "react";

type validationStatusType = false | true;
type errorType = null | string;

export default function useInputChecked(type: string, errorMessage: string) {
  const [isValid, setIsValid] = useState<validationStatusType>(false);
  const [error, setError] = useState<errorType>("");

  const validate = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>(
      `input[type="${type}"]`
    );
    for (const input of inputs) {
      if (input.checked) {
        setError("");
        setIsValid(true);
        break;
      } else {
        setError(errorMessage);
        setIsValid(false);
      }
    }
  };

  const inputHandler = () => {
    validate();
  };

  return {
    isValid,
    error,
    validate,
    inputHandler,
  };
}
