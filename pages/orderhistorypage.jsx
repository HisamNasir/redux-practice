import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "@/firebase"; // Make sure you import the Firebase configuration correctly

const OrderHistoryPage = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const purchaseHistoryRef = collection(db, `users/${userId}/purchaseHistory`); // Use 'collection' from Firebase Firestore

      // Initialize an array to store product names
      const productNames = [];

      // Query the purchase history collection
      getDocs(purchaseHistoryRef).then((querySnapshot) => { // Use 'getDocs' to fetch documents
        querySnapshot.forEach((doc) => {
          const purchaseData = doc.data();
          const productId = purchaseData.productId;

          // Query the products collection for each productId
          const productDocRef = doc(db, "products", productId); // Reference the product document
          getDoc(productDocRef).then((productDoc) => { // Use 'getDoc' to fetch the document
            if (productDoc.exists()) {
              const productName = productDoc.data().name;
              productNames.push(productName);
            } else {
              productNames.push("Product Not Found");
            }

            // Update state with the product names
            setOrderHistory(productNames);
          });
        });
      });
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orderHistory.map((productName, index) => (
          <li key={index}>{productName}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistoryPage;
