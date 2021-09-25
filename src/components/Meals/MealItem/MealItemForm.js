import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = ({ id, onAddToCart }) => {
  // Use forwardRef into custom component because ref don`t work.
  const forwardRef = useRef();
  // State to manage if the form is valid, by default its valid
  const [formIsValid, setFormIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const amount = forwardRef.current.value;
    const amountNumber = +amount;

    // Validations
    if (amount.trim().length === 0 || amountNumber < 1 || amountNumber > 5) {
      setFormIsValid(false);
      return;
    }
    // If its valid, call a pointer parent function to add a new item to cart. We don't have all the information here!
    onAddToCart(amountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={forwardRef}
        // Configuration input object
        input={{
          id: "amount" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!formIsValid && <p>Please enter a valid amount!</p>}
    </form>
  );
};

export default MealItemForm;
