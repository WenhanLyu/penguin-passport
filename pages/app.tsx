import React, { useEffect, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { networkParams } from "../src/network";
import { connectors } from "../connectors/connector";
import { toHex } from "../src/utils";
import PageFooter from "../components/PageFooter";
import PageHeader from "../components/PageHeader";
import { Montserrat } from "@next/font/google";
import PageBody from "../components/PageBody";
import AboutBody from "../components/AboutBody";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [network, setNetwork] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState<boolean>();

  const [showAbout, setShowAbout] = useState(false);

  const redirectToAbout = () => {
    setShowAbout(true);
  };

  const redirectToIndex = () => {
    setShowAbout(false);
  };

  const handleNetwork = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            // @ts-ignore
            params: [networkParams[toHex(network)]],
          });
        } catch (error: any) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account],
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error: any) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature],
      });
      if (account) setVerified(verify === account.toLowerCase());
      else setVerified(false);
    } catch (error: any) {
      setError(error);
    }
  };

  const refreshState = () => {
    // @ts-ignore
    window.localStorage.setItem("provider", undefined);
    setNetwork(undefined);
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    // @ts-ignore
    if (provider) activate(connectors[provider]);
  }, []);

  return (
    <>
      <Box className={montserrat.className}>
        <PageHeader showAbout={redirectToAbout} showIndex={redirectToIndex} />
        {showAbout ? <AboutBody /> : <PageBody />}
        <PageFooter />
      </Box>
    </>
  );
}
