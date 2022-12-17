import {Button, useDisclosure} from "@chakra-ui/react";
import {useWeb3React} from "@web3-react/core";
import React, {useEffect, useState} from "react";
import {connectors} from "../../connectors/connector";
import SelectWalletModal from "../SelectWalletModal";

export default function Connect() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active
    } = useWeb3React();
    const [verified, setVerified] = useState<boolean>();

    const refreshState = () => {
        // @ts-ignore
        window.localStorage.setItem("provider", undefined);
        setVerified(undefined);
    };

    const disconnect = () => {
        refreshState();
        deactivate();
    };

    useEffect(() => {
        console.log(active);
    }, []);

    return (
        <>
            {!active ? (
                <Button onClick={onOpen}>Connect Your Wallet</Button>
            ) : (
                <Button>Profile</Button>
            )}
            <SelectWalletModal isOpen={isOpen} closeModal={onClose}/>
        </>
    );
}