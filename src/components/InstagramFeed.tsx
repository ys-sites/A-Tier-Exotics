import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { instagramPosts, IG_PROFILE_URL } from "../data/instagramPosts";
import ShinyText from "./ui/ShinyText";

function ImageCard({ src, permalink, alt }: { src: string; permalink: string; alt: string }) {
  return (
    <a
      href={permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 bg-brand-gray group cursor-pointer w-full h-full select-none"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
      {/* Hover Overlay Center */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="transform scale-95 group-hover:scale-100 transition-transform duration-300 flex flex-col items-center justify-center">
          <Instagram className="text-white mb-2" size={24} />
          <span className="text-white text-xs font-semibold uppercase tracking-widest">
            View Post
          </span>
        </div>
      </div>
    </a>
  );
}

function VideoCard({
  src,
  permalink,
  alt,
  parentInView,
}: {
  src: string;
  permalink: string;
  alt: string;
  parentInView: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <a
      href={permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 bg-brand-gray group cursor-pointer w-full h-full select-none"
    >
      {parentInView ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-brand-gray" />
      )}
      {/* Reels Badge (top-right) */}
      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur rounded-full p-1.5 z-10">
        <Instagram size={16} className="text-white" />
      </div>
      {/* Hover Overlay Center */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="transform scale-95 group-hover:scale-100 transition-transform duration-300 flex flex-col items-center justify-center">
          <Instagram className="text-white mb-2" size={24} />
          <span className="text-white text-xs font-semibold uppercase tracking-widest">
            View Post
          </span>
        </div>
      </div>
    </a>
  );
}

function CarouselCard({ src, permalink, alt }: { src: string[]; permalink: string; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? src.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === src.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <a
      href={permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 bg-brand-gray group cursor-pointer w-full h-full select-none"
    >
      {/* Images Slider */}
      <div className="relative w-full h-full">
        {src.map((imgSrc, idx) => (
          <img
            key={idx}
            src={imgSrc}
            alt={`${alt} slide ${idx + 1}`}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              idx === currentIndex ? "opacity-100 z-0" : "opacity-0 z-[-1]"
            }`}
          />
        ))}
      </div>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {src.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => handleDotClick(e, idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-brand-accent scale-125" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer pointer-events-auto"
        aria-label="Previous image"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer pointer-events-auto"
        aria-label="Next image"
      >
        <ChevronRight size={18} />
      </button>

      {/* Carousel/Album Badge (top-right) */}
      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur rounded-full p-1.5 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      </div>

      {/* Hover Overlay Center */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="transform scale-95 group-hover:scale-100 transition-transform duration-300 flex flex-col items-center justify-center">
          <Instagram className="text-white mb-2" size={24} />
          <span className="text-white text-xs font-semibold uppercase tracking-widest">
            View Post
          </span>
        </div>
      </div>
    </a>
  );
}

export function InstagramFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false }),
  ]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <span className="tracking-widest uppercase text-white/60 text-sm font-semibold block mb-1">
            Latest From
          </span>
          <a
            href={IG_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-bold tracking-tight hover:opacity-85 transition-opacity block"
          >
            <ShinyText className="text-brand-accent">@atierexotics</ShinyText>
          </a>
        </div>
        <a
          href={IG_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-md text-white border border-white/20 text-sm font-semibold tracking-wide rounded-full hover:bg-white/20 transition-all duration-300 self-stretch sm:self-auto justify-center"
        >
          <Instagram size={18} />
          <span>Follow on Instagram</span>
        </a>
      </div>

      {/* Carousel */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex -ml-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="embla__slide flex-[0_0_78%] sm:flex-[0_0_45%] lg:flex-[0_0_23.5%] min-w-0 pl-4"
            >
              {post.type === "video" && (
                <VideoCard
                  src={post.src as string}
                  permalink={post.permalink}
                  alt={post.alt}
                  parentInView={isInView}
                />
              )}
              {post.type === "carousel" && (
                <CarouselCard
                  src={post.src as string[]}
                  permalink={post.permalink}
                  alt={post.alt}
                />
              )}
              {post.type === "image" && (
                <ImageCard
                  src={post.src as string}
                  permalink={post.permalink}
                  alt={post.alt}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
