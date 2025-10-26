'use client'
import { useState } from 'react'
import { useWeb3 } from '@/hooks/useWeb3'

export default function WalletConnect() {
  const { connectWallet, disconnect, address } = useWeb3()
  const [connecting, setConnecting] = useState(false)

  const handleConnect = async () => {
    setConnecting(true)
    try {
      await connectWallet()
    } finally {
      setConnecting(false)
    }
  }

  return (
    <div className="mt-6 flex flex-col items-center text-green-400 font-mono">
      {address ? (
        <>
          <p className="mb-2 text-xs">Connected: {address.slice(0, 6)}…{address.slice(-4)}</p>
          <button
            onClick={() => disconnect()}
            className="border border-green-500 px-3 py-1 rounded hover:bg-green-600/10"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={handleConnect}
          disabled={connecting}
          className="border border-green-500 px-3 py-1 rounded hover:bg-green-600/10"
        >
          {connecting ? 'Connecting…' : 'Connect Wallet'}
        </button>
      )}
    </div>
  )
}
