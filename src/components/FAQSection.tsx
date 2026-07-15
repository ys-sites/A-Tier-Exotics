import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import ShinyText from "./ui/ShinyText";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is included in the A-Tier Exotics exclusive chauffeur experience?",
    answer: "Our exclusive chauffeur experience provides a professional, discrete, and highly trained chauffeur to drive you in our flagship 2026 Rolls-Royce Cullinan. The service includes a complimentary VIP concierge to sync with your schedule, premium in-cabin refreshments, and absolute privacy. Please note we do not offer self-rental options.",
  },
  {
    question: "How is the luxury chauffeur service priced?",
    answer: "Pricing is calculated based on route details, mileage, and duration, starting at approximately $40 per mile. For exact quotes, custom itineraries, multi-day packages, or long-distance VIP transfers, please submit an inquiry or call our dispatch line directly.",
  },
  {
    question: "Which geographic areas do you serve?",
    answer: "A-Tier Exotics is based in Orlando, Florida (serving the 407 area code and surrounding districts). We regularly accommodate airport transfers, corporate bookings, and artist transportation within the region. Contact us to discuss extended travel outside our primary service area.",
  },
  {
    question: "Who is A-Tier Exotics trusted by?",
    answer: "We serve an exacting clientele of high-profile individuals, corporate executives, VIPs, and global artists such as French Montana, who depend on our absolute discretion, total punctuality, and uncompromising service standards.",
  },
  {
    question: "How can I reserve a chauffeur or vehicle?",
    answer: "You can easily request a booking by submitting your travel details (date, time, pick-up origin, and destination) through our online calendar booking form, or by contacting our direct concierge dispatch line at +1 (800) 555-0199.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-32 bg-brand-dark px-6 relative overflow-hidden border-t border-white/5"
    >
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-brand-accent/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-brand-gray/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-brand-accent tracking-widest uppercase font-semibold text-sm mb-4 block">
              Frequently Asked Questions
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-6 leading-tight">
              <ShinyText className="text-brand-accent">
                Got Questions? <br />
                We Have Answers.
              </ShinyText>
            </h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg max-w-md">
              Learn more about our logistics, vehicle availability, booking terms, and how we deliver distinction in motion.
            </p>
            <div className="mt-8 hidden lg:block">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-brand-gray border border-white/5">
                <HelpCircle className="text-brand-accent" size={20} />
                <span className="text-white text-sm font-medium">
                  Need custom assistance?
                </span>
                <a
                  href="#booking"
                  className="text-brand-accent hover:text-white transition-colors text-sm font-bold underline decoration-brand-accent underline-offset-4"
                >
                  Contact Concierge
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-brand-gray/40 backdrop-blur-sm border transition-all duration-300 rounded-3xl overflow-hidden ${
                    isOpen ? "border-brand-accent/30 shadow-lg shadow-black/35" : "border-white/5 hover:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-6 px-8 flex items-center justify-between text-left focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-white font-medium text-lg pr-4 group-hover:text-brand-accent transition-colors">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-gray-500 group-hover:text-brand-accent transition-colors flex-shrink-0"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-8 pb-6 text-gray-400 font-light leading-relaxed border-t border-white/5 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
