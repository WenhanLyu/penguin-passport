import {Drawer, DrawerContent, DrawerBody, DrawerCloseButton, DrawerHeader, DrawerOverlay} from "@chakra-ui/modal";
import {Box, Button, FormLabel, HStack, Input, Stack, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";

interface SettingsDrawerProps {
    isOpen: boolean,
    onClose: () => void,
    handleProfileChange: (nickname: string, email: string) => void,
    nickname?: string | null,
    email?: string | null,
}

export default function SettingsDrawer(props: SettingsDrawerProps) {
    const {isOpen, onClose, handleProfileChange, nickname, email} = props;

    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>
                        Profile Settings
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={'24px'}>
                            <Box>
                                <Text size={'xl'}>PenguinID</Text>
                                <VStack align={'left'}>
                                    <Text size={'sm'}>Complete this to get your Penguin Passport verified.</Text>
                                    <Button colorScheme={'blue'} borderRadius={'10px'} w={'200px'}>Get Verified</Button>
                                </VStack>
                            </Box>

                            <Box>
                                <form
                                    id='profile-form'
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        // @ts-ignore
                                        handleProfileChange(event.target.nickname.value, event.target.email.value);
                                    }}
                                >
                                    <VStack align={'left'} spacing={'24px'}>
                                        <Box>
                                            <FormLabel htmlFor={'nickname'}>Nickname</FormLabel>
                                            <Input name='nickname' placeholder='New Penguin!'
                                                   defaultValue={nickname ? nickname : ''}/>
                                        </Box>
                                        <Box>
                                            <FormLabel htmlFor={'email'}>EMAIL address</FormLabel>
                                            <Input name='email' placeholder='penguin@penguinpassport.com'
                                                   type={'email'} defaultValue={email ? email : ''}/>
                                        </Box>
                                        <Box>
                                            <Button colorScheme={'teal'} borderRadius={'10px'} type={'submit'}
                                                    w={'100px'}>Submit</Button>
                                        </Box>
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