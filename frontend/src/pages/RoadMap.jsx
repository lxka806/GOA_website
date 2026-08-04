import {
    FaHtml5,
    FaJs,
    FaReact,
    FaNodeJs,
    FaPython,
    FaDatabase,
    FaRocket,
    FaCheckCircle,
    FaArrowRight
} from "react-icons/fa";
import { useState } from "react";

import RoadMapCard from "../components/RoadMapCard";

function RoadMap() {
    const [activeStep, setActiveStep] = useState(null);

    const roadmap = [
        {
            icon: <FaHtml5 />,
            title: "HTML & CSS",
            description: "Build beautiful and responsive websites.",
            color: "from-orange-500/20 to-orange-500/5",
            iconColor: "text-orange-400",
            borderColor: "hover:border-orange-500/30",
            bgColor: "bg-orange-500/10",
            details: "Learn semantic HTML, CSS Flexbox, Grid, animations, and responsive design principles."
        },
        {
            icon: <FaJs />,
            title: "JavaScript",
            description: "Master programming fundamentals.",
            color: "from-yellow-500/20 to-yellow-500/5",
            iconColor: "text-yellow-400",
            borderColor: "hover:border-yellow-500/30",
            bgColor: "bg-yellow-500/10",
            details: "Master ES6+, DOM manipulation, asynchronous programming, and modern JavaScript patterns."
        },
        {
            icon: <FaReact />,
            title: "React",
            description: "Create modern web applications.",
            color: "from-cyan-500/20 to-cyan-500/5",
            iconColor: "text-cyan-400",
            borderColor: "hover:border-cyan-500/30",
            bgColor: "bg-cyan-500/10",
            details: "Build components, manage state with hooks, routing, and modern React patterns."
        },
        {
            icon: <FaNodeJs />,
            title: "Node.js",
            description: "Develop powerful backend APIs.",
            color: "from-green-500/20 to-green-500/5",
            iconColor: "text-green-400",
            borderColor: "hover:border-green-500/30",
            bgColor: "bg-green-500/10",
            details: "Build RESTful APIs, authentication, middleware, and server-side applications."
        },
        {
            icon: <FaDatabase />,
            title: "MongoDB",
            description: "Store and manage application data.",
            color: "from-emerald-500/20 to-emerald-500/5",
            iconColor: "text-emerald-400",
            borderColor: "hover:border-emerald-500/30",
            bgColor: "bg-emerald-500/10",
            details: "Learn NoSQL databases, CRUD operations, aggregation, and data modeling."
        },
        {
            icon: <FaPython />,
            title: "Python",
            description: "Learn automation and AI.",
            color: "from-blue-500/20 to-blue-500/5",
            iconColor: "text-blue-400",
            borderColor: "hover:border-blue-500/30",
            bgColor: "bg-blue-500/10",
            details: "Automation scripts, data analysis, AI fundamentals, and machine learning basics."
        },
        {
            icon: <FaRocket />,
            title: "Real Projects",
            description: "Build portfolio-ready applications.",
            color: "from-purple-500/20 to-purple-500/5",
            iconColor: "text-purple-400",
            borderColor: "hover:border-purple-500/30",
            bgColor: "bg-purple-500/10",
            details: "Build and deploy full-stack applications, create a professional portfolio."
        }
    ];

    return (
        <section className="min-h-screen bg-[#050505] text-white px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-4 sm:mb-6">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-400 text-xs sm:text-sm font-medium">Learning Path</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                        GOA <span className="text-green-500">RoadMap</span>
                    </h1>

                    <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-green-500 to-transparent mx-auto mt-4 sm:mt-6 rounded-full"></div>

                    <p className="text-gray-400 text-sm sm:text-base lg:text-lg mt-4 max-w-2xl mx-auto">
                        Follow the complete learning journey from beginner to professional developer.
                    </p>
                </div>


                {/* Roadmap Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[18px] sm:left-[22px] lg:left-6 top-0 w-0.5 h-full bg-gradient-to-b from-green-500 via-green-500/50 to-transparent"></div>

                    <div className="space-y-6 sm:space-y-8">
                        {roadmap.map((item, index) => (
                            <div 
                                key={index}
                                className="relative pl-12 sm:pl-14 lg:pl-16"
                            >
                                {/* Step Circle */}
                                <div className={`
                                    absolute left-0 top-0
                                    w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12
                                    rounded-full flex items-center justify-center
                                    text-sm sm:text-base font-bold
                                    border-2
                                    transition-all duration-300
                                    ${activeStep === index || activeStep === null
                                        ? 'bg-green-600 border-green-400 text-white shadow-lg shadow-green-500/30'
                                        : 'bg-white/5 border-white/20 text-gray-400'
                                    }
                                    ${activeStep === index ? 'scale-110' : 'hover:scale-105'}
                                    cursor-pointer
                                `}
                                    onClick={() => setActiveStep(activeStep === index ? null : index)}
                                >
                                    {activeStep === index ? (
                                        <FaCheckCircle className="text-white" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>

                                {/* Card */}
                                <div className={`
                                    group bg-white/[0.04] backdrop-blur-lg 
                                    border border-white/10 ${item.borderColor}
                                    rounded-xl sm:rounded-2xl 
                                    p-4 sm:p-5 lg:p-6
                                    hover:bg-white/[0.06] hover:border-white/20
                                    transition-all duration-300
                                    hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/5
                                    cursor-pointer
                                `}
                                    onClick={() => setActiveStep(activeStep === index ? null : index)}
                                >
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        {/* Icon */}
                                        <div className={`
                                            flex-shrink-0
                                            w-10 h-10 sm:w-12 sm:h-12
                                            ${item.bgColor}
                                            rounded-xl
                                            flex items-center justify-center
                                            text-xl sm:text-2xl ${item.iconColor}
                                            group-hover:scale-110 transition-transform duration-300
                                        `}>
                                            {item.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                                <h2 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight">
                                                    {item.title}
                                                </h2>
                                                {activeStep === index && (
                                                    <span className="text-[10px] text-green-400 bg-green-600/20 px-2 py-0.5 rounded-full border border-green-500/30">
                                                        Current
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                                                {item.description}
                                            </p>

                                            {/* Expanded Details */}
                                            {activeStep === index && (
                                                <div className="mt-3 pt-3 border-t border-white/10 animate-fadeIn">
                                                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                                                        {item.details}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-[10px] text-green-400">Ready to start</span>
                                                        <FaArrowRight className="text-[10px] text-green-400" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Step Indicator */}
                                        <div className="hidden sm:flex flex-shrink-0 items-center gap-1.5 text-[10px] text-gray-500">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
                                            <span>Step {index + 1}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="mt-6 text-center text-gray-500 text-[10px] sm:text-xs">
                    {roadmap.length} steps to become a professional developer
                </div>

            </div>
        </section>
    );
}

export default RoadMap;