import { motion } from 'framer-motion';
import { FaPlay, FaClock } from 'react-icons/fa';

function AboutVideos() {
  const videos = [
    {
      id: 1,
      title: "რა მოხდა ჰაკათონიზე?",
      duration: "7:59",
      videoId: "jUT1xgrvu7U"
    },
    {
      id: 2,
      title: "ალგორითმები და ხელოვნური ინტელექტი",
      duration: "2:50:50",
      videoId: "zMOE_vAr5u4"
    },
    {
      id: 3,
      title: "მორჩი უაზროდ ყოფნას, შემოუერთდი GOA-ს",
      duration: "1:53",
      videoId: "k1R7cdbe0eg"
    }
  ];

  // Function to get YouTube thumbnail
  const getThumbnail = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Function to get YouTube watch URL
  const getVideoUrl = (videoId) => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 text-xs font-medium tracking-wider uppercase">Featured Videos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Watch <span className="text-green-500">GOA Academy</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            Check out our latest videos and tutorials
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {videos.map((video, index) => (
            <motion.a
              key={video.id}
              href={getVideoUrl(video.videoId)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative">
                <img 
                  src={getThumbnail(video.videoId)}
                  alt={video.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback thumbnail if maxresdefault doesn't exist
                    e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-green-600/90 hover:bg-green-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/30">
                    <FaPlay className="text-white text-xl ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                  <FaClock className="text-gray-400 text-[10px]" />
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold group-hover:text-green-400 transition-colors line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutVideos;