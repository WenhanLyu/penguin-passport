import {Box, Hide, HStack, Img, Link, Progress, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import CardStack from "../CardStack";
import MintButton from "../MintButton";

export default function AboutBody() {
    return (
        <>
            <Box
                bg={useColorModeValue('gray.50', 'gray.800')}
                color={useColorModeValue('gray.700', 'gray.200')}
                pb={'20px'}
                minH={'calc(100vh - 200px - 108px)'}
            >
                <HStack
                    // w="60%"
                    rounded={'sm'}
                    my={5}
                    mx={[0, 5]}
                    overflow={'hidden'}
                    bg={useColorModeValue("white", "gray.300")}
                    border={'1px'}
                    borderColor={"black"}
                    boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 white')}
                    minW={'600px'}
                >
                    <VStack
                        ml={4}
                        alignItems={'start'}
                        width={"70%"}
                        spacing={2}
                    >
                        <Box
                            bg="black"
                            display={'inline-block'}
                            px={2}
                            py={1}
                            color={"white"}
                            mb={'1px'}
                        >
                            <Text fontSize={'xs'} fontWeight="medium">
                                ABOUT US
                            </Text>
                        </Box>
                        <Text color={'black'} fontSize={'2xl'} noOfLines={2} as={'b'}>
                            PENGUIN PASSPORT
                        </Text>
                        <Text color={'black'}>
                            {"Penguin Passport is part of a research project in "}
                            <Text as={'u'}>
                                <Link href={"https://cs.nyu.edu/courses/fall22/CSCI-GA.3033-078/"} isExternal={true}>
                                    {"CSCI-GA.3033-078"}
                                </Link>
                            </Text>
                            {" at "}
                            <Text as={'u'}>
                                <Link href={"https://www.nyu.edu/"} isExternal={true}>
                                    {"New York University"}
                                </Link>
                            </Text>
                            .
                        </Text>
                        <Text color={'black'} as={'b'}>
                            This site supports and only supports MetaMask with Georil test network for now.
                            If you want to test our features and get a test net token,
                            please switch your Metamask wallet to Georil test network before you do that.
                            We did not test it on Ethereum Mainnet and do not guarantee what will happen.
                        </Text>
                        <Text color={'black'}>
                            You may experience some visual glitches on your phone as this site is not optimized for
                            mobile accessing.
                        </Text>
                        <Text color={'black'}>
                            {"The site is completed by "}
                            <Text as={'u'}>
                                <Link href={"https://github.com/WenhanLyu"} isExternal={true}>
                                    {"Wenhan Lyu"}
                                </Link>
                            </Text>
                            .
                        </Text>
                    </VStack>
                    <Hide below={'1080px'}>
                        <VStack w={'500px'} mb={'1px'} borderColor="black">
                            <Img
                                src={
                                    "mintCard.jpg"
                                }
                                roundedTop={'sm'}
                                objectFit="cover"
                                h="full"
                                w="full"
                                alt={'Blog Image'}
                            />
                        </VStack>
                    </Hide>
                </HStack>
            </Box>
        </>
    );
}