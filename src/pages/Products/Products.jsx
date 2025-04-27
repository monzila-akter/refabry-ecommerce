import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { fetchProduct } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/orderSlice';
import { getImageUrl } from '../../services/api';
import Loading from '../../components/Loading';

const Products = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div className="container mx-auto p-4 text-center">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={getImageUrl(selectedProduct.image_name)} 
              alt={selectedProduct.name}
              className="w-full h-auto object-cover" 
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800">{selectedProduct.name}</h1>
            <p className="text-xl text-indigo-600 font-bold mt-2">${selectedProduct.price}</p>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600 mt-2">{selectedProduct.description || selectedProduct.short_description}</p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="mt-6 flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;