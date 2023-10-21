import { decremented, incremented } from "@/src/store/features/counterSlice";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

import Login from "./login";
import Register from "./register";
import HomePage from "./homepage";
import CartPage from "./cartpage";
import Settings from "./settingspage";
import OrderHistory from "./orderhistorypage";
export default function Home() {
 
  const { value } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <>
      <Head>
        <title>Redux</title>
      </Head>

      <main>
      <>
      <main id="__next">{currentUser ? <HomePage/> : null}</main>
    </>
      </main>
    </>
  );
}
