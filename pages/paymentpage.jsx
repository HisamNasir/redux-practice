import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentPage = () => {
  const history = useHistory();
  const [paymentStatus, setPaymentStatus] = useState(false);

  const handlePayment = () => {
    const selectedItems = JSON.parse(
      localStorage.getItem("selectedForPayment")
    );

    const user = getCurrentUser();
    const purchaseHistoryRef = collection(
      db,
      `users/${user.uid}/purchaseHistory`
    );

    selectedItems.forEach((item) => {
      const {
        productId,
        productPrice,
        quantity,
        ratings,
        userReview,
        stars,
        text,
      } = item;

      addDoc(purchaseHistoryRef, {
        productId,
        productPrice,
        purchaseDate: Timestamp.now(),
        quantity,
        ratings,
        userReview: {
          stars,
          text,
        },
      });
    });

    localStorage.removeItem("selectedForPayment");

    history.push("/thankyou");
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Dummy Method</button>
    </div>
  );
};

export default PaymentPage;
