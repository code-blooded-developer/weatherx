import { useState } from "react";
import type { AppProps } from "next/app";
import { GlobalStyles } from "@/styles/app.styled";

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, toggleDarkMode] = useState(false);

  return (
    <>
      <GlobalStyles />
      <Component
        {...pageProps}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </>
  );
}
