import classes from "./Home.module.css";
import MainLogo from "./MainLogo";

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.btn}>
        <MainLogo size="10" />
      </div>
      <h1>Welcome</h1>
      <h1>to the </h1>
      <h1 className={classes.lastHeading}>User Management System</h1>
      <p>
        This web app allows you to manage users and their information easily.
      </p>
      <div className={classes.btn}>
        <button>Get Started</button>
      </div>
    </div>
  );
};

export default Home;
