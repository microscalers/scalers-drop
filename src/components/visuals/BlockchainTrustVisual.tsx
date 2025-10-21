
import { motion } from 'framer-motion';
import { Shield, Cpu, Wallet, CheckCircle2 } from 'lucide-react';

const BlockchainTrustVisual = () => {
  const nodes = [
    { x: 50, y: 20, icon: Shield, label: 'Verified', color: 'green' },
    { x: 80, y: 40, icon: Cpu, label: 'Compute', color: 'blue' },
    { x: 70, y: 70, icon: Wallet, label: 'Payment', color: 'purple' },
    { x: 30, y: 70, icon: CheckCircle2, label: 'Trust', color: 'green' },
    { x: 20, y: 40, icon: Shield, label: 'Security', color: 'blue' },
    { x: 50, y: 50, icon: Shield, label: 'Network', color: 'cyan' }
  ];

  const connections = [
    { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
    { from: 3, to: 4 }, { from: 4, to: 0 }, { from: 0, to: 5 },
    { from: 1, to: 5 }, { from: 2, to: 5 }, { from: 3, to: 5 }, { from: 4, to: 5 }
  ];

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z' fill='none' stroke='rgba(59,130,246,0.3)' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px'
        }}></div>
      </div>

      <div className="relative h-full p-8 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full max-w-2xl aspect-square">
          {connections.map((conn, i) => {
            const from = nodes[conn.from];
            const to = nodes[conn.to];
            return (
              <motion.line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgb(59, 130, 246)"
                strokeWidth="0.5"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  pathLength: { duration: 1, delay: i * 0.1 },
                  opacity: { repeat: Infinity, duration: 3, delay: i * 0.2 }
                }}
              />
            );
          })}

          {nodes.map((node, i) => (
            <g key={i}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill="rgb(59, 130, 246)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            </g>
          ))}
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-full px-4 py-2 backdrop-blur-md">
          <Shield className="w-5 h-5 text-green-400" />
          <div className="text-sm font-semibold text-gray-200">Blockchain Verified</div>
          <CheckCircle2 className="w-5 h-5 text-blue-400" />
        </div>
      </motion.div>
    </div>
  );
};

export default BlockchainTrustVisual;
