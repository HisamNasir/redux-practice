<<<<<<< HEAD
const ProductItem = ({ productId }) => {
  const [product, setProduct] = useState(null);
=======
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
>>>>>>> parent of 18f28f6 (done)

  useEffect(() => {
    // Fetch the product details from the 'products' collection
    const productRef = db.collection("products").doc(productId);
    productRef.get().then((doc) => {
      if (doc.exists) {
        setProduct(doc.data());
      }
    });
  }, [productId]);

  return (
    <li>
<<<<<<< HEAD
      {product ? product.title : "Product not found"}
      {/* You can display other product information here */}
=======
      {product ? (
        <div>
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
>>>>>>> parent of 18f28f6 (done)
    </li>
  );
};
