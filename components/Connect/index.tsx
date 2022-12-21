import {Box, Button, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {useWeb3React} from "@web3-react/core";
import React, {useEffect, useState} from "react";
import {connectors} from "../../connectors/connector";
import SelectWalletModal from "../SelectWalletModal";
import ProfileMenu from "../ProfileMenu";
import {Montserrat} from "@next/font/google"

const montserrat = Montserrat({subsets: ['latin']});

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
                        rounded={'sm'}
                        my={1}
                        mx={[0, 5]}
                        overflow={'hidden'}
                        bg={useColorModeValue("teal", "white")}
                        border={'1px'}
                        borderColor={"black"}
                        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 teal')}
                        color={useColorModeValue("gray.50", "black")}
                        onClick={onOpen}
                        h={24}
                        w={60}
                        fontSize={'md'}
                    >
                        CONNECT YOUR WALLET
                    </Button>
                ) : (
                    <ProfileMenu/>
                )}
                <SelectWalletModal isOpen={isOpen} closeModal={onClose}/>
            </Box>
        </>
    );
}