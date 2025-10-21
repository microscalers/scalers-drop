import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ExternalLink } from 'lucide-react';

const TrustCat = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", delay: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-400/50 rounded-2xl p-4 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all">
            <motion.div
              className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-xl"
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <div className="relative">
              <pre className="text-cyan-400 text-sm font-mono leading-tight select-none">{
`  /\\_/\\  
 ( o.o ) 
  > ^ <  `
              }</pre>
              <div className="text-center mt-2">
                <div className="text-xs font-bold text-cyan-400 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  TRUSTCAT
                </div>
                <div className="text-xs text-gray-500">Click me! 🐾</div>
              </div>
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-4 w-80"
            >
              <div className="bg-gray-900 border-2 border-cyan-400/50 rounded-xl p-4 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Blockchain Verified
                  </h3>
                  <button onClick={() => setShowDetails(false)} className="text-gray-500 hover:text-gray-300">
                    ✕
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs">Block</div>
                    <div className="text-cyan-400 font-mono">#11661</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Validator</div>
                    <div className="text-cyan-400 font-mono break-all">founder.microscaler.eth</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Proof ID</div>
                    <div className="text-cyan-400 font-mono text-xs break-all">Qm…xyz</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Timestamp</div>
                    <div className="text-gray-300">Tue Oct 21 20:39 UTC</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Compute Role</div>
                    <div className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 inline-block">
                      founder-genesis
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <a href="#" className="flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm">
                    View on Etherscan
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="mt-4 text-center">
                  <pre className="text-cyan-400/50 text-xs font-mono leading-tight">{
`  /\\_/\\  
 ( ^.^ ) 
  > ^ <  `
                  }</pre>
                  <div className="text-xs text-gray-600 mt-1">Verified by TrustCat</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TrustCat;
