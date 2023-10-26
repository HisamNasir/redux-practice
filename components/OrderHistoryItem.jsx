import React, { useEffect, useState } from "react";
import axios from "axios";
const OrderHistoryItem = ({ productId }) => {
const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <li>
      {product ? (
        <div>
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </li>
  );
};

export default OrderHistoryItem;
