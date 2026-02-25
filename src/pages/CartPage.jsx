import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/features/cart/CartItem';

const CartPage = () => {
  const { items } = useSelector(state => state.cart);

  // useMemo - cart calculations tabhi honge jab items change ho
  const cartSummary = useMemo(() => {
    console.log('Calculating cart summary...'); // Debug ke liye
    
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-500 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${cartSummary.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{cartSummary.shipping === 0 ? 'Free' : `$${cartSummary.shipping}`}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>${cartSummary.tax.toFixed(2)}</span>
            </div>
            
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${cartSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg mt-6 hover:bg-blue-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;