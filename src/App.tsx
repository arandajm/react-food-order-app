import React, { useState, Suspense, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import AuthPage from "./components/Pages/AuthPage";
import Spinner from "./components/UI/Spinner";
import AuthContext from "./store/auth-context";
import CartContextProvider from "./store/CartProvider";

// Lazy Loading
// Split our code into multiple chunks, multiple bundles that are downloaded when they are needed!
// split the code by route
const Meals = React.lazy(() => import("./components/Meals/Meals"));
const Welcome = React.lazy(() => import("./components/Pages/Welcome"));
const NotFound = React.lazy(() => import("./components/Pages/NotFound"));

const App: React.FC<{}> = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  // Get AuthContext data
  const { isLoggedIn } = useContext(AuthContext);

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
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/" exact>
              <Welcome />
            </Route>
            {!isLoggedIn && (
              <Route path="/auth">
                <AuthPage />
              </Route>
            )}
            <Route path="/market">
              {isLoggedIn && <Meals />}
              {!isLoggedIn && <Redirect to="/auth" />}
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </CartContextProvider>
  );
};

export default App;
