import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./HeaderNavigation.module.css";

const HeaderNavigation = () => {
  const history = useHistory();

  // Get AuthContext data
  const { isLoggedIn, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
    history.replace("/auth");
  };

  const renderLoggedInLinks = (
    <>
      <li>
        <NavLink exact activeClassName={classes.active} to="/market">
          Market
        </NavLink>
      </li>
      <li>
        <button onClick={logoutHandler}>Logout</button>
      </li>
    </>
  );

  const renderNotLoggedInLinks = (
    <>
      <li>
        <NavLink exact activeClassName={classes.active} to="/auth">
          Login
        </NavLink>
      </li>
    </>
  );

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact activeClassName={classes.active} to="/">
            Welcome
          </NavLink>
        </li>
        {isLoggedIn ? renderLoggedInLinks : renderNotLoggedInLinks}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
