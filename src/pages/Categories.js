import React from "react";
import { Link } from "react-router-dom";
import "../styles/Categories.css";

// Sample Categories Data
const categories = [
  {
    id: 1,
    name: "Sneakers",
    description: "Stylish and comfortable sneakers for everyday wear.",
    image: "/images/category-sneakers.jpg",
  },
  {
    id: 2,
    name: "Boots",
    description: "Durable and trendy boots for all seasons.",
    image: "/images/category-boots.jpg",
  },
  {
    id: 3,
    name: "Formal Shoes",
    description: "Elegant formal shoes for professional and special occasions.",
    image: "/images/category-formal.jpg",
  },
  {
    id: 4,
    name: "Kids' Shoes",
    description: "Fun and comfy shoes for your little ones.",
    image: "/images/category-kids.jpg",
  },
];

const Categories = () => {
  return (
    <div className="categories-container">
      <h1>Shop by Categories</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            {/* <img src={category.image} alt={category.name} /> */}
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <Link to={`/categories/${category.id}`} className="view-category-btn">
              View Products
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
