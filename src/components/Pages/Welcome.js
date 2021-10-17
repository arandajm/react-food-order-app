import React from "react";
import { Link } from "react-router-dom";
// Include a local img
import summaryImage from "../../assets/summary.jpg";
import classes from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={classes.summary}>
      <h1>Welcome to ReactMeals App!!</h1>
      <section>
        <img src={summaryImage} alt="summaryImage" />
        <div className={classes.items}>
          <p>With our app you can:</p>
          <ul>
            <li>See our menu!</li>
            <li>Prepare your cart!</li>
            <li>Order and enjoy our delicious!</li>
          </ul>
        </div>
      </section>
      <button className={classes.button}>
        <Link to="/market">Go to the Market</Link>
      </button>
    </div>
  );
};

export default Welcome;
