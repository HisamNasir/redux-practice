import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import DarkModButton from "@/components/DarkModButton";
import { FaSpinner } from "react-icons/fa";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const router = useRouter();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setSelectedImageUrl(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    toast("Please wait Profile Uploading");
    setLoading(true);
    e.preventDefault();
    const file = profilePicture;
    const displayName = name;
    const userEmail = email;
    const userPassword = password;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(async () => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            const userDocRef = doc(db, "users", res.user.uid);
            await setDoc(userDocRef, {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            const purchaseHistoryRef = collection(userDocRef, "purchaseHistory");
            await addDoc(purchaseHistoryRef, {
              purchaseDate: Timestamp.now(),
              productId: "",
              quantity: "",
              productPrice: "",
              totalPrice: "",
              userReview: {
                stars: "",
                text: "",
              },
            });
            setShowSuccessMessage(true);
            setName("");
            setEmail("");
            setPassword("");
            setSelectedFile(null);
            setLoading(false);
            setTimeout(() => {
              setShowSuccessMessage(false);
              router.push("/");
            }, 3000);
          } catch (err) {
            console.error(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

return (
  <div className="flex min-w-max flex-col h-screen justify-center items-center">
      <div className="fixed top-2 right-2">
        <DarkModButton />
      </div>
      {showSuccessMessage ? (
        <div className="text-sky-500 text-lg">
          Successfully Uploaded. Redirecting...
        </div>
      ) : (
        <form
        onSubmit={handleSubmit}
        className="bg-sky-200 dark:bg-sky-900 p-5 text-sm w-full max-w-lg rounded-xl space-y-4"
      >
        <h1 className="text-lg font-bold">Sign Up</h1>
        <div className="space-y-1">
          <div className="text-base">Profile Picture</div>
          <div>
            <input
              required
              type="file"
              id="file"
              name="profilePicture"
              className="rounded-xl p-2 w-full"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setProfilePicture(file);
                  setSelectedImageUrl(imageUrl);
                }
              }}
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-base">Name</div>
          <div>
            <input
              required
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:outline focus:outline-1 focus:outline-sky-500 rounded-xl p-2 w-full"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-base">Email</div>
          <div>
            <input
              type="email"
              required
              placeholder="Email"
              id="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline focus:outline-1 focus:outline-sky-500 rounded-xl p-2 w-full"
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-base">Password</div>
          <div>
            <input
              type="password"
              required
              placeholder="Password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline focus:outline-1 focus:outline-sky-500 rounded-xl p-2 w-full"
            />
          </div>
        </div>
        <div>
          <p className="text-sky-500">
            Already have an account?{" "}
            <Link href="/loginPage" className="hover:text-black transition-colors delay-75">
              Login
            </Link>
          </p>
        </div>
        {loading ? (
            <div className="text-sky-500 text-lg text-center gap-2 flex items-center"><span className=" flex justify-center items-center animate-spin"><FaSpinner/></span> <p>Loading...</p></div>
          ) : (
            <div>
              <button
                onClick={handleSubmit}
                className="w-full rounded-xl p-2 text-center bg-sky-600 text-white hover-bg-sky-700 duration-500 transition-colors"
              >
                Sign up
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default Register;