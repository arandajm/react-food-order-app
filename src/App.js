import React, { useState, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import AuthPage from "./components/Pages/AuthPage";
import Spinner from "./components/UI/Spinner";
import AuthContextProvider from "./store/AuthProvider";
import CartContextProvider from "./store/CartProvider";

// Lazy Loading
// Split our code into multiple chunks, multiple bundles that are downloaded when they are needed!
// split the code by route
const Meals = React.lazy(() => import("./components/Meals/Meals"));
const Welcome = React.lazy(() => import("./components/Pages/Welcome"));
const NotFound = React.lazy(() => import("./components/Pages/NotFound"));

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <AuthContextProvider>
      <CartContextProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} onHideCart={hideCartHandler} />
        <main>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/" exact>
                <Welcome />
              </Route>
              <Route path="/auth">
                <AuthPage />
              </Route>
              <Route path="/market">
                <Meals />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
