import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./HeaderNavigation.module.css";

const HeaderNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact activeClassName={classes.active} to="/">
            Welcome
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName={classes.active} to="/market">
            Market
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
