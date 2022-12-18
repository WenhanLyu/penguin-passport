import ColorModeButton from "../ColorModeButton";
import {Box, Flex, HStack, Image, Stack, useColorModeValue} from "@chakra-ui/react";
import Connect from "../Connect";


export default function PageHeader() {
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={48} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Image
                        borderRadius={"full"}
                        boxSize={"128px"}
                        src={"penguin.png"}
                    />
                </Box>

                <Flex alignItems={'center'}>
                    <HStack spacing={7}>
                        <ColorModeButton/>
                        <Connect/>
                    </HStack>
                </Flex>
            </Flex>
        </Box>
    );
}