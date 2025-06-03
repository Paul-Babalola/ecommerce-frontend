import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Categories.css";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async (url = "https://pf-shoes-api.onrender.com/api/all-categories") => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setCategories(response.data.categories.data);
      setPagination({
        currentPage: response.data.categories.current_page,
        nextPage: response.data.categories.next_page_url,
        prevPage: response.data.categories.prev_page_url,
        totalPages: response.data.categories.last_page,
      });
      setError(null);
    } catch (err) {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePageChange = (url) => {
  if (url) {
    const secureUrl = url.replace("http://", "https://"); // Fix potential CORS issue
    fetchCategories(secureUrl);
  }
};


  if (loading) {
    return <div className="categories-container"><p>Loading categories...</p></div>;
  }

  if (error) {
    return <div className="categories-container"><p>{error}</p></div>;
  }

  return (
    <div className="categories-container">
      <h1>Shop by Categories</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            {/* <img src={`/images/placeholder-category.jpg`} alt={category.name} /> */}
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <Link to={`/categories/${category.id}`} className="view-category-btn">
              View Products
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(pagination.prevPage)}
          disabled={!pagination.prevPage}
          className="pagination-btn"
        >
          Previous
        </button>
        <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
        <button
          onClick={() => handlePageChange(pagination.nextPage)}
          disabled={!pagination.nextPage}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Categories;
