import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWeb3React } from '@web3-react/core';
import { metaMask } from '../connectors/metaMask';
import { coinbaseWallet } from '../connectors/coinbase';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: number;
}

export function WalletModal({ isOpen, onClose, onSuccess, amount }: WalletModalProps) {
    const { wallet, select: selectSolanaWallet } = useWallet();
    const { activate } = useWeb3React();
    const [error, setError] = useState<string | null>(null);
    const [connecting, setConnecting] = useState(false);

    const connectMetaMask = async () => {
        try {
            setConnecting(true);
            setError(null);
            await metaMask.activate();
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Failed to connect to MetaMask');
        } finally {
            setConnecting(false);
        }
    };

    const connectCoinbase = async () => {
        try {
            setConnecting(true);
            setError(null);
            await coinbaseWallet.activate();
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Failed to connect to Coinbase Wallet');
        } finally {
            setConnecting(false);
        }
    };

    const connectLedger = async () => {
        try {
            setConnecting(true);
            setError(null);
            await selectSolanaWallet('Ledger');
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Failed to connect to Ledger');
        } finally {
            setConnecting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Connect Wallet to Lock {amount} AWT Tokens</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="wallet-options">
                        <button
                            className="wallet-option-button"
                            onClick={connectMetaMask}
                            disabled={connecting}
                        >
                            <img src="/metamask-icon.svg" alt="MetaMask" />
                            Connect MetaMask Wallet
                        </button>

                        <button
                            className="wallet-option-button"
                            onClick={connectLedger}
                            disabled={connecting}
                        >
                            <img src="/ledger-icon.svg" alt="Ledger" />
                            Connect Ledger Hardware Wallet
                        </button>

                        <button
                            className="wallet-option-button"
                            onClick={connectCoinbase}
                            disabled={connecting}
                        >
                            <img src="/coinbase-icon.svg" alt="Coinbase" />
                            Connect Coinbase Wallet
                        </button>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .modal-content {
                    background: white;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 500px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .modal-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-header h2 {
                    margin: 0;
                    font-size: 1.25rem;
                    color: #0056b3;
                }

                .close-button {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                }

                .modal-body {
                    padding: 1.5rem;
                }

                .wallet-options {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .wallet-option-button {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    background: white;
                    cursor: pointer;
                    transition: all 0.2s;
                    width: 100%;
                    font-size: 1rem;
                }

                .wallet-option-button:hover:not(:disabled) {
                    background: #f8f9fa;
                    border-color: #0056b3;
                }

                .wallet-option-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .wallet-option-button img {
                    width: 24px;
                    height: 24px;
                }

                .error-message {
                    margin-top: 1rem;
                    padding: 0.75rem;
                    border-radius: 4px;
                    background: #f8d7da;
                    color: #dc3545;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}