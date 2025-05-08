import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetail.css";
import sneakers from "../assets/images/shoes.png";
import ankle from "../assets/images/ab.png";
import os from "../assets/images/os.png";

// Dummy product data
const products = [
  {
    id: 1,
    name: "Classic Sneakers",
    description: "Stylish and comfortable sneakers for everyday wear.",
    price: 59.99,
    quantity: 20,
    image: sneakers,
    sizes: ["7", "8", "9", "10"],
    colors: ["Black", "White", "Blue"],
    rating: 4.3,
    reviews: [
      { user: "John", comment: "Super comfortable!", stars: 5 },
      { user: "Emily", comment: "Good quality", stars: 4 },
    ],
  },
  {
    id: 2,
    name: "Ankle Boots",
    description: "Durable and trendy boots for all seasons.",
    price: 99.99,
    quantity: 10,
    image: ankle,
    sizes: ["6", "7", "8", "9"],
    colors: ["Brown", "Black"],
    rating: 4.0,
    reviews: [
      { user: "Alex", comment: "Very sturdy.", stars: 4 },
    ],
  },
  {
    id: 3,
    name: "Office Shoes",
    description: "Elegant formal shoes for professional and special occasions.",
    price: 89.99,
    quantity: 0,
    image: os,
    sizes: ["8", "9", "10", "11"],
    colors: ["Black"],
    rating: 4.5,
    reviews: [
      { user: "Grace", comment: "Perfect for office wear!", stars: 5 },
    ],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((product) => product.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  if (!product) return <h2>Product not found!</h2>;

  const handleAddToCart = () => {
    alert(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${product.name}`);
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-grid">
        {/* Image */}
        <div className="image-section">
          <img src={product.image} alt={product.name} className="zoom-image" />
        </div>

        {/* Details */}
        <div className="info-section">
          <h2>{product.name}</h2>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="desc">{product.description}</p>
          <p className={`stock ${product.quantity > 0 ? "in" : "out"}`}>
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Size Selector */}
          <div className="selector">
            <label>Size:</label>
            <select onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">Select Size</option>
              {product.sizes.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Color Selector */}
          <div className="selector">
            <label>Color:</label>
            <select onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="">Select Color</option>
              {product.colors.map((color) => (
                <option key={color}>{color}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="action-buttons">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={handleBuyNow} className="buy-now">Buy Now</button>
          </div>

          {/* Ratings */}
          <div className="rating">
            <p>Rating: {product.rating} ★</p>
          </div>

          {/* Reviews */}
          <div className="reviews">
            <h4>Customer Reviews</h4>
            {product.reviews.map((review, index) => (
              <div key={index} className="review">
                <strong>{review.user}</strong> - {review.stars}★
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {/* <div className="related-products">
        <h3>Related Products</h3>
        <div className="related-list">
          {products
            .filter((p) => p.id !== product.id)
            .map((related) => (
              <div key={related.id} className="related-card" onClick={() => navigate(`/product/${related.id}`)}>
                <img src={related.image} alt={related.name} />
                <p>{related.name}</p>
                <p>${related.price.toFixed(2)}</p>
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default ProductDetail;
