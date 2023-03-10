import Header from "@/layout/Header";
import Layout from "@/layout/Layout";
import { GlobalStyle } from "@/styles/GlobalStyle";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import "react-datepicker/dist/react-datepicker.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/api/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Layout />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
