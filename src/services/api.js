import axios from 'axios';

const API_BASE_URL = 'https://admin.refabry.com/api';
const IMAGE_BASE_URL = 'https://admin.refabry.com/storage/product/';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all/product/get`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all/product/get`);
    // Filter to find specific product since the API doesn't have a specific endpoint for single product
    const product = response.data.find(product => product.id === parseInt(id));
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/public/order/create`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const getImageUrl = (imageName) => {
  return `${IMAGE_BASE_URL}${imageName}`;
};