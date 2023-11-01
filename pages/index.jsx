import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { setCurrentUser } from "@/src/store/features/authSlice";
import HomePage from "./homepage";
import { auth } from "@/firebase";

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  return <div>{currentUser ? <HomePage /> : null}</div>;
};

export default Home;
