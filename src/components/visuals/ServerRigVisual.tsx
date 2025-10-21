
import { motion } from 'framer-motion';

const ServerRigVisual = () => {
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden p-8 border border-gray-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>

      <div className="relative max-w-md mx-auto h-full flex flex-col justify-center">
        <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-gray-700 rounded-lg p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
            <div className="text-sm font-mono text-gray-400">RACK-001</div>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
              ))}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {[0, 1, 2, 3].map((slot) => (
              <motion.div
                key={slot}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: slot * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: slot * 0.2 }}
                        className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center text-xs font-bold text-white"
                      >
                        G{slot + 1}
                      </motion.div>
                      <div>
                        <div className="text-xs font-semibold text-gray-300">RTX 5090</div>
                        <div className="text-xs text-gray-500">32GB GDDR7</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 items-end h-6">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            height: [
                              Math.random() * 16 + 8,
                              Math.random() * 16 + 8,
                              Math.random() * 16 + 8
                            ]
                          }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 1.5,
                            delay: i * 0.1
                          }}
                          className="w-1 bg-green-400 rounded-t"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-2">CPU</div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded flex items-center justify-center text-xs font-bold text-white">
                    AMD
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-300">Ryzen 9</div>
                    <div className="text-xs text-gray-500">7950X</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-2">RAM</div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center text-xs font-bold text-white">
                    64
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-300">DDR5</div>
                    <div className="text-xs text-gray-500">6000MHz</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">NVMe SSD</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: ['40%', '80%', '40%'] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                />
              </div>
              <span className="text-gray-400 font-mono">2TB</span>
            </div>
          </div>
        </div>
      </div>

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-0 text-xs font-mono text-green-400 opacity-0"
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: '100%',
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4
          }}
          style={{ left: `${30 + Math.random() * 40}%` }}
        >
          {Math.random() > 0.5 ? '1010' : '0101'}
        </motion.div>
      ))}
    </div>
  );
};

export default ServerRigVisual;
