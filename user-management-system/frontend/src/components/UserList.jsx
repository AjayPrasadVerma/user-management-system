import { Link } from "react-router-dom";
import classes from "./UserList.module.css";
import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteUser } from "../service/api";
import { userAction } from "../store/user-silce";

const CompanyList = ({ userList, onUpdateUser }) => {
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    const proceed = window.confirm("Are you really want to delete?");

    if (proceed) {
      const response = await deleteUser(id);
      dispatch(userAction.removeUser(response));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>User List</h1>
      <div className={classes.container}>
        <table className={classes.table}>
          <thead className={classes.th}>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={classes.td}>
            {userList &&
              userList.map((user, index) => (
                <tr key={index}>
                  <td>{index + 101}</td>
                  <td>{user.name}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteHandler(user._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        onUpdateUser(user);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      component={Link}
                      to={`/${user._id}`}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompanyList;
