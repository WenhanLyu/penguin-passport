import {Box, Heading, Hide, HStack, Img, Progress, Text, useColorModeValue, VStack} from "@chakra-ui/react";

import {Montserrat} from "@next/font/google"
import MintButton from "../MintButton";

const montserrat = Montserrat({subsets: ['latin']});

interface MintCardProps {
    canMint: boolean
    totalTokens: number,
    availableTokens: number,
}

export default function MintCard(props: MintCardProps) {
    const {canMint, totalTokens, availableTokens} = props;


    return (
        <>
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
                className={montserrat.className}
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
                            OUR TOKEN
                        </Text>
                    </Box>
                    <Text color={'black'} fontSize={'2xl'} noOfLines={2} as={'b'}>
                        HAVE ALL? <br/>
                        GET ONE MORE
                    </Text>
                    <Text color={'gray.500'}>
                        If you have already own all the following tokens, we will give you one more our own token.<br/>
                        Just check them manually, then you will see the mint button.
                    </Text>
                    <MintButton available={canMint}/>
                    <Progress size={'sm'}
                              value={availableTokens / totalTokens * 100}
                              colorScheme={(availableTokens == totalTokens) ? 'green' : 'gray'}
                              w={'50%'}
                              border={'1px'}
                              borderColor={"black"}
                              boxShadow={useColorModeValue('2px 2px 0 black', '2px 2px 0 black')}
                    />
                    <Text fontSize={'sm'} color={'black'}>PROGRESS: {availableTokens}/{totalTokens}</Text>
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
        </>
    );
}