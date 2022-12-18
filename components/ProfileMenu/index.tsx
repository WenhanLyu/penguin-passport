import {useWeb3React} from "@web3-react/core";
import {connectors} from "../../connectors/connector";
import {useEffect, useState} from "react";
import {Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/menu";
import {Box, Button, HStack, Image, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {ChevronDownIcon, CloseIcon, CopyIcon, SettingsIcon} from "@chakra-ui/icons";
import {truncateAddress} from "../../src/utils";
import {Blockie} from "@web3uikit/web3";
import SettingsDrawer from "../SettingsDrawer";
import {Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay} from "@chakra-ui/modal";

export default function ProfileMenu() {
    const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active
    } = useWeb3React();

    const [nickname, setNickname] = useState(localStorage.getItem('nickname') ? localStorage.getItem('nickname') : '');
    const [emailAddress, setEmailAddress] = useState(localStorage.getItem('email') ? localStorage.getItem('email') : '');

    const drawer = useDisclosure();

    const displayAddress = truncateAddress(account ? account : "0x0000000000000000000000000000000000000000");

    const refreshState = () => {
        // @ts-ignore
        window.localStorage.setItem("provider", undefined);
    };

    const disconnect = () => {
        refreshState();
        deactivate();
    };

    const handleProfileChange = (nickname: string, email: string) => {
        setNickname(nickname);
        setEmailAddress(email);
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('email', email);
    }


    return (
        <>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} height={'80px'} borderRadius={'20px'}>
                    <HStack w="100%" justifyContent="center" spacing={'24px'}>
                        <Blockie seed={account ? account : "0x0000000000000000000000000000000000000000"} size={12}/>
                        <VStack h="100%" justifyContent="center">
                            <Text>My Profile</Text>
                            <Text>{displayAddress}</Text>
                        </VStack>
                    </HStack>
                </MenuButton>
                <MenuList>
                    <MenuItem minH={'48px'} onClick={drawer.onOpen}>
                        <SettingsIcon mr={'10px'}/>Settings

                    </MenuItem>
                    <MenuItem minH={'48px'} onClick={() => {
                        navigator.clipboard.writeText(account ? account : "")
                    }}>
                        <CopyIcon mr={'10px'}/>Copy address
                    </MenuItem>
                    <MenuItem minH={'48px'} onClick={disconnect}>
                        <CloseIcon mr={'10px'} color={'red.500'}/>
                        <Text color={'red.500'}> Sign out</Text>
                    </MenuItem>
                </MenuList>
            </Menu>
            <SettingsDrawer
                isOpen={drawer.isOpen}
                onClose={drawer.onClose}
                handleProfileChange={handleProfileChange}
                nickname={nickname}
                email={emailAddress}
            />
        </>
    );
}