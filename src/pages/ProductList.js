import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductList.css"; // Optional: Add your custom styles
import sneakers from "../assets/images/shoes.png";
import ankle from "../assets/images/ab.png";
import os from "../assets/images/os.png";

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

const ProductList = () => {
  return (
    <div className="product-list-container">
      <h1>Available Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <Link to={`/product/${product.id}`} className="view-details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
