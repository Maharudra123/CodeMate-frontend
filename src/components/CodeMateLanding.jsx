// Main Landing Page Component
import React from "react";
import HeroSection from "./landing/HeroSection";
import FeaturesSection from "./landing/FeaturesSection";
import HowItWorksSection from "./landing/HowItWorksSection";
import CTASection from "./landing/CTASection";

const CodeMateLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

export default CodeMateLanding;
