import {VStack} from "@chakra-ui/react";
import NFTCard from "../NFTCard";


export default function CardStack() {
    return (
        <>
            <VStack>
                <NFTCard
                    contractAddress={"0xd000f000aa1f8accbd5815056ea32a54777b2fc4"}
                    contractName={"TestToadz Goerli"}
                    imageUrl={"https://i.seadn.io/gae/jtIwfqs8mAs8CWTofmKa0EDhgve1I7SkFb55y2svLDqkQ9RFBLDmLbNF2lwZSNt-ylNLxb2RnQu-pDMKNSNs-v3btPuuau4wGdz3CsM?w=500&auto=format"}
                />
            </VStack>
        </>
    )
}