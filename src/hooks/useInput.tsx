import { useState } from "react";

type validationStatusType = null | false | true;
type errorType = null | string;

export default function useInput(
  validation: (value: string) => { isValid: boolean; message: string }
) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState<validationStatusType>(null);
  const [error, setError] = useState<errorType>("");

  const inputHandler = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.currentTarget.value;
    setValue(value);
  };

  const validate = () => {
    const { isValid, message } = validation(value);
    setIsValid(isValid);
    if (!isValid) setError(message);
  };

  const blurHandler = () => {
    validate();
  };

  return {
    value,
    setValue,
    validate,
    isValid,
    error,
    inputHandler,
    blurHandler,
  };
}
