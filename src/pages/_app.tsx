import { useState } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "@/styles/app.styled";
import { darkTheme, lightTheme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, toggleDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Component
        {...pageProps}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </ThemeProvider>
  );
}
