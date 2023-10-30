import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectProducts } from "@/src/store/features/productSlice";
import { updateCurrentUser } from "firebase/auth";
import { selectUser } from "@/src/store/features/authSlice";
import Layout from "@/components/Layout";
import ProtectedPage from "@/components/ProtectedPage";

const OrderHistoryItem = ({ productId }) => {
 const product = useSelector((state) => selectProducts(state, productId));

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
  const currentUser = useSelector(selectUser);
  console.log('currentUser:', currentUser);

  return (
    <ProtectedPage>

    
    <Layout>
    <li>
      {product ? (
        <div className="flex my-4 gap-2 mx-auto w-full bg-white dark:bg-gray-800  rounded-lg shadow-lg p-3">
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
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p>
              <span className="text-sm">Price:</span> ${product.price}
            </p>
            <p>
              {renderStars()}{" "}
              <span className="text-sm">{product.rating.count} reviews</span>
            </p>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </li>

    </Layout></ProtectedPage>
  );
};

export default OrderHistoryItem;
