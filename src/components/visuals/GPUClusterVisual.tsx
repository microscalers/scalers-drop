import React from 'react';
import { motion } from 'framer-motion';

const GPUClusterVisual = () => {
  return (
    <div className="relative w-full h-[500px] bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative h-full flex items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 border-2 border-gray-700 rounded-lg p-4 shadow-2xl">
                <div className="absolute inset-0 bg-blue-500 opacity-5 blur-xl rounded-lg"></div>
                
                <div className="relative space-y-3">
                  <div className="flex justify-between">
                    {[0, 1, 2].map((led) => (
                      <motion.div
                        key={led}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2, delay: led * 0.3 }}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)' }}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((fan) => (
                      <div key={fan} className="relative aspect-square">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: fan * 0.2 }}
                          className="w-full h-full"
                        >
                          <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-30"></div>
                          <div className="absolute inset-2 rounded-full border border-blue-400 opacity-20"></div>
                          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400 opacity-50"></div>
                          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-blue-400 opacity-50"></div>
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-2">
                    <div className="text-xs font-bold text-blue-400">NVIDIA</div>
                    <div className="text-sm font-bold text-gray-300">RTX 5090</div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="absolute -right-2 top-1/2 -translate-y-1/2 bg-blue-500 bg-opacity-10 backdrop-blur-sm border border-blue-500 border-opacity-30 rounded px-2 py-1 text-xs font-mono text-blue-300"
              >
                32GB
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 bg-opacity-90 backdrop-blur-md border border-blue-500 border-opacity-30 rounded-lg px-6 py-3"
        >
          <div className="flex items-center gap-6 text-sm">
            <div>
              <div className="text-blue-400 font-bold">32 TFLOPS</div>
              <div className="text-gray-400 text-xs">Compute</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div>
              <div className="text-green-400 font-bold">4x GPUs</div>
              <div className="text-gray-400 text-xs">Cluster</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div>
              <div className="text-purple-400 font-bold">128GB</div>
              <div className="text-gray-400 text-xs">VRAM</div>
            </div>
          </div>
        </motion.div>
      </div>

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100],
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

export default GPUClusterVisual;
