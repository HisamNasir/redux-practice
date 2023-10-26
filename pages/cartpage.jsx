
import Layout from '@/components/Layout';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import PaymentPage from './PaymentPage';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/src/store/features/cartSlice";
import CartFooter from "@/components/CartFooter";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext"; // Import your AuthContext
import { getFirestore, doc, collection, addDoc } from "firebase/firestore";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isPayButtonEnabled, setIsPayButtonEnabled] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const handlePaymentSuccess = (updatedSelectedItems) => {
    setPaymentSuccess(true);
  };
  const { currentUser } = useContext(AuthContext);

  const handleDelete = (index) => {
    // Remove the product at the specified index from the cartItems state and local storage
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  // Retrieve locally stored products
  useEffect(() => {
    const locallyStoredCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(locallyStoredCart);
  }, []);

  const handleCheckboxChange = (index) => {
    // Toggle the selected state of the item at the specified index
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index] = !updatedSelectedItems[index];
    setSelectedItems(updatedSelectedItems);

    // Check if any item is selected to enable/disable "Pay" button
    setIsPayButtonEnabled(updatedSelectedItems.some((selected) => selected));
  };

  const handlePay = async () => {
    // Retrieve the selected product IDs from local storage
    const productsToPay = JSON.parse(localStorage.getItem('selectedForPayment')) || [];

    // Access Firestore
    const firestore = getFirestore();

    if (currentUser) {
      // Access the user's UID (user ID)
      const userId = currentUser.uid;

      // Access the user's document under the "users" collection
      const userDocRef = doc(firestore, "users", userId);

      // Access the "purchaseHistory" subcollection within the user's document
      const purchaseHistoryRef = collection(userDocRef, "purchaseHistory");

      // Add each selected product ID to the "purchaseHistory" collection
      for (const product of productsToPay) {
        await addDoc(purchaseHistoryRef, {
          productId: product.id,
          // Add other information related to the purchase, e.g., purchaseDate, quantity, etc.
        });
      }

      // Implement the payment process as needed
      alert('Payment Done');
    } else {
      // Handle the case where the user is not authenticated
      alert('User is not authenticated.');
    }
  };

  const calculateTotalPrice = () => {
    // Calculate the total price based on selected items
    const totalPrice = cartItems.reduce(
      (total, item, index) => (selectedItems[index] ? total + item.price : total),
      0
    );
    return totalPrice;
  };

  return (
    <div>
    <Layout>
    <div className="bg-gray-100 space-y-2 rounded-lg dark:bg-gray-900 p-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Cart Page
          </h1>
      <ul className='p-1'>
        {cartItems.map((product, index) => (
          <li key={index} className="cart-item mx-auto my-2 w-full flex items-center justify-between bg-white dark:bg-gray-800  rounded-lg shadow-lg p-3">
            <div className='flex items-center'>
             <div className="cart-item-image h-30 min-w-max w-30">
               <Image width={80} height={80} className=' mr-2 ' src={product.image} alt={product.title} />
             </div>
             <div className="cart-item-details">
               <h2>{product.title}</h2>
               <p>Price: <span className='text-amber-500'>${product.price}</span></p>
               <div className="cart-item-rating">
               </div>
             </div>

             </div>
             <div className='flex gap-4'>

            <div className="cart-item-checkbox flex justify-end">
              <input
                type="checkbox"
                checked={selectedItems[index] || false}
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
             <button onClick={() => handleDelete(index)} className="cart-item-delete  font-semibold  tracking-wide shadow-md shadow-black p-2 flex bg-amber-500  hover:bg-opacity-80  text-sm items-center md:text-sm rounded-lg gap-2">
               Remove
             </button>
             </div>
          </li>
        ))}
      </ul>
          </div>
    </Layout>
    <div className=" h-[62px] fixed w-full font-semibold px-2 md:px-8 bg-grey-800 bottom-0 border-t-[1px] border-gray-500 dark:bg-gray-800 bg-slate-200">
      <div className='flex h-full items-center justify-between '>
      <p className='flex items-center'>Total Price for Selected Items: $<span className=' text-amber-500 text-xl p-2'>{calculateTotalPrice()}</span></p>

      <button
          onClick={handlePay}
          className="cart-pay-button  font-semibold  tracking-wide shadow-md shadow-black p-2 flex bg-amber-500  hover:bg-opacity-80  text-md px-2 items-center md:text-lg md:px-8 rounded-lg gap-2"
          disabled={!isPayButtonEnabled}
        >
          Pay
        </button>
        
      </div>
    </div>
    </div>
  );
};

export default CartPage;
