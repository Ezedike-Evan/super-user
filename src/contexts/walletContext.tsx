'use client'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import React, { useMemo } from 'react'

const WalletContext = ({ children } : React.PropsWithChildren )=>{
    const network = WalletAdapterNetwork.Mainnet

    const endpoint = useMemo(() => clusterApiUrl(network), [network])

    const wallets = useMemo( () => [], [network] )

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletContext