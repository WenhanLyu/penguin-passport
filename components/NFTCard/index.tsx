import useSWR from 'swr'
import {useWeb3React} from "@web3-react/core";
import {Button} from "@chakra-ui/react";

interface NFTCardProps {
    contractAddress: string,
    expireDate: Date,
    rewards: string,
}

export default function NFTCard(props: NFTCardProps) {
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const {account, active} = useWeb3React();
    const {contractAddress, expireDate, rewards} = props;

    // const url = "https://testnets-api.opensea.io/api/v1/assets?owner=" + account
    //     + "&asset_contract_address=" + contractAddress
    //     + "&order_direction=desc&offset=0&limit=20&include_orders=false";
    // const {data, error, isLoading} = useSWR(url, fetcher);
    // console.log(data);

    return (
        <>
            <Button> Test </Button>
        </>
    );
}