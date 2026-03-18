import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CoursesSection from "@/components/CoursesSection";
import FeaturedCoaches from "@/components/FeaturedCoaches";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <CoursesSection />
      <FeaturedCoaches />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
