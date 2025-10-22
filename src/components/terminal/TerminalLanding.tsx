import { useState } from 'react'
import { Terminal, Cpu, Shield, Zap } from 'lucide-react'
import { WalletConnect } from '../wallet/WalletConnect'
import { ScalersPayment } from '../wallet/ScalersPayment'

export function TerminalLanding() {
  const [showPayment, setShowPayment] = useState(false)

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <header className="border-b border-green-900 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            <span className="text-xl">microscalers.ai</span>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="py-12">
          <div className="text-sm text-green-600 mb-2">$ ./microscalers --status</div>
          <h1 className="text-5xl font-bold mb-4">Trusted Compute Brokerage</h1>
          <p className="text-xl text-green-300 mb-8">
            Industrial-grade GPU infrastructure. ENS-verified. Base L2 escrow.
          </p>
          
          <div className="flex gap-4">
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 p-6 border border-green-900">
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

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-6">
          <div className="border border-green-900 p-6">
            <Shield className="w-8 h-8 mb-4 text-green-400" />
            <h3 className="text-lg font-bold mb-2">BLOCKCHAIN_VERIFIED</h3>
            <p className="text-sm text-green-600">
              Every provider verified on-chain. TrustCat oracle escrow.
            </p>
          </div>
          
          <div className="border border-green-900 p-6">
            <Cpu className="w-8 h-8 mb-4 text-green-400" />
            <h3 className="text-lg font-bold mb-2">HIGH_PERF_HARDWARE</h3>
            <p className="text-sm text-green-600">
              RTX 5090 GPUs. 7950X CPUs. NVMe arrays. 10Gb/s networking.
            </p>
          </div>
          
          <div className="border border-green-900 p-6">
            <Zap className="w-8 h-8 mb-4 text-green-400" />
            <h3 className="text-lg font-bold mb-2">INSTANT_PROVISIONING</h3>
            <p className="text-sm text-green-600">
              Docker/K8s ready. DeepSpeed support. CUDA 12.4 optimized.
            </p>
          </div>
        </div>

        {/* ENS Section */}
        <div className="mt-12 border border-green-900 p-8">
          <div className="text-sm text-green-600 mb-2">$ dig microscaler.eth</div>
          <h2 className="text-2xl font-bold mb-4">MEMBERS_GET_ENS_SUBDOMAIN</h2>
          <p className="text-green-300 mb-4">
            Join Scalers → get <span className="text-green-400">username.microscaler.eth</span>
          </p>
          <div className="bg-green-950 p-4 font-mono text-sm">
            <div>; ANSWER SECTION:</div>
            <div>dev.microscaler.eth.     3600    IN      A       0xDC59...6E53</div>
            <div>root.microscaler.eth.    3600    IN      A       0x8B3F...A21C</div>
          </div>
        </div>
      </main>

      {showPayment && (
        <ScalersPayment onClose={() => setShowPayment(false)} />
      )}
    </div>
  )
}
