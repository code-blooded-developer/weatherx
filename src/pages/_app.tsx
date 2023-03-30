import { useState } from "react";
import { useSelector } from "react-redux";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import store, { AppStore } from "@/store/store";
import { GlobalStyles } from "@/styles/app.styled";
import { darkTheme, lightTheme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, toggleDarkMode] = useState(false);

  return (
    <Provider store={store}>
      <ThemedComponent Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

interface IThemedComponentProps {
  Component: any;
  pageProps: any;
}

function ThemedComponent({ Component, pageProps }: IThemedComponentProps) {
  const darkMode = useSelector((state: AppStore) => state.app.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
