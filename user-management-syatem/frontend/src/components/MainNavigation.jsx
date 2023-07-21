import { NavLink, useRouteLoaderData, Form } from "react-router-dom";
import MainLogo from "./MainLogo";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token = useRouteLoaderData("root");

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
      {!token && (
        <div className={classes.btn}>
          <NavLink
            to="/auth?mode=login"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Account
          </NavLink>
        </div>
      )}
      {token && (
        <Form action="/logout" method="post" className={classes.active}>
          <div className={classes.btn}>
            <button>Logout</button>
          </div>
        </Form>
      )}
    </header>
  );
}

export default MainNavigation;
