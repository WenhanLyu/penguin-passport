import React, {useEffect, useState} from "react";
import {
    VStack,
    useDisclosure,
    Button,
    Text,
    HStack,
    Select,
    Input,
    Box
} from "@chakra-ui/react";
import SelectWalletModal from "../components/SelectWalletModal";
import {useWeb3React} from "@web3-react/core";
import {CheckCircleIcon, WarningIcon} from "@chakra-ui/icons";
import {Tooltip} from "@chakra-ui/react";
import {networkParams} from "../src/network";
import {connectors} from "../connectors/connector";
import {toHex, truncateAddress} from "../src/utils";
import Connect from "../components/Connect";
import PageFooter from "../components/PageFooter";
import PageHeader from "../components/PageHeader";
import MintButton from "../components/MintButton";
import {Montserrat} from "@next/font/google"
import CardStack from "../components/CardStack";

// const montserrat = Montserrat();

export default function Home() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active
    } = useWeb3React();
    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const [network, setNetwork] = useState<number | undefined>(undefined);
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState<boolean>();

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
                params: [{chainId: toHex(network)}]
            });
        } catch (switchError: any) {
            if (switchError.code === 4902) {
                try {
                    await library.provider.request({
                        method: "wallet_addEthereumChain",
                        // @ts-ignore
                        params: [networkParams[toHex(network)]]
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
                params: [message, account]
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
                params: [signedMessage, signature]
            });
            if (account)
                setVerified(verify === account.toLowerCase());
            else
                setVerified(false);
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
            <main>
                <PageHeader/>
                <CardStack/>
                {/*<MintButton/>*/}
                <PageFooter/>
            </main>
        </>
    );
}
