import ShinyText from "./ui/ShinyText";
import BlurText from "./ui/BlurText";

export function Fleet() {
  return (
    <section
      id="fleet"
      className="py-24 bg-brand-gray relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full space-y-8">
          {/* Text Content */}
          <div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
