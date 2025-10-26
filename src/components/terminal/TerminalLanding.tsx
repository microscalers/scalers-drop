'use client'
import { useState } from 'react'
import { Terminal } from 'lucide-react'
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
            <span className="text-xl tracking-wide">MICROSCALERS.AI</span>
          </div>
          <div className="flex items-center gap-4">
            <WalletConnect />
          </div>
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
            <a
              href="https://members.microscalers.eth.limo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold border border-green-700"
            >
              JOIN_SCALERS() → $29_USDC
            </a>
            <a
              href="https://workers.microscalers.eth.limo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 underline px-6 py-3 border border-green-600 hover:bg-green-900"
            >
              PROVIDE_COMPUTE()
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 p-6 border border-green-900 text-center">
          <div>
            <div className="text-3xl font-bold text-green-400">32</div>
            <div className="text-sm text-green-600">RTX_5090_RIGS</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">265+</div>
            <div className="text-sm text-green-600">VERIFIED_SCALERS</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">128GB</div>
            <div className="text-sm text-green-600">VRAM_CLUSTER</div>
          </div>
        </div>

        {/* Network Log */}
        <div className="mt-12 border border-green-900 p-6 text-left">
          <h3 className="text-green-400 text-lg font-bold mb-4">NETWORK_LOG</h3>
          <p className="text-sm text-green-600 leading-relaxed">
            {'>'} blockchain_verified: every provider verified on-chain. trustcat oracle escrow.
            <br />
            {'>'} high_perf_hardware: rtx 5090 gpus. 7950x cpus. nvme arrays. 10gb/s networking.
            <br />
            {'>'} instant_provisioning: docker/k8s ready. deepspeed support. cuda 12.4 optimized.
            <br />
            {'>'} peer_to_peer: zero custody. funds locked in escrow. auto-release via chainlink.
            <br />
            {'>'} ens_subdomain: join scalers → get username.microscaler.eth
          </p>
        </div>

{/* ===== BUILD FOOTER ===== */}
<footer
  style={{
    marginTop: '4rem',
    padding: '1rem 0',
    borderTop: '1px solid #00ff99',
    textAlign: 'center',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.85rem',
    color: '#00ff99',
    opacity: 0.8
  }}
>
  <span>
    microscalers.ai • build&nbsp;
    <code>{import.meta.env.VITE_BUILD_ID || 'local-dev'}</code>&nbsp;•&nbsp;
    deployed&nbsp;{new Date().toUTCString()}
  </span>
</footer>
