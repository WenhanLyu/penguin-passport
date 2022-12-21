import useSWR from 'swr'
import {useWeb3React} from "@web3-react/core";
import {Badge, Box, Button, Heading, HStack, Image, Text, Tooltip, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {CheckCircleIcon, CheckIcon, LockIcon} from "@chakra-ui/icons";

interface NFTCardProps {
    contractAddress: string,
    contractName: string,
    imageUrl: string,
    expireDate?: Date,
    rewards?: string,
}

export default function NFTCard(props: NFTCardProps) {
    // const fetcher = (url: string) => fetch(url).then(r => r.json());
    const {account, active} = useWeb3React();
    const {contractAddress, contractName, imageUrl, expireDate, rewards} = props;

    const [isActive, setIsActive] = useState(true);
    const [isChecking, setIsChecking] = useState(false);
    const [hasAsset, setHasAsset] = useState(false);
    const [notHasAsset, setNotHasAsset] = useState(false);

    useEffect(() => {
        if (expireDate && expireDate.getTime() < new Date().getTime()) {
            setIsActive(false);
        }
    }, []);

    const onCheckButton = () => {
        setIsChecking(true);
        const url = "https://testnets-api.opensea.io/api/v1/assets?owner=" + account
            + "&asset_contract_address=" + contractAddress
            + "&order_direction=desc&offset=0&limit=20&include_orders=false";
        const data = fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.assets && data.assets.length > 0) {
                    setHasAsset(true);
                } else {
                    setNotHasAsset(true);
                }
                setIsChecking(false);
            })

    }


    return (
        <>
            <HStack
                borderRadius={'2xl'}
                boxShadow={'lg'}
                w={'60%'}
                justifyContent={'center'}
                mt={10}
                h={'200px'}
                backgroundColor={'blackAlpha.100'}
            >
                <Box w={'80%'} justifyContent={'space-between'}>
                    <HStack mt={'20px'} mb={'20px'}>
                        <Image
                            borderRadius={'full'}
                            boxSize={'100px'}
                            src={imageUrl}
                            alt={contractName}
                            ml={'20px'}
                            mr={'20px'}
                        />
                        <Box>
                            <VStack alignItems={'flex-start'}>
                                <Heading size={'xl'}>{contractName}</Heading>
                                <Text>
                                    BBBBBB <br/>
                                    AAAAAA <br/>
                                    CCCCCC <br/>
                                </Text>
                            </VStack>
                        </Box>
                    </HStack>
                </Box>
                <Box w={'20%'}>
                    <VStack mr={'20px'}>
                        <Box>
                            {isActive ? (
                                <>
                                    <Badge variant={'solid'} colorScheme={'green'} borderRadius={'md'}>
                                        ACTIVE
                                    </Badge>
                                </>
                            ) : (
                                <>
                                    <Badge variant={'solid'} colorScheme={'red'} borderRadius={'md'}>
                                        EXPIRED
                                    </Badge>
                                </>

                            )}
                        </Box>
                        <Box>
                            {(isActive && account) && (
                                <>
                                    <Button
                                        colorScheme={'teal'}
                                        borderRadius={'lg'}
                                        isLoading={isChecking}
                                        onClick={onCheckButton}
                                        w={40}
                                    >
                                        CHECK IT
                                    </Button>
                                </>
                            )}

                            {!account && (
                                <>
                                    <Button
                                        colorScheme={'red'}
                                        borderRadius={'lg'}
                                        disabled={true}
                                        w={40}
                                    >
                                        UNCONNECTED
                                    </Button>
                                </>
                            )}

                            {(account && !isActive) && (
                                <>
                                    <Button
                                        colorScheme={'red'}
                                        borderRadius={'lg'}
                                        disabled={true}
                                        w={40}
                                    >
                                        EXPIRED
                                    </Button>
                                </>
                            )}


                        </Box>
                        <Box>
                            {hasAsset && (
                                <Text color={'green.500'}>
                                    <CheckCircleIcon mr={'5px'} color={'green.500'}/>
                                    You got this!
                                </Text>)
                            }
                            {notHasAsset && (
                                <Tooltip label={"If you believe it is an error, please refresh and retry."}>
                                    <Text color={'red.500'}>
                                        <LockIcon mr={'5px'} color={'red.500'}/>
                                        Not here...
                                    </Text>
                                </Tooltip>
                            )}
                        </Box>
                    </VStack>
                </Box>

            </HStack>
        </>
    );
}