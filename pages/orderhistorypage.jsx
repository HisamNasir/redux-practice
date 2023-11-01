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
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "@/src/store/features/authSlice";
import { auth } from "@/firebase";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(setCurrentUser(user));
    });

    return () => {
      unsub();
    };
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      const fetchOrderHistory = async () => {
        try {
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
        } catch (error) {
          console.error("Error fetching order history:", error);
        }
      };
      fetchOrderHistory();
    }
  }, [currentUser]);

  return (
    <div>
      <Layout>
        <div className="bg-gray-100 space-y-2 rounded-lg dark:bg-gray-900 p-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Order History
          </h1>
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
