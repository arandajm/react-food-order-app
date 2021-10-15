import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onClose }) => {
  // Get CartContext data
  const { totalAmount, items, addItem, removeItem, clearItems } =
    useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const fixedTotalAmount = `$${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;
  const addItemHandler = (item) => {
    console.log("add");
    console.log(item);
    // call addItem context function to add a new item with amount increase to 1
    addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    console.log("remove");
    console.log(id);
    removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-meals-a7512-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: items }),
      }
    );
    // TODO here Implementing error handling
    setIsSubmitting(false);
    setDidSubmit(true);
    // Clean cart items!
    clearItems();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={() => addItemHandler(item)}
          onRemove={() => removeItemHandler(item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{fixedTotalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data....</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!!!</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
