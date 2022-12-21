import {Button, useColorModeValue} from "@chakra-ui/react";
import {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {TestToadzABI, TestToadzAddress} from "../../src/utils";

interface MintButtonProps {
    available: boolean,
}

export default function MintButton(props: MintButtonProps) {
    const {library, chainId, account, activate, deactivate, active} = useWeb3React();

    const {available} = props;


    const onClick = async () => {
        const provider = window.ethereum;
        const currentAccount = account;

        if (typeof provider === 'undefined' && !active) {
            return;
        }

        let Contract = require('web3-eth-contract');

        Contract.setProvider(provider);

        let test = new Contract(TestToadzABI, TestToadzAddress);
        // test.methods.mint(account, 1).send({from: account}).catch((e) => {
        //     console.log(e);
        // });

        let methods = test.methods;
        methods.mint(1).send({from: account,})
            .on('transactionHash', function (hash: any) {
                console.log("transactionHash: ", hash);
            })
            .on('receipt', function (receipt: any) {
                console.log(receipt);
            })
            .on('error', function (error: any, receipt: any) {
                console.log('error');
                console.log(error);
                console.log('receipt');
                console.log(receipt);
            })


    };

    return (
        <>
            <Button
                rounded={'sm'}
                my={5}
                mx={[0, 5]}
                overflow={'hidden'}
                bg={useColorModeValue("white", "white")}
                border={'1px'}
                borderColor={"black"}
                boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 teal')}
                onClick={onClick}
                color={useColorModeValue("black", "black")}
                isDisabled={!available}
            >
                MINT
            </Button>
        </>
    );
}