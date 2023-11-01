import { useSelector } from 'react-redux';
import React from "react";
import { Link } from 'react-router-dom';
const CartFooter = () => {
  const cartCount = useSelector(state => state.cart.cartItems.length);
  const cartItems = useSelector(state => state.cart.cartItems);
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  return (
    <div className=" h-[62px] fixed w-full font-semibold px-2 md:px-8 bg-grey-800 bottom-0 border-t-[1px] border-gray-500 dark:bg-gray-800 bg-slate-200">
      <div className='flex h-full items-center justify-between '>
      <p className='hidden md:flex items-center'>Total Items in cart: <span className=' text-sky-500 text-xl p-2'>{cartCount}</span></p>
      <p>Total Price:<span className=' text-sky-500 text-xl p-2'> ${calculateTotalPrice()}</span></p>

      </div>
    </div>
  );
};

export default CartFooter;
