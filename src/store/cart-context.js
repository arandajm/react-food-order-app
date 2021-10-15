import React from "react";
// Create context and initialize it con some data
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItems: () => {},
});

export default CartContext;
