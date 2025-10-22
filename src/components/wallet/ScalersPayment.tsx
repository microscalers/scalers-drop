import { useState, useEffect } from 'react'
import { useAccount, useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, type Address } from 'viem'
import { base } from 'wagmi/chains'
// import { X } from 'lucide-react'

const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as Address
const SCALERS_CONTRACT = '0xA3d27eAD71d65059576B796d9AE45f06E21056a2' as Address

const USDC_ABI = [{ name: 'approve', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }] }] as const
const SCALERS_ABI = [{ name: 'joinScalers', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'subdomain', type: 'string' }], outputs: [] }] as const

export function ScalersPayment({ onClose }: { onClose: () => void }) {
  const [subdomain, setSubdomain] = useState('')
  const [step, setStep] = useState<'input' | 'approve' | 'join' | 'success'>('input')
  
  const { address, chain } = useAccount()
  const { switchChain } = useSwitchChain()
  const { writeContract: approveUSDC, data: approveHash, isPending: isApproving } = useWriteContract()
  const { writeContract: joinScalers, data: joinHash, isPending: isJoining } = useWriteContract()
  const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash })
  const { isSuccess: joinSuccess } = useWaitForTransactionReceipt({ hash: joinHash })

  useEffect(() => {
    if (approveSuccess && step === 'approve') setStep('join')
    if (joinSuccess && step === 'join') setStep('success')
  }, [approveSuccess, joinSuccess, step])

  if (chain?.id !== base.id) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 font-mono">
        <div className="bg-black border border-green-600 p-8 max-w-md">
          <button onClick={onClose} className="float-right text-green-600">[X]</button>
          <h2 className="text-2xl text-green-400 mb-4">SWITCH_TO_BASE_L2</h2>
          <button
            onClick={() => switchChain({ chainId: base.id })}
            className="w-full px-6 py-3 bg-green-600 text-black font-bold hover:bg-green-500"
          >
            SWITCH_NETWORK()
          </button>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 font-mono">
        <div className="bg-black border border-green-600 p-8 max-w-md text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl text-green-400 mb-4">WELCOME_SCALER</h2>
          <div className="bg-green-950 p-4 mb-4">
            <div className="text-green-400">{subdomain}.microscaler.eth</div>
          </div>
          <button onClick={onClose} className="px-6 py-3 border border-green-600 hover:bg-green-900">
            CONTINUE()
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 font-mono">
      <div className="bg-black border border-green-600 p-8 max-w-md w-full">
        <button onClick={onClose} className="float-right text-green-600">[X]</button>
        
        <h2 className="text-2xl text-green-400 mb-6">JOIN_SCALERS()</h2>
        
        {step === 'input' && (
          <>
            <div className="mb-6">
              <label className="block text-sm text-green-600 mb-2">CHOOSE_ENS_NAME:</label>
              <div className="flex items-center border border-green-600">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="dev"
                  className="flex-1 bg-black text-green-400 px-4 py-2 outline-none"
                  maxLength={32}
                />
                <span className="px-4 text-green-600">.microscaler.eth</span>
              </div>
            </div>

            <div className="bg-green-950 p-4 mb-6 text-sm">
              <div>PRICE: $29_USDC</div>
              <div>NETWORK: BASE_L2</div>
              <div>WALLET: {address?.slice(0, 6)}...{address?.slice(-4)}</div>
            </div>

            <button
              onClick={() => setStep('approve')}
              disabled={!subdomain || subdomain.length < 3}
              className="w-full px-6 py-3 bg-green-600 text-black font-bold hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONTINUE() →
            </button>
          </>
        )}

        {step === 'approve' && (
          <button
            onClick={() => approveUSDC({
              address: USDC_BASE,
              abi: USDC_ABI,
              functionName: 'approve',
              args: [SCALERS_CONTRACT, parseUnits('29', 6)],
              chainId: base.id,
            })}
            disabled={isApproving}
            className="w-full px-6 py-3 bg-green-600 text-black font-bold hover:bg-green-500"
          >
            {isApproving ? 'APPROVING...' : '1. APPROVE_USDC()'}
          </button>
        )}

        {step === 'join' && (
          <button
            onClick={() => joinScalers({
              address: SCALERS_CONTRACT,
              abi: SCALERS_ABI,
              functionName: 'joinScalers',
              args: [subdomain],
              chainId: base.id,
            })}
            disabled={isJoining}
            className="w-full px-6 py-3 bg-green-600 text-black font-bold hover:bg-green-500"
          >
            {isJoining ? 'JOINING...' : '2. JOIN_SCALERS()'}
          </button>
        )}
      </div>
    </div>
  )
}
