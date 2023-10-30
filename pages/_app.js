import store from "@/src/store";
import { Provider } from "react-redux";
import "@/styles/globals.scss";
import { ThemeProvider } from "next-themes";
export default function App({ Component, pageProps }) {
  
  return (
    <ThemeProvider attribute="class">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
    </ThemeProvider>
  );
}
