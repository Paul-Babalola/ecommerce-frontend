import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductList.css";
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
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  // FILTER
  const filteredProducts = products.filter((product) => {
    if (filter === "below80") return product.price < 80;
    if (filter === "above80") return product.price >= 80;
    return true;
  });

  // SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "nameAsc") return a.name.localeCompare(b.name);
    if (sort === "nameDesc") return b.name.localeCompare(a.name);
    if (sort === "priceAsc") return a.price - b.price;
    if (sort === "priceDesc") return b.price - a.price;
    return 0; // no sorting
  });

  return (
    <div className="product-list-container">
      <h1>Available Products</h1>

      <div className="controls">
        <label>
          Filter by Price:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="below80">Below $80</option>
            <option value="above80">Above $80</option>
          </select>
        </label>

        <label>
          Sort by:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="nameAsc">Name (A–Z)</option>
            <option value="nameDesc">Name (Z–A)</option>
            <option value="priceAsc">Price (Low–High)</option>
            <option value="priceDesc">Price (High–Low)</option>
          </select>
        </label>
      </div>

      <div className="product-grid">
        {sortedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
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
