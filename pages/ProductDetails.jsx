import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/src/store/features/cartSlice'; // Import your addToCart action
import Layout from '@/components/Layout';
import { FaShoppingCart } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct); // Use a selector to fetch the selected product from your Redux store

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch your addToCart action with the selected product
  };

  return (
    <Layout>
      <div className="bg-gray-100 rounded-xl dark:bg-gray-900 p-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{product.name}</h1>
        <div className="flex items-center justify-between mt-4">
          <div className="w-1/2">
            <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded-lg" />
          </div>
          <div className="w-1/2 px-4">
            <p className="text-gray-600 dark:text-gray-300">Price: ${product.price}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="ml-1 text-gray-600 dark:text-gray-300">Rating: {product.ratings.stars}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Reviews</h3>
              <p className="text-gray-600 dark:text-gray-300">{product.ratings.reviewText}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={handleAddToCart}
                className="w-36 p-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-indigo-700 duration-300 transition-colors"
              >
                <FaShoppingCart className="inline-block mr-2" />
                Add to Cart
              </button>
            </div>
            <div className="mt-2">
              <button
                onClick={handleBuy}
                className="w-36 p-2 bg-green-600 dark:bg-green-700 text-white rounded-md hover:bg-green-700 duration-300 transition-colors"
              >
                <FaDollarSign className="inline-block mr-2" />
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
