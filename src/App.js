import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import NotFound from "./components/Pages/NotFound";
import Welcome from "./components/Pages/Welcome";
import CartContextProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartContextProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} onHideCart={hideCartHandler} />
      <main>
        <Switch>
          <Route path="/" exact>
            <Welcome />
          </Route>
          <Route path="/market">
            <Meals />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </CartContextProvider>
  );
}

export default App;
