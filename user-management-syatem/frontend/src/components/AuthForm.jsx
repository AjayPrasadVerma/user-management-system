import {
  Form,
  useNavigation,
  json,
  redirect,
  useActionData,
  useSearchParams,
  Link,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import useInput from "../hooks/use-input";

function UserForm({ method, heading }) {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const actionData = useActionData();

  let inputValidate = (value) => value.trim() !== "";

  const navigation = useNavigation();

  const {
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(inputValidate);

  const {
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(inputValidate);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(inputValidate);

  const {
    value: enteredCPassword,
    isValid: enteredCPasswordIsValid,
    hasError: cpasswordInputHasError,
    inputChangeHandler: cpasswordChangeHandler,
    inputBlurHandler: cpasswordBlurHandler,
  } = useInput(inputValidate);

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
                  Please enter valid phone number.
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
                  <p className={classes["error-text"]}>
                    Please enter valid phone number.
                  </p>
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

/**
 * @description
 * making the API request to add new user and edit user details
 */

export const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();

  const userData = {
    name: data.get("name"),
    email: data.get("email"),
    phone: data.get("phone"),
  };

  console.log(userData);

  let url = "http://localhost:8181/users";

  if (method === "PUT") {
    const id = params.userId;
    url = "http://localhost:8181/users/" + id;
  }

  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not save company." }, { status: 500 });
    }

    return redirect("/users");
  } catch (error) {
    console.log(error);
  }
};

export default UserForm;
