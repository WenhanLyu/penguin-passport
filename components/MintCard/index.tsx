import {
  Box,
  Hide,
  HStack,
  Img,
  Progress,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { Montserrat } from "@next/font/google";
import MintButton from "../MintButton";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useWeb3React } from "@web3-react/core";
import { PenguinAddress } from "../../src/utils";

const montserrat = Montserrat({ subsets: ["latin"] });

interface MintCardProps {
  canMint: boolean;
  totalTokens: number;
  availableTokens: number;
}

export default function MintCard(props: MintCardProps) {
  const { canMint, totalTokens, availableTokens } = props;
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (active && account) {
      const url =
        "https://testnets-api.opensea.io/api/v1/assets?owner=" +
        account +
        "&asset_contract_address=" +
        PenguinAddress +
        "&order_direction=desc&offset=0&limit=20&include_orders=false";
      const data = fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.assets && data.assets.length > 0) {
            setHasToken(true);
          }
        });
    }
  }, [active, account]);

  const canMintToast = useToast();

  const colorMode = (str1: string, str2: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useColorModeValue(str1, str2);

  useEffect(() => {
    if (canMint) {
      canMintToast({
        title: "Ready to mint!",
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
              boxShadow={colorMode("6px 6px 0 black", "6px 6px 0 teal")}
              color={colorMode("white", "white")}
              // w={40}
              className={montserrat.className}
            >
              <Text fontSize={"xl"} mx={"10px"}>
                <CheckCircleIcon mr={"5px"} fontSize={"lg"} />
                Ready to mint!
              </Text>
            </Box>
          </>
        ),
      });
    }
  }, [canMint]);

  return (
    <>
      <HStack
        // w="60%"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg={useColorModeValue("white", "gray.300")}
        border={"1px"}
        borderColor={"black"}
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 white")}
        className={montserrat.className}
        minW={"600px"}
      >
        <VStack ml={4} alignItems={"start"} width={"70%"} spacing={2}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color={"white"}
            mb={"1px"}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              OUR TOKEN
            </Text>
          </Box>
          <Text color={"black"} fontSize={"2xl"} noOfLines={2} as={"b"}>
            HAVE ALL? <br />
            GET ONE MORE
          </Text>
          <Text color={"gray.500"}>
            If you have already own all the following tokens, we will give you
            one more our own token.
            <br />
            Just check them manually, then you will see the mint button.
          </Text>
          {hasToken && (
            <Text color={"green"}>
              <CheckCircleIcon color={"green"} /> You can have only one soul
              penguin!
            </Text>
          )}
          <MintButton available={hasToken ? false : canMint} />

          <Progress
            size={"sm"}
            value={(availableTokens / totalTokens) * 100}
            colorScheme={availableTokens == totalTokens ? "green" : "gray"}
            w={"50%"}
            border={"1px"}
            borderColor={"black"}
            boxShadow={useColorModeValue("2px 2px 0 black", "2px 2px 0 black")}
          />
          <Text fontSize={"sm"} color={"black"}>
            PROGRESS: {availableTokens}/{totalTokens}
          </Text>
        </VStack>
        <Hide below={"1080px"}>
          <VStack w={"500px"} mb={"1px"} borderColor="black">
            <Img
              src={"mintCard.jpg"}
              roundedTop={"sm"}
              objectFit="cover"
              h="full"
              w="full"
              alt={"Blog Image"}
            />
          </VStack>
        </Hide>
      </HStack>
    </>
  );
}
