import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { base } from 'wagmi/chains'

export function useWeb3() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  const connectWallet = async () => {
    const metamask = connectors.find(c => c.type === 'injected')
    if (metamask) {
      await connect({ connector: metamask })
    }
  }

  const switchToBase = async () => {
    await switchChain({ chainId: base.id })
  }

  return {
    address,
    isConnected,
    chain,
    connectWallet,
    disconnect,
    switchToBase,
    isBaseChain: chain?.id === base.id
  }
}