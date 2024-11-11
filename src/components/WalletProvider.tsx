import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';

import '@solana/wallet-adapter-react-ui/styles.css';

export default function WalletProviderComponent({ children }) {
    // Solana network configuration
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new LedgerWalletAdapter(),
        ],
        [network]
    );

    // Web3 wallet connectors
    const metamask = new MetaMask();
    const coinbaseWallet = new CoinbaseWallet({
        url: 'https://mainnet.infura.io/v3/your-infura-id',
        appName: 'AWT Token Platform'
    });

    return (
        <Web3ReactProvider connectors={[metamask, coinbaseWallet]}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        {children}
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </Web3ReactProvider>
    );
}