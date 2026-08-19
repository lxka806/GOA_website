import TypingText from "../components/TypingText";
import HomeCards from "../components/HomeCards";
import { FaUsers } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { GiBoxingGlove } from "react-icons/gi";
import { motion } from "framer-motion";
import image from "../assets/mainpageimage.png";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="min-h-screen relative flex items-center px-3 sm:px-6 lg:px-20 overflow-hidden">
            
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={image}
                    alt="GOA Academy - Learn Programming and MMA"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto lg:mx-0 w-full py-12 sm:py-16 lg:py-0">
                
                {/* Typing Text */}
                <motion.div 
                    className="mb-3 sm:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <TypingText />
                </motion.div>

                {/* Main Heading */}
                <motion.h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <span className="text-green-400">Learn.</span>
                    Build.
                    <span className="text-green-400">Grow.</span>
                    <br />
                    <span className="text-white/90">Succeed Together.</span>
                </motion.h1>

                {/* Description */}
                <motion.p 
                    className="mt-3 sm:mt-4 md:mt-6 text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    GOA Academy is more than a programming school.
                    It's a family, a community, a lifestyle.
                    <span className="block mt-1 text-red-400 font-medium">
                        Now with MMA training
                    </span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div 
                    className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Link to="/signup">
                        <button className="
                            group inline-flex items-center justify-center gap-2
                            bg-green-600 px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 
                            rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold
                            hover:bg-green-700 hover:shadow-2xl hover:shadow-green-500/30
                            transition-all duration-300 hover:scale-105
                        ">
                            Start Learning
                            <HiOutlineArrowNarrowRight className="
                                text-base sm:text-lg group-hover:translate-x-1 
                                transition-transform duration-300
                            " />
                        </button>
                    </Link>

                    <Link to="/courses">
                        <button className="
                            group inline-flex items-center justify-center gap-2
                            bg-red-600 px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 
                            rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold
                            hover:bg-red-700 hover:shadow-2xl hover:shadow-red-500/30
                            transition-all duration-300 hover:scale-105
                        ">
                            MMA Classes
                            <HiOutlineArrowNarrowRight className="
                                text-base sm:text-lg group-hover:translate-x-1 
                                transition-transform duration-300
                            " />
                        </button>
                    </Link>

                    <Link to="/courses">
                        <button className="
                            group inline-flex items-center justify-center gap-2
                            border-2 border-green-500/50 px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 
                            rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold
                            hover:bg-green-600 hover:border-green-600 hover:shadow-2xl hover:shadow-green-500/20
                            transition-all duration-300 hover:scale-105
                        ">
                            Explore Courses
                            <HiOutlineArrowNarrowRight className="
                                text-base sm:text-lg opacity-0 -translate-x-2
                                group-hover:opacity-100 group-hover:translate-x-0
                                transition-all duration-300
                            " />
                        </button>
                    </Link>
                </motion.div>

                {/* Trust Badges */}
                <motion.div 
                    className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 sm:mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="
                                    w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-black 
                                    bg-gradient-to-br from-green-400 to-green-600 
                                    flex items-center justify-center text-[10px] sm:text-xs font-bold text-white
                                ">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm">
                            <span className="text-green-400 font-semibold">500+</span> students enrolled
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                        <GiBoxingGlove className="text-red-400 text-base sm:text-lg" />
                        <span><span className="text-red-400 font-semibold">100+</span> MMA athletes</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                        <span className="text-yellow-400 text-base sm:text-lg">★</span>
                        <span><span className="text-yellow-400 font-semibold">4.9</span> / 5 rating</span>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 mt-8 sm:mt-10 lg:mt-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <HomeCards 
                        icon={<FaUsers className="text-green-400 text-lg sm:text-xl" />} 
                        number="4000+" 
                        name="Students" 
                        delay={0}
                    />

                    <HomeCards 
                        icon={<GiBoxingGlove className="text-red-400 text-lg sm:text-xl" />} 
                        number="100+" 
                        name="MMA Fighters" 
                        delay={0.05}
                    />
                    
                    <HomeCards 
                        icon={<GrProjects className="text-purple-400 text-lg sm:text-xl" />} 
                        number="12000+" 
                        name="Projects" 
                        delay={0.1}
                    />

                    <HomeCards 
                        icon={<IoCheckmarkCircleSharp className="text-yellow-400 text-lg sm:text-xl" />} 
                        number="98%" 
                        name="Success Rate" 
                        delay={0.15}
                    />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div 
                    className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0 hidden sm:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <div className="flex flex-col items-center gap-1 sm:gap-2 text-gray-500 text-[10px] sm:text-xs animate-bounce">
                        <span>Scroll</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

export default Home;