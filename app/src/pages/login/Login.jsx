import React,{useContext, useRef} from 'react'
import './login.css'
import { loginCall } from '../../apiCalls';
import {AuthContext} from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
    const email = useRef();
    const password = useRef();

    const {user, isFetching,error,dispatch} = useContext(AuthContext);

    const handleClick = (e) =>{
        e.preventDefault();
        loginCall(
          { email: email.current.value, password: password.current.value },
          dispatch
        );
    }
    console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social App</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social App.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              minLength="6"
              ref={password}
              required
            />
            <button className="loginButton" type='submit' disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
