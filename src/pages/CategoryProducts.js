import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryProducts.css";

const CategoryProducts = () => {
  const { id } = useParams(); // Category ID from URL
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);

        const productRes = await axios.get(`https://pf-shoes-api.onrender.com/api/products/all`);
        const categoryRes = await axios.get(`https://pf-shoes-api.onrender.com/api/all-categories`);

        // Filter products by category_id
        const filtered = productRes.data.products.data.filter(p => p.category_id === parseInt(id));
        setProducts(filtered);

        // Get the category name
        const category = categoryRes.data.categories.data.find(cat => cat.id === parseInt(id));
        setCategoryName(category ? category.name : "Unknown Category");

        setError(null);
      } catch (err) {
        setError("Failed to load category products.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  if (loading) return <div className="product-list-container"><p>Loading...</p></div>;
  if (error) return <div className="product-list-container"><p>{error}</p></div>;

  return (
    <div className="product-grid">
  {products.length > 0 ? (
    products.map(product => (
      <div className="product-card" key={product.id}>
        <img
          src={product.image_url || "/images/placeholder-product.jpg"}
          alt={product.product_name}
          className="product-image"
        />
        <h3 className="product-name">{product.product_name}</h3>
        <p className="product-price">₦{parseFloat(product.price).toLocaleString()}</p>
        <p className="product-description">{product.description}</p>
        <button className="view-product-btn">View Product</button>
      </div>
    ))
  ) : (
    <p>No products found for this category.</p>
  )}
</div>

  );
};

export default CategoryProducts;
