import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/features/cartSlice";
import Layout from "@/components/Layout";
import CartFooter from "@/components/CartFooter";
import ProductSearchBar from "@/components/ProductSearchBar"; 
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleSearch = (results) => {
    setSearchResults(results);
  };
  return (
    <ProtectedPage>
      <Layout>
        <div className="mb-4">

        </div>
        <div className="bg-gray-100 space-y-2 rounded-lg dark:bg-gray-900 p-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Products
          </h1>
          <ProductSearchBar products={products} onSearch={handleSearch} />{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {searchResults.length > 0
              ? searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </Layout>
      <CartFooter />
    </ProtectedPage>
  );
};

export default HomePage;
