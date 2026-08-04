import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaRocket } from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';

function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-400 text-xs font-medium tracking-wider uppercase">About GOA Academy</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
              Where Code Meets
              <span className="block text-green-500">Community</span>
            </h1>
            
            <p className="mt-4 sm:mt-6 text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
              GOA Academy is more than a programming school. It's a family, a community, 
              and a lifestyle where developers of all levels come together to learn, build, and grow.
            </p>

            <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaCode className="text-green-400" />
                <span>Learn to Code</span>
              </div>
              <span className="text-gray-600">|</span>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaUsers className="text-green-400" />
                <span>Join Community</span>
              </div>
              <span className="text-gray-600">|</span>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <GiBoxingGlove className="text-red-400" />
                <span>Train MMA</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-green-400">4000+</p>
              <p className="text-gray-400 text-sm mt-1">Students</p>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-red-400">100+</p>
              <p className="text-gray-400 text-sm mt-1">MMA Athletes</p>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-purple-400">12000+</p>
              <p className="text-gray-400 text-sm mt-1">Projects</p>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-yellow-400">98%</p>
              <p className="text-gray-400 text-sm mt-1">Success Rate</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default AboutHero;