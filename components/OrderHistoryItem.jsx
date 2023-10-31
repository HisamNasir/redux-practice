import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const OrderHistoryItem = ({ productId }) => {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    fetchProductDetails();
  }, [productId]);
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
    <li>
      {product ? (
        <div className="flex my-4 gap-2 mx-auto w-full bg-white dark:bg-gray-800  rounded-lg shadow-lg p-3 ">
          <div className="h-24 w-24 p-4 rounded-xl bg-white flex items-center justify-center">
          <div className="flex flex-col h-32 w-32 items-center justify-center">
            <Image
              width={200}
              height={200}
              className=""
              src={product.image}
              alt="Product Image"
            />
          </div>

          </div>
          <div>
            <h3 className=" text-lg font-semibold">{product.title}</h3>
            <p>
              <span className=" text-sm">Price:</span> ${product.price}
            </p>
            <p>
              {" "}
              {renderStars()}{" "}
              <span className=" text-sm">{product.rating.count} reviews</span>
            </p>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </li>
  );
};

export default OrderHistoryItem;
