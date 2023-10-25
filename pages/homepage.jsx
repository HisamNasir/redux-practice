import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '@/components/Layout';
import { selectProducts, setProducts } from '@/src/store/features/productSlice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import Link from 'next/link';
const HomePage = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  useEffect(() => {
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
    <Layout>
      <div className="bg-gray-100 space-y-2 rounded-lg dark:bg-gray-900 p-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
