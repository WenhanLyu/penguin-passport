import {
    VStack,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Text, CircularProgress, Alert, Grid, GridItem, Progress, Divider, CardBody, CardFooter, Card, Stack, useToast
} from "@chakra-ui/react";
import {Image} from "@chakra-ui/react";
import {useWeb3React} from "@web3-react/core";
import {connectors} from "../../connectors/connector";
import {useEffect, useState} from "react";
import {CheckIcon} from "@chakra-ui/icons";

interface SelectWalletModalProps {
    isOpen: boolean,
    closeModal: () => void
}

export default function SelectWalletModal(props: SelectWalletModalProps) {
    const {activate, active, error} = useWeb3React();
    const {isOpen, closeModal} = props;

    const [inFirstStep, setInFirstStep] = useState(true);
    const [inConnectStep, setInConnectStep] = useState(false);
    const [inFailureStep, setInFailureStep] = useState(false);
    const [hasErrorInConnect, setHasErrorInConnect] = useState(false);
    const [connectCompleted, setConnectCompleted] = useState(false);

    const [progressPercent, setProgressPercent] = useState(33);

    const [metamaskInstalled, setMetamaskInstalled] = useState(false);

    const metamaskErrorToast = useToast();

    const setProvider = (type: string) => {
        window.localStorage.setItem("provider", type);
    };

    const metaMaskOnClick = () => {
        if (!metamaskInstalled) {
            metamaskErrorToast({
                title: "Metamask extension is not installed.",
                status: "error",
                isClosable: true,
            });
            firstStep();
            return;
        }
        connectStep();
        activate(connectors.injected);
        setProvider("injected");
        // closeModal();
    };

    const firstStep = () => {
        setInFirstStep(true);
        setInConnectStep(false);
        setInFailureStep(false);
        setProgressPercent(33);
    }

    const connectStep = () => {
        setInFirstStep(false);
        setInConnectStep(true);
        setInFailureStep(false);
        setProgressPercent(67);
    }

    const failureStep = () => {
        setInFirstStep(false);
        setInConnectStep(false);
        setInFailureStep(true);
        setProgressPercent(67);
    }

    const onConnectProcessEnd = () => {
        setInConnectStep(false);
        setHasErrorInConnect(false);
    }

    useEffect(() => {
        setMetamaskInstalled(typeof window.ethereum !== 'undefined');
        firstStep();
    }, []);

    useEffect(() => {
        onConnectProcessEnd();
        if (active) {
            setProgressPercent(100);
            setInterval(() => {
                closeModal();
                firstStep();
            }, 2000);
        }
    }, [active]);

    useEffect(() => {
        onConnectProcessEnd();
        if (error) {
            failureStep();
            setHasErrorInConnect(true);
        }
    }, [error])

    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered size={'xl'}>
            <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'/>
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton
                    _focus={{
                        boxShadow: "none"
                    }}
                />
                <ModalBody>
                    <Grid templateAreas={`"nav main"
                                         "nav footer"`}
                          gridTemplateColumns={'50% 50%'}
                          gridTemplateRows={'1fr 30px'}
                          gap={4}
                          h={'300px'}
                          mr={'10px'}
                          ml={'10px'}
                    >
                        {inFirstStep && (<>
                            <GridItem area={"nav"}>
                                <Stack spacing={3}>
                                    <Text fontSize={'lg'} as={'b'}>Connect to your wallet</Text>
                                    <Text fontSize={'sm'}>
                                        Follow these easy steps!
                                        First, choose your wallet and connect it.
                                    </Text>

                                </Stack>
                                {/*<Divider mt={'10px'}/>*/}
                                <Stack mt={'20%'} width={'60%'}>
                                    <Progress size={'sm'} value={progressPercent}/>
                                </Stack>
                            </GridItem>
                            <GridItem area={"main"}>
                                <Button
                                    variant="outline"
                                    onClick={metaMaskOnClick}
                                    w="100%"
                                    borderRadius={"10px"}
                                >
                                    <HStack w="100%" justifyContent="center">
                                        <Image
                                            src="/mm.png"
                                            alt="Metamask Logo"
                                            width={25}
                                            height={25}
                                            borderRadius="3px"
                                        />
                                        <Text>Metamask</Text>
                                    </HStack>
                                </Button>
                            </GridItem>
                            <GridItem area={"footer"}></GridItem>
                        </>)}
                        {inConnectStep && (<>
                            <GridItem area={"nav"}>
                                <Stack spacing={3}>
                                    <Text fontSize={'lg'} as={'b'}>Approve Connection</Text>
                                    <Text fontSize={'sm'}>
                                        Please approve the connection in your wallet and authorize access to continue.
                                    </Text>

                                </Stack>
                                {/*<Divider mt={'10px'}/>*/}
                                <Stack mt={'20%'} width={'60%'}>
                                    <Progress size={'sm'} value={progressPercent}/>
                                </Stack>
                            </GridItem>
                            <GridItem area={"main"}>
                                <Button
                                    isLoading
                                    variant="outline"
                                    onClick={metaMaskOnClick}
                                    w="100%"
                                    borderRadius={"10px"}
                                >
                                    <HStack w="100%" justifyContent="center">
                                        <Image
                                            src="/mm.png"
                                            alt="Metamask Logo"
                                            width={25}
                                            height={25}
                                            borderRadius="3px"
                                        />
                                        <Text>Metamask</Text>
                                    </HStack>
                                </Button>
                            </GridItem>
                            <GridItem area={"footer"}></GridItem>
                        </>)}
                        {inFailureStep && (<>
                            <GridItem area={"nav"}>
                                <Stack spacing={3}>
                                    <Text fontSize={'lg'} as={'b'}>Connection Rejected</Text>
                                    <Text fontSize={'sm'}>
                                        Some error occurred... Click your wallet to try again!
                                    </Text>

                                </Stack>
                                {/*<Divider mt={'10px'}/>*/}
                                <Stack mt={'20%'} width={'60%'}>
                                    <Progress size={'sm'} value={progressPercent}/>
                                </Stack>
                            </GridItem>
                            <GridItem area={"main"} alignItems={'end'}>
                                <Button
                                    variant="solid"
                                    onClick={metaMaskOnClick}
                                    w="100%"
                                    borderRadius={"10px"}
                                    colorScheme={'yellow'}
                                >
                                    <HStack w="100%" justifyContent="center">
                                        <Image
                                            src="/mm.png"
                                            alt="Metamask Logo"
                                            width={25}
                                            height={25}
                                            borderRadius="3px"
                                        />
                                        <Text>Metamask</Text>
                                    </HStack>
                                </Button>
                            </GridItem>
                            <GridItem area={"footer"} justifySelf={'center'}>
                                <Button colorScheme='gray' size='xs' variant={'outline'} onClick={firstStep}>
                                    Back to wallet
                                </Button>
                            </GridItem>
                        </>)}
                        {active && (<>
                            <GridItem area={"nav"}>
                                <Stack spacing={3}>
                                    <Text fontSize={'lg'} as={'b'}>Connected</Text>
                                    <Text fontSize={'sm'}>
                                        You have connected your wallet, now start using our app!
                                    </Text>

                                </Stack>
                                {/*<Divider mt={'10px'}/>*/}
                                <Stack mt={'20%'} width={'60%'}>
                                    <Progress size={'sm'} value={progressPercent}/>
                                </Stack>
                            </GridItem>
                            <GridItem area={"main"}>
                                <Button
                                    colorScheme={'green'}
                                    variant={"outline"}
                                    w="100%"
                                    borderRadius={"10px"}
                                >
                                    <HStack w="100%" justifyContent="center">
                                        <CheckIcon color={'green'}/>
                                    </HStack>
                                </Button>
                            </GridItem>
                            <GridItem area={"footer"}></GridItem>
                        </>)}
                    </Grid>
                </ModalBody>
                {/*<ModalBody paddingBottom="1.5rem">*/}
                {/*    <VStack>*/}
                {/*        {inConnectProcess && <CircularProgress isIndeterminate/>}*/}
                {/*        {hasErrorInConnect && <Alert status={'error'}/>}*/}
                {/*        <Button*/}
                {/*            variant="outline"*/}
                {/*            onClick={() => {*/}
                {/*                setInConnectProcess(true);*/}
                {/*                activate(connectors.injected);*/}
                {/*                setProvider("injected");*/}
                {/*                // closeModal();*/}
                {/*            }}*/}
                {/*            w="100%"*/}
                {/*        >*/}
                {/*            <HStack w="100%" justifyContent="center">*/}
                {/*                <Image*/}
                {/*                    src="/mm.png"*/}
                {/*                    alt="Metamask Logo"*/}
                {/*                    width={25}*/}
                {/*                    height={25}*/}
                {/*                    borderRadius="3px"*/}
                {/*                />*/}
                {/*                <Text>Metamask</Text>*/}
                {/*            </HStack>*/}
                {/*        </Button>*/}
                {/*    </VStack>*/}
                {/*</ModalBody>*/}
            </ModalContent>
        </Modal>
    );
}
