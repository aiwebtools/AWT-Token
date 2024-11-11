import React from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { Web3ReactProvider } from '@web3-react/core';
import { WalletConnection } from './WalletConnection';
import { metaMask } from '../connectors/metaMask';
import { coinbaseWallet } from '../connectors/coinbase';

import '@solana/wallet-adapter-react-ui/styles.css';

export default function WalletConnectionWrapper() {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);
    const wallets = React.useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new LedgerWalletAdapter(),
        ],
        [network]
    );

    const connectors = [metaMask, coinbaseWallet];

    return (
        <Web3ReactProvider connectors={connectors}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <WalletConnection />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </Web3ReactProvider>
    );
}