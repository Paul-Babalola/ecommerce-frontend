import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetail.css"; // Optional: Add your custom styles
import sneakers from "../assets/images/shoes.png";
import ankle from "../assets/images/ab.png";
import os from "../assets/images/os.png";

// Dummy data for demonstration purposes
const products = [
  {
    id: 1,
    name: "Classic Sneakers",
    description: "Stylish and comfortable sneakers for everyday wear.",
    price: 59.99,
    quantity: 20,
    image: sneakers,
  },
  {
    id: 2,
    name: "Ankle Boots",
    description: "Durable and trendy boots for all seasons.",
    price: 99.99,
    quantity: 10,
    image: ankle,
  },
  {
    id: 3,
    name: "Office Shoes",
    description: "Elegant formal shoes for professional and special occasions.",
    price: 89.99,
    quantity: 15,
    image: os,
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the product by id
  const product = products.find((product) => product.id === parseInt(id));
  
  if (!product) {
    return <h2>Product not found!</h2>;
  }

  const handleAddToCart = () => {
    alert(`${product.name} has been added to the cart.`);
    // Additional logic to add the product to the cart can be added here.
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
        <h2 className="product-detail-name">{product.name}</h2>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price">
          Price: ${product.price.toFixed(2)}
        </p>
        <p className="product-detail-quantity">
          Quantity Available: {product.quantity}
        </p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
        <button
          onClick={() => navigate("/products")}
          className="back-to-products-btn"
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
