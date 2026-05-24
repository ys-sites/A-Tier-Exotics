import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Phone, Menu, X } from "lucide-react";
import { FloatingDock } from "./ui/floating-dock";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { title: "About Us", href: "#about" },
    { title: "Vehicles", href: "#fleet" },
    { title: "Testimonial", href: "#experience" },
    { title: "Booking", href: "#booking" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-brand-dark/50 backdrop-blur-3xl py-4 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" : "bg-transparent py-8"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <div
            className="flex-shrink-0 flex items-center cursor-pointer gap-3 z-10 relative"
            onClick={() => scrollTo("hero")}
          >
            <img
              src="/logoatier.png"
              alt="A-Tier Exotics Logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
              A-Tier{" "}
              <span className="text-brand-accent font-medium">Exotics.</span>
            </span>
          </div>

          <div className="hidden md:flex flex-1 justify-center relative -ml-32">
            <FloatingDock items={links} />
          </div>

          <div className="hidden md:flex items-center z-10 relative">
            <a
              href="tel:+18005550199"
              className="flex items-center space-x-2 bg-brand-accent text-brand-dark font-semibold tracking-wide transition-colors hover:bg-brand-accent-hover px-6 py-2.5 rounded-[32px]"
            >
              <Phone size={16} />
              <span>Call Us</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-accent"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-dark border-b border-white/5 px-6 pt-4 pb-8 space-y-6 relative z-50"
        >
          <button
            onClick={() => scrollTo("about")}
            className="block w-full text-left text-gray-300 hover:text-brand-accent text-base font-medium"
          >
            About Us
          </button>
          <button
            onClick={() => scrollTo("fleet")}
            className="block w-full text-left text-gray-300 hover:text-brand-accent text-base font-medium"
          >
            Vehicles
          </button>
          <button
            onClick={() => scrollTo("experience")}
            className="block w-full text-left text-gray-300 hover:text-brand-accent text-base font-medium"
          >
            Testimonial
          </button>
          <button
            onClick={() => scrollTo("booking")}
            className="block w-full text-left text-brand-accent font-semibold tracking-wide text-base"
          >
            Booking
          </button>
          <a
            href="tel:+18005550199"
            className="flex items-center space-x-3 text-brand-accent pt-4 border-t border-white/10"
          >
            <Phone size={18} />
            <span className="font-semibold tracking-wide">Call for Promos</span>
          </a>
        </motion.div>
      )}
    </nav>
  );
}
