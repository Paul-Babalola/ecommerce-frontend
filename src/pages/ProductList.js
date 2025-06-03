import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  const fetchProducts = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`https://pf-shoes-api.onrender.com/api/products/all?page=${pageNum}`);
      const data = await res.json();
      setProducts(data.products.data);
      setPagination(data.products);
      setPage(pageNum);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load products:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, []);

  // FILTER
  const filtered = products.filter((product) => {
    const price = parseFloat(product.price);
    if (filter === "below80") return price < 80;
    if (filter === "above80") return price >= 80;
    return true;
  });

  // SORT
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "nameAsc") return a.product_name.localeCompare(b.product_name);
    if (sort === "nameDesc") return b.product_name.localeCompare(a.product_name);
    if (sort === "priceAsc") return parseFloat(a.price) - parseFloat(b.price);
    if (sort === "priceDesc") return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  return (
    <div className="product-list-container">
      <h1>Available Products</h1>

      <div className="controls">
        <label>
          Filter by Price:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="below80">Below ₦80</option>
            <option value="above80">Above ₦80</option>
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

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {sorted.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src="/images/shoes.png"
                alt={product.product_name}
                className="product-image"
              />
              <h2 className="product-name">{product.product_name}</h2>
              <p className="product-price">₦{parseFloat(product.price).toFixed(2)}</p>
              <Link to={`/products/${product.id}`} className="view-details-link">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-controls">
        {pagination.prev_page_url && (
          <button onClick={() => fetchProducts(page - 1)} className="pagination-btn">Previous</button>
        )}
        <span>Page {pagination.current_page} of {pagination.last_page}</span>
        {pagination.next_page_url && (
          <button onClick={() => fetchProducts(page + 1)} className="pagination-btn">Next</button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
