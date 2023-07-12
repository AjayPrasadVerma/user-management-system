import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, getUsers } from "../service/api";
import { userAction } from "../store/user-silce";
import classes from "./UserForm.module.css";
import { useEffect } from "react";

let initialState = { name: "", email: "", phone: "" };

function UserForm({ setUpdate, updateUserData, method }) {
  const [user, setUser] = useState(initialState);
  const [nameInputError, setNameInputError] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [phoneInputError, setPhoneInputError] = useState(false);
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    setUser((currentUser) => {
      return { ...currentUser, [event.target.name]: event.target.value };
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const allUsers = await getUsers();
      dispatch(userAction.getAllUser(allUsers));
    };
    fetchUser();
  }, [dispatch]);

  const validate = (response) => {
    if (response && response.errors) {
      const { name, email, phone } = response.errors;

      if (name) {
        setNameInputError(true);
      } else {
        setNameInputError(false);
      }

      if (email) {
        setEmailInputError(true);
      } else {
        setEmailInputError(false);
      }

      if (phone) {
        setPhoneInputError(true);
      } else {
        setPhoneInputError(false);
      }
    } else if (updateUserData) {
      setNameInputError(false);
      setEmailInputError(false);
      setPhoneInputError(false);
      dispatch(userAction.updateUser(response));
      setUser(initialState);
    } else {
      setNameInputError(false);
      setEmailInputError(false);
      setPhoneInputError(false);
      dispatch(userAction.addUser(response));
      setUser(initialState);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await addUser(user, method);
    validate(response);
  };

  useEffect(() => {
    if (updateUserData) {
      setUser(updateUserData);
    }
  }, [updateUserData]);

  const updateUser = async (event) => {
    event.preventDefault();
    const response = await addUser(user, method);
    validate(response);
    setUpdate(null);
  };

  const cancelHandler = () => {
    setUser(initialState);
    setUpdate(null);
  };

  return (
    <>
      <div className={classes["form-container"]}>
        <div id={classes["sub-container"]}>
          <form onSubmit={!updateUserData ? onSubmitHandler : updateUser}>
            <div className={classes["form-control"]}>
              <label htmlFor="name">Name</label>
              <br />
              <input
                id="name"
                type="text"
                name="name"
                value={user.name}
                onChange={onChangeHandler}
              />
              {nameInputError ? (
                <p className={classes["error-text"]}>
                  Please enter company name.
                </p>
              ) : (
                ""
              )}
            </div>
            <div className={classes["form-control"]}>
              <label htmlFor="email">Email</label>
              <br />
              <input
                id="email"
                type="text"
                name="email"
                value={user.email}
                onChange={onChangeHandler}
              />
              {emailInputError ? (
                <p className={classes["error-text"]}>
                  Please enter company name.
                </p>
              ) : (
                ""
              )}
            </div>
            <div className={classes["form-control"]}>
              <label htmlFor="phone">Phone</label>
              <br />
              <input
                id="phone"
                type="text"
                name="phone"
                value={user.phone}
                onChange={onChangeHandler}
              />
              {phoneInputError ? (
                <p className={classes["error-text"]}>
                  Please enter company name.
                </p>
              ) : (
                ""
              )}
            </div>
            <div className={classes.actions}>
              {updateUserData && (
                <button type="button" onClick={cancelHandler}>
                  Cancel
                </button>
              )}
              <button className={classes.saveBtn}>
                {updateUserData ? "Update" : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserForm;
