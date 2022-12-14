import {InjectedConnector} from "@web3-react/injected-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
    supportedChainIds: [5]
});

const walletConnect = new WalletConnectConnector({
    // TODO: rpc OR rpcUrl
    rpc: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true
});

const walletLink = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "web3-react-demo"
});

export const connectors = {
    injected: injected,
    walletConnect: walletConnect,
    coinbaseWallet: walletLink
};
