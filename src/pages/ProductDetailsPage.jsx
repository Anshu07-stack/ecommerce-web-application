import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../slices/cartSlice';
import { showNotification } from '../slices/uiSlice';

const ProductDetailsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.thumbnail);
        setError(null);
      } catch (err) {
        setError('Product not found');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: quantity
    }));

    dispatch(showNotification({
      message: `${product.title} added to cart!`,
      type: 'success'
    }));

    setTimeout(() => {
      dispatch(showNotification(null));
    }, 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/${product.category.split('-')[0]}`} className="hover:text-blue-600">
          {product.category.split('-')[0].charAt(0).toUpperCase() + product.category.split('-')[0].slice(1)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left side - Images */}
        <div>
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={selectedImage} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all
                    ${selectedImage === img ? 'border-blue-500' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Details */}
        <div>
          {/* Title & Brand */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
          {product.brand && (
            <p className="text-gray-500 mb-4">Brand: {product.brand}</p>
          )}

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating} out of 5)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${(product.price * (1 + product.discountPercentage/100)).toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-green-600">
                  {Math.round(product.discountPercentage)}% off
                </span>
              </>
            )}
          </div>

          {/* Availability */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <p className="text-green-600">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-600">✕ Out of Stock</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-16 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg 
                       hover:bg-blue-50 transition-colors font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg 
                       hover:bg-blue-600 transition-colors font-medium"
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">SKU:</span> {product.id}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            {product.tags && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Tags:</span> {product.tags.join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section - if available */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    by {review.reviewerName || 'Anonymous'}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;