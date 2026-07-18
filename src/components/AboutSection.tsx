import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { Play, Instagram, CheckCircle } from "lucide-react";
import ShinyText from "./ui/ShinyText";
import BlurText from "./ui/BlurText";
import { InstagramFeed } from "./InstagramFeed";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    // Delay loading the video by 2 seconds after page mount
    const timer = setTimeout(() => {
      setLoadVideo(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;

    video.defaultMuted = true;
    video.muted = true;
    video.play().catch(() => {});

    // Interactive fallback for mobile browsers (e.g. low power mode)
    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    window.addEventListener("touchstart", playVideo, { once: true, passive: true });
    window.addEventListener("pointerdown", playVideo, { once: true, passive: true });
    return () => {
      window.removeEventListener("touchstart", playVideo);
      window.removeEventListener("pointerdown", playVideo);
    };
  }, [loadVideo]);

  return (
    <section
      ref={ref}
      id="about"
      className="bg-brand-dark py-24 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background aesthetic elements - Deferred Load */}
      <div
        className="absolute top-0 right-0 w-full h-full opacity-[0.25] pointer-events-none grayscale mix-blend-luminosity transform md:scale-150 scale-100 md:scale-150 origin-top-right md:translate-x-1/4 md:-translate-y-1/4 translate-x-0 md:translate-x-0 translate-y-0 blur-sm transition-opacity duration-1000"
        style={{
          backgroundImage: loadVideo ? "url(/french-montana-coupe-du-monde-des-clubs.webp)" : "none",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-brand-gray/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, transition: { duration: 0.8 } }
                : { opacity: 0, y: 30 }
            }
            className="lg:col-span-7 pr-0 lg:pr-10"
          >
            <div className="flex items-center gap-4 text-white mb-8">
              <span className="text-xl font-bold tracking-tighter">
                a tier exotics.
              </span>
              <span className="w-px h-5 bg-white/20"></span>
              <a
                href="https://www.instagram.com/reel/DMs8GXNvZFM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <span className="italic font-medium">Instagram</span>
                <Instagram size={20} />
              </a>
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tighter mb-8 leading-[1]">
              <ShinyText className="text-brand-accent">
                Trusted By <br />
                Artists.
              </ShinyText>
            </h2>

            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg lg:text-xl relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-gradient-to-b before:from-brand-accent before:to-transparent pl-8">
              <BlurText
                text="A Tier Exotics was founded to serve exacting clientele who demand more than mere transportation. When global artists like French Montana need to move through the city, we are the only call they make."
                delay={30}
                className="inline-block"
              />
              <div className="pt-4" />
              <BlurText
                text="Our protocol is built on total discretion, absolute punctuality, and a deep understanding of luxury service standards. Every mile in our 2026 Rolls-Royce Cullinan is designed to isolate you from the outside world."
                delay={30}
                className="inline-block"
              />
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white font-medium">
                <CheckCircle className="text-brand-accent" size={20} /> Total
                Discretion
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                <CheckCircle className="text-brand-accent" size={20} /> 10+
                Years Experience
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                <CheckCircle className="text-brand-accent" size={20} /> VIP
                Concierge
              </div>
            </div>
          </motion.div>

          {/* Video / Visual Layout */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.8,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 50,
                      },
                    }
                  : { opacity: 0, scale: 0.95, rotate: -2 }
              }
              className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-black max-w-[360px] mx-auto lg:ml-auto lg:mr-0 aspect-[9/16] bg-brand-gray border border-white/5 group"
            >
              <a
                href="https://www.instagram.com/reel/DMs8GXNvZFM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 cursor-pointer"
              >
                {/* Desktop-only Hover Play Overlay */}
                <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 scale-75 md:group-hover:scale-100 border border-white/30">
                    <Play className="text-white fill-white ml-1" size={24} />
                  </div>
                </div>
              </a>
              <video
                ref={videoRef}
                src={loadVideo ? "https://cdn.mevoyages.com/A%20Tier%20Exotics/ig.mp4" : undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay elements */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center p-0.5 overflow-hidden">
                    <img
                      src="/logo.jpg"
                      alt="A-Tier"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="text-white">
                    <p className="text-sm font-semibold flex items-center gap-1">
                      @atierexotics{" "}
                      <CheckCircle
                        size={14}
                        className="text-blue-400 fill-white"
                      />
                    </p>
                    <p className="text-xs text-brand-accent">
                      French Montana x A-Tier
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-white border-t border-white/20 pt-3 mt-3">
                  <p className="text-xs font-semibold text-white/90">
                    "the Only Way I Travel" ~ French Montana
                  </p>
                  <a
                    href="https://www.instagram.com/reel/DMs8GXNvZFM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto hover:text-brand-accent transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Instagram Feed Section */}
        <div className="mt-20 md:mt-28">
          <InstagramFeed />
        </div>
      </div>
    </section>
  );
}
