import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header = () => {
  const { cart } = useSelector(state => state.order);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Refabry Shop</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-indigo-200">Home</Link></li>
            <li>
              <Link to="/checkout" className="flex items-center hover:text-indigo-200">
                <FaShoppingCart className="mr-1" />
                <span>Cart ({cartItemCount})</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;