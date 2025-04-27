import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/orderSlice';
import { getImageUrl } from '../services/api';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img 
            src={getImageUrl(product.image)} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1 truncate">{product.short_description}</p>
          <div className="flex justify-between items-center mt-3">
            <p className="text-indigo-600 font-bold">${product.price}</p>
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }} 
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;