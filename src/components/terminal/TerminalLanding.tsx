'use client'
import { useState } from 'react'
import { Terminal, Cpu, Shield, Zap } from 'lucide-react'
import WalletConnect from '@/components/ui/WalletConnect'

export function TerminalLanding() {
  const [showPayment, setShowPayment] = useState(false)

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <header className="border-b border-green-900 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            <span className="text-xl">MICROSCALERS.AI</span>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto p-8 text-green-400">
        <div className="py-12 text-center">
          <div className="text-sm text-green-600 mb-2">$ ./microscalers --status</div>
          <h1 className="text-5xl font-bold mb-4">Trusted Compute Brokerage</h1>
          <p className="text-xl text-green-300 mb-8">
            Industrial-grade GPU infrastructure. ENS-verified. Base L2 escrow.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowPayment(true)}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold"
            >
              JOIN_SCALERS() → $29_USDC
            </button>
            <button className="px-6 py-3 border border-green-600 hover:bg-green-900">
              PROVIDE_COMPUTE()
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
