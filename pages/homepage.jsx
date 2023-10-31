import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import Layout from '@/components/Layout';
import CartFooter from '@/components/CartFooter';
import ProductSearchBar from '@/components/ProductSearchBar';
import { setProducts } from '@/src/store/features/productSlice';
const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((response) => {
      dispatch(setProducts(response.data));
    });
  }, [dispatch]);
  const handleSearch = (results) => {
    setSearchResults(results);
  };
  return (
    <div>
      <Layout>
        <div className="mb-4">
        </div>
        <div className="bg-gray-100 space-y-2 rounded-lg dark:bg-gray-900 p-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Products</h1>
          <ProductSearchBar products={products} onSearch={handleSearch} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {searchResults.length > 0
              ? searchResults.map((product) => <ProductCard key={product.id} product={product} />)
              : products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </Layout>
      <CartFooter />
    </div>
  );
};

export default HomePage;
