// Ek single product ka card component

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../slices/cartSlice';
import { showNotification } from '../../../slices/uiSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Agar product nahi hai to kuch mat dikhao
  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Link click ko prevent karo
    e.stopPropagation();
    
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail
    }));

    // Notification dikhao
    dispatch(showNotification({
      message: `${product.title} added to cart!`,
      type: 'success'
    }));

    // 3 sec baad notification hide karo
    setTimeout(() => {
      dispatch(showNotification(null));
    }, 3000);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Link */}
      <Link to={`/product/${product.id}`} className="block">
        
        {/* Image Container */}
        <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy" // Lazy loading for performance
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand/Category */}
          <p className="text-sm text-gray-500 mb-1">
            {product.brand || product.category}
          </p>

          {/* Title */}
          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">
            {product.title}
          </h3>

          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-xs text-green-600">
                  {Math.round(product.discountPercentage)}% off
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm text-gray-600">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                 hover:bg-blue-500 hover:text-white"
        aria-label="Add to cart"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Out of Stock Badge - for future use */}
      {product.stock === 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Out of Stock
        </div>
      )}
    </div>
  );
};

export default ProductCard;