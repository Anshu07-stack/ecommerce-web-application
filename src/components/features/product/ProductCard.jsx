import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../slices/cartSlice';

// React.memo - component tabhi re-render hoga jab props change honge
const ProductCard = React.memo(({ product, onAddToCart }) => {
  console.log('ProductCard rendered:', product.id); // Debug ke liye

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-2">{product.title}</h3>
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

export default ProductCard;