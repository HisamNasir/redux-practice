import { decremented, incremented } from "@/src/store/features/counterSlice";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import HomePage from "./homepage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { setCurrentUser } from "@/src/store/features/authSlice";
export default function Home() {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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

  return (
    <>
      <Head>
        <title>Redux</title>
      </Head>
      <main>
      <div>
      {currentUser ? <HomePage /> : null}
    </div>
      </main>
    </>
  );
}