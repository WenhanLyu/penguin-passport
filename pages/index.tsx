import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Blockie} from "@web3uikit/web3";
import {useEffect} from "react";
import {Web3ReactProvider} from "@web3-react/core";
import {ethers} from "ethers";
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import App from "./app"
import Connect from "../components/Connect";
import theme from "./theme";
import NFTCard from "../components/NFTCard";

const getLibrary = (provider: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
};

export default function Home() {
    return (
        <ChakraProvider theme={theme}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <App/>
            </Web3ReactProvider>
        </ChakraProvider>
    )
}
