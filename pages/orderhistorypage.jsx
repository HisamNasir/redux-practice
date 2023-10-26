import React, { useEffect, useState, useContext } from "react";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import OrderHistoryItem from "@/components/OrderHistoryItem";
import Layout from "@/components/Layout";
const OrderHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    if (currentUser) {
      const fetchOrderHistory = async () => {
        const firestore = getFirestore();
        const userId = currentUser.uid;
        const userDocRef = doc(firestore, "users", userId);
        const purchaseHistoryRef = collection(userDocRef, "purchaseHistory");
        const purchaseHistoryQuery = query(purchaseHistoryRef);
        const orderHistorySnapshot = await getDocs(purchaseHistoryQuery);
        const orderHistoryData = [];
        for (const docRef of orderHistorySnapshot.docs) {
          const productId = docRef.data().productId;
          orderHistoryData.push(productId);
        }
        setOrderHistory(orderHistoryData);
      };
      fetchOrderHistory();
    }
  }, [currentUser]);
  return (
    <div>
      <Layout>
        <div>
          <h1>Order History</h1>
          <ul>
            {orderHistory.map((productId) => (
              <OrderHistoryItem key={productId} productId={productId} />
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
};

export default OrderHistory;
