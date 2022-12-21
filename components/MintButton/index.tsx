import {
  Button,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { TestToadzABI, TestToadzAddress } from "../../src/utils";
import { CheckCircleIcon, CopyIcon, WarningIcon } from "@chakra-ui/icons";

interface MintButtonProps {
  available: boolean;
}

export default function MintButton(props: MintButtonProps) {
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();

  const [transactionHash, setTransactionHash] = useState("");
  const [hasError, setHasError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const [errorText, setErrorText] = useState("");

  const { available } = props;

  const onClick = async () => {
    setInProgress(true);
    const provider = window.ethereum;
    const currentAccount = account;

    if (typeof provider === "undefined" && !active) {
      return;
    }

    let Contract = require("web3-eth-contract");

    Contract.setProvider(provider);

    let test = new Contract(TestToadzABI, TestToadzAddress);
    // test.methods.mint(account, 1).send({from: account}).catch((e) => {
    //     console.log(e);
    // });

    let methods = test.methods;
    methods
      .mint(1)
      .send({ from: account })
      .on("transactionHash", function (hash: any) {
        setTransactionHash(hash);
      })
      .on("receipt", function (receipt: any) {
        setTransactionCompleted(true);
        setInProgress(false);
      })
      .on("error", function (error: any, receipt: any) {
        setHasError(true);
        setErrorText(error.message);
        setTransactionCompleted(true);
        setInProgress(false);
      });
  };

  return (
    <>
      <VStack spacing={0} alignItems={"start"}>
        <Button
          rounded={"sm"}
          mb={"10px"}
          // mx={[0, 5]}
          overflow={"hidden"}
          bg={useColorModeValue("green.100", "green.100")}
          border={"1px"}
          borderColor={"black"}
          boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 teal")}
          onClick={onClick}
          color={useColorModeValue("black", "black")}
          isDisabled={!available || transactionCompleted}
          isLoading={inProgress}
        >
          MINT
        </Button>
        {transactionHash && !hasError && !transactionCompleted && (
          <Text>
            Transaction hash
            <IconButton
              aria-label={"COPY HASH"}
              onClick={() => {
                navigator.clipboard.writeText(transactionHash);
              }}
              icon={<CopyIcon color={useColorModeValue("black", "black")} />}
              variant={"outline"}
              ml={"2px"}
              h={"100%"}
              borderColor={"whiteAlpha.100"}
            />
            <br />
            {transactionHash}
          </Text>
        )}
        {hasError && (
          <>
            <Text color={"red"} noOfLines={1}>
              <WarningIcon mr={"2px"} />
              ERROR: {errorText}
            </Text>
          </>
        )}
        {!hasError && transactionCompleted && (
          <>
            <Text color={"green"}>
              Transaction hash
              <IconButton
                aria-label={"COPY HASH"}
                onClick={() => {
                  navigator.clipboard.writeText(transactionHash);
                }}
                icon={<CopyIcon color={useColorModeValue("green", "green")} />}
                variant={"outline"}
                ml={"2px"}
                h={"100%"}
                borderColor={"whiteAlpha.100"}
              />
              <br />
              {transactionHash}
            </Text>
            <Text color={"green"} noOfLines={1} as={"b"} fontSize={"lg"}>
              <CheckCircleIcon mr={"2px"} />
              COMPLETED!
            </Text>
          </>
        )}
      </VStack>
    </>
  );
}
