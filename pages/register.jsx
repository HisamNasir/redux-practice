// import React, { useState } from "react";
// import Link from "next/link";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { addDoc, collection, doc, setDoc } from "firebase/firestore";
// import { useRouter } from "next/router";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import DarkModButton from "@/components/DarkModButton";

// const Register = () => {
//   const [err, setErr] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedImageUrl, setSelectedImageUrl] = useState(null);
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [purchaseHistory, setPurchaseHistory] = useState([]); // Initialize an empty array for purchase history

//   const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setSelectedFile(file);
//       setSelectedImageUrl(imageUrl);
//     }
//   };

//   const handleSubmit = async (e) => {
//     toast("Please wait Profile Uploading");
//     setLoading(true);
//     e.preventDefault();
//     const file = profilePicture;
//     const displayName = name;
//     const userEmail = email;
//     const userPassword = password;

//     try {
//       // Create user
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       // Create a unique image name
//       const date = new Date().getTime();
//       const storageRef = ref(storage, `${displayName + date}`);

//       await uploadBytesResumable(storageRef, file).then(async () => {
//         getDownloadURL(storageRef).then(async (downloadURL) => {
//           try {
//             // Update profile
//             await updateProfile(res.user, {
//               displayName,
//               photoURL: downloadURL,
//             });

//             // Create user document with purchase history in Firestore
//             const userDocRef = doc(db, "users", res.user.uid);
//             await setDoc(userDocRef, {
//               uid: res.user.uid,
//               displayName,
//               email,
//               photoURL: downloadURL,
//               purchaseHistory, // Include the purchase history
//             });

//             // Allow users to enter purchase history
//             const purchasePrice = 29.99; // Replace with user input
//             const purchaseRatings = 4; // Replace with user input
//             const stars = null; // Empty initially, user can input later
//             const text = ""; // Empty initially, user can input later
//             purchaseHistory.push({
//               purchaseDate: new Date(),
//               productId: "sample_product_id",
//               productPrice: purchasePrice,
//               ratings: purchaseRatings,
//               userReview: {
//                 stars,
//                 text,
//               },
//             });

//             router.push("/"); // Use router.push("/") to navigate to the home page
//           } catch (err) {
//             console.error(err);
//             setErr(true);
//             setLoading(false);
//           }
//         });
//       });
//     } catch (err) {
//       setErr(true);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-w-max flex-col h-screen justify-center items-center">
//       <div className="fixed top-2 right-2">
//         <DarkModButton />
//       </div>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-slate-200 dark:bg-slate-900 p-5 text-sm w-full max-w-lg rounded-xl space-y-4"
//       >
//         <h1 className="text-lg font-bold">Sign Up</h1>
//         <div className="space-y-1">
//           <div className="text-base">Profile Picture</div>
//           <div>
//             <input
//               required
//               type="file"
//               id="file"
//               name="profilePicture"
//               className="rounded-md p-2 w-full"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const imageUrl = URL.createObjectURL(file);
//                   setProfilePicture(file);
//                   setSelectedImageUrl(imageUrl);
//                 }
//               }}
//             />
//           </div>
//         </div>
//         <div className="space-y-1">
//           <div className="text-base">Name</div>
//           <div>
//             <input
//               required
//               type="text"
//               placeholder="Name"
//               id="name"
//               name="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="focus:outline focus:outline-1 focus:outline-slate-500 rounded-md p-2 w-full"
//             />
//           </div>
//         </div>

//         <div className="space-y-1">
//           <div className="text-base">Email</div>
//           <div>
//             <input
//               type="email"
//               required
//               placeholder="Email"
//               id="Email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="focus:outline focus:outline-1 focus:outline-slate-500 rounded-md p-2 w-full"
//             />
//           </div>
//         </div>
//         <div className="space-y-1">
//           <div className="text-base">Password</div>
//           <div>
//             <input
//               type="password"
//               required
//               placeholder="Password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="focus:outline focus:outline-1 focus:outline-slate-500 rounded-md p-2 w-full"
//             />
//           </div>
//         </div>
//         <div>
//           <p className="text-slate-500">
//             Already have an account?{" "}
//             <Link href="/loginPage" className="hover:text-black transition-colors delay-75">
//               Login
//             </Link>
//           </p>
//         </div>
//         <div>
//           <button
//             onClick={handleSubmit}
//             className="w-full rounded-md p-2 text-center bg-slate-600 text-white hover-bg-slate-700 duration-500 transition-colors"
//           >
//             Sign up
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, addDoc, Timestamp } from "firebase/firestore"; // Import the necessary Firestore functions
import { useRouter } from "next/router";
import DarkModButton from "@/components/DarkModButton";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

            // Create user's purchase history subcollection
            const purchaseHistoryRef = collection(userDocRef, "purchaseHistory");
            await addDoc(purchaseHistoryRef, {
              purchaseDate: Timestamp.now(),
              productId:'',
              productPrice:'', // Replace with the actual price
              ratings:'', // Replace with the actual ratings
              userReview: {
                stars:'', // Empty initially, user can input later
                text:'', // Empty initially, user can input later
              },
            });

            router.push("/"); // Use router.push("/") to navigate to the home page
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

      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 dark:bg-slate-900 p-5 text-sm w-full max-w-lg rounded-xl space-y-4"
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
              className="rounded-md p-2 w-full"
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
              className="focus:outline focus:outline-1 focus:outline-slate-500 rounded-md p-2 w-full"
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
              className="focus:outline focus:outline-1 focus:outline-slate-500 rounded-md p-2 w-full"
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
              className="focus:outline focus:outline-1 focus:outline-slate-500 rounded-md p-2 w-full"
            />
          </div>
        </div>
        <div>
          <p className="text-slate-500">
            Already have an account?{" "}
            <Link href="/loginPage" className="hover:text-black transition-colors delay-75">
              Login
            </Link>
          </p>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="w-full rounded-md p-2 text-center bg-slate-600 text-white hover-bg-slate-700 duration-500 transition-colors"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
