import {VStack, Text, Box} from "@chakra-ui/react";
import NFTCard from "../NFTCard";
import {useEffect, useState} from "react";

import {Montserrat} from "@next/font/google"
import MintCard from "../MintCard";

const montserrat = Montserrat();


export default function CardStack() {
    const availability = [false, false, false];

    const [holdsAll, setHoldsAll] = useState(false);

    const validateFunction = (id: number): void => {
        if (availability[id] !== undefined)
            availability[id] = true;
        console.log(availability.every(Boolean));
        if (availability.every(Boolean)) {
            setHoldsAll(true);
        }
    }


    return (
        <>
            <VStack spacing={6}>
                <Box w={'60%'} className={montserrat.className}>
                    <MintCard canMint={holdsAll}/>
                </Box>

                <Box alignContent={'start'} w={'60%'} className={montserrat.className}>
                    <Text fontSize={'3xl'} as={'b'}>
                        ACTIVE TOKENS
                    </Text>
                </Box>
                <NFTCard
                    cardID={0}
                    contractAddress={"0xd000f000aa1f8accbd5815056ea32a54777b2fc4"}
                    contractName={"TestToadz Goerli"}
                    imageUrl={"https://i.seadn.io/gae/L5oBVXn05eG1YLb8hbQH7N23rdxsFXtgnjQaiNM6m7J2lrE8Z_xAG9EJF0NAZLlBue6UMZD24jWgdkrWcIFkWhib8nif9oxbu4QXSlI?w=500&auto=format"}
                    description={"Mint up to 3 TestToadz a time (with a maximum of 20 per account) by clicking Connect to Web3 (select appropriate testnet) on the appropriate EtherScan testnet page listed above, entering a quantity between 1 and 3 in the mint(...) function, clicking Write and confirming the transaction."}
                    validateFunction={validateFunction}
                />
                <NFTCard
                    cardID={1}
                    contractAddress={"0xd000f000aa1f8accbd5815056ea32a54777b2fc4"}
                    contractName={"TestToadz Goerli"}
                    imageUrl={"https://i.seadn.io/gae/L5oBVXn05eG1YLb8hbQH7N23rdxsFXtgnjQaiNM6m7J2lrE8Z_xAG9EJF0NAZLlBue6UMZD24jWgdkrWcIFkWhib8nif9oxbu4QXSlI?w=500&auto=format"}
                    description={"Mint up to 3 TestToadz a time (with a maximum of 20 per account) by clicking Connect to Web3 (select appropriate testnet) on the appropriate EtherScan testnet page listed above, entering a quantity between 1 and 3 in the mint(...) function, clicking Write and confirming the transaction."}
                    validateFunction={validateFunction}
                />
                <NFTCard
                    cardID={2}
                    contractAddress={"0xd000f000aa1f8accbd5815056ea32a54777b2fc4"}
                    contractName={"TestToadz Goerli"}
                    imageUrl={"https://i.seadn.io/gae/L5oBVXn05eG1YLb8hbQH7N23rdxsFXtgnjQaiNM6m7J2lrE8Z_xAG9EJF0NAZLlBue6UMZD24jWgdkrWcIFkWhib8nif9oxbu4QXSlI?w=500&auto=format"}
                    description={"Mint up to 3 TestToadz a time (with a maximum of 20 per account) by clicking Connect to Web3 (select appropriate testnet) on the appropriate EtherScan testnet page listed above, entering a quantity between 1 and 3 in the mint(...) function, clicking Write and confirming the transaction."}
                    validateFunction={validateFunction}
                />
            </VStack>
        </>
    )
}