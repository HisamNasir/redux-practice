import store from "@/src/store";
import { Provider } from "react-redux";
import "@/styles/globals.scss";
import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      {/* <AuthContextProvider> */}
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      {/* </AuthContextProvider> */}
    </ThemeProvider>
  );
}
