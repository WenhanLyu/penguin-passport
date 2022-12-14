import React from "react";
import {Card} from "antd";
import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum: any
        web3: any
    }
}

export default function Account() {
    const Web3 = require("web3");
    const ethEnabled = async () => {
        if (window.ethereum) {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            return true;
        }
        return false;
    }

    console.log(ethEnabled());

    return (
        <Card>

        </Card>
    )
}