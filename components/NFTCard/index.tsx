import { useWeb3React } from "@web3-react/core";
import {
  Badge,
  Box,
  Button,
  Hide,
  HStack,
  Image,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CheckCircleIcon, LockIcon } from "@chakra-ui/icons";
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

interface NFTCardProps {
  cardID: number;
  contractAddress: string;
  contractName: string;
  imageUrl: string;
  description: string;
  validateFunction: (id: number) => void;
  expireDate?: Date;
  rewards?: string;
}

export default function NFTCard(props: NFTCardProps) {
  // const fetcher = (url: string) => fetch(url).then(r => r.json());
  const { account, active } = useWeb3React();
  const {
    cardID,
    contractAddress,
    contractName,
    imageUrl,
    expireDate,
    rewards,
    description,
    validateFunction,
  } = props;

  const [isActive, setIsActive] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [checked, setChecked] = useState(false);
  const [hasAsset, setHasAsset] = useState(false);
  const [notHasAsset, setNotHasAsset] = useState(false);

  useEffect(() => {
    if (expireDate && expireDate.getTime() < new Date().getTime()) {
      setIsActive(false);
    }
  }, []);

  const onCheckButton = () => {
    setIsChecking(true);
    const url =
      "https://testnets-api.opensea.io/api/v1/assets?owner=" +
      account +
      "&asset_contract_address=" +
      contractAddress +
      "&order_direction=desc&offset=0&limit=20&include_orders=false";
    const data = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.assets && data.assets.length > 0) {
          setHasAsset(true);
          setChecked(true);
          validateFunction(cardID);
        } else {
          setNotHasAsset(true);
        }
        setIsChecking(false);
      });
  };

  return (
    <>
      <HStack
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg={useColorModeValue("white", "gray.300")}
        border={"1px"}
        borderColor={"black"}
        boxShadow={useColorModeValue("6px 6px 0 teal", "6px 6px 0 white")}
        width={"60%"}
        className={montserrat.className}
        spacing={5}
      >
        <Box w={"80%"} justifyContent={"space-between"}>
          <HStack mt={"20px"} mb={"20px"}>
            <Hide below={"1080px"}>
              <Box minW={"200px"}>
                <Image
                  rounded={"sm"}
                  bg={useColorModeValue("white", "white")}
                  border={"1px"}
                  borderColor={"black"}
                  boxShadow={useColorModeValue(
                    "6px 6px 0 black",
                    "6px 6px 0 teal"
                  )}
                  color={useColorModeValue("black", "black")}
                  boxSize={"150px"}
                  src={imageUrl}
                  alt={contractName}
                  ml={"20px"}
                  mr={"10px"}
                />
              </Box>
            </Hide>

            <Box color={"black"} ml={"10px"}>
              <VStack alignItems={"flex-start"}>
                <Text fontSize={"2xl"} as={"b"}>
                  {contractName}
                </Text>
                <Text noOfLines={3}>{description}</Text>
              </VStack>
            </Box>
          </HStack>
        </Box>
        <Box minW={60} mr={"10px"}>
          <VStack>
            <Box>
              {isActive ? (
                <>
                  <Badge
                    rounded={"sm"}
                    my={1}
                    mx={[0, 5]}
                    overflow={"hidden"}
                    bg={useColorModeValue("green", "green")}
                    border={"1px"}
                    borderColor={"black"}
                    boxShadow={useColorModeValue(
                      "3px 3px 0 black",
                      "3px 3px 0 teal"
                    )}
                    color={useColorModeValue("white", "white")}
                    variant={"solid"}
                    alignContent={"center"}
                  >
                    ACTIVE NOW
                  </Badge>
                </>
              ) : (
                <>
                  <Badge
                    rounded={"sm"}
                    my={1}
                    mx={[0, 5]}
                    overflow={"hidden"}
                    bg={useColorModeValue("red", "red")}
                    border={"1px"}
                    borderColor={"black"}
                    boxShadow={useColorModeValue(
                      "3px 3px 0 black",
                      "3px 3px 0 orange"
                    )}
                    color={useColorModeValue("white", "white")}
                    variant={"solid"}
                    alignContent={"center"}
                  >
                    EXPIRED
                  </Badge>
                </>
              )}
            </Box>
            <Box>
              {isActive && account && (
                <>
                  <Button
                    rounded={"sm"}
                    my={1}
                    mx={[0, 5]}
                    overflow={"hidden"}
                    bg={useColorModeValue("white", "white")}
                    border={"1px"}
                    borderColor={"black"}
                    boxShadow={useColorModeValue(
                      "6px 6px 0 black",
                      "6px 6px 0 teal"
                    )}
                    color={useColorModeValue("black", "black")}
                    isLoading={isChecking}
                    onClick={onCheckButton}
                    w={40}
                    disabled={checked}
                  >
                    CHECK IT
                  </Button>
                </>
              )}

              {!account && (
                <>
                  <Button
                    rounded={"sm"}
                    my={1}
                    mx={[0, 5]}
                    overflow={"hidden"}
                    bg={useColorModeValue("white", "white")}
                    border={"1px"}
                    borderColor={"red"}
                    boxShadow={useColorModeValue(
                      "6px 6px 0 black",
                      "6px 6px 0 teal"
                    )}
                    color={useColorModeValue("red", "red")}
                    disabled={true}
                    w={40}
                  >
                    UNCONNECTED
                  </Button>
                </>
              )}

              {account && !isActive && (
                <>
                  <Button
                    rounded={"sm"}
                    my={1}
                    mx={[0, 5]}
                    overflow={"hidden"}
                    bg={useColorModeValue("white", "white")}
                    border={"1px"}
                    borderColor={"red"}
                    boxShadow={useColorModeValue(
                      "6px 6px 0 black",
                      "6px 6px 0 teal"
                    )}
                    color={useColorModeValue("red", "red")}
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
                <Text color={"green.500"}>
                  <CheckCircleIcon mr={"5px"} color={"green.500"} />
                  GOTCHA!
                </Text>
              )}
              {notHasAsset && (
                <Tooltip
                  label={
                    "If you believe it is an error, please refresh and retry."
                  }
                >
                  <Text color={"red.500"}>
                    <LockIcon mr={"5px"} color={"red.500"} />
                    ERRRR...?
                  </Text>
                </Tooltip>
              )}
              {/*{!account && !active && (*/}
              {/*    <Text color={'red.500'}>*/}
              {/*        <LockIcon mr={'5px'} color={'red.500'}/>*/}
              {/*        NOT NOW*/}
              {/*    </Text>*/}
              {/*)}*/}
            </Box>
          </VStack>
        </Box>
      </HStack>
    </>
  );
}
