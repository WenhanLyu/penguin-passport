import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import {
  Button,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  CloseIcon,
  CopyIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { truncateAddress } from "../../src/utils";
import { Blockie } from "@web3uikit/web3";
import SettingsDrawer from "../SettingsDrawer";
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function ProfileMenu() {
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();

  const [nickname, setNickname] = useState(
    localStorage.getItem("nickname") ? localStorage.getItem("nickname") : ""
  );
  const [emailAddress, setEmailAddress] = useState(
    localStorage.getItem("email") ? localStorage.getItem("email") : ""
  );

  const drawer = useDisclosure();

  const displayAddress = truncateAddress(
    account ? account : "0x0000000000000000000000000000000000000000"
  );

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
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("email", email);
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          rounded={"sm"}
          my={1}
          mx={[0, 5]}
          overflow={"hidden"}
          bg={useColorModeValue("teal.100", "white")}
          border={"1px"}
          borderColor={"black"}
          boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 teal")}
          color={useColorModeValue("black", "black")}
          h={24}
          w={60}
          fontSize={"md"}
        >
          <HStack w="100%" justifyContent="center" spacing={"24px"}>
            <Blockie
              seed={
                account ? account : "0x0000000000000000000000000000000000000000"
              }
              size={12}
            />
            <VStack h="100%" justifyContent="center">
              <Text>My Profile</Text>
              <Text>{nickname ? nickname : displayAddress}</Text>
            </VStack>
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem minH={"48px"} onClick={drawer.onOpen}>
            <SettingsIcon mr={"10px"} />
            Settings
          </MenuItem>
          <MenuItem
            minH={"48px"}
            onClick={() => {
              navigator.clipboard.writeText(account ? account : "");
            }}
          >
            <CopyIcon mr={"10px"} />
            Copy address
          </MenuItem>
          <MenuItem minH={"48px"} onClick={disconnect}>
            <CloseIcon mr={"10px"} color={"red.500"} />
            <Text color={"red.500"}> Sign out</Text>
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
