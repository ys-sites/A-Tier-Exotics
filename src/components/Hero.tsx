import { motion } from "motion/react";
import ShinyText from "./ui/ShinyText";
import BlurText from "./ui/BlurText";
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Resolve src ONCE, synchronously, before first render. No state swap, no reload.
  const [videoSrc] = useState(() =>
    window.matchMedia("(max-width: 768px)").matches
      ? "https://cdn.mevoyages.com/A%20Tier%20Exotics/hero-mobile.mp4#t=10"
      : "https://cdn.mevoyages.com/A%20Tier%20Exotics/hero.mp4"
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Belt-and-suspenders for iOS autoplay policy
    video.defaultMuted = true;
    video.muted = true;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    let handleTimeUpdate: (() => void) | null = null;

    if (isMobile) {
      // Seek to 10s initially
      const setStart = () => {
        if (video.currentTime < 10) {
          video.currentTime = 10;
        }
      };
      if (video.readyState >= 1) {
        setStart();
      } else {
        video.addEventListener("loadedmetadata", setStart, { once: true });
      }

      // Intercept loops and force restart at 10s
      handleTimeUpdate = () => {
        if (video.currentTime < 9.8) {
          video.currentTime = 10;
        }
      };
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    video.play().catch(() => {});

    // iOS Low Power Mode blocks autoplay → retry on first touch / tab return
    const retry = () => {
      if (video.paused) {
        if (isMobile && video.currentTime < 10) {
          video.currentTime = 10;
        }
        video.play().catch(() => {});
      }
    };
    window.addEventListener("touchstart", retry, { once: true, passive: true });
    document.addEventListener("visibilitychange", retry);
    return () => {
      window.removeEventListener("touchstart", retry);
      document.removeEventListener("visibilitychange", retry);
      if (handleTimeUpdate) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        poster={
          window.matchMedia("(max-width: 768px)").matches
            ? "https://cdn.mevoyages.com/A%20Tier%20Exotics/hero-poster-mobile.jpg"
            : "https://cdn.mevoyages.com/A%20Tier%20Exotics/hero-poster.jpg"
        }
        onError={(e) => {
          // Fallback: if hero-mobile.mp4 isn't uploaded yet, fall back to desktop file
          const v = e.currentTarget;
          if (v.src.includes("hero-mobile")) {
            v.src = "https://cdn.mevoyages.com/A%20Tier%20Exotics/hero.mp4";
            v.load();
            v.play().catch(() => {});
          }
        }}
        className="absolute top-0 left-0 w-full h-[72vh] md:h-full object-cover"
      />

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
            className="px-10 py-4 bg-brand-accent text-brand-dark text-base font-semibold tracking-wide rounded-full hover:bg-brand-accent-hover hover:shadow-[0_0_25px_rgba(224,205,173,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto shadow-lg cursor-pointer"
          >
            Reserve Your Journey
          </button>
          <a
            href="tel:+18005550199"
            className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 text-base font-semibold tracking-wide rounded-full hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto text-center"
          >
            Call for Rates
          </a>
        </motion.div>
      </div>
    </section>
  );
}
