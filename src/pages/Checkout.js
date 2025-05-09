import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css"; // Import the custom CSS file

const Checkout = ({ cartItems = [], calculateTotal = () => 0, isAuthenticated = true, saveOrder = () => {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    deliveryOption: "standard",
    paymentMethod: "card",
    promoCode: "",
  });

  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please sign in or register to proceed with checkout.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const applyPromoCode = () => {
    const validCode = "SAVE10";
    if (formData.promoCode.trim().toUpperCase() === validCode) {
      setDiscount(10); // 10% off
      alert("Promo code applied! 10% discount");
    } else {
      setDiscount(0);
      alert("Invalid promo code.");
    }
  };

  const calculateFinalTotal = () => {
    const total = calculateTotal();
    return total - (total * discount) / 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }

    const orderDetails = {
      cartItems,
      total: calculateFinalTotal(),
      shippingInfo: formData,
      discountApplied: discount,
    };

    saveOrder(orderDetails);

    alert(`Thank you for your purchase, ${formData.name}!`);
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-grid">

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-300">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4">
            <p>Subtotal: ${calculateTotal().toFixed(2)}</p>
            {discount > 0 && <p className="discount">Discount: -{discount}%</p>}
            <p className="total">Total: ${calculateFinalTotal().toFixed(2)}</p>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          {[{ label: "Name", name: "name", type: "text" }, { label: "Email", name: "email", type: "email" }, { label: "Address", name: "address", type: "text" }, { label: "City", name: "city", type: "text" }, { label: "ZIP Code", name: "zip", type: "text" }].map(({ label, name, type }) => (
            <div key={name} className="mb-4">
              <label className="block font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          ))}

          {/* Delivery Options */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Delivery Option:</label>
            <select
              name="deliveryOption"
              value={formData.deliveryOption}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="standard">Standard (3-5 days)</option>
              <option value="express">Express (1-2 days)</option>
            </select>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Payment Method:</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="card">Credit/Debit Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {/* Promo Code */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Promo Code:</label>
            <div className="promo-code-group">
              <input
                type="text"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleChange}
                className="flex-1 border border-gray-300 p-2 rounded-l"
              />
              <button type="button" onClick={applyPromoCode} className="promo-code-btn">
                Apply
              </button>
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
