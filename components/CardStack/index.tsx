import { Box, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import NFTCard from "../NFTCard";
import { useEffect, useState } from "react";

import { Montserrat } from "@next/font/google";
import MintCard from "../MintCard";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function CardStack() {
  const totalTokens = 3;

  const [holdsAll, setHoldsAll] = useState(false);
  const [availableTokens, setAvailableTokens] = useState(0);

  const validateFunction = (id: number): void => {
    setAvailableTokens(availableTokens + 1);
  };

  useEffect(() => {
    if (availableTokens >= totalTokens) setHoldsAll(true);
  }, [availableTokens]);

  return (
    <>
      <VStack spacing={6}>
        <Box className={montserrat.className}>
          <MintCard
            canMint={holdsAll}
            totalTokens={totalTokens}
            availableTokens={availableTokens}
          />
        </Box>

        <Box alignContent={"start"} w={"60%"} className={montserrat.className}>
          <Text
            fontSize={"3xl"}
            as={"b"}
            color={useColorModeValue("black", "white")}
          >
            ACTIVE TOKENS
          </Text>
        </Box>
        <NFTCard
          cardID={0}
          contractAddress={"0xd000f000aa1f8accbd5815056ea32a54777b2fc4"}
          contractName={"TestToadz Goerli 1"}
          imageUrl={
            "https://i.seadn.io/gae/L5oBVXn05eG1YLb8hbQH7N23rdxsFXtgnjQaiNM6m7J2lrE8Z_xAG9EJF0NAZLlBue6UMZD24jWgdkrWcIFkWhib8nif9oxbu4QXSlI?w=500&auto=format"
          }
          description={
            "You just need one TestToadz token in your wallet to complete all the check."
          }
          validateFunction={validateFunction}
        />
        <NFTCard
          cardID={1}
          contractAddress={"0xd000f000aa1f8accbd5815056ea32a54777b2fc4"}
          contractName={"TestToadz Goerli 2"}
          imageUrl={
            "https://i.seadn.io/gae/L5oBVXn05eG1YLb8hbQH7N23rdxsFXtgnjQaiNM6m7J2lrE8Z_xAG9EJF0NAZLlBue6UMZD24jWgdkrWcIFkWhib8nif9oxbu4QXSlI?w=500&auto=format"
          }
          description={"So by far 1 SoulBoundPenguin V2 == 1 TestToadz!"}
          validateFunction={validateFunction}
        />
        <NFTCard
          cardID={2}
          contractAddress={"0xd000f000aa1f8accbd5815056ea32a54777b2fc4"}
          contractName={"TestToadz Goerli 3"}
          imageUrl={
            "https://i.seadn.io/gae/L5oBVXn05eG1YLb8hbQH7N23rdxsFXtgnjQaiNM6m7J2lrE8Z_xAG9EJF0NAZLlBue6UMZD24jWgdkrWcIFkWhib8nif9oxbu4QXSlI?w=500&auto=format"
          }
          description={
            "Mint up to 3 TestToadz a time (with a maximum of 20 per account) by clicking Connect to Web3 (select appropriate testnet) on the appropriate EtherScan testnet page listed above, entering a quantity between 1 and 3 in the mint(...) function, clicking Write and confirming the transaction."
          }
          validateFunction={validateFunction}
        />
      </VStack>
    </>
  );
}
