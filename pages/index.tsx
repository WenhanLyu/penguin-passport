import Head from "next/head";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./app";

const getLibrary = (
  provider:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Penguin Passport</title>
        <meta property="og:title" content="Penguin Passport" key="title" />
      </Head>
      <ChakraProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider>
      </ChakraProvider>
    </>
  );
}
