import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Welcome.module.css";

const Welcome = () => {
  // Get AuthContext data
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className={classes.starting}>
      {isLoggedIn && <h1>Welcome on Board! 🚀</h1>}
      {!isLoggedIn && (
        <>
          <h1>Welcome to ReactMeals!</h1>
          <h2>To start, please login 🍔</h2>
        </>
      )}
      <button className={classes.button}>
        {isLoggedIn && <NavLink to="/market">Go to the Market</NavLink>}
        {!isLoggedIn && <NavLink to="/auth">Go to Login</NavLink>}
      </button>
    </div>
  );
};

export default Welcome;
