
import { motion } from 'framer-motion';
import { Users, Globe, Shield, Zap, DollarSign } from 'lucide-react';

const CommunityNetworkVisual = () => {
  const nodes = [
    { x: 30, y: 30, icon: Zap, label: 'Compute', color: 'blue' },
    { x: 70, y: 25, icon: Shield, label: 'Chainlink', color: 'cyan' },
    { x: 80, y: 60, icon: DollarSign, label: 'USDC', color: 'green' },
    { x: 50, y: 75, icon: Users, label: 'Community', color: 'purple' },
    { x: 20, y: 65, icon: Globe, label: 'Global', color: 'blue' }
  ];

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="relative h-full flex items-center justify-center p-8">
        {/* Central Globe */}
        <div className="relative w-96 h-96">
          {/* Globe sphere */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-500/30 bg-gradient-radial from-blue-500/10 to-transparent"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 4
            }}
          >
            {/* Globe lines */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* Latitude lines */}
              {[25, 50, 75].map((y) => (
                <div
                  key={y}
                  className="absolute left-0 right-0 h-px bg-blue-400/20"
                  style={{ top: `${y}%` }}
                />
              ))}
              {/* Longitude lines */}
              {[25, 50, 75].map((x) => (
                <div
                  key={x}
                  className="absolute top-0 bottom-0 w-px bg-blue-400/20"
                  style={{ left: `${x}%` }}
                />
              ))}
            </div>

            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-400/30"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* Network nodes on globe */}
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                {/* Node pulse ring */}
                <motion.div
                  className="absolute inset-0 -m-8 rounded-full border-2 border-cyan-400/30"
                  animate={{
                    scale: [1, 2, 2],
                    opacity: [0.5, 0, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: i * 0.3
                  }}
                />

                {/* Node */}
                <div className={`relative w-16 h-16 bg-gradient-to-br ${
                  node.color === 'blue' ? 'from-blue-500/30 to-blue-600/30 border-blue-500/50' :
                  node.color === 'cyan' ? 'from-cyan-500/30 to-cyan-600/30 border-cyan-500/50' :
                  node.color === 'green' ? 'from-green-500/30 to-green-600/30 border-green-500/50' :
                  'from-purple-500/30 to-purple-600/30 border-purple-500/50'
                } border-2 rounded-full backdrop-blur-sm flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${
                    node.color === 'blue' ? 'text-blue-400' :
                    node.color === 'cyan' ? 'text-cyan-400' :
                    node.color === 'green' ? 'text-green-400' :
                    'text-purple-400'
                  }`} />
                </div>

                {/* Label */}
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="px-2 py-1 bg-gray-900/90 border border-gray-700 rounded text-xs font-medium text-gray-300">
                    {node.label}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Connection lines between nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.map((node, i) => (
              nodes.slice(i + 1).map((target, j) => (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="1"
                  animate={{
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    delay: (i + j) * 0.2
                  }}
                />
              ))
            ))}
          </svg>
        </div>

        {/* Avatar figures around the globe */}
        {[
          { x: 15, y: 50, delay: 0 },
          { x: 85, y: 50, delay: 0.2 },
          { x: 50, y: 15, delay: 0.4 }
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: pos.delay, duration: 0.6 }}
          >
            <div className="relative">
              {/* Avatar circle */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 flex items-center justify-center backdrop-blur-sm">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              
              {/* Action indicator */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: i * 0.3
                }}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </motion.div>

              {/* Connection line to globe */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent origin-left"
                style={{
                  transform: `translate(-50%, -50%) rotate(${
                    pos.x < 50 ? '0deg' : pos.x > 50 ? '180deg' : '-90deg'
                  })`
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: i * 0.4
                }}
              />
            </div>

            {/* Role label */}
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-300">
                {i === 0 ? 'Scaler' : i === 1 ? 'Buyer' : 'Broker'}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Stats overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex items-center gap-8 bg-gray-900/90 backdrop-blur-md border border-blue-500/30 rounded-xl px-8 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">60+</div>
              <div className="text-sm text-gray-400">RTX 5090 GPUs</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">265+</div>
              <div className="text-sm text-gray-400">Community Members</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">99.8%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </div>
        </motion.div>

        {/* Chainlink verified badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute top-8 right-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full backdrop-blur-sm">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">Chainlink Verified</span>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default CommunityNetworkVisual;
