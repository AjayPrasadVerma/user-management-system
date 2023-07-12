import classes from "./UserDetails.module.css";
import { useLoaderData } from "react-router-dom";

const UserDetails = () => {
  const user = useLoaderData();

  return (
    <div className={classes.container}>
      <div className={classes["sub-container"]}>
        <p>
          <span>Name </span> : {user.name}
        </p>
        <p>
          <span>Email </span> : {user.email}
        </p>
        <p>
          <span>Phone No</span> : {user.phone}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
