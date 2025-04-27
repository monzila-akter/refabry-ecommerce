import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, submitOrder } from '../redux/slices/orderSlice';

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, isLoading } = useSelector((state) => state.order);
  
  const [formData, setFormData] = useState({
    c_name: '',
    c_phone: '',
    address: '',
    courier: 'steadfast',
    delivery_charge: '80',
    cod_amount: calculateTotal().toString(),
  });

  function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare order data according to API requirements
    const orderData = {
      ...formData,
      product_ids: cart.map(item => item.id).join(','),
      s_product_qty: cart.map(item => item.quantity).join(','),
      cod_amount: calculateTotal().toString(),
      advance: null,
      discount_amount: null,
    };
    
    await dispatch(submitOrder(orderData));
    alert('Order placed successfully!');
    dispatch(clearCart());
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-700">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Complete Your Order</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between">
            <span>Delivery Charge:</span>
            <span>${formData.delivery_charge}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>${(calculateTotal() + parseInt(formData.delivery_charge)).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="c_name">
            Full Name
          </label>
          <input
            type="text"
            id="c_name"
            name="c_name"
            value={formData.c_name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="c_phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="c_phone"
            name="c_phone"
            value={formData.c_phone}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Delivery Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courier">
            Courier Service
          </label>
          <select
            id="courier"
            name="courier"
            value={formData.courier}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="steadfast">Steadfast</option>
            <option value="pathao">Pathao</option>
            <option value="redx">RedX</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;