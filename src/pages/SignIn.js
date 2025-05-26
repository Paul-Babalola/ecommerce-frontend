import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SignIn.css";

const SignInAndRegister = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [shipping_address, setShippingAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("https://pf-shoes-api.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      const { token } = data;

      // Store token in authUser
      const authUser = { token }; 
      localStorage.setItem("authUser", JSON.stringify(authUser));

      // Optionally fetch user details here and merge
      // const userDetails = await fetchUserDetails(token); 
      // localStorage.setItem("authUser", JSON.stringify({ ...userDetails, token }));

      onLogin(authUser);
      toast.success("Successfully signed in!");

      const from = location.state?.from || "/";
      navigate(from);
    } else {
      toast.error(data.message || "Invalid email or password!");
    }
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    console.error("Login error:", error);
  } finally {
    setIsSubmitting(false);
  }
};


const handleRegister = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("https://pf-shoes-api.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        phone_number,
        shipping_address
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Registration failed.");
      return;
    }

    const data = await response.json();
    toast.success("Registration successful! You can now sign in.");
    setIsRegistering(false);
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("An error occurred. Please try again.");
  }
};

  return (
    <div className="auth-container">
      <h1>{isRegistering ? "Register" : "Sign In"}</h1>
      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <label>First Name:</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label>Last Name:</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label>Phone Number:</label>
          <input
            type="tel"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <label>Shipping Address:</label>
          <input
            type="text"
            value={shipping_address}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />

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

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>

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

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

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
