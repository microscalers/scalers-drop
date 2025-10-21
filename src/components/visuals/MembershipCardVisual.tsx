import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Users, Award, Zap } from 'lucide-react';

const MembershipCardVisual = () => {
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative h-full flex items-center justify-center p-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl w-full">
          {/* Membership Card */}
          <motion.div
            initial={{ opacity: 0, rotateY: -20, x: -50 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            <div className="relative">
              {/* Card glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3
                }}
              />

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 border-2 border-blue-500/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">MICROSCALERS</div>
                      <div className="text-sm font-bold text-gray-200">GUILD MEMBER</div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="w-10 h-10 rounded-full border-2 border-cyan-400/30 flex items-center justify-center"
                  >
                    <Shield className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                </div>

                {/* ENS domain */}
                <div className="mb-6">
                  <div className="text-xs text-gray-500 mb-1">ENS SUBDOMAIN</div>
                  <motion.div
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400"
                    animate={{
                      backgroundPosition: ['0%', '100%', '0%']
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% auto'
                    }}
                  >
                    john.microscaler.eth
                  </motion.div>
                </div>

                {/* NFT Badge */}
                <div className="mb-6 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        rotateY: [0, 180, 360]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "linear"
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                    >
                      <Award className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-bold text-purple-300">Guild NFT Badge</div>
                      <div className="text-xs text-gray-400">Token ID: #0247</div>
                    </div>
                  </div>
                </div>

                {/* Perks */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <Cpu className="w-5 h-5 text-blue-400" />
                    <div className="text-sm">
                      <div className="font-semibold text-gray-200">48-Hour RTX 5090 Access</div>
                      <div className="text-xs text-gray-500">Test compute workloads</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <Users className="w-5 h-5 text-purple-400" />
                    <div className="text-sm">
                      <div className="font-semibold text-gray-200">Exclusive Discord Access</div>
                      <div className="text-xs text-gray-500">Private channels & events</div>
                    </div>
                  </div>
                </div>

                {/* Card number */}
                <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
                  <span>MEMBER #0247</span>
                  <span>VALID: LIFETIME</span>
                </div>

                {/* Chainlink verified badge */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2
                    }}
                    className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-300 flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" />
                    Verified
                  </motion.div>
                </div>

                {/* Holographic effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/10 to-transparent rounded-2xl pointer-events-none"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Discord Preview & Server Rig */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Discord preview */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-gray-200">#guild-lounge</span>
                <span className="text-xs text-gray-500 ml-auto">265 online</span>
              </div>

              <div className="space-y-3">
                {[
                  { user: 'scaler_47', msg: 'Just deployed 4x 5090s! Ready to roll 🔥', color: 'blue' },
                  { user: 'broker_lisa', msg: 'Welcome to the Guild! Check out #resources', color: 'green' },
                  { user: 'john', msg: 'Thanks! Excited to be here 🚀', color: 'cyan' }
                ].map((chat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                      chat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      chat.color === 'green' ? 'from-green-500 to-green-600' :
                      'from-cyan-500 to-cyan-600'
                    } flex items-center justify-center text-xs font-bold text-white`}>
                      {chat.user[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className={`font-semibold ${
                          chat.color === 'blue' ? 'text-blue-400' :
                          chat.color === 'green' ? 'text-green-400' :
                          'text-cyan-400'
                        }`}>{chat.user}</span>
                        <span className="text-xs text-gray-500 ml-2">now</span>
                      </div>
                      <div className="text-sm text-gray-300 leading-relaxed">{chat.msg}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* GPU Access Preview */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="font-semibold text-gray-200">Your 48-Hour Lease</div>
                  <div className="text-xs text-gray-500">RTX 5090 Compute Access</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">GPU</span>
                  <span className="text-blue-400 font-mono">RTX 5090 32GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-mono">Available</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time Remaining</span>
                  <span className="text-cyan-400 font-mono">47h 23m</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-sm transition-colors"
              >
                Launch Workload
              </motion.button>
            </div>

            {/* Price tag */}
            <div className="text-center p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">
                $29
              </div>
              <div className="text-sm text-gray-400">One-time membership fee</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
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

export default MembershipCardVisual;
