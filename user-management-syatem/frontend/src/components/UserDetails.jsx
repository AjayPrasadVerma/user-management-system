import { Link, useSubmit, useRouteLoaderData } from "react-router-dom";
import classes from "./UserDetails.module.css";
import { Button } from "@mui/material";

const CompanyDetails = ({ userDetails }) => {
  const submit = useSubmit();
  const token = useRouteLoaderData("root");

  const deleteHandler = () => {
    const proceed = window.confirm("Are you really want to delete?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes["sub-container"]}>
          <p>
            <span>Name </span> : {userDetails.name}
          </p>
          <p>
            <span>Email </span> : {userDetails.email}
          </p>
          <p>
            <span>Phone No</span> : {userDetails.phone}
          </p>
        </div>
      </div>
      {token && (
        <div className={classes.btn}>
          <Button
            variant="contained"
            color="warning"
            style={{ marginRight: 10 }}
            component={Link}
            to={"edit"}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            style={{ marginRight: 10 }}
            color="error"
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </div>
      )}
    </>
  );
};

export default CompanyDetails;
