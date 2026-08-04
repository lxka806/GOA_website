import TypingText from "../components/TypingText";
import HomeCards from "../components/HomeCards";
import { FaUsers } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { GiBoxingGlove, GiFist } from "react-icons/gi";
import image from "../assets/mainpageimage.png";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="min-h-screen relative flex items-center px-3 sm:px-6 lg:px-20 overflow-hidden">
            
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={image}
                    alt="GOA Academy - Learn Programming & MMA"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto lg:mx-0 w-full py-12 sm:py-16 lg:py-0">
                
                {/* Typing Text */}
                <div className="mb-3 sm:mb-4">
                    <TypingText />
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                    <span className="text-green-400">Learn.</span>
                    Build.
                    <span className="text-green-400">Grow.</span>
                    <br />
                    <span className="text-white/90">Succeed Together.</span>
                </h1>

                {/* Description */}
                <p className="mt-3 sm:mt-4 md:mt-6 text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
                    GOA Academy is more than a programming school.
                    It's a family, a community, a lifestyle.
                    <span className="block mt-1 text-red-400 font-medium">
                        Now with MMA training!
                    </span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10">
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

                    <Link to="/courses" className="group">
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

                    <Link to="/courses" className="group">
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
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
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
                        <span><span className="text-red-400 font-semibold">100+</span> MMA athletes</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                        <span><span className="text-yellow-400 font-semibold">4.9</span> / 5 rating</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 mt-8 sm:mt-10 lg:mt-12">
                    <HomeCards 
                        icon={<FaUsers className="text-green-400 text-lg sm:text-xl" />} 
                        number="4000+" 
                        name="Students" 
                    />

                    <HomeCards 
                        icon={<GiBoxingGlove className="text-red-400 text-lg sm:text-xl" />} 
                        number="100+" 
                        name="MMA Fighters" 
                    />
                    
                    <HomeCards 
                        icon={<GrProjects className="text-purple-400 text-lg sm:text-xl" />} 
                        number="12000+" 
                        name="Projects" 
                    />

                    <HomeCards 
                        icon={<IoCheckmarkCircleSharp className="text-yellow-400 text-lg sm:text-xl" />} 
                        number="98%" 
                        name="Success Rate" 
                    />
                </div>

            </div>
        </section>
    );
}

export default Home;