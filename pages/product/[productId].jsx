import Layout from "@/components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/features/cartSlice";
const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
          setProduct(null);
        });
    }
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    storedCart.push(product);
    localStorage.setItem("cart", JSON.stringify(storedCart));

    console.log("Added to cart:", product);
  };

  const renderStars = () => {
    const rating = product.rating.rate;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = rating >= i ? "text-amber-500" : "text-gray-300";
      stars.push(
        <span key={i} className={`text-xl ${starClass} pr-[1px]`}>
          ★
        </span>
      );
    }
    return stars;
  };
  return (
    <Layout>
      <div className="bg-gray-100 space-y-2 rounded-lg dark:bg-gray-900 p-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Product Detail
        </h1>

        {product ? (
          <div className="mx-auto w-full flex flex-col justify-between bg-white dark:bg-gray-800  rounded-lg shadow-lg p-3">
            <a href={`/product/${product.id}`}>
              <div className="h-90 flex  justify-center bg-white rounded-t-lg items-center">
                <Image
                  width={200}
                  height={200}
                  className=" h-full w-auto m-2 rounded-t-lg"
                  src={product.image}
                  alt="Product Image"
                />
              </div>
              <div className="w-full flex flex-col space-y-2 my-4 relative justify-end">
                <div className=" space-y-2">
                  <h2 className=" text-xl font-semibold">{product.title}</h2>
                  <p className=" text-md font-semibold">
                    Category:{" "}
                    <span className=" text-sky-500">{product.category}</span>
                  </p>
                  <p>Description: {product.description}</p>
                  <p>
                    <span className=" text-sm">Price:</span> ${product.price}
                  </p>
                  <p>
                    {" "}
                    {renderStars()}{" "}
                    <span className=" text-sm">
                      {product.rating.count} reviews
                    </span>
                  </p>
                </div>

                <button
                  className=" font-semibold  tracking-wide shadow-md shadow-black p-2 flex bg-sky-600 text-white hover-bg-sky-700  hover:bg-opacity-80  text-sm items-center md:text-sm rounded-lg gap-2"
                  onClick={handleAddToCart}
                >
                  <FaCartArrowDown />
                  Add to Cart
                </button>
              </div>
            </a>
          </div>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
