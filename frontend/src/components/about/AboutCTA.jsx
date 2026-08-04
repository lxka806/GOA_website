import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function AboutCTA() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-[#050505]">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 p-6 sm:p-10 lg:p-14 shadow-2xl shadow-green-500/5 backdrop-blur-xl">
          
          {/* Animated Border */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 animate-pulse"></div>
          </div>

          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 mb-4">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-400 text-xs font-medium tracking-wider uppercase">Join Us</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Ready to Become a GOA Student?
              </h2>
              <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg">
                Join a community of builders, creators, and future developers. Start your journey today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link to="/signup">
                <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-500 px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-[1.02]">
                  Start Learning
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
              <Link to="/courses">
                <button className="group inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 sm:px-8 py-3 sm:py-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/40 transition-all duration-300">
                  Explore Courses
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Bottom Decorative Line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;