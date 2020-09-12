import React from "react";
import { Button } from "@material-ui/core";
import "./login.css";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { UseStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = UseStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          alt="Whatsapp-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        />
        <div className="login-text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
