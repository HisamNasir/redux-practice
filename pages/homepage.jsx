// import React, { useEffect, useState } from 'react';
// import Layout from '@/components/Layout';
// import axios from "axios";

// import ProductCard from '@/components/ProductCard';
// const HomePagePage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get("https://fakestoreapi.com/products")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   return (
//     <Layout>
//       <div className="bg-gray-100 space-y-2 rounded-lg dark:bg-gray-900 p-4">
//         <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Products</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.map((product) => (
//       <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
//         <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
//         <h2 className="text-lg font-semibold">{product.title}</h2>
//         <p className="text-sm text-gray-600">{product.price}$</p>
//         {/* Add more details as needed */}
//       </div>
//     ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };
// export default HomePagePage;
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/features/cartSlice";
import Layout from "@/components/Layout";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products from the Fake Store API
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <div className="bg-gray-100 space-y-2 rounded-lg dark:bg-gray-900 p-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </div>
    </Layout>
  );
};

export default HomePage;
