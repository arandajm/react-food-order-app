import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = ({ onClose }) => {
  // Get CartContext data
  const { totalAmount, items, addItem, removeItem } = useContext(CartContext);

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

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{fixedTotalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
