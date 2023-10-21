// Import the Redux store that you've configured.
import store from "@/src/store";

// Import the Provider component from 'react-redux' to connect your React components to the Redux store.
import { Provider } from "react-redux";

// Import your global styles (e.g., SCSS).
import "@/styles/globals.scss";
import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";

// Define your main application component.
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <AuthContextProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
