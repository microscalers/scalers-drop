import { useAccount } from 'wagmi'
import { base } from 'wagmi/chains'

export function BaseL2Banner() {
  const { chain, isConnected } = useAccount()
  
  // Only show banner when connected to Base L2
  if (!isConnected || chain?.id !== base.id) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: '#00ff99',
      color: '#000',
      padding: '0.5rem 1rem',
      textAlign: 'center',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 2px 10px rgba(0, 255, 153, 0.3)',
      animation: 'slideDown 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      ✅ Base L2 Connected • Network: {chain.name} • Ready for transactions
    </div>
  )
}