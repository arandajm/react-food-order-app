import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./HeaderNavigation.module.css";

const HeaderNavigation = () => {
  // Get AuthContext data
  const { isLoggedIn } = useContext(AuthContext);

  const renderLoggedInLinks = (
    <>
      <li>
        <NavLink exact activeClassName={classes.active} to="/market">
          Market
        </NavLink>
      </li>
    </>
  );

  const renderNotLoggedInLinks = (
    <>
      <li>
        <NavLink exact activeClassName={classes.active} to="/">
          Welcome
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName={classes.active} to="/auth">
          Login
        </NavLink>
      </li>
    </>
  );

  return (
    <nav>
      <ul>{isLoggedIn ? renderLoggedInLinks : renderNotLoggedInLinks}</ul>
    </nav>
  );
};

export default HeaderNavigation;
