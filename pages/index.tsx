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
    // useEffect(() => {
    //   fetch('https://testnets-api.opensea.io/api/v1/asset/0xD000F000Aa1F8accbd5815056Ea32A54777b2Fc4/5567/?account_address=0x854BB98606da22261a81E938436E256acCf0796A')
    //       .then((res) => res.json())
    //       .then((data) => console.log(data));
    // },[]);

    return (
        <ChakraProvider theme={theme}>
            <Web3ReactProvider getLibrary={getLibrary}>
                {/*<App/>*/}
                <Connect/>
                <NFTCard contractAddress={'0xD000F000Aa1F8accbd5815056Ea32A54777b2Fc4'} expireDate={new Date()}
                         rewards={''}/>
            </Web3ReactProvider>
        </ChakraProvider>
    )
}
