import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ShinyText from "./ui/ShinyText";

type ReviewStage = "rating" | "feedback" | "thanks";

export function ReviewGate() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [stage, setStage] = useState<ReviewStage>("rating");
  const [feedback, setFeedback] = useState("");
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const isReview = window.location.hash === "#review";
      setShowGate(isReview);
      if (!isReview) {
        resetReview();
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const resetReview = () => {
    setStage("rating");
    setRating(0);
    setFeedback("");
  };

  const closeGate = () => {
    window.location.hash = "";
    resetReview();
  };

  const handleRating = (rate: number) => {
    setRating(rate);

    if (rate === 5) {
      // Redirect to Google Reviews after a brief delay
      setTimeout(() => {
        window.open(
          "https://maps.app.goo.gl/2rjs1XqBXATa4vfs6?action=write-review",
          "_blank",
        );
        closeGate();
      }, 1500);
    } else {
      // Show feedback form for 1-4 stars
      setStage("feedback");
    }
  };

  const handleSubmitFeedback = () => {
    // Feedback submitted (doesn't go anywhere for now)
    setStage("thanks");
    setTimeout(() => {
      closeGate();
    }, 2500);
  };

  if (!showGate) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark flex flex-col pt-12 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity grayscale"
        style={{
          backgroundImage: "url(/royce.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark opacity-80 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto w-full">
        {/* Header */}
        <div
          className="flex justify-center mb-16 cursor-pointer"
          onClick={closeGate}
        >
          <div className="flex items-center gap-3">
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-gray/50 border border-white/5 rounded-3xl p-10 text-center"
        >
          <AnimatePresence mode="wait">
            {stage === "rating" && (
              <motion.div
                key="rating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-3 tracking-tighter">
                    <ShinyText className="text-brand-accent">
                      Rate Your Experience
                    </ShinyText>
                  </h2>
                  <p className="text-gray-400">
                    Based on your experience, please rate our service.
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-2 transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-0"
                    >
                      <Star
                        size={48}
                        className={`transition-colors ${
                          (hoveredRating || rating) >= star
                            ? "fill-brand-accent text-brand-accent"
                            : "text-gray-600 fill-transparent"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {stage === "feedback" && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 text-left"
              >
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold mb-2 tracking-tighter">
                    <ShinyText className="text-brand-accent">
                      Tell us more
                    </ShinyText>
                  </h2>
                  <p className="text-gray-400">
                    Help us improve your next experience
                  </p>
                </div>

                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your feedback in English..."
                  className="w-full min-h-32 bg-brand-dark border border-white/20 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none"
                />

                <button
                  onClick={handleSubmitFeedback}
                  className="w-full px-6 py-3 bg-brand-accent text-brand-dark font-semibold rounded-full hover:bg-brand-accent-hover transition-all active:scale-95"
                >
                  Submit Feedback
                </button>
              </motion.div>
            )}

            {stage === "thanks" && (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-8"
              >
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star
                      size={40}
                      className="text-brand-accent fill-brand-accent"
                    />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter">
                    <ShinyText className="text-brand-accent">
                      Thank you!
                    </ShinyText>
                  </h2>
                  <p className="text-gray-400">
                    We appreciate your feedback and will use it to improve.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 text-center">
          <button
            onClick={closeGate}
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            Cancel and return to home
          </button>
        </div>
      </div>
    </div>
  );
}
