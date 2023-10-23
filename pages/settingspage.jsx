import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import DarkModButton from "@/components/DarkModButton";
import Layout from "@/components/Layout";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, storage } from "../firebase";
import Link from "next/link";

const Settings = () => {
  const { currentUser } = useContext(AuthContext);
  const [newName, setNewName] = useState(currentUser.displayName);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
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
        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="rounded-lg min-w-min space-y-4 bg-gray-100 dark:bg-gray-900 m-2 p-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
          <div className="text-center">
            <img
              src={currentUser.photoURL}
              alt="Profile Picture"
              className="h-16 w-16 rounded-full mx-auto"
            />
            <h2 className="text-xl font-semibold">{currentUser.displayName}</h2>
            <p className="text-gray-600">{currentUser.email}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Theme</h3>
            <div className="mt-2">
              <DarkModButton />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Edit Profile</h3>
            <div className="my-2">
              <div className="my-2 w-full  rounded-md p-2 transition-colors">
                Full Name
                <input
                  type="text"
                  placeholder={currentUser.displayName}
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
                className="mt-2 w-full bg-black hover:bg-opacity-40 bg-opacity-20 rounded-md p-2  transition-colors"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

            </div>
          </div>
        </div>
        {/* ////////section 2 */}
        <div className="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Your product</h3>
            <div className="my-4 w-full ">
              <Link
              href='/PublishedProduct'
                
                className="mt-2 bg-black hover:bg-opacity-40 bg-opacity-20 rounded-md p-2 transition-colors"
              >
                Publish your own product
              </Link>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
