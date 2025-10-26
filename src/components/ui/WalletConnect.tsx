'use client'
import { useWeb3 } from '@/hooks/useWeb3'

export default function WalletConnect() {
  const { connectWallet, disconnect, address, ensName, isConnecting } = useWeb3()

  // connected view
  if (address) {
    const short = `${address.slice(0, 6)}…${address.slice(-4)}`
    return (
      <div className="flex items-center gap-2 text-green-400">
        <span className="text-sm">
          {ensName ? `${ensName}` : short}
          <span className="text-green-500 ml-1">(founder)</span>
        </span>
        <button
          onClick={disconnect}
          className="text-xs border border-green-700 px-2 py-1 hover:bg-green-900"
        >
          disconnect
        </button>
      </div>
    )
  }

  // disconnected view
  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="px-3 py-2 border border-green-600 hover:bg-green-900 text-sm"
    >
      {isConnecting ? 'connecting…' : 'connect wallet'}
    </button>
  )
}
