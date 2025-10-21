import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Shield, DollarSign, Zap, Server, CheckCircle2, ArrowRight, Users, Twitter, X, Activity, Brain, Award, Globe } from 'lucide-react';
import { GPUClusterVisual, ServerRigVisual, BlockchainTrustVisual, MonaiMRIVisual, CommunityNetworkVisual, MembershipCardVisual } from './visuals';

const MicroscalersLanding = () => {
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [showBuyerModal, setShowBuyerModal] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Blockchain Verified",
      description: "Every provider is verified on-chain with transparent hardware specs and performance metrics"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "High-Performance Hardware",
      description: "RTX 5090 GPUs, 7950X CPUs, 64GB DDR5, 2TB NVMe—verified compute for serious workloads"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Flexible Pricing",
      description: "Daily, weekly, or monthly rates starting at $12/day. Pay in USDC with transparent broker fees"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Specialized Workloads",
      description: "Optimized for LLM training, fine-tuning, and medical imaging (Monai.io integration)"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Providers List Resources",
      description: "Hardware specs verified and published to the marketplace with transparent availability"
    },
    {
      number: "02",
      title: "Buyers Browse & Select",
      description: "Self-serve platform to find compute matching your workload requirements"
    },
    {
      number: "03",
      title: "Secure USDC Payments",
      description: "Trustless transactions with smart contract escrow and broker commission model"
    }
  ];

  const testimonials = [
    {
      quote: "Microscalers made it easy to monetize my GPU rigs while the market was slow. Trust layer is solid.",
      author: "GPU Provider",
      role: "60x RTX 5090 Fleet"
    },
    {
      quote: "Found verified compute for our Monai.io training in minutes. No BS, just hardware specs and uptime.",
      author: "ML Engineer",
      role: "Medical Imaging Startup"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-gray-900/0"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
              <Server className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Trusted Compute Brokerage</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-clip-text text-transparent">
                Microscalers
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
              Powering AI Innovation with Trusted Compute
            </p>
            
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Connect with verified providers of high-performance GPU compute for AI, ML, and beyond
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => setShowProviderModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2 group"
              >
                Join as a Provider
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={() => setShowBuyerModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-semibold text-lg transition-colors"
              >
                Find Compute Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GPU Visual Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GPUClusterVisual />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Microscalers?</h2>
            <p className="text-xl text-gray-400">Industrial-grade infrastructure meets Web3 trust</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                {...fadeIn}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-blue-500/50 transition-colors group"
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


{/* Use Cases Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Production Workloads</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Enterprise AI Workloads</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From medical imaging to LLM training, Microscalers powers the most demanding AI compute workloads
            </p>
          </motion.div>

          <div className="mb-16">
            <MonaiMRIVisual />
          </div>

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
                Train large language models from scratch or fine-tune existing models on custom datasets
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
                Train object detection, segmentation, and classification models on large-scale datasets
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
                Run simulations, molecular dynamics, and other HPC workloads on verified infrastructure
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

          <motion.div {...fadeIn} className="mt-12 text-center">
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

{/* About Us Section */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">The Guild</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Why Microscalers?</h2>
            <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">
              Powering AI with Truth and Trust
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Content */}
            <motion.div {...fadeIn} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  The Need
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  The AI revolution demands unprecedented compute power, but access to reliable, scalable GPU resources remains a bottleneck. From medical imaging with Monai.io to large language model training, innovators need flexible, high-performance compute without complexity. Microscalers meets this massive market need by connecting verified providers with buyers, delivering industrial-grade solutions for AI workloads.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-400" />
                  Our Mission
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Microscalers is more than a compute brokerage—it's a <span className="text-cyan-400 font-semibold">community built on truth</span>. We empower providers (scalers) to monetize their high-end hardware (e.g., RTX 5090 GPUs, 7950X CPUs, 64GB DDR5 RAM) and enable buyers to access trusted compute for their AI projects, all through a transparent, self-serve platform.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-400" />
                  Humanized Approach
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Our <span className="text-blue-400 font-semibold">scalers</span>—passionate providers with cutting-edge rigs—and our <span className="text-green-400 font-semibold">brokers</span>, who facilitate seamless transactions, are the heart of Microscalers. We take a humanized approach, fostering collaboration and trust. Every scaler is vetted for quality and reliability, ensuring your workloads run on hardware you can depend on.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  Chainlink Verification
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Trust is non-negotiable. Using <span className="text-cyan-400 font-semibold">Chainlink's</span> decentralized oracle network, we verify scaler hardware specs and transaction integrity, ensuring secure, transparent payments via USDC. Our blockchain-based approach guarantees that every rig meets our terminal-grade standards.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-xl">
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  Culture of Truth
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  At Microscalers, <span className="text-blue-400 font-bold">truth is our foundation</span>. We're committed to transparency in pricing (starting at $12/day), provider vetting, and performance metrics. Our community thrives on open communication, with scalers and brokers collaborating via our Discord server and X platform to drive AI innovation forward.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProviderModal(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Join as a Scaler
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://discord.gg/your-invite', '_blank')}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Meet Our Community
                </motion.button>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              <CommunityNetworkVisual />
            </motion.div>
          </div>
        </div>
      </section>

{/* MicroScalers Guild Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Dramatic background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div {...fadeIn} className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex flex-col items-center gap-4 mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-5xl font-bold mb-2">MicroScalers Guild</h2>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
                  Our Members
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-8 text-xl mb-6"
            >
              <span className="text-blue-400 font-bold">Compute</span>
              <span className="text-gray-600">•</span>
              <span className="text-cyan-400 font-bold">Adoption</span>
              <span className="text-gray-600">•</span>
              <span className="text-green-400 font-bold">Truth</span>
            </motion.div>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join a community of innovators, scalers, and builders who believe in transparent compute access, 
              verified hardware, and the power of decentralized trust. The Guild is where AI compute meets human collaboration.
            </p>
          </motion.div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              {...fadeIn}
              className="relative p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-2 border-blue-500/30 rounded-xl"
            >
              <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Compute</h3>
              <p className="text-gray-400 leading-relaxed">
                Access to terminal-grade GPU infrastructure. 60+ RTX 5090s ready to power your AI workloads. 
                No gatekeepers, no complexity—just verified hardware at transparent pricing.
              </p>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.1 }}
              className="relative p-8 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-2 border-cyan-500/30 rounded-xl"
            >
              <div className="absolute top-4 right-4 w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Adoption</h3>
              <p className="text-gray-400 leading-relaxed">
                Democratizing AI compute for everyone—from medical imaging with Monai.io to LLM training. 
                We're building the infrastructure for the next wave of AI innovation.
              </p>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="relative p-8 bg-gradient-to-br from-green-500/10 to-green-600/10 border-2 border-green-500/30 rounded-xl"
            >
              <div className="absolute top-4 right-4 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">Truth</h3>
              <p className="text-gray-400 leading-relaxed">
                Chainlink-verified hardware specs. On-chain transaction integrity. 
                Transparent pricing. Truth is our foundation, trust is our currency.
              </p>
            </motion.div>
          </div>

          {/* Become a Member */}
          <motion.div {...fadeIn} className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Become a Guild Member</h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                $29 one-time fee unlocks lifetime access to the heart of Microscalers
              </p>
            </div>

            <MembershipCardVisual />
          </motion.div>

          {/* Enhanced Membership Perks */}
          <motion.div {...fadeIn} className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">Guild Membership Benefits</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Cpu className="w-6 h-6" />,
                  title: "48-Hour RTX 5090 Lease",
                  description: "Test your AI workloads on real hardware before committing to long-term compute. Perfect for proof-of-concept and benchmarking.",
                  color: "blue"
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "john.microscaler.eth Subdomain",
                  description: "Your verified identity on the blockchain. Use it for payments, reputation, and as your digital badge in the compute economy.",
                  color: "cyan"
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: "Guild NFT Badge",
                  description: "Exclusive on-chain badge proving your Guild membership. Future utility for governance, priority access, and special events.",
                  color: "purple"
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Private Discord Access",
                  description: "Join exclusive channels with scalers, brokers, and AI innovators. Get direct support, share insights, and collaborate on projects.",
                  color: "green"
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Priority Compute Access",
                  description: "Members get first access to new GPU clusters and premium hardware. Skip the queue when demand is high.",
                  color: "yellow"
                },
                {
                  icon: <DollarSign className="w-6 h-6" />,
                  title: "Member Pricing",
                  description: "10% discount on all compute purchases. Exclusive access to member-only deals and bulk pricing tiers.",
                  color: "blue"
                }
              ].map((perk, i) => (
                <motion.div
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 bg-gradient-to-br ${
                    perk.color === 'blue' ? 'from-blue-500/10 to-blue-600/10 border-blue-500/30' :
                    perk.color === 'cyan' ? 'from-cyan-500/10 to-cyan-600/10 border-cyan-500/30' :
                    perk.color === 'purple' ? 'from-purple-500/10 to-purple-600/10 border-purple-500/30' :
                    perk.color === 'green' ? 'from-green-500/10 to-green-600/10 border-green-500/30' :
                    perk.color === 'yellow' ? 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/30' :
                    'from-gray-500/10 to-gray-600/10 border-gray-500/30'
                  } border rounded-xl hover:scale-105 transition-transform`}
                >
                  <div className={`${
                    perk.color === 'blue' ? 'text-blue-400' :
                    perk.color === 'cyan' ? 'text-cyan-400' :
                    perk.color === 'purple' ? 'text-purple-400' :
                    perk.color === 'green' ? 'text-green-400' :
                    perk.color === 'yellow' ? 'text-yellow-400' :
                    'text-gray-400'
                  } mb-4`}>
                    {perk.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{perk.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{perk.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeIn} className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProviderModal(true)}
              className="px-12 py-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:via-cyan-500 hover:to-blue-500 rounded-xl font-bold text-xl transition-all flex items-center justify-center gap-3 mx-auto shadow-2xl shadow-blue-500/50"
            >
              <Shield className="w-6 h-6" />
              Join the Guild for $29
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">Lifetime access • No recurring fees • Join 265+ members</p>
          </motion.div>
        </div>
      </section>

      {/* How It Works with Server Rig Visual */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Three steps to verified compute</p>
          </motion.div>

          {/* Server Rig Visual */}
          <div className="mb-16">
            <ServerRigVisual />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                {...fadeIn}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative"
              >
                <div className="p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-xl">
                  <div className="text-6xl font-bold text-blue-500/20 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Blockchain Visual */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blockchain Trust Visual */}
          <div className="max-w-3xl mx-auto mb-16">
            <BlockchainTrustVisual />
          </div>

          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by the Community</h2>
            <div className="flex items-center justify-center gap-6 text-gray-400 mt-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="font-medium">Blockchain Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Powered by Cloudflare</span>
              </div>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                {...fadeIn}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-8 bg-gray-800/50 border border-gray-700/50 rounded-xl"
              >
                <p className="text-lg text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Microscalers</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Trusted compute brokerage for AI workloads. Built on transparency, powered by Web3.
              </p>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Users className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Find Compute</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Become a Provider</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 Microscalers. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Secured by</span>
                <span className="text-blue-400 font-semibold">Cloudflare</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Provider Modal */}
      <AnimatePresence>
        {showProviderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowProviderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Join as a Provider</h2>
                <button
                  onClick={() => setShowProviderModal(false)}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Discord Username</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="username#0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Wallet Address</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="0x..."
                    />
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-xl font-semibold mb-4">Hardware Specs</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">GPU Model</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="RTX 5090"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">GPU Count</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">CPU Model</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Ryzen 9 7950X"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">RAM Size</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="64GB DDR5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Storage</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="2TB NVMe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Pricing ($/day)</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="$12"
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg transition-colors"
                >
                  Submit Application
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buyer Modal */}
      <AnimatePresence>
        {showBuyerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBuyerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Find Compute</h2>
                <button
                  onClick={() => setShowBuyerModal(false)}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Discord Username</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="username#0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Wallet Address (Optional)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="0x..."
                    />
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-xl font-semibold mb-4">Compute Requirements</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Workload Type</label>
                      <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors">
                        <option>LLM Training</option>
                        <option>LLM Fine-tuning</option>
                        <option>Medical Imaging (Monai.io)</option>
                        <option>Computer Vision</option>
                        <option>Other AI/ML</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">GPU Requirements</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="e.g., 4x RTX 5090 or equivalent"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder="e.g., 7 days, 1 month"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Budget ($/day)</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder="e.g., $50-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Additional Details</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        placeholder="Tell us more about your project and requirements..."
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg transition-colors"
                >
                  Submit Request
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MicroscalersLanding;
