import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import PricingSection from "./PricingSection";
import ProductSection from "./ProductSection";
import SolutionSection from "./SolutionSection";
import KnowMoreSection from "./KnowMoreSection";
import Footer from "./Footer";
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProductSection />
      <SolutionSection />
      <PricingSection />
      <KnowMoreSection />
      <Footer />
    </div>
  );
};
export default LandingPage;
