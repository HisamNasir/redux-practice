import { useSelector } from 'react-redux';
import React, { useContext, useState } from "react";
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
      <p className='hidden md:flex items-center'>Total Items in cart: <span className=' text-amber-500 text-xl p-2'>{cartCount}</span></p>
      <p>Total Price:<span className=' text-amber-500 text-xl p-2'> ${calculateTotalPrice()}</span></p>
      <Link href="/cartpage" className=" font-semibold  tracking-wide shadow-md shadow-black p-2 flex bg-amber-500  hover:bg-opacity-80  text-sm items-center md:text-sm rounded-lg gap-2">
        Checkout
      </Link>
      </div>
    </div>
  );
};

export default CartFooter;
