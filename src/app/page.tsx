'use client';

import dynamic from 'next/dynamic';
import { WalletContextProvider } from './WalletContextProvider';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

const SendSolForm = dynamic(
  () => import('./SendSolForm').then((mod) => mod.SendSolForm),
  { ssr: false }
);

export default function Home() {
  return (
    <WalletContextProvider>
      <WalletMultiButton />
      <SendSolForm />
      <p>Put the rest of your app here</p>
    </WalletContextProvider>
  );
}