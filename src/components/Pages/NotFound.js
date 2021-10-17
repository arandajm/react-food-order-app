import React from "react";
import notFound from "../../assets/not-found.jpg";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes["not-found"]}>
      <img src={notFound} alt="not-found" />
      <h2>Oops....</h2>
      <p>The page you are looking for does not exist!</p>
    </div>
  );
};

export default NotFound;
