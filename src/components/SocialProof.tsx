import { motion } from "motion/react";
import { Star } from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import ShinyText from "./ui/ShinyText";
import BlurText from "./ui/BlurText";

export function SocialProof() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false }),
  ]);

  const reviews = [
    {
      id: 1,
      author: "Kam",
      text: "A-Tier Exotics has an awesome selection of luxury cars, all well-maintained and top quality. You can tell he takes pride in what he does and makes sure everything is handled professionally. Highly recommend him and his company!",
    },
    {
      id: 2,
      author: "David K.",
      text: "Best Rent a car for exotic cars, owner takes pride in his work. Definitely recommend in the 407 area.",
    },
    {
      id: 3,
      author: "Bojan T.",
      text: "Had a great experience renting a Lamborghini from them. It was very last minute and they still were able to come through. Solid pricing and top service thanks again!",
    },
    {
      id: 4,
      author: "Zaid K.",
      text: "Cars are well maintained and process was simple, would recommend!",
    },
    {
      id: 5,
      author: "Azeem Q.",
      text: "Great service!!! Super nice guy and great quality",
    },
    {
      id: 6,
      author: "French Montana",
      text: "A-Tier Exotics moves different. Always on point. The only way I travel.",
    },
    {
      id: 7,
      author: "Leonardo D.",
      text: "The Rolls Royce Cullinan was immaculate. Top tier service for real, definitely the strongest fleet in the city.",
    },
    {
      id: 8,
      author: "Rich K.",
      text: "Only people I trust when I'm in the city. Cars are always pristine, the team is 100% discrete, and they always come through.",
    },
  ];

  return (
    <section
      id="experience"
      className="py-24 bg-brand-dark relative overflow-hidden"
    >
      <div className="absolute top-0 md:top-1/2 right-0 w-1/3 h-1/2 bg-brand-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 md:h-1/2 h-1/4 bg-brand-gray/50 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              <ShinyText className="text-brand-accent">
                The A-Tier Standard
              </ShinyText>
            </h2>
            <BlurText
              text="Don't just take our word for it. Here is what our clients have to say about their absolute luxury experience."
              delay={30}
              className="text-gray-400 font-light leading-relaxed"
            />
          </div>
          <a
            href="#review"
            className="inline-flex items-center gap-2 bg-brand-gray border border-white/20 hover:border-brand-accent hover:bg-brand-gray/80 text-white px-6 py-3 rounded-full font-medium transition-all"
          >
            Leave us a review
            <Star size={16} className="fill-brand-accent text-brand-accent" />
          </a>
        </div>
      </div>

      <div className="relative z-10">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="embla__slide flex-[0_0_85%] sm:flex-[0_0_400px] min-w-0 pl-6"
              >
                <div className="bg-brand-gray/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 font-light leading-relaxed mb-6 flex-grow">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 whitespace-nowrap">
                    <span className="text-white font-medium">
                      {review.author}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edge Gradients for fading effect */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-brand-dark to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-brand-dark to-transparent z-20 pointer-events-none" />
    </section>
  );
}
