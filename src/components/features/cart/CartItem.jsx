import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../../slices/cartSlice';

const CartItem = React.memo(({ item }) => {
  const dispatch = useDispatch();
  
  console.log('CartItem rendered:', item.id); // Debug ke liye

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="flex items-center border-b py-4">
      <img 
        src={item.thumbnail} 
        alt={item.title}
        className="w-16 h-16 object-cover rounded"
      />
      
      <div className="flex-1 ml-4">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-gray-600">${item.price} each</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 border rounded"
        >
          -
        </button>
        
        <span className="w-8 text-center">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 border rounded"
        >
          +
        </button>
        
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="ml-4 text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
});

export default CartItem;