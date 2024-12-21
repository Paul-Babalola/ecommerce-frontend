import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductPage.css";

const products = [
  {
    id: 1,
    name: "Classic Sneakers",
    description: "Stylish and comfortable sneakers for everyday wear.",
    price: 59.99,
    quantity: 20,
    image: "/images/sneakers1.jpg",
  },
  {
    id: 2,
    name: "Ankle Boots",
    description: "Durable and trendy boots for all seasons.",
    price: 99.99,
    quantity: 10,
    image: "/images/boots1.jpg",
  },
  {
    id: 3,
    name: "Office Shoes",
    description: "Elegant formal shoes for professional and special occasions.",
    price: 89.99,
    quantity: 15,
    image: "/images/formal1.jpg",
  },
];

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  if (!product) {
    console.log("Product not found for ID:", id); // Debugging log
    return <h1>Product not found!</h1>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, selectedQuantity });
    alert(`${product.name} added to the cart!`);
  };

  return (
    <div className="product-page-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> ${product.price.toFixed(2)}
        </p>
        <p>
          <strong>Product ID:</strong> {product.id}
        </p>
        <p>
          <strong>Available Quantity:</strong> {product.quantity}
        </p>
        <div className="quantity-selector">
          <label htmlFor="quantity">Select Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={selectedQuantity}
            min="1"
            max={product.quantity}
            onChange={(e) => {
              const value = Math.min(Math.max(Number(e.target.value), 1), product.quantity);
              setSelectedQuantity(value);
            }}
          />
        </div>
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={selectedQuantity > product.quantity || selectedQuantity < 1}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
