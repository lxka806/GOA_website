import { FaCode, FaPython, FaReact, FaNodeJs, FaFistRaised } from "react-icons/fa";
import { SiMongodb, SiJavascript } from "react-icons/si";
import { GiBoxingGlove, GiFist,  } from "react-icons/gi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useState } from "react";

function Courses() {
    const [filter, setFilter] = useState("all");
    
    const courses = [
        // Programming Courses
        {
            icon: <SiJavascript />,
            title: "JavaScript",
            description: "Learn modern JavaScript from fundamentals to advanced concepts.",
            level: "Beginner",
            category: "programming",
            color: "from-yellow-500/20 to-yellow-500/5",
            iconColor: "text-yellow-400",
            borderColor: "hover:border-yellow-500/30",
            badgeColor: "bg-yellow-500/20 text-yellow-400",
        },
        {
            icon: <FaReact />,
            title: "React",
            description: "Build beautiful and interactive web applications using React.",
            level: "Intermediate",
            category: "programming",
            color: "from-cyan-500/20 to-cyan-500/5",
            iconColor: "text-cyan-400",
            borderColor: "hover:border-cyan-500/30",
            badgeColor: "bg-cyan-500/20 text-cyan-400",
        },
        {
            icon: <FaNodeJs />,
            title: "Node.js",
            description: "Create powerful backend APIs and full-stack applications.",
            level: "Intermediate",
            category: "programming",
            color: "from-green-500/20 to-green-500/5",
            iconColor: "text-green-400",
            borderColor: "hover:border-green-500/30",
            badgeColor: "bg-green-500/20 text-green-400",
        },
        {
            icon: <SiMongodb />,
            title: "MongoDB",
            description: "Store and manage data efficiently with MongoDB.",
            level: "Intermediate",
            category: "programming",
            color: "from-emerald-500/20 to-emerald-500/5",
            iconColor: "text-emerald-400",
            borderColor: "hover:border-emerald-500/30",
            badgeColor: "bg-emerald-500/20 text-emerald-400",
        },
        {
            icon: <FaPython />,
            title: "Python",
            description: "Master Python for automation, AI, and backend development.",
            level: "Beginner",
            category: "programming",
            color: "from-blue-500/20 to-blue-500/5",
            iconColor: "text-blue-400",
            borderColor: "hover:border-blue-500/30",
            badgeColor: "bg-blue-500/20 text-blue-400",
        },
        {
            icon: <FaCode />,
            title: "Full Stack",
            description: "Combine frontend and backend to become a professional developer.",
            level: "Advanced",
            category: "programming",
            color: "from-purple-500/20 to-purple-500/5",
            iconColor: "text-purple-400",
            borderColor: "hover:border-purple-500/30",
            badgeColor: "bg-purple-500/20 text-purple-400",
        },
        // MMA Classes - IN RED
        {
            icon: <GiBoxingGlove />,
            title: "Boxing",
            description: "Master the art of boxing with professional coaches. Improve your striking, footwork, and defensive techniques.",
            level: "All Levels",
            category: "mma",
            color: "from-red-600/30 to-red-600/10",
            iconColor: "text-red-500",
            borderColor: "hover:border-red-500/50",
            badgeColor: "bg-red-600/30 text-red-400",
        },
        {
            icon: <GiFist />,
            title: "Muay Thai",
            description: "Learn the ancient art of Muay Thai - the science of 8 limbs. Develop powerful kicks, knees, elbows, and clinch work.",
            level: "All Levels",
            category: "mma",
            color: "from-red-600/30 to-red-600/10",
            iconColor: "text-red-500",
            borderColor: "hover:border-red-500/50",
            badgeColor: "bg-red-600/30 text-red-400",
        },
        {
            icon: <FaFistRaised />,
            title: "MMA",
            description: "Complete Mixed Martial Arts training combining striking, grappling, and submission techniques for self-defense and competition.",
            level: "Advanced",
            category: "mma",
            color: "from-red-600/30 to-red-600/10",
            iconColor: "text-red-500",
            borderColor: "hover:border-red-500/50",
            badgeColor: "bg-red-600/30 text-red-400",
        },
        {
            icon: <FaFistRaised />,
            title: "BJJ",
            description: "Brazilian Jiu-Jitsu - the gentle art. Learn ground fighting, submissions, and positional control from experienced black belts.",
            level: "Intermediate",
            category: "mma",
            color: "from-red-600/30 to-red-600/10",
            iconColor: "text-red-500",
            borderColor: "hover:border-red-500/50",
            badgeColor: "bg-red-600/30 text-red-400",
        },
    ];

    // Filter courses by level
    const filteredCourses = filter === "all" 
        ? courses 
        : filter === "programming" 
        ? courses.filter(c => c.category === "programming")
        : courses.filter(c => c.category === "mma");

    // Get unique levels for filter
    const categories = ["all", "programming", "mma"];

    // Helper to get level badge color
    const getLevelColor = (level) => {
        if (level === "All Levels") return "bg-red-500/20 text-red-400 border-red-500/30";
        switch(level) {
            case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
            case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "Advanced": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
            default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    // Get level dot color
    const getLevelDot = (level) => {
        if (level === "All Levels") return "bg-red-400";
        switch(level) {
            case "Beginner": return "bg-green-400";
            case "Intermediate": return "bg-yellow-400";
            case "Advanced": return "bg-purple-400";
            default: return "bg-gray-400";
        }
    };

    return (
        <section className="min-h-screen bg-[#050505] text-white px-3 sm:px-6 lg:px-20 py-12 sm:py-16 lg:py-24">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-400 text-xs sm:text-sm font-medium">Our Programs</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                    Explore Our <span className="text-green-500">Courses</span>
                </h1>

                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-green-500 to-transparent mx-auto mt-4 sm:mt-6 rounded-full"></div>

                <p className="mt-4 sm:mt-6 text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                    Learn modern technologies from experienced mentors, build real-world projects, 
                    and become a professional developer. Plus, train like a warrior with our MMA classes! 💪
                </p>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-12 mt-8 sm:mt-10 lg:mt-12">
                <div className="text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-500">{courses.length}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">Total Courses</p>
                </div>
                <div className="text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-500">
                        {courses.filter(c => c.category === "programming").length}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">Programming</p>
                </div>
                <div className="text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500">
                        {courses.filter(c => c.category === "mma").length}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">MMA Classes</p>
                </div>
                <div className="text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-500">100%</p>
                    <p className="text-gray-500 text-xs sm:text-sm">Online Learning</p>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`
                            px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                            ${filter === cat 
                                ? cat === 'mma' 
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                                    : 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                            }
                        `}
                    >
                        {cat === "all" ? "All Courses" : cat === "programming" ? " Programming" : "MMA"}
                    </button>
                ))}
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12">
                
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                        <div
                            key={index}
                            className={`
                                group relative bg-white/[0.03] backdrop-blur-lg 
                                border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 
                                ${course.borderColor}
                                hover:bg-white/[0.06]
                                transition-all duration-300 hover:-translate-y-2
                                hover:shadow-2xl ${course.category === 'mma' ? 'hover:shadow-red-500/10' : 'hover:shadow-green-500/5'}
                                overflow-hidden
                            `}
                        >
                            {/* Category Badge */}
                            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                                <span className={`
                                    text-[8px] sm:text-[10px] font-bold uppercase tracking-wider
                                    px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full
                                    ${course.category === 'mma' 
                                        ? 'bg-red-600/30 text-red-400 border border-red-500/30' 
                                        : 'bg-green-600/20 text-green-400 border border-green-500/30'
                                    }
                                `}>
                                    {course.category === 'mma' ? '🥊 MMA' : '💻 Code'}
                                </span>
                            </div>

                            {/* Gradient Background */}
                            <div className={`
                                absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 
                                bg-gradient-to-br ${course.color} 
                                rounded-full blur-2xl opacity-0 group-hover:opacity-100 
                                transition-opacity duration-500
                            `}></div>

                            {/* Icon */}
                            <div className={`
                                relative z-10 w-14 h-14 sm:w-16 sm:h-16 
                                bg-gradient-to-br ${course.color} 
                                rounded-xl sm:rounded-2xl flex items-center justify-center
                                text-2xl sm:text-3xl ${course.iconColor}
                                group-hover:scale-110 transition-transform duration-300
                            `}>
                                {course.icon}
                            </div>

                            {/* Content */}
                            <div className="relative z-10 mt-4 sm:mt-6">
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                                    {course.title}
                                </h2>

                                <p className="text-gray-400 mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base leading-relaxed">
                                    {course.description}
                                </p>

                                <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                                    {/* Level Badge */}
                                    <span className={`
                                        inline-flex items-center gap-1 sm:gap-1.5
                                        px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium
                                        border ${getLevelColor(course.level)}
                                    `}>
                                        <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${getLevelDot(course.level)}`}></span>
                                        {course.level}
                                    </span>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-400">No courses found for this category.</p>
                    </div>
                )}

            </div>

            {/* Footer CTA - Red for MMA */}
            <div className="text-center mt-12 sm:mt-16 lg:mt-20">
                <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 w-full sm:w-auto">
                    <span className="text-gray-400 text-sm sm:text-base flex items-center gap-2">
                        Ready to start your journey?
                        <span className="text-red-500 font-bold hidden xs:inline">MMA</span>
                        <span className="text-green-500 font-bold hidden xs:inline">+</span>
                        <span className="text-green-500 font-bold hidden xs:inline">Code</span>
                    </span>
                </div>
            </div>

        </section>
    );
}

export default Courses;