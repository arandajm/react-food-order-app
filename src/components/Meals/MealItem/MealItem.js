import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = ({ id, name, description, price: itemPrice }) => {
  const { addItem } = useContext(CartContext);

  const price = `${itemPrice.toFixed(2)}`;

  const addToCardHandler = (amount) => {
    addItem({
      id,
      name,
      amount,
      price: itemPrice,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCardHandler} />
      </div>
    </li>
  );
};

export default MealItem;
