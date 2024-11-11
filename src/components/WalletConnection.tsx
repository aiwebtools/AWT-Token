import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWeb3React } from '@web3-react/core';
import { hooks as metaMaskHooks } from '../connectors/metaMask';
import { hooks as coinbaseHooks } from '../connectors/coinbase';
import { metaMask } from '../connectors/metaMask';
import { coinbaseWallet } from '../connectors/coinbase';
import '@solana/wallet-adapter-react-ui/styles.css';

export function WalletConnection() {
  const { connected: solanaConnected } = useWallet();
  const { account } = useWeb3React();
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connectMetaMask = async () => {
    if (connecting) return;
    try {
      setConnecting(true);
      setError(null);
      await metaMask.activate();
    } catch (err: any) {
      setError(err.message || 'Failed to connect to MetaMask');
    } finally {
      setConnecting(false);
    }
  };

  const connectCoinbase = async () => {
    if (connecting) return;
    try {
      setConnecting(true);
      setError(null);
      await coinbaseWallet.activate();
    } catch (err: any) {
      setError(err.message || 'Failed to connect to Coinbase Wallet');
    } finally {
      setConnecting(false);
    }
  };

  const getDisplayAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-container">
      <div className="wallet-section">
        <h3>Solana Wallets</h3>
        <div className="wallet-options">
          <WalletMultiButton />
          {solanaConnected && (
            <div className="connection-status">Connected to Solana</div>
          )}
        </div>
      </div>

      <div className="wallet-section">
        <h3>EVM Wallets</h3>
        <div className="wallet-options">
          <button 
            className="wallet-adapter-button wallet-adapter-button-trigger"
            onClick={connectMetaMask}
            disabled={connecting || !!account}
          >
            {account ? 'MetaMask Connected' : 'Connect MetaMask'}
          </button>

          <button 
            className="wallet-adapter-button wallet-adapter-button-trigger"
            onClick={connectCoinbase}
            disabled={connecting || !!account}
          >
            {account ? 'Coinbase Connected' : 'Connect Coinbase Wallet'}
          </button>

          {account && (
            <div className="connection-status">
              Connected: {getDisplayAddress(account)}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <style>{`
        .wallet-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .wallet-section {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .wallet-section h3 {
          color: #0056b3;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .wallet-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .wallet-adapter-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: #0056b3;
          color: white;
          font-family: inherit;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          border: none;
        }

        .wallet-adapter-button:hover:not(:disabled) {
          background-color: #004080;
        }

        .wallet-adapter-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .connection-status {
          text-align: center;
          color: #198754;
          margin-top: 0.5rem;
          font-size: 0.875rem;
        }

        .error-message {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}