import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import Spinner from "../UI/Spinner";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Get AuthContext data
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;

    const API_KEY = "AIzaSyCv7QvXJ8CXNSj7HLQkJmd8unc8A_ioFqo";
    const SIGN_IN_PARAM = "signInWithPassword";
    const SIGN_UP_PARAM = "signUp";
    const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";

    const action = isLogin ? SIGN_IN_PARAM : SIGN_UP_PARAM;
    const finalURL = `${BASE_URL}${action}?key=${API_KEY}`;
    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true,
      }),
    };

    fetch(finalURL, config)
      .then((response) => {
        if (response.ok) {
          // return promise
          return response.json();
        } else {
          return response.json().then((error) => {
            let errorMessage = "Authentication failed!";
            if (error && error.error.message) {
              errorMessage = error.error.message;
            }
            // Set state and show message into a modal
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const { idToken } = data;
        // Set token into the Auth
        login(idToken);
        if (isLogin) {
          history.replace("/");
        } else {
          setIsLogin(true);
        }
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <Spinner />;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailInputRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
