import React, { useContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { FaAddressBook, FaCartPlus, FaCog, FaHistory, FaShip, FaSignOutAlt } from 'react-icons/fa';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import DarkModButton from './DarkModButton';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/src/store/features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSignOut = () => {
    localStorage.removeItem('cart');
    signOut(auth);
  };

  return (
    <div className="navbar h-[62px] fixed w-full font-semibold bg-grey-800 z-10 dark:shadow-gray-900 shadow-sky-500 dark:bg-gray-800 bg-sky-400">
      <div className="flex justify-center items-center h-full min-w-max">
        <div className="gap-4 justify-between px-4 container flex items-center h-full">
          <Link href="/">
            <div className="flex gap-2 items-center text-3xl ">
              <span className="text-blue-700">
                <FaShip />
              </span>{' '}
              <div>Logo</div>
            </div>
          </Link>
          <div onClick={toggleDropdown} className="relative flex gap-2 items-center">
            <div>
              {currentUser && currentUser.photoURL ? (
                <Image src={currentUser.photoURL} width={200} height={200} className="h-8 w-8 container rounded-full object-cover" alt="" />
              ) : (
                <div className="h-8 w-8 bg-gray-400 rounded-full"></div>
              )}
            </div>
            <span>{currentUser ? currentUser.displayName : 'Guest'}</span>
            {isDropdownVisible && (
              <div className="absolute top-12 rounded-xl w-40 right-1 justify-center flex dark:bg-gray-800 bg-sky-200 p-2 shadow-md">
                <ul className="min-w-max w-full space-y-1 flex flex-col justify-center text-center">
                  <li>
                    <Link href="/orderhistorypage">
                      <div className="justify-center p-2 flex bg-black bg-opacity-10 hover:bg-opacity-20 text-sm items-center md:text-sm rounded-lg gap-2">
                        <FaHistory /> Order History
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/cartpage">
                      <div className="justify-center p-2 flex bg-black bg-opacity-10 hover:bg-opacity-20 text-sm items-center md:text-sm rounded-lg gap-2">
                        <FaCartPlus /> Cart
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/settingspage">
                      <div className="justify-center p-2 flex bg-black bg-opacity-10 hover:bg-opacity-20 text-sm items-center md:text-sm rounded-lg gap-2">
                        <FaCog /> Settings
                      </div>
                    </Link>
                  </li>
                  <li>
                    <DarkModButton />
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="justify-center text-sm flex gap-2 p-2 bg-black bg-opacity-10 hover:bg-opacity-20 w-full items-center md:text-sm rounded-lg"
                    >
                      <FaSignOutAlt /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
