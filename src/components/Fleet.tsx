import { motion } from "motion/react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { FlipWords } from "./ui/flip-words";
import ShinyText from "./ui/ShinyText";
import BlurText from "./ui/BlurText";

export function Fleet() {
  // Simulating live availability. Toggle this to test alternative flow.
  const [cullinanAvailable] = useState(false);

  return (
    <section
      id="fleet"
      className="py-24 bg-brand-gray relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="w-full space-y-8 order-2 lg:order-1">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-2 leading-tight flex items-center shrink-0">
              <ShinyText className="text-brand-accent pr-3 pb-2 block">
                BEST EXPERIENCE
              </ShinyText>
            </h2>

            <div className="space-y-4 pt-4 border-t border-white/20">
              <h3 className="text-3xl font-semibold text-white">
                2026 Rolls-Royce Cullinan <br />{" "}
                <span className="text-brand-accent font-medium tracking-wide text-2xl">
                  for ~$40/mile
                </span>
              </h3>
            </div>

            <BlurText
              text="The pinnacle of luxury SUVs. Our pristine flagship offers an unmatched chauffeur-driven experience. Experience handcrafted interiors, the iconic starlight headliner, and a whisper-quiet ride."
              delay={30}
              className="text-gray-300 font-light leading-relaxed text-lg pt-4"
            />

            <ul className="space-y-4 text-white font-medium border-l-2 border-brand-accent pl-6 mb-8">
              <li>Chauffeur Included (No Self-Rental)</li>
              <li>Complimentary VIP Concierge</li>
              <li>Refreshments Provided</li>
            </ul>

            <div className="pt-4">
              {cullinanAvailable ? (
                <button className="px-10 py-4 bg-brand-accent text-brand-dark text-base font-semibold tracking-wide rounded-full hover:bg-brand-accent-hover transition-all duration-300 w-full sm:w-auto shadow-lg">
                  Reserve Now
                </button>
              ) : (
                <div className="flex flex-col gap-6">
                  <button className="px-10 py-4 bg-brand-accent text-brand-dark text-base font-semibold tracking-wide rounded-full hover:bg-brand-accent-hover transition-all duration-300 w-full sm:w-auto shadow-lg">
                    Reserve Now
                  </button>
                  <p className="text-sm text-brand-accent font-medium tracking-wide bg-black/20 p-4 rounded-xl border border-white/10 hidden">
                    Due to high demand, the Cullinan is currently booked.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Image/Showcase */}
          <div className="w-full relative order-1 lg:order-2 h-[400px] lg:h-[600px] flex justify-center items-center">
            <CardContainer
              className="inter-var h-full w-full"
              containerClassName="w-full h-full"
            >
              <CardBody className="bg-transparent relative group/card w-full h-full rounded-[40px] p-0 border-0 flex items-center justify-center">
                <CardItem translateZ="100" className="w-full h-full">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full rounded-[40px] overflow-hidden"
                  >
                    <img
                      src="/royce.avif"
                      alt="2026 Rolls-Royce Cullinan"
                      className="w-full h-full object-contain p-4 rounded-[40px] shadow-2xl group-hover/card:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.15)] transition-shadow duration-500"
                    />
                  </motion.div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
