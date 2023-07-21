import {
  Form,
  useNavigation,
  useActionData,
  useSearchParams,
  Link,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import useInput from "../hooks/use-input";

function UserForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const actionData = useActionData();

  let inputNameValidate = (value) => value.trim().length > 3;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let inputEmailValidate = (value) => emailRegex.test(value);

  const navigation = useNavigation();

  const {
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(inputNameValidate);

  const {
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(inputEmailValidate);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(inputNameValidate);

  const {
    value: enteredCPassword,
    isValid: enteredCPasswordIsValid,
    hasError: cpasswordInputHasError,
    inputChangeHandler: cpasswordChangeHandler,
    inputBlurHandler: cpasswordBlurHandler,
  } = useInput(inputNameValidate);

  let formIsValid = false;

  if (!isLogin) {
    if (
      enteredNameIsValid &&
      enteredEmailIsValid &&
      enteredPasswordIsValid &&
      enteredCPassword === enteredPassword &&
      enteredCPasswordIsValid
    ) {
      formIsValid = true;
    }
  } else if (isLogin) {
    if (enteredEmailIsValid && enteredPassword) {
      formIsValid = true;
    }
  }

  const enteredUserName = nameInputHasError
    ? classes.invalid
    : classes["form-control"];

  const enteredUserEmail = emailInputHasError
    ? classes.invalid
    : classes["form-control"];

  const enteredUserPassword = passwordInputHasError
    ? classes.invalid
    : classes["form-control"];

  const enteredUserCPassword = cpasswordInputHasError
    ? classes.invalid
    : classes["form-control"];

  const isSubmiitting = navigation.state === "submitting";

  return (
    <>
      <div className={classes["form-container"]}>
        <div id={classes["sub-container"]}>
          <h1>{isLogin ? "Log in" : "Create Account"}</h1>
          {actionData && actionData.message && <p>{actionData.message}</p>}
          <Form method="post">
            {!isLogin && (
              <div className={enteredUserName}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onBlur={nameBlurHandler}
                  onChange={nameChangeHandler}
                />
                {nameInputHasError ? (
                  <p className={classes["error-text"]}>
                    Please enter valid name.
                  </p>
                ) : (
                  ""
                )}
              </div>
            )}

            <div className={enteredUserEmail}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                name="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
              {emailInputHasError ? (
                <p className={classes["error-text"]}>
                  Please enter valid email.
                </p>
              ) : (
                ""
              )}
            </div>

            <div className={enteredUserPassword}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
              {passwordInputHasError ? (
                <p className={classes["error-text"]}>
                  Please enter valid password.
                </p>
              ) : (
                ""
              )}
            </div>

            {!isLogin && (
              <div className={enteredUserCPassword}>
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  id="cpassword"
                  type="password"
                  name="password_confirmation"
                  onChange={cpasswordChangeHandler}
                  onBlur={cpasswordBlurHandler}
                />
                {cpasswordInputHasError ? (
                  <p className={classes["error-text"]}>Please does't match.</p>
                ) : (
                  ""
                )}
              </div>
            )}

            <div className={classes.actions}>
              <button
                className={classes.saveBtn}
                disabled={isSubmiitting || !formIsValid}
              >
                {isSubmiitting
                  ? "Submitting..."
                  : isLogin
                  ? "Login"
                  : "Create Account"}
              </button>
            </div>
          </Form>
        </div>
      </div>
      <div className={classes.action}>
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
          {isLogin ? "Create Account" : "Login"}
        </Link>
      </div>
    </>
  );
}

export default UserForm;
