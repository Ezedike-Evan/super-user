'use client'
import { useEffect, useState } from "react"
import NavBar from "@/components/navbar"
import NotConnected from "@/components/notConnected"
import { useWallet } from "@solana/wallet-adapter-react"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isConnected , setIsConnected] = useState(false)
  const {connected} = useWallet()
  useEffect(()=>{
    setIsConnected(connected)
  },[connected])
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        {
        !isConnected ? <NotConnected /> : <Dashboard />
        }
      </main>
    </>
  )
}
