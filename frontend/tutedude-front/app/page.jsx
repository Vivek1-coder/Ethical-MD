import React from "react";
import { Hero3D } from "./components/Hero3D";
import { FeatureSection } from "./components/FeatureSection";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <div>
      <Hero3D />
      <FeatureSection />
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
