import { motion } from 'framer-motion';
import { FaBullseye, FaHeart, FaLightbulb, FaHandshake } from 'react-icons/fa';

function AboutMission() {
  const values = [
    {
      icon: <FaBullseye />,
      title: "Mission",
      description: "Empower developers with real-world skills and a supportive community."
    },
    {
      icon: <FaHeart />,
      title: "Values",
      description: "Collaboration, growth, and continuous learning for everyone."
    },
    {
      icon: <FaLightbulb />,
      title: "Vision",
      description: "Build the next generation of developers and tech leaders."
    },
    {
      icon: <FaHandshake />,
      title: "Community",
      description: "A family of builders supporting each other's journey."
    }
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 text-xs font-medium tracking-wider uppercase">Our Mission</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Building the Future of <span className="text-green-500">Tech Education</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            We believe in creating an environment where everyone can learn, grow, and succeed together.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/5"
            >
              <div className="text-3xl text-green-400 mb-3 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutMission;