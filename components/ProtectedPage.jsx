// ProtectedPage.js
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ProtectedPage = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      // If the user is not authenticated, redirect them to the login page
      router.push("/login");
    }
  }, [currentUser, router]);

  return children;
};

export default ProtectedPage;
