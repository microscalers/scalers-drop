// Add to imports at top:
import { GPUClusterVisual, ServerRigVisual, BlockchainTrustVisual, MonaiMRIVisual } from './visuals';

// Add this section after the Features Section, before How It Works:

{/* Use Cases / Workloads Section */}
<section className="py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div {...fadeIn} className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
        <Activity className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-medium text-cyan-300">Production Workloads</span>
      </div>
      <h2 className="text-4xl font-bold mb-4">Enterprise AI Workloads</h2>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">
        From medical imaging to LLM training, Microscalers powers the most demanding AI compute workloads with verified hardware and transparent pricing
      </p>
    </motion.div>

    {/* Monai.io Feature Showcase */}
    <div className="mb-16">
      <MonaiMRIVisual />
    </div>

    {/* Other workload cards */}
    <div className="grid md:grid-cols-3 gap-8">
      <motion.div
        {...fadeIn}
        className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl"
      >
        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
          <Zap className="w-6 h-6 text-purple-400" />
        </div>
        <h3 className="text-xl font-bold mb-3">LLM Training & Fine-tuning</h3>
        <p className="text-gray-400 mb-4">
          Train large language models from scratch or fine-tune existing models on custom datasets with multi-GPU setups
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Up to 60x RTX 5090 fleet</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>DeepSpeed & FSDP support</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>From $12/day per GPU</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...fadeIn}
        transition={{ delay: 0.1 }}
        className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl"
      >
        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
          <Cpu className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold mb-3">Computer Vision</h3>
        <p className="text-gray-400 mb-4">
          Train object detection, segmentation, and classification models on large-scale image datasets
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>YOLO, Mask R-CNN, ViT</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>TensorFlow & PyTorch</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>CUDA 12.4 optimized</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...fadeIn}
        transition={{ delay: 0.2 }}
        className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl"
      >
        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
          <Server className="w-6 h-6 text-green-400" />
        </div>
        <h3 className="text-xl font-bold mb-3">Scientific Computing</h3>
        <p className="text-gray-400 mb-4">
          Run simulations, molecular dynamics, climate modeling, and other HPC workloads on verified infrastructure
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>GROMACS, LAMMPS support</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>10Gb/s networking</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>Kubernetes integration</span>
          </div>
        </div>
      </motion.div>
    </div>

    {/* CTA */}
    <motion.div
      {...fadeIn}
      className="mt-12 text-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowBuyerModal(true)}
        className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 mx-auto"
      >
        Discuss Your Workload
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  </div>
</section>
