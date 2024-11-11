import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

export default function WalletConnect() {
    const { connected: solanaConnected } = useWallet();
    const { account, activate, active } = useWeb3React();
    const [error, setError] = useState<string | null>(null);

    const connectMetaMask = async () => {
        try {
            await activate('metamask');
            setError(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const connectCoinbase = async () => {
        try {
            await activate('coinbase');
            setError(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const connectCryptoCom = async () => {
        try {
            await activate('cryptoCom');
            setError(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="wallet-connect-container">
            <h2>Connect Your Wallet</h2>
            <div className="wallet-buttons">
                <WalletMultiButton />
                
                <button 
                    className="wallet-adapter-button wallet-adapter-button-trigger"
                    onClick={connectMetaMask}
                >
                    Connect MetaMask
                </button>

                <button 
                    className="wallet-adapter-button wallet-adapter-button-trigger"
                    onClick={connectCoinbase}
                >
                    Connect Coinbase Wallet
                </button>

                <button 
                    className="wallet-adapter-button wallet-adapter-button-trigger"
                    onClick={connectCryptoCom}
                >
                    Connect Crypto.com Wallet
                </button>

                {error && <p className="error-message">{error}</p>}
                
                {active && (
                    <div className="connected-status">
                        Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
                    </div>
                )}
            </div>
        </div>
    );
}