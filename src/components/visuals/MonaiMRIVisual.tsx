import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Cpu, Shield } from 'lucide-react';

const MonaiMRIVisual = () => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {[...Array(15)].map((_, i) => (
          <motion.line
            key={i}
            x1={100 + (i * 50)}
            y1={100 + (i % 3) * 150}
            x2={150 + (i * 50)}
            y2={200 + ((i + 1) % 3) * 150}
            stroke="rgb(34, 211, 238)"
            strokeWidth="1"
            opacity="0.3"
            animate={{
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.2
            }}
          />
        ))}

        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + (i * 40) % 700}
            cy={150 + (i % 4) * 100}
            r="3"
            fill="rgb(34, 211, 238)"
            filter="url(#glow)"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.1
            }}
          />
        ))}
      </svg>

      <div className="relative h-full flex items-center justify-center p-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-xl"></div>
              
              <div className="relative aspect-square bg-gray-950 rounded-lg overflow-hidden border border-blue-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  {[0, 1, 2, 3, 4, 5].map((layer) => (
                    <motion.div
                      key={layer}
                      className="absolute rounded-full border-2 border-cyan-400"
                      style={{
                        width: `${80 - layer * 12}%`,
                        height: `${80 - layer * 12}%`,
                        opacity: 0.3 - layer * 0.04
                      }}
                      animate={{
                        scale: [1, 1.02, 1],
                        opacity: [0.3 - layer * 0.04, 0.4 - layer * 0.04, 0.3 - layer * 0.04]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        delay: layer * 0.2
                      }}
                    />
                  ))}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-1/3 h-1/3 rounded-full bg-gradient-radial from-cyan-400/40 to-transparent blur-sm"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.4, 0.6, 0.4]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2
                      }}
                    />
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-8"
                    animate={{
                      y: ['-100%', '300%']
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear"
                    }}
                  />

                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                <div className="absolute top-2 left-2 right-2 flex justify-between text-xs font-mono text-cyan-400">
                  <span>AXIAL VIEW</span>
                  <span>SLICE 127/256</span>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs font-mono text-cyan-400">
                  <span>3T MRI</span>
                  <span>MONAI.IO</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Processing</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                    animate={{
                      width: ['0%', '100%']
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 font-mono">
                  Training epoch 47/100 • Loss: 0.0234
                </div>
              </div>

              <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs font-semibold text-green-300 flex items-center gap-2">
                <Activity className="w-3 h-3" />
                Monai.io
              </div>
            </div>

            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-full top-1/2 w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, 40, 80]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: i * 0.4
                }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Brain className="w-8 h-8 text-cyan-400" />
                Medical Imaging AI
              </h3>
              <p className="text-gray-400">
                Train advanced deep learning models for MRI analysis using Monai.io on verified GPU compute
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold">Compute Layer</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPUs</span>
                    <span className="text-cyan-400 font-mono">4x RTX 5090</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">VRAM</span>
                    <span className="text-cyan-400 font-mono">128GB GDDR7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Throughput</span>
                    <span className="text-green-400 font-mono">~450 img/sec</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="font-semibold">Framework</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Platform</span>
                    <span className="text-green-400 font-mono">Monai.io v1.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Backend</span>
                    <span className="text-green-400 font-mono">PyTorch 2.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dataset</span>
                    <span className="text-green-400 font-mono">1.2TB MRI</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="font-semibold">Blockchain Verified</span>
                </div>
                <p className="text-sm text-gray-400">
                  Hardware specs, uptime, and compute delivery verified on-chain
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">99.8%</div>
                <div className="text-xs text-gray-500">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">~4h</div>
                <div className="text-xs text-gray-500">Training Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">$48</div>
                <div className="text-xs text-gray-500">Cost/Day</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/30 rounded-tl"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-500/30 rounded-tr"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-500/30 rounded-bl"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30 rounded-br"></div>
    </div>
  );
};

export default MonaiMRIVisual;
