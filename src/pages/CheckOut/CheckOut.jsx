import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderForm from '../../components/OrderForm';

const CheckOut = () => {
  const { cart } = useSelector(state => state.order);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <OrderForm />
      )}
    </div>
  );
};

export default CheckOut;