import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { UserContext } from '../UserProvider';


const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserId } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    console.log("Login Data:", JSON.stringify(loginData));
    fetch("https://api-lyart-delta.vercel.app/get_id/", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify(loginData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched ID:", data);
        setUserId(data);
        // props.
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button-this">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
