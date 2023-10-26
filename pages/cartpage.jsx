
import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isPayButtonEnabled, setIsPayButtonEnabled] = useState(false);
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

  const handlePay = () => {
    // Filter and store the selected products for payment in local storage
    const productsToPay = cartItems.filter((_, index) => selectedItems[index]);
    localStorage.setItem('selectedForPayment', JSON.stringify(productsToPay));

    // Implement the payment process as needed
    alert('Payment processing...');
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
    <Layout>
      <h1>Cart Page</h1>
      <ul className='p-1'>
        {cartItems.map((product, index) => (
          <li key={index} className="cart-item mx-auto my-2 w-full flex items-center justify-between bg-white dark:bg-gray-800  rounded-lg shadow-lg p-3">
            <div className='flex items-center'>
             <div className="cart-item-image h-30 min-w-max w-30">
               <img className='max-h-20 max-w-20 mr-2 ' src={product.image} alt={product.title} />
             </div>
             <div className="cart-item-details">
               <h2>{product.title}</h2>
               <p>Price: ${product.price}</p>
               <div className="cart-item-rating">
               </div>
             </div>

             </div>
             <div className=' space-y-2'>

            <div className="cart-item-checkbox flex justify-end">
              <input
                type="checkbox"
                checked={selectedItems[index] || false}
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
             <button onClick={() => handleDelete(index)} className="cart-item-delete">
               Remove
             </button>
             </div>
          </li>
        ))}
      </ul>
      <div className="cart-footer">
        <p>Total Price for Selected Items: ${calculateTotalPrice().toFixed(2)}</p>
        <button
          onClick={handlePay}
          className="cart-pay-button"
          disabled={!isPayButtonEnabled}
        >
          Pay
        </button>

      </div>
    </Layout>
  );
};

export default CartPage;
