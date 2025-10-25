import { useState, useEffect, useCallback } from 'react'
import { useAccount, useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, type Address } from 'viem'
import { base } from 'wagmi/chains'
import { validateSubdomain, normalizeSubdomain, getFullENS } from '../../utils/ens'

const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as Address
const SCALERS_CONTRACT = '0xA3d27eAD71d65059576B796d9AE45f06E21056a2' as Address

const USDC_ABI = [{ name: 'approve', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }] }] as const
const SCALERS_ABI = [{ name: 'joinScalers', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'subdomain', type: 'string' }], outputs: [] }] as const

export function ScalersPayment({ onClose }: { onClose: () => void }) {
  const [subdomain, setSubdomain] = useState('')
  const [step, setStep] = useState<'input' | 'approve' | 'join' | 'success'>('input')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const { address, chain } = useAccount()
  const { switchChain } = useSwitchChain()
  const { writeContract: approveUSDC, data: approveHash, isPending: isApproving, error: approveError } = useWriteContract()
  const { writeContract: joinScalers, data: joinHash, isPending: isJoining, error: joinError } = useWriteContract()
  const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash })
  const { isSuccess: joinSuccess } = useWaitForTransactionReceipt({ hash: joinHash })

  const handleSubdomainChange = useCallback((value: string) => {
    const normalized = normalizeSubdomain(value)
    setSubdomain(normalized)
    setError(null)
  }, [])

  const handleApprove = useCallback(async () => {
    if (!validateSubdomain(subdomain)) {
      setError('Subdomain must be 3-32 characters, lowercase letters, numbers, and hyphens only')
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      await approveUSDC({
        address: USDC_BASE,
        abi: USDC_ABI,
        functionName: 'approve',
        args: [SCALERS_CONTRACT, parseUnits('29', 6)],
        chainId: base.id,
      })
    } catch (err) {
      setError('Failed to approve USDC. Please try again.')
      setIsLoading(false)
    }
  }, [subdomain, approveUSDC])

  const handleJoin = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      await joinScalers({
        address: SCALERS_CONTRACT,
        abi: SCALERS_ABI,
        functionName: 'joinScalers',
        args: [subdomain],
        chainId: base.id,
      })
    } catch (err) {
      setError('Failed to join Scalers. Please try again.')
      setIsLoading(false)
    }
  }, [subdomain, joinScalers])

  useEffect(() => {
    if (approveSuccess && step === 'approve') {
      setStep('join')
      setIsLoading(false)
    }
    if (joinSuccess && step === 'join') {
      setStep('success')
      setIsLoading(false)
    }
  }, [approveSuccess, joinSuccess, step])

  useEffect(() => {
    if (approveError) {
      setError('Approval failed. Please try again.')
      setIsLoading(false)
    }
    if (joinError) {
      setError('Join failed. Please try again.')
      setIsLoading(false)
    }
  }, [approveError, joinError])

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
            <div className="text-green-400">{getFullENS(subdomain)}</div>
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
        
        {error && (
          <div className="text-red-400 text-sm mb-4 p-2 bg-red-950 border border-red-600">
            {error}
          </div>
        )}
        
        {step === 'input' && (
          <>
            <div className="mb-6">
              <label className="block text-sm text-green-600 mb-2">CHOOSE_ENS_NAME:</label>
              <div className="flex items-center border border-green-600">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => handleSubdomainChange(e.target.value)}
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
              disabled={!validateSubdomain(subdomain)}
              className="w-full px-6 py-3 bg-green-600 text-black font-bold hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONTINUE() →
            </button>
          </>
        )}

        {step === 'approve' && (
          <button
            onClick={handleApprove}
            disabled={isApproving || isLoading}
            className="w-full px-6 py-3 bg-green-600 text-black font-bold hover:bg-green-500 disabled:opacity-50"
          >
            {isApproving || isLoading ? 'APPROVING...' : '1. APPROVE_USDC()'}
          </button>
        )}

        {step === 'join' && (
          <button
            onClick={handleJoin}
            disabled={isJoining || isLoading}
            className="w-full px-6 py-3 bg-green-600 text-black font-bold hover:bg-green-500 disabled:opacity-50"
          >
            {isJoining || isLoading ? 'JOINING...' : '2. JOIN_SCALERS()'}
          </button>
        )}
      </div>
    </div>
  )
}
