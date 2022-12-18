import {Button, useDisclosure} from "@chakra-ui/react";
import {useWeb3React} from "@web3-react/core";
import React, {useEffect, useState} from "react";
import {connectors} from "../../connectors/connector";
import SelectWalletModal from "../SelectWalletModal";
import ProfileMenu from "../ProfileMenu";

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

    return (
        <>
            {!active ? (
                <Button onClick={onOpen}>Connect Your Wallet</Button>
            ) : (
                <ProfileMenu/>
            )}
            <SelectWalletModal isOpen={isOpen} closeModal={onClose}/>
        </>
    );
}