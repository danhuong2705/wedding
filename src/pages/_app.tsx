
import type { AppProps } from "next/app";
import { } from 'next/font/google'
import Head from "next/head";

import '../styles/home.css';


export default function App({ Component, pageProps }: AppProps) {

  return (
    <main>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet"></link>
        <title>Viên Dắn Wedding</title>
      </Head>
        <Component {...pageProps} />


    </main>
  );
}
