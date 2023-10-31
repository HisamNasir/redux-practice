import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '@/src/store/features/authSlice';
import HomePage from './homepage';
import Login from './login';
import Register from './register';
import { auth } from '@/firebase';
import ProtectedPage from '@/components/ProtectedPage';

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Redux</title>
      </Head>
      <main>
        {currentUser ? (
          <ProtectedPage>
            <HomePage />
          </ProtectedPage>
        ) : (
          <Login />
        )}
      </main>
    </>
  );
};

export default Home;
