import { motion } from "motion/react";
import ShinyText from "./ui/ShinyText";
import BlurText from "./ui/BlurText";
import { useEffect, useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoLoad = () => {
      if (window.innerWidth <= 768) {
        video.currentTime = 10;
        video.play().catch((err) => console.log("Autoplay play failed:", err));
      }
    };

    const handleVideoEnd = () => {
      video.currentTime = window.innerWidth <= 768 ? 10 : 0;
      video.play().catch((err) => console.log("Video loop failed:", err));
    };

    if (video.readyState >= 1) {
      handleVideoLoad();
    } else {
      video.addEventListener("loadedmetadata", handleVideoLoad);
    }

    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("loadedmetadata", handleVideoLoad);
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-[72vh] md:h-full object-cover"
        style={{ objectFit: "cover" }}
      >
        <source
          src="https://res.cloudinary.com/dmnoikwb9/video/upload/hero_s92vfw.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark luxury overlay to ensure text readability */}
      <div className="absolute top-0 left-0 w-full h-[72vh] md:h-full bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
      <div className="absolute top-0 left-0 w-full h-[72vh] md:h-full bg-black/10 z-10" />

      {/* Hero content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center h-full w-full max-w-5xl mx-auto mt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white/80 tracking-widest uppercase font-medium text-sm mb-6 block"
        >
          Exclusive Chauffeur Experience
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-tighter font-bold leading-[1.1] mb-8"
        >
          <ShinyText className="text-brand-accent">
            Distinction in Motion.
          </ShinyText>
        </motion.h1>

        <BlurText
          text="A Tier Exotics presents the 2026 Rolls-Royce Cullinan. Impeccable chauffeur service, commanding utility, and a whisper-quiet ride for your most important engagements."
          className="text-white/80 text-base md:text-lg leading-relaxed px-4 max-w-2xl mx-auto mb-12 font-light"
          delay={40}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-2"
        >
          <button
            onClick={scrollToBooking}
            className="px-10 py-4 bg-brand-accent text-brand-dark text-base font-semibold tracking-wide rounded-full hover:bg-brand-accent-hover transition-all duration-300 w-full sm:w-auto shadow-lg"
          >
            Reserve Your Journey
          </button>
          <a
            href="tel:+18005550199"
            className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 text-base font-semibold tracking-wide rounded-full hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
          >
            Call for Rates
          </a>
        </motion.div>
      </div>
    </section>
  );
}
