import React, { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const history = useNavigate();
  // const [success, setSuccess] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:5000/api/auth/register", user);
        // history.push("/login");
        window.location.replace("/login");
      }
      catch (err) {
        console.log(err);
      }

    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Social App</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Social App.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
              ref={username}
              required
            />
            <input
              placeholder="Email"
              ref={email}
              className="registerInput"
              type="email"
              required
            />
            <input
              placeholder="Password"
              className="registerInput"
              ref={password}
              type="password"
              required
              minLength="6"
            />
            <input
              placeholder="Confirm Password"
              className="registerInput"
              ref={confirmPassword}
              type="password"
              required
            />
            <button className="registerButton" type="submit">Sign Up</button>
            <button className="registerRegisterButton">
              Log into your Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
