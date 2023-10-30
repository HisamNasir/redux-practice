import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FaAddressBook, FaCartPlus, FaCog, FaHistory, FaShip, FaSignOutAlt } from 'react-icons/fa';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import DarkModButton from './DarkModButton';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch and useSelector
import { clearUser } from '@/src/store/features/authSlice'; // Import your Redux action

const Navbar = () => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const user = useSelector(state => state.auth.user); // Get user from Redux state

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSignOut = () => {
    localStorage.removeItem('cart');
    signOut(auth)
      .then(() => {
        // Dispatch the clearUser action to remove the user from Redux state
        dispatch(clearUser());
      });
  };

  return (
    <div className="navbar h-[62px] fixed w-full font-semibold bg-grey-800 z-10  shadow-lg dark:shadow-gray-900 shadow-sky-500 dark:bg-gray-800 bg-sky-400">
      <div className="flex justify-center items-center h-full min-w-max">
        <div className="gap-4 justify-between px-4 container flex items-center h-full">
          <Link href="/" className="flex gap-2 items-center text-3xl ">
            <span className=" text-blue-700"><FaShip/></span> <div>Logo</div>
          </Link>
          {user && (
            <div onClick={toggleDropdown} className="relative flex gap-2 items-center">
              <div>
                <Image width={200} height={200} className="h-8 w-8 container rounded-full object-cover" src={user.photoURL} alt="" />
              </div>
              <span>{user.displayName}</span>
              {isDropdownVisible && (
                <div className="absolute top-12 rounded-xl w-40 right-1 justify-center flex dark:bg-gray-800 bg-sky-200 p-2 shadow-md">
                  <ul className=" min-w-max w-full space-y-1 flex flex-col justify-center text-center">
                    <li>
                      <Link className="justify-center p-2 flex bg-black bg-opacity-10 hover-bg-opacity-20 text-sm items-center md:text-sm rounded-lg gap-2" href="/orderhistorypage"><FaHistory/>OrderHistory</Link>
                    </li>
                    <li>
                      <Link className="justify-center p-2 flex bg-black bg-opacity-10 hover-bg-opacity-20 text-sm items-center md:text-sm rounded-lg gap-2" href="/cartpage"><FaCartPlus/>Cart</Link>
                    </li>
                    <li>
                      <Link className="justify-center p-2 flex bg-black bg-opacity-10 hover-bg-opacity-20 text-sm items-center md:text-sm rounded-lg gap-2" href="/settingspage"><FaCog/>Settings</Link>
                    </li>
                    <li>
                      <DarkModButton />
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="justify-center text-sm flex gap-2 p-2 bg-black bg-opacity-10 hover-bg-opacity-20 w-full items-center md:text-sm rounded-lg"
                      >
                        <FaSignOutAlt /> Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
