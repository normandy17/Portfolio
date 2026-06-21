import { useTheme } from "@/hooks/useTheme";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ParticleBackground from "@/components/portfolio/ParticleBackground";

// Project thumbnail images — generated static assets
const PROJECT_THUMBNAILS = {
  "BabyOS": "https://media.base44.com/images/public/6a313c6d83dcbc04f49a32c7/c8df4aa6e_generated_3530b6e6.png",
  "ReviewSense": "https://media.base44.com/images/public/6a313c6d83dcbc04f49a32c7/4a366459b_generated_7dee7aec.png",
  "Poetic Justice": "https://media.base44.com/images/public/6a313c6d83dcbc04f49a32c7/1ecbd571a_generated_c645aa4b.png",
  "Super Shopper": "https://media.base44.com/images/public/6a313c6d83dcbc04f49a32c7/12af95d40_generated_e3b1429b.png",
  "Prime Video Clone": "https://media.base44.com/images/public/6a313c6d83dcbc04f49a32c7/9dddf6a66_generated_12e7c0c5.png",
  "Google Keep PWA": "https://media.base44.com/images/public/6a313c6d83dcbc04f49a32c7/adb86b74a_generated_de16c822.png",
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen text-foreground">
      <ParticleBackground />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Skills />
      <Projects thumbnails={PROJECT_THUMBNAILS} />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}