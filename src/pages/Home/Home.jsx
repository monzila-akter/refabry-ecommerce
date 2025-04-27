import React from 'react';
import ProductList from '../../components/ProductList';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Refabry Shop</h1>
      <ProductList />
    </div>
  );
};

export default Home;