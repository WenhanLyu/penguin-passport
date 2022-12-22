import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import { Montserrat } from "@next/font/google";
import { CheckCircleIcon } from "@chakra-ui/icons";

const montserrat = Montserrat({ subsets: ["latin"] });

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  handleProfileChange: (nickname: string, email: string) => void;
  nickname?: string | null;
  email?: string | null;
}

export default function SettingsDrawer(props: SettingsDrawerProps) {
  const { isOpen, onClose, handleProfileChange, nickname, email } = props;

  const [buttonLoading, setButtonLoading] = useState(false);

  const profileToast = useToast();

  const colorMode = (str1: string, str2: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useColorModeValue(str1, str2);

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent className={montserrat.className}>
          <DrawerCloseButton />
          <DrawerHeader>Profile Settings</DrawerHeader>
          <DrawerBody>
            <Stack spacing={"24px"}>
              <Box>
                <Text fontSize={"2xl"} as={"b"}>
                  PenguinID
                </Text>
                <VStack align={"left"}>
                  <Text size={"sm"}>
                    Complete this to get your Penguin Passport verified.
                  </Text>
                  <Button
                    rounded={"sm"}
                    my={1}
                    mx={[0, 5]}
                    overflow={"hidden"}
                    bg={useColorModeValue("blue.500", "white")}
                    border={"1px"}
                    borderColor={"black"}
                    boxShadow={useColorModeValue(
                      "6px 6px 0 black",
                      "6px 6px 0 darkblue"
                    )}
                    color={useColorModeValue("black", "black")}
                    w={"200px"}
                    disabled={true}
                  >
                    Get Verified
                  </Button>
                  <Text fontSize={"xs"}>Available soon</Text>
                </VStack>
              </Box>

              <Box>
                <form
                  id="profile-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setButtonLoading(true);
                    handleProfileChange(
                      // @ts-ignore
                      event.target.nickname.value,
                      // @ts-ignore
                      event.target.email.value
                    );
                    setButtonLoading(false);
                    profileToast({
                      title: "Profile submitted.",
                      status: "success",
                      isClosable: true,
                      position: "top",
                      render: () => (
                        <>
                          <Box
                            rounded={"sm"}
                            overflow={"hidden"}
                            bg={colorMode("green", "green.500")}
                            border={"1px"}
                            borderColor={"green"}
                            boxShadow={colorMode(
                              "6px 6px 0 black",
                              "6px 6px 0 teal"
                            )}
                            color={colorMode("white", "white")}
                            // w={40}
                            className={montserrat.className}
                          >
                            <Text fontSize={"xl"} mx={"10px"}>
                              <CheckCircleIcon mr={"5px"} fontSize={"lg"} />
                              Profile submitted.
                            </Text>
                          </Box>
                        </>
                      ),
                    });
                    onClose();
                  }}
                >
                  <VStack align={"left"} spacing={"24px"}>
                    <Box>
                      <FormLabel htmlFor={"nickname"}>Nickname</FormLabel>
                      <Input
                        name="nickname"
                        placeholder="New Penguin!"
                        defaultValue={nickname ? nickname : ""}
                      />
                    </Box>
                    <Box>
                      <FormLabel htmlFor={"email"}>EMAIL address</FormLabel>
                      <Input
                        name="email"
                        placeholder="penguin@penguinpassport.com"
                        type={"email"}
                        defaultValue={email ? email : ""}
                      />
                    </Box>
                    <Button
                      rounded={"sm"}
                      my={1}
                      mx={[0, 5]}
                      overflow={"hidden"}
                      bg={useColorModeValue("teal.100", "white")}
                      border={"1px"}
                      borderColor={"black"}
                      boxShadow={useColorModeValue(
                        "6px 6px 0 black",
                        "6px 6px 0 teal"
                      )}
                      color={useColorModeValue("black", "black")}
                      type={"submit"}
                      w={"100px"}
                      isLoading={buttonLoading}
                    >
                      Submit
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
