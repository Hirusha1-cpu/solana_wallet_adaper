'use client';

import { FC, FormEvent } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';

const LAMPORTS_PER_SOL = web3.LAMPORTS_PER_SOL;

export const SendSolForm: FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const sendSol = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!publicKey) {
      console.error('Wallet not connected!');
      return;
    }

    const form = event.target as HTMLFormElement;
    const recipient = form.recipient.value;

    try {
      const transaction = new web3.Transaction();
      const recipientPubKey = new web3.PublicKey(recipient);

      const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubKey,
        lamports: 0.1 * LAMPORTS_PER_SOL,
      });

      transaction.add(sendSolInstruction);
      const signature = await sendTransaction(transaction, connection);
      
      await connection.confirmTransaction(signature, 'processed');
      
      console.log('Transaction sent:', signature);
      
      // Clear the form
      form.reset();
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <form onSubmit={sendSol}>
      <input
        type="text"
        name="recipient"
        placeholder="Recipient's Public Key"
        required
      />
      <button type="submit" disabled={!publicKey}>
        Send 0.1 SOL
      </button>
    </form>
  );
};