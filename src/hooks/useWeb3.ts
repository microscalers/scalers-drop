'use client'
import { useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
import { ethers } from 'ethers'
import { normalise } from '@ensdomains/ensjs/utils'   // 🇬🇧 correct spelling

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Base L2
const BASE_CHAIN_ID = 8453n // bigint literal

export function useWeb3() {
  const [address, setAddress] = useState<string | null>(null)
  const [ensName, setEnsName] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = useCallback(async () => {
    if (!(window as any).ethereum) {
      alert('MetaMask or another wallet extension is required.')
      return
    }
    try {
      setIsConnecting(true)
      const ethProvider = new ethers.BrowserProvider((window as any).ethereum)
      await ethProvider.send('eth_requestAccounts', [])
      const signer = await ethProvider.getSigner()
      const userAddress = await signer.getAddress()
      setProvider(ethProvider)
      setAddress(userAddress)

      // ENS lookup
      try {
        const ens = await ethProvider.lookupAddress(userAddress)
        if (ens) setEnsName(normalise(ens))
      } catch (err) {
        console.warn('ENS lookup failed', err)
      }

      // ensure on Base L2
      const network = await ethProvider.getNetwork()
      if (network.chainId !== BASE_CHAIN_ID) {
        alert('Switching to Base mainnet…')
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2105' }], // 8453 hex
        })
      }

      // sync Supabase users
      const { data, error } = await supabase
        .from('users')
        .upsert({ wallet: userAddress, ens: ensName })
        .select()
      if (error) console.error('Supabase sync error', error)
      else console.log('Supabase user synced', data)
    } catch (err) {
      console.error('connectWallet error', err)
    } finally {
      setIsConnecting(false)
    }
  }, [ensName])

  const disconnect = useCallback(() => {
    setAddress(null)
    setEnsName(null)
    setProvider(null)
  }, [])

  return { connectWallet, disconnect, address, ensName, isConnecting }
}
