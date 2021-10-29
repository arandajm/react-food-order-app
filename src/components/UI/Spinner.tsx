import React from "react";
import spinner from "../../assets/loading.svg";
import classes from "./Spinner.module.css";

const Spinner: React.FC<{}> = () => {
  return (
    <div className={classes.spinner}>
      <img src={spinner} alt="loading" />
    </div>
  );
};

export default Spinner;
