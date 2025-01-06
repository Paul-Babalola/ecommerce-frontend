import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SignIn.css";

const SignIn = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();

    // Mock authentication process
    if (email === "user@example.com" && password === "password") {
      setAuthenticated(true);
      alert("Successfully signed in!");

      // Redirect to the previous page or homepage
      const from = location.state?.from || "/";
      navigate(from);
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="sign-in-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
