import { useRef, useContext } from "react";
import { notificationContext } from "./store/notificationContext";
import useInput from "./hooks/useInput";
import {
  nameValidation,
  emailValidation,
  messageValidation,
} from "./lib/validators";
import Notification from "./components/Notification";
import useInputChecked from "./hooks/useInputChecked";
import { AnimatePresence } from "framer-motion";
import Error from "./components/Error";

export default function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const ctx = useContext(notificationContext);

  const {
    value: nameValue,
    setValue: setNameValue,
    validate: validateName,
    isValid: nameIsValid,
    error: nameError,
    inputHandler: nameInputHandler,
    blurHandler: nameBlurHandler,
  } = useInput(nameValidation);
  const {
    value: lastNameValue,
    setValue: setLastNameValue,
    validate: validateLastName,
    isValid: lastNameIsValid,
    error: lastNameError,
    inputHandler: lastNameInputHandler,
    blurHandler: lastNameBlurHandler,
  } = useInput(nameValidation);
  const {
    value: emailValue,
    setValue: setEmailValue,
    validate: validateEmail,
    isValid: emailIsValid,
    error: emailError,
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
  } = useInput(emailValidation);
  const {
    isValid: queryIsValid,
    error: queryError,
    validate: validateQuery,
    inputHandler: queryInputHandler,
  } = useInputChecked("radio", "Please select a query type");
  const {
    isValid: consentmentIsValid,
    error: consentmentError,
    validate: validateConsentment,
    inputHandler: consentmentInputHandler,
  } = useInputChecked(
    "checkbox",
    "To submit this form, please consent to being contacted"
  );
  const {
    value: messageValue,
    setValue: setMessageValue,
    validate: validateMessage,
    isValid: messageIsValid,
    error: messageError,
    inputHandler: messageInputHandler,
    blurHandler: messageBlurHandler,
  } = useInput(messageValidation);

  function validateForm() {
    validateName();
    validateLastName();
    validateEmail();
    validateQuery();
    validateMessage();
    validateConsentment();
  }

  function resetForm() {
    formRef.current?.reset();
    setNameValue("");
    setLastNameValue("");
    setEmailValue("");
    setMessageValue("");
  }

  // async function fetchData(target: HTMLFormElement) {
  //   const fd = new FormData(target);
  //   const fdObject = Object.fromEntries(fd.entries());
  //   try {
  //     const response = await fetch("", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(fdObject),
  //     });
  //     const json = await response.json();
  //     if (response.ok) {
  //       return { status: "success", message: json.message };
  //     } else {
  //       console.error("");
  //     }
  //   } catch (e: unknown) {
  //     if (e instanceof Error) {
  //       return { status: "failure", message: e.message };
  //     }
  //   }
  // }

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();
    if (
      nameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      queryIsValid &&
      messageIsValid &&
      consentmentIsValid
    ) {
      resetForm();
      const message = "Thanks for completing the form. We’ll be in touch soon!";
      // (await fetchData(event.currentTarget));
      ctx.setNotification({ status: "success", message });
    }
  };
  return (
    <>
      <AnimatePresence>
        {ctx.isNotificationShown && (
          <Notification
            status={ctx.notification?.status}
            message={ctx.notification?.message}
          />
        )}
      </AnimatePresence>
      <section className="form-section">
        <h1 className="form-section__title">Contact Us</h1>
        <form className="form" onSubmit={formSubmitHandler} ref={formRef}>
          <fieldset className="form__fieldset">
            <div className="form-control">
              <label className="form-control__label" htmlFor="name">
                First Name<span className="asterisk"> *</span>
              </label>
              <input
                className="form-control__input"
                id="name"
                name="name"
                type="text"
                autoComplete="given-name"
                aria-invalid={nameIsValid ? "false" : "true"}
                aria-describedby="name-error"
                value={nameValue}
                onChange={nameInputHandler}
                onBlur={nameBlurHandler}
              />
              <Error isValid={nameIsValid} error={nameError} id="name-error" />
            </div>
            <div className="form-control">
              <label className="form-control__label" htmlFor="surname">
                Last Name<span className="asterisk"> *</span>
              </label>
              <input
                className="form-control__input"
                id="surname"
                name="surname"
                type="text"
                autoComplete="family-name"
                aria-invalid={lastNameIsValid ? "false" : "true"}
                aria-describedby="surname-error"
                value={lastNameValue}
                onChange={lastNameInputHandler}
                onBlur={lastNameBlurHandler}
              />
              <Error
                isValid={lastNameIsValid}
                error={lastNameError}
                id="surname-error"
              />
            </div>
            <div className="form-control form-control__email">
              <label className="form-control__label" htmlFor="email">
                Email Address<span className="asterisk"> *</span>
              </label>
              <input
                className="form-control__input"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={emailIsValid ? "false" : "true"}
                aria-describedby="email-error"
                value={emailValue}
                onChange={emailInputHandler}
                onBlur={emailBlurHandler}
              />
              <Error
                isValid={emailIsValid}
                error={emailError}
                id="email-error"
              />
            </div>
          </fieldset>
          <fieldset className="form__fieldset" id="query">
            <legend className="form-control__label">
              Query Type <span className="asterisk"> *</span>
            </legend>
            <div className="form-control">
              <input
                className="form-control__input"
                id="general"
                name="query-type"
                value="general-enquiry"
                type="radio"
                aria-invalid={queryIsValid ? "false" : "true"}
                aria-describedby="enquiry-error"
                onClick={queryInputHandler}
              />
              <label className="form-control__label" htmlFor="general">
                General Enquiry
              </label>
            </div>
            <div className="form-control">
              <input
                className="form-control__input"
                id="support"
                name="query-type"
                value="support-request"
                type="radio"
                aria-invalid="false"
                aria-describedby="enquiry-error"
                onClick={queryInputHandler}
              />
              <label className="form-control__label" htmlFor="support">
                Support Request
              </label>
            </div>
            <Error
              isValid={queryIsValid}
              error={queryError}
              id="enquiry-error"
            />
          </fieldset>
          <fieldset className="form__fieldset">
            <div className="form-control">
              <label className="form-control__label" htmlFor="message">
                Message <span className="asterisk"> *</span>
              </label>
              <textarea
                className="form-control__input"
                id="message"
                name="message"
                aria-invalid={messageIsValid ? "false" : "true"}
                aria-describedby="message-error"
                maxLength={250}
                minLength={5}
                rows={10}
                value={messageValue}
                onChange={messageInputHandler}
                onBlur={messageBlurHandler}
              ></textarea>
              <Error
                isValid={messageIsValid}
                error={messageError}
                id="message-error"
              />
            </div>
          </fieldset>
          <fieldset className="form__fieldset" id="consentment-check">
            <div className="form-control">
              <input
                className="form-control__input"
                id="consentment"
                name="consentment"
                type="checkbox"
                aria-invalid={consentmentIsValid ? "false" : "true"}
                aria-describedby="consentment-error"
                onClick={consentmentInputHandler}
              />
              <label className="form-control__label" htmlFor="consentment">
                <div>
                  I hereby consent to being contacted by the team
                  <span className="asterisk"> *</span>
                </div>
              </label>
              <Error
                isValid={consentmentIsValid}
                error={consentmentError}
                id="consentment-error"
              />
            </div>
          </fieldset>
          <button className="form__submit">submit</button>
        </form>
      </section>
    </>
  );
}
