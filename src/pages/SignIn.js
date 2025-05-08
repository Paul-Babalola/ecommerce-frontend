import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SignIn.css";

const SignInAndRegister = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();

    if (email === "user@example.com" && password === "password") {
      const userData = { email };
      localStorage.setItem("authUser", JSON.stringify(userData));
      onLogin(userData);
      alert("Successfully signed in!");

      const from = location.state?.from || "/";
      navigate(from);
    } else {
      alert("Invalid email or password!");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      alert("Registration successful! You can now sign in.");
      setIsRegistering(false);
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="auth-container">
      <h1>{isRegistering ? "Register" : "Sign In"}</h1>
      {isRegistering ? (
        <form onSubmit={handleRegister}>
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
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <p className="switch-form">
            Already have an account?{" "}
            <span onClick={() => setIsRegistering(false)}>Sign In</span>
          </p>
        </form>
      ) : (
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
          <p className="switch-form">
            Don't have an account?{" "}
            <span onClick={() => setIsRegistering(true)}>Register</span>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignInAndRegister;
