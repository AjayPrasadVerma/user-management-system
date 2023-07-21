import {
  Form,
  useNavigation,
  useNavigate,
  json,
  redirect,
  useActionData,
} from "react-router-dom";
import { getAuthToken } from "../util/auth";
import classes from "./UserForm.module.css";
import useInput from "../hooks/use-input";

function UserForm({ method, userData, heading }) {
  const actionData = useActionData();

  let inputValidate = false;
  let inputEmailValidate = false;

  if (userData) {
    inputValidate = (value) => true;
  } else if (!userData) {
    inputValidate = (value) => value.trim().length > 3;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    inputEmailValidate = (value) => emailRegex.test(value);
  }

  const navigation = useNavigation();
  const navigate = useNavigate();

  const cancelHandler = () => {
    navigate("..");
  };

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
  } = useInput(inputEmailValidate);

  const {
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInput(inputValidate);

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid && enteredPhoneIsValid) {
    formIsValid = true;
  }

  let nameInputError = false;
  let emailInputError = false;
  let phoneInputError = false;

  if (actionData && actionData.errors) {
    const { name, location, about } = actionData.errors;

    if (name) {
      nameInputError = true;
    }

    if (location) {
      emailInputError = true;
    }

    if (about) {
      phoneInputError = true;
    }
  }

  const enteredUserName =
    nameInputHasError || nameInputError
      ? classes.invalid
      : classes["form-control"];

  const enteredUserEmail =
    emailInputHasError || emailInputError
      ? classes.invalid
      : classes["form-control"];

  const enteredUserPhoneno =
    phoneInputHasError || phoneInputError
      ? classes.invalid
      : classes["form-control"];

  const isSubmiitting = navigation.state === "submitting";

  return (
    <div className={classes["form-container"]}>
      <div id={classes["sub-container"]}>
        <h1>{heading}</h1>

        <Form method={method}>
          <div className={enteredUserName}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              onBlur={nameBlurHandler}
              onChange={nameChangeHandler}
              defaultValue={userData ? userData.name : ""}
            />
            {nameInputHasError || nameInputError ? (
              <p className={classes["error-text"]}>Please enter valid name.</p>
            ) : (
              ""
            )}
          </div>
          <div className={enteredUserEmail}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              defaultValue={userData ? userData.email : ""}
            />
            {emailInputHasError || emailInputError ? (
              <p className={classes["error-text"]}>Please enter valid email.</p>
            ) : (
              ""
            )}
          </div>

          <div className={enteredUserPhoneno}>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
              defaultValue={userData ? userData.phone : ""}
            />
            {phoneInputHasError || phoneInputError ? (
              <p className={classes["error-text"]}>
                Please enter valid phone number.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className={classes.actions}>
            <button
              type="button"
              onClick={cancelHandler}
              disabled={isSubmiitting}
            >
              Cancel
            </button>
            <button
              className={classes.saveBtn}
              disabled={isSubmiitting || !formIsValid}
            >
              {isSubmiitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </Form>
      </div>
    </div>
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

  let url = "http://localhost:8181/users";

  if (method === "PUT") {
    const id = params.userId;
    url = "http://localhost:8181/users/" + id;
  }

  const token = getAuthToken();

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not save user." }, { status: 500 });
    }

    return redirect("/users");
  } catch (error) {
    console.log(error);
  }
};

export default UserForm;
