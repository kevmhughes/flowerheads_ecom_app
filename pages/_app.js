import React from "react";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";
import { Layout } from "@/components";
import { StateContext } from "@/context/StateContext";

//component below refers to the active current page

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
