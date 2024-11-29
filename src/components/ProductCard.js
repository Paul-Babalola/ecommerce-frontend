import React from 'react';
import { FaStar } from 'react-icons/fa'; // Font Awesome star icon

const ProductCard = ({ image, title, price, onClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-64 mb-6">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-lg text-gray-700 mb-3">${price}</p>
        </div>
        
        <button
          onClick={onClick}
        >
          Add to Cart
        </button>
      </div>
  );
};

export default ProductCard;
