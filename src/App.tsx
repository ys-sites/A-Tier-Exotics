import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { Fleet } from "./components/Fleet";
import { SocialProof } from "./components/SocialProof";
import { ScannerSection } from "./components/ScannerSection";
import { FAQSection } from "./components/FAQSection";
import { BookingForm } from "./components/BookingForm";
import { Footer } from "./components/Footer";
import { ReviewGate } from "./components/ReviewGate";

export default function App() {
  useEffect(() => {
    // Scroll to top on initial page load
    window.scrollTo(0, 0);
    // Clear any hash to prevent starting on Review Gate after reload
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
      // Let any listeners know the hash is gone
      setTimeout(() => {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }, 10);
    }
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-accent selection:text-brand-dark flex flex-col">
      <ReviewGate />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <Fleet />
        <SocialProof />
        <ScannerSection />
        <FAQSection />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
