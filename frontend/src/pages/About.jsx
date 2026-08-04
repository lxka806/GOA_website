import AboutHero from "../components/about/AboutHero";
import AboutMission from "../components/about/AboutMission";
import AboutGallery from "../components/about/AboutGallery";
import AboutVideos from "../components/about/AboutVideos";
import AboutStats from "../components/about/AboutStats";
import AboutSocial from "../components/about/AboutSocial";
import AboutCTA from "../components/about/AboutCTA";

function About() {
    return (
        <main className="bg-[#050505] text-white">
            <AboutHero />
            <AboutMission />
            <AboutGallery />
            <AboutVideos />
            <AboutStats />
            <AboutSocial />
            <AboutCTA />
        </main>
    );
}

export default About;