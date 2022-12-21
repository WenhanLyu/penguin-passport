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
    Text,
    CircularProgress,
    Alert,
    Grid,
    GridItem,
    Progress,
    Divider,
    CardBody,
    CardFooter,
    Card,
    Stack,
    useToast,
    Box,
    useColorModeValue, AlertIcon
} from "@chakra-ui/react";
import {Image} from "@chakra-ui/react";
import {useWeb3React} from "@web3-react/core";
import {connectors} from "../../connectors/connector";
import {useEffect, useState} from "react";
import {CheckIcon, WarningIcon} from "@chakra-ui/icons";
import {Montserrat} from "@next/font/google"

const montserrat = Montserrat({subsets: ['latin']});

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
                position: "top",
                render: () => (
                    <>
                        <Box
                            rounded={'sm'}
                            overflow={'hidden'}
                            bg={useColorModeValue("red", "red.500")}
                            border={'1px'}
                            borderColor={"red"}
                            boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 black')}
                            color={useColorModeValue("white", "white")}
                            // w={40}
                            className={montserrat.className}
                        >
                            <Text fontSize={'xl'} mx={'10px'}>
                                <WarningIcon mr={'5px'} fontSize={'lg'}/>
                                MetaMask extension not found
                            </Text>
                        </Box>
                    </>
                ),
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
        // console.log(active);
        if (active) {
            setProgressPercent(100);
            closeModal();
            firstStep();
            // TODO: why trigger this...
            // setInterval(() => {
            //     closeModal();
            //     firstStep();
            // }, 2000);
        }
    }, [active]);

    useEffect(() => {
        onConnectProcessEnd();
        if (error) {
            if (inConnectStep) {
                failureStep();
                setHasErrorInConnect(true);
            }
        }
    }, [error])

    return (
        <>
            <Box>
                <Modal isOpen={isOpen} onClose={closeModal} isCentered size={'xl'}>
                    <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'/>
                    <ModalContent>
                        <ModalHeader></ModalHeader>
                        <ModalCloseButton
                            _focus={{
                                boxShadow: "none"
                            }}
                        />
                        <ModalBody className={montserrat.className}>
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
                                            <Progress
                                                size={'sm'}
                                                value={progressPercent}
                                                colorScheme={'green'}
                                                w={'100%'}
                                                border={'1px'}
                                                borderColor={"black"}
                                                boxShadow={useColorModeValue('2px 2px 0 black', '2px 2px 0 black')}
                                            />
                                        </Stack>
                                    </GridItem>
                                    <GridItem area={"main"}>
                                        <Button
                                            rounded={'sm'}
                                            my={5}
                                            mx={[0, 5]}
                                            overflow={'hidden'}
                                            bg={useColorModeValue("white", "white")}
                                            border={'1px'}
                                            borderColor={"black"}
                                            boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 teal')}
                                            color={useColorModeValue("black", "black")}
                                            variant="outline"
                                            onClick={metaMaskOnClick}
                                            w="90%"
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
                                                Please approve the connection in your wallet and authorize access to
                                                continue.
                                            </Text>

                                        </Stack>
                                        {/*<Divider mt={'10px'}/>*/}
                                        <Stack mt={'20%'} width={'60%'}>
                                            <Progress
                                                size={'sm'}
                                                value={progressPercent}
                                                colorScheme={'green'}
                                                w={'100%'}
                                                border={'1px'}
                                                borderColor={"black"}
                                                boxShadow={useColorModeValue('2px 2px 0 black', '2px 2px 0 black')}
                                            />
                                        </Stack>
                                    </GridItem>
                                    <GridItem area={"main"}>
                                        <Button
                                            isLoading
                                            rounded={'sm'}
                                            my={5}
                                            mx={[0, 5]}
                                            overflow={'hidden'}
                                            bg={useColorModeValue("white", "white")}
                                            border={'1px'}
                                            borderColor={"black"}
                                            boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 teal')}
                                            color={useColorModeValue("black", "black")}
                                            variant="outline"
                                            onClick={metaMaskOnClick}
                                            w="90%"
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
                                            <Progress
                                                size={'sm'}
                                                value={progressPercent}
                                                colorScheme={'green'}
                                                w={'100%'}
                                                border={'1px'}
                                                borderColor={"black"}
                                                boxShadow={useColorModeValue('2px 2px 0 black', '2px 2px 0 black')}
                                            />
                                        </Stack>
                                    </GridItem>
                                    <GridItem area={"main"} alignItems={'end'}>
                                        <Button
                                            my={5}
                                            mx={[0, 5]}
                                            overflow={'hidden'}
                                            bg={useColorModeValue("yellow.200", "yellow")}
                                            border={'1px'}
                                            borderColor={"black"}
                                            boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 teal')}
                                            color={useColorModeValue("black", "black")}
                                            variant="outline"
                                            onClick={metaMaskOnClick}
                                            w="90%"
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
                                            <Progress
                                                size={'sm'}
                                                value={progressPercent}
                                                colorScheme={'green'}
                                                w={'100%'}
                                                border={'1px'}
                                                borderColor={"black"}
                                                boxShadow={useColorModeValue('2px 2px 0 black', '2px 2px 0 black')}
                                            />
                                        </Stack>
                                    </GridItem>
                                    <GridItem area={"main"}>
                                        <Button
                                            my={5}
                                            mx={[0, 5]}
                                            overflow={'hidden'}
                                            bg={useColorModeValue("white", "white")}
                                            border={'1px'}
                                            borderColor={"green"}
                                            boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 green')}
                                            color={useColorModeValue("black", "black")}
                                            variant="outline"
                                            onClick={metaMaskOnClick}
                                            w="90%"
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
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
}
