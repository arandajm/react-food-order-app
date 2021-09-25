import CartContext from "./cart-context";

const CartContextProvider = ({ children }) => {
  const addItemToCartHandler = (item) => {};
  const removeItemToCartHandler = (id) => {};

  const initialState = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={initialState}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
