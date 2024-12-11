import React from "react";

const ProductCard = ({ image, title, price, onAddToCart, isInCart }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={onAddToCart} disabled={isInCart}>
  {isInCart ? "Added to Cart" : "Add to Cart"}
</button>    </div>
  );
};

export default ProductCard;
