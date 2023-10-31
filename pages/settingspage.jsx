import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserProfile,
  selectUser,
  updateTheme,
} from "@/src/store/features/authSlice";
import DarkModButton from "@/components/DarkModButton";
import Layout from "@/components/Layout";
import { updateProfile } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { auth, storage } from "../firebase";
import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image";
import ProtectedPage from "@/components/ProtectedPage";
=======
>>>>>>> parent of 29a7283 (done)

const Settings = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [newName, setNewName] = useState(user ? user.displayName : "");
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
<<<<<<< HEAD
      if (user) {
=======
      // Update the user's display name
      await updateProfile(auth.currentUser, {
        displayName: newName,
      });

      // Delete the old profile picture from storage
      if (newProfilePicture) {
        const oldImageRef = ref(storage, `${currentUser.uid}`);
        await deleteObject(oldImageRef);

        // Upload the new profile picture and get the download URL
        const newImageRef = ref(storage, currentUser.uid);
        await uploadBytesResumable(newImageRef, newProfilePicture);
        const downloadURL = await getDownloadURL(newImageRef);

        // Update the user's profile picture URL
>>>>>>> parent of 29a7283 (done)
        await updateProfile(auth.currentUser, {
          displayName: newName,
        });
        if (newProfilePicture) {
          const oldImageRef = ref(storage, `${user.uid}`);
          await deleteObject(oldImageRef);
          const newImageRef = ref(storage, user.uid);
          await uploadBytesResumable(newImageRef, newProfilePicture);
          const downloadURL = await getDownloadURL(newImageRef);

          // Update the Redux state with the new profile data
          dispatch(
            updateUserProfile({
              displayName: newName,
              photoURL: downloadURL,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedPage>
    <Layout>
      <div className="rounded-lg min-w-min space-y-4 bg-gray-100 dark:bg-gray-900 m-2 p-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
          <div className="text-center">
<<<<<<< HEAD
            <Image
              width={200}
              height={200}
              src={user ? user.photoURL : "/placeholder-image.jpg"}
=======
            <img
              src={currentUser.photoURL}
>>>>>>> parent of 29a7283 (done)
              alt="Profile Picture"
              className="h-16 w-16 rounded-full mx-auto"
            />
            <h2 className="text-xl font-semibold">
              {user ? user.displayName : ""}
            </h2>
            <p className="text-gray-600">{user ? user.email : ""}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Theme</h3>
            <div className="mt-2">
              <DarkModButton
                updateTheme={(theme) => dispatch(updateTheme(theme))}
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Edit Profile</h3>
            <div className="my-2">
              <div className="my-2 w-full rounded-md p-2 transition-colors">
                Full Name
                <input
                  type="text"
                  placeholder={user ? user.displayName : ""}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="rounded-md dark:bg-black mt-2 p-2 bg-gray-200 w-full"
                />
              </div>
              <div className="my-2 transition-colors w-full rounded-md p-2">
                Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewProfilePicture(e.target.files[0])}
                  className="rounded-md w-full text-gray-600 dark:bg-black mt-2 p-2 bg-gray-200"
                />
              </div>
              <button
                onClick={handleUpdateProfile}
                className="mt-2 w-full bg-black hover:bg-opacity-40 bg-opacity-20 rounded-md p-2 transition-colors"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

            </div>
          </div>
        </div>
        {/* ////////section 2 */}
        <div className="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
          <div className="mt-4">
<<<<<<< HEAD
            <h3 className="text-lg font-semibold">Your Account</h3>
            <div className="my-4 w-full">account details</div>
=======
            <h3 className="text-lg font-semibold">Your Accoutn</h3>
            <div className="my-4 w-full ">
              account details

            </div>
>>>>>>> parent of 29a7283 (done)
          </div>
        </div>
      </div>
    </Layout>

    </ProtectedPage>
  );
};

export default Settings;
