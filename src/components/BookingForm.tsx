import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Clock,
  Phone,
  Mail,
  User,
  ArrowRight,
  Shield,
} from "lucide-react";
import ShinyText from "./ui/ShinyText";
import BlurText from "./ui/BlurText";
import SpotlightCard from "./ui/SpotlightCard";

export function BookingForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    origin: "",
    destination: "",
    type: "transfer",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 2500);
  };

  return (
    <section
      id="booking"
      className="pt-12 md:pt-20 md:mt-20 pb-24 bg-brand-gray relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Informational Side */}
          <div className="space-y-10 flex flex-col justify-center">
            <div>
              <h2 className="text-5xl font-bold tracking-tighter mb-6">
                <ShinyText className="text-brand-accent">
                  Reserve Your Journey.
                </ShinyText>
              </h2>
              <BlurText
                text="Submit your travel details below to request a chauffeur for the 2026 Rolls-Royce Cullinan. Our concierge will review your itinerary, calculate exact mileage (~$40/mile), and sync perfectly with your calendar."
                delay={20}
                className="text-gray-400 font-light leading-relaxed text-lg"
              />
            </div>

            <div className="bg-brand-dark shadow-sm border border-white/5 p-8 rounded-[32px]">
              <h4 className="text-white text-2xl mb-4 font-semibold tracking-tight flex items-center gap-3">
                <Phone className="text-brand-accent" size={24} /> Direct
                Concierge
              </h4>
              <p className="text-gray-400 font-light mb-8">
                Prefer to discuss your route directly? Call our dispatch line.
                We offer exclusive, unlisted promotions for multi-day usage or
                specific long-distance VIP transfers.
              </p>
              <a
                href="tel:+18005550199"
                className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-brand-accent text-brand-dark text-sm font-semibold tracking-wide rounded-full hover:bg-brand-accent-hover transition-colors"
              >
                Call +1 (800) 555-0199
              </a>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-[24px] bg-brand-dark border border-white/5 mt-8 md:mt-0">
              <Shield
                className="text-brand-accent flex-shrink-0 mt-1"
                size={20}
              />
              <div>
                <h5 className="text-white font-semibold mb-1">
                  Secure Booking Routing
                </h5>
                <p className="text-gray-400 text-sm font-light">
                  Inquiries safely logged. Calendar synchronization and email
                  itineraries are automatically dispatched upon confirmed
                  logistics.
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mobile-scale-70 mt-16 md:mt-0"
          >
            <SpotlightCard
              spotlightColor="rgba(224, 205, 173, 0.4)"
              className="w-full h-full"
            >
              <div className="p-8 md:p-12 relative overflow-hidden rounded-[24px] z-10 w-full h-full">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold tracking-tight text-white">
                    Calendar Booking
                  </h3>
                  <p className="text-gray-400 text-sm font-light mt-2">
                    Select your preferred date and time to schedule your luxury transfer.
                  </p>
                </div>
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center h-full min-h-[500px]"
                  >
                    <div className="w-24 h-24 bg-brand-gray rounded-[32px] flex items-center justify-center mb-8 border border-white/5">
                      <Calendar className="text-brand-accent w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-4">
                      Inquiry Received
                    </h3>
                    <p className="text-gray-400 font-light mx-auto mb-10 leading-relaxed text-lg">
                      Your request was successful. An email
                      itinerary has been dispatched, and a concierge will
                      contact you shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-8 py-3 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative overflow-x-hidden">
                    {status === "submitting" && (
                      <div className="absolute inset-0 z-20 bg-brand-dark/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-[32px]">
                        <div className="w-12 h-12 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin mb-6" />
                        <p className="text-white font-semibold tracking-wide text-sm">
                          Sending request...
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="relative">
                          <User
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            size={18}
                          />
                          <input
                            required
                            type="text"
                            className="w-full bg-brand-gray border border-white/5 py-4 pl-12 pr-4 text-white text-sm rounded-[20px] focus:outline-none focus:border-brand-accent transition-all"
                            placeholder="Full Name"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="relative">
                          <Phone
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            size={18}
                          />
                          <input
                            required
                            type="tel"
                            className="w-full bg-brand-gray border border-white/5 py-4 pl-12 pr-4 text-white text-sm rounded-[20px] focus:outline-none focus:border-brand-accent transition-all"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <input
                          required
                          type="email"
                          className="w-full bg-brand-gray border border-white/5 py-4 pl-12 pr-4 text-white text-sm rounded-[20px] focus:outline-none focus:border-brand-accent transition-all"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="relative max-w-full overflow-hidden">
                        <Clock
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none"
                          size={18}
                        />
                        <input
                          required
                          type="datetime-local"
                          className="w-full bg-brand-gray border border-white/5 py-3 md:py-4 pl-12 pr-4 text-white text-sm md:text-base rounded-[20px] focus:outline-none focus:border-brand-accent transition-all opacity-100 placeholder-gray-500 max-w-full"
                        />
                      </div>
                    </div>

                    <div className="max-w-full overflow-hidden">
                      <select className="w-full max-w-full bg-brand-gray border border-white/5 py-3 md:py-4 px-6 text-white text-sm md:text-base rounded-[20px] focus:outline-none focus:border-brand-accent transition-all appearance-none overflow-hidden">
                        <option value="transfer">
                          Point-to-Point Transfer
                        </option>
                        <option value="hourly">
                          Hourly/As-Directed (~$40/mi)
                        </option>
                        <option value="airport">Airport VIP Service</option>
                      </select>
                    </div>

                    <div>
                      <div className="relative">
                        <MapPin
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <input
                          required
                          type="text"
                          className="w-full bg-brand-gray border border-white/5 py-4 pl-12 pr-4 text-white text-sm rounded-[20px] focus:outline-none focus:border-brand-accent transition-all"
                          placeholder="Pick-up Location"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <MapPin
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <input
                          required
                          type="text"
                          className="w-full bg-brand-gray border border-white/5 py-4 pl-12 pr-4 text-white text-sm rounded-[20px] focus:outline-none focus:border-brand-accent transition-all"
                          placeholder="Drop-off Location"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 mt-6 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold tracking-wide text-base rounded-full transition-colors flex items-center justify-center gap-3 shadow-md"
                    >
                      Submit Booking Inquiry
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-6 font-light">
                      Payment handled post-confirmation. No charges today.
                    </p>
                  </form>
                )}
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
