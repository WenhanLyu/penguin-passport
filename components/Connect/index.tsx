import {Box, Button, useDisclosure} from "@chakra-ui/react";
import {useWeb3React} from "@web3-react/core";
import React, {useEffect, useState} from "react";
import {connectors} from "../../connectors/connector";
import SelectWalletModal from "../SelectWalletModal";
import ProfileMenu from "../ProfileMenu";
import {Montserrat} from "@next/font/google"

const montserrat = Montserrat();

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
            <Box className={montserrat.className}>
                {!active ? (
                    <Button
                        onClick={onOpen}
                        h={24}
                        borderRadius={24}
                        w={60}
                        colorScheme={"teal"}
                    >
                        Connect Your Wallet
                    </Button>
                ) : (
                    <ProfileMenu/>
                )}
                <SelectWalletModal isOpen={isOpen} closeModal={onClose}/>
            </Box>
        </>
    );
}