import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// Helpers functions
const isEmpty = (value) => value.trim() === "";
const isLongerThan5 = (value) => value.trim().length === 5;

const Checkout = ({ onCancel, onConfirm }) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  // Input classes dynamically
  const nameInputClasses = `${classes.control} ${
    !formInputValidity.name ? classes.invalid : ""
  }`;
  const streetInputClasses = `${classes.control} ${
    !formInputValidity.street ? classes.invalid : ""
  }`;
  const postalInputClasses = `${classes.control} ${
    !formInputValidity.postal ? classes.invalid : ""
  }`;
  const cityInputClasses = `${classes.control} ${
    !formInputValidity.city ? classes.invalid : ""
  }`;

  const confirmHandler = (ev) => {
    ev.preventDefault();
    // Get form values from refs
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // Check form values
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isLongerThan5(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    // Set form validity state before check!
    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    // If the form is invalid, stop execution
    if (!formIsValid) return;

    // Submit cart data, parent function
    onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredStreet,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please, enter a valid name!</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please, enter a valid street!</p>}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && (
          <p>Please, enter a valid postal code (5 chars)!</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please, enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
