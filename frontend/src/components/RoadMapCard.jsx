function RoadMapCard({ icon, step, title, description }) {
    return (
        <div className="relative flex gap-8 items-start">

            {/* Icon */}
            <div className="z-10 w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-3xl text-white">
                {icon}
            </div>

            {/* Card */}
            <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-green-500 transition duration-300">

                <p className="text-green-400 mb-2">
                    Step {step}
                </p>

                <h2 className="text-3xl font-bold">
                    {title}
                </h2>

                <p className="text-gray-400 mt-4">
                    {description}
                </p>

            </div>

        </div>
    );
}

export default RoadMapCard;