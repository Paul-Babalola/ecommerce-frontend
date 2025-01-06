import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SignIn.css";

const SignInAndRegister = ({ setAuthenticated }) => {
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Sign In and Register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For registration
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

  const handleRegister = (e) => {
    e.preventDefault();

    // Mock registration process
    if (password === confirmPassword) {
      alert("Registration successful! You can now sign in.");
      setIsRegistering(false); // Switch to Sign In after registration
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
