import { NavLink } from "react-router-dom";
import MainLogo from "./MainLogo";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={classes.active}>
              <MainLogo size="2" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.btn}>
        <button>Account</button>
      </div>
    </header>
  );
}

export default MainNavigation;
