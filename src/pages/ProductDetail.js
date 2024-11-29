import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  // Fetch product details based on `id` (mock example)
  const product = {
    id,
    name: 'Nike Air Max',
    price: 120,
    description: 'Comfortable and stylish running shoes.',
    image: '/images/nike-air-max.jpg',
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="mt-6 w-full max-w-sm" />
      <p className="mt-4">{product.description}</p>
      <p className="mt-2 font-bold text-lg">${product.price}</p>
      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
