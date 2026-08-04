import { motion } from 'framer-motion';
import { FaUsers, FaProjectDiagram, FaCode, FaTrophy, FaClock, FaGlobe } from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';

function AboutStats() {
  const stats = [
    { icon: <FaUsers />, number: "4000+", label: "Students", color: "text-green-400" },
    { icon: <GiBoxingGlove />, number: "100+", label: "MMA Fighters", color: "text-red-400" },
    { icon: <FaProjectDiagram />, number: "12000+", label: "Projects Built", color: "text-purple-400" },
    { icon: <FaTrophy />, number: "98%", label: "Success Rate", color: "text-yellow-400" },
    { icon: <FaCode />, number: "50+", label: "Courses", color: "text-cyan-400" },
    { icon: <FaClock />, number: "24/7", label: "Community Support", color: "text-orange-400" },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 text-xs font-medium tracking-wider uppercase">By The Numbers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            GOA Academy in <span className="text-green-500">Numbers</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4 sm:p-5 text-center hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`text-2xl sm:text-3xl ${stat.color} flex justify-center mb-2`}>
                {stat.icon}
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{stat.number}</p>
              <p className="text-gray-400 text-[10px] sm:text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutStats;