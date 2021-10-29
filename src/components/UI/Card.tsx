import React from "react";
import classes from "./Card.module.css";

// In functional component you can use FC type and define your custom props inside {}
const Card: React.FC<{ className: string }> = ({ children, className }) => {
  return (
    <section className={`${classes.card} ${className}`}>{children}</section>
  );
};

export default Card;
