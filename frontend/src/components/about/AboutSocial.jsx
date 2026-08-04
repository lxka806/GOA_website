import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaYoutube, FaDiscord, FaInstagram, FaLinkedin, FaFacebook, FaTiktok } from 'react-icons/fa';

function AboutSocial() {
  const socialLinks = [
    { icon: <FaYoutube />, name: "YouTube", url: "https://www.youtube.com/@Goal_Oriented_Academy__GOA", color: "hover:text-red-500" },
    { icon: <FaTiktok />, name: "TikTok", url: "https://www.tiktok.com/@goal_oriented_academy", color: "hover:text-pink-500" },
    { icon: <FaFacebook />, name: "Facebook", url: "https://www.facebook.com/nika11keshelava", color: "hover:text-blue-500" },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 text-xs font-medium tracking-wider uppercase">Connect With Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Follow <span className="text-green-500">GOA Academy</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            Stay connected and join the conversation on our social platforms.
          </p>
        </div>

        {/* Social Grid */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`
                group flex items-center gap-2 sm:gap-3 
                bg-white/[0.04] border border-white/10 
                px-4 sm:px-6 py-3 sm:py-4 rounded-xl
                hover:bg-white/[0.08] hover:border-white/20
                transition-all duration-300 hover:-translate-y-1
                hover:shadow-lg hover:shadow-green-500/5
              `}
            >
              <span className={`text-xl sm:text-2xl text-gray-400 group-hover:text-white transition-colors ${social.color}`}>
                {social.icon}
              </span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                {social.name}
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutSocial;