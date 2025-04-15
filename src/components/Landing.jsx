import React, { useEffect, useState } from "react";
import { BoxReveal } from "./magicui/box-reveal";
import { Globe } from "./magicui/globe";
import { RetroGrid } from "./magicui/retro-grid";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { MagicCard } from "./magicui/magic-card";
import { AnimatePresence, motion } from "framer-motion";
import {
  BuiltFor,
  HowItWorks,
  MindsetTagline,
} from "./AdditionalLandingComponents";
import { Link } from "react-router-dom";

const Landing = () => {
  // Feature card data
  const [isGlobeVisible, setIsGlobeVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsGlobeVisible(false);
    }, 10000);
  });

  const features = [
    {
      icon: "💬",
      title: "Match by Tech Stack",
      description:
        "Swipe right on people who code what you code — React, Rust, Python or Ruby.",
      tag: "#TechCompatibility",
    },
    {
      icon: "📚",
      title: "Share Projects",
      description:
        "Show off your GitHub, blog, or side hustle. Let your work speak for you.",
      tag: "#CodeShowcase",
    },
    {
      icon: "⚡",
      title: "Real-time Geek Chat",
      description:
        "Talk tech, banter, or debug together with our specialized chat.",
      tag: "#PairProgramming",
    },
    {
      icon: "🎯",
      title: "Niche Interests",
      description:
        "Filter by interests like Web3, Anime, AI, Open Source, Gaming, and more.",
      tag: "#GeekPassions",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero section remains unchanged */}
      <div className="min-h-screen bg-base-200 relative overflow-hidden">
        {/* Main container with absolute positioning for better control */}
        <main className="absolute inset-0 flex items-center">
          {/* Left side with text content */}
          <div className="w-1/2 pl-8 md:pl-16 lg:pl-24 text-white z-10">
            <BoxReveal boxColor={"#249fd9"} duration={0.5}>
              <p className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                TinderForGeeks<span className="text-[#249fd9]">!</span>
              </p>
            </BoxReveal>

            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <h2 className="mt-2 text-base md:text-lg">
                Where tech minds connect{" "}
                <span className="text-[#249fd9]">Beyond The Code.</span>
              </h2>
            </BoxReveal>

            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <div className="mt-4 md:mt-6">
                <p className="text-sm md:text-base">
                  💬 Match with devs who love the same tech stack
                  <br />
                  🤝 Connect with like-minded developers
                  <br />
                  📚 Share knowledge and learn from each other
                </p>
              </div>
            </BoxReveal>

            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <Link to="/login">
                {" "}
                <InteractiveHoverButton className="mt-4 md:mt-6 text-black">
                  Get Started
                </InteractiveHoverButton>
              </Link>
            </BoxReveal>
          </div>

          {/* Right side with Globe - positioned to the right edge */}
          <AnimatePresence mode="wait">
            {isGlobeVisible && (
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-2/3 flex items-center hidden md:block justify-end"
                key="globe-animation"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Globe />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Improved Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-300">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-2">
            👨‍💻 Built for Coders, by a Coder
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A dating experience designed around what matters to techies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {features.map((feature, index) => (
            <MagicCard
              key={index}
              className="bg-base-200 hover:bg-base-100 transition-colors duration-300 border border-base-content/10 hover:border-base-content/20"
            >
              <div className="flex flex-col h-full p-4 text-white">
                <div className="bg-base-300 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow">
                  {feature.description}
                </p>
                <div className="mt-4 pt-4 border-t border-base-content/10">
                  <span className="text-xs font-mono opacity-70">
                    {feature.tag}
                  </span>
                </div>
              </div>
            </MagicCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/login">
            <InteractiveHoverButton className="bg-base-100 hover:bg-base-200 text-base-content px-8 py-3">
              Explore All Features
            </InteractiveHoverButton>
          </Link>
        </div>
      </section>
      <HowItWorks />
      <BuiltFor />
      <MindsetTagline />
    </div>
  );
};

export default Landing;
