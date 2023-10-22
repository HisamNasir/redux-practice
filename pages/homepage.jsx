import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, setProducts } from '@/src/store/features/productSlice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

const HomePage = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products from Firestore
    const fetchProducts = async () => {
      try {
        const productRef = collection(db, 'PublishedProducts');
        const querySnapshot = await getDocs(productRef);

        const productsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          productsData.push({
            id: doc.id,
            ...data,
          });
        });

        dispatch(setProducts(productsData));
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products && products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-700 p-4 shadow-md rounded-lg">
            <img src={product.image} alt={product.name} className="w-full" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">Price: ${product.price}</p>
            <p className="text-gray-600 dark:text-gray-300">Stock Quantity: {product.stockQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
