import React, { useState } from 'react';
import { WalletModal } from './WalletModal';

interface TokenLockButtonProps {
    amount: number;
    onSuccess?: () => void;
}

export function TokenLockButton({ amount, onSuccess }: TokenLockButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSuccess = () => {
        setIsModalOpen(false);
        if (onSuccess) {
            onSuccess();
        }
    };

    return (
        <div className="token-lock-container">
            <button
                className="exchange-btn"
                onClick={() => setIsModalOpen(true)}
            >
                Lock Your Tokens For AWT Network Operational Instructions
            </button>

            <WalletModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                amount={amount}
            />

            <style>{`
                .token-lock-container {
                    width: 100%;
                }

                .exchange-btn {
                    width: 100%;
                    padding: 0.75rem;
                    background: #0056b3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    font-size: 0.9rem;
                    white-space: normal;
                    line-height: 1.2;
                    min-height: 60px;
                }

                .exchange-btn:hover {
                    background: #004080;
                }

                .exchange-btn:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(0, 86, 179, 0.5);
                }

                .exchange-btn:active {
                    background: #003366;
                }
            `}</style>
        </div>
    );
}