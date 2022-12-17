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
            <VStack justifyContent="center" alignItems="center" h="100vh">
                <HStack marginBottom="10px">
                    <Text
                        margin="0"
                        lineHeight="1.15"
                        fontSize={["1.5em", "2em", "3em", "4em"]}
                        fontWeight="600"
                    >
                        Connect with
                    </Text>
                    <Text
                        margin="0"
                        lineHeight="1.15"
                        fontSize={["1.5em", "2em", "3em", "4em"]}
                        fontWeight="600"
                        sx={{
                            background: "linear-gradient(90deg, #1652f0 0%, #b9cbfb 70.35%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        Web3-React
                    </Text>
                </HStack>
                <HStack>
                    {!active ? (
                        <Button onClick={onOpen}>Connect Wallet</Button>
                    ) : (
                        <Button onClick={disconnect}>Disconnect</Button>
                    )}
                </HStack>
                <VStack justifyContent="center" alignItems="center" padding="10px 0">
                    <HStack>
                        <Text>{`Connection Status: `}</Text>
                        {active ? (
                            <CheckCircleIcon color="green"/>
                        ) : (
                            <WarningIcon color="#cd5700"/>
                        )}
                    </HStack>

                    <Tooltip label={account} placement="right">
                        <Text>{`Account: ${truncateAddress(account)}`}</Text>
                    </Tooltip>
                    <Text>{`Network ID: ${chainId ? chainId : "No Network"}`}</Text>
                </VStack>
                {/*@ts-ignore*/}
                <Text>{error ? error.message : null}</Text>
            </VStack>
            <SelectWalletModal isOpen={isOpen} closeModal={onClose}/>
        </>
    );
}
