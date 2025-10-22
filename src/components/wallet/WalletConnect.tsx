import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet } from 'lucide-react'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-xs">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <button
          onClick={() => disconnect()}
          className="text-xs text-green-600 hover:text-green-400"
        >
          [disconnect]
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => {
        const metamask = connectors.find(c => c.type === 'injected')
        if (metamask) connect({ connector: metamask })
      }}
      className="flex items-center gap-2 px-4 py-2 border border-green-600 hover:bg-green-900"
    >
      <Wallet className="w-4 h-4" />
      CONNECT_WALLET()
    </button>
  )
}
