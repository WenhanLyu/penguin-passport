import {Button} from "@chakra-ui/react";
import {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {TestToadzABI, TestToadzAddress} from "../../src/utils";


export default function MintButton() {
    const {library, chainId, account, activate, deactivate, active} = useWeb3React();


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
            <Button colorScheme={'green'} onClick={onClick}>MINT</Button>
        </>
    );
}