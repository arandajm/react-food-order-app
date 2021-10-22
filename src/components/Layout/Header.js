import React, { useContext } from "react";
// Include a local img
import mealsImage from "../../assets/meals.jpg";
import AuthContext from "../../store/auth-context";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import HeaderNavigation from "./HeaderNavigation";

const Header = ({ onShowCart, onHideCart }) => {
  // Get AuthContext data
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderNavigation />
        {isLoggedIn && <HeaderCartButton onClick={onShowCart} />}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="a table full of delicious food!" />
      </div>
    </React.Fragment>
  );
};

export default Header;
