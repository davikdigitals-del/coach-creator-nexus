import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-primary-foreground">
            <p className="text-sm font-medium opacity-80 mb-2">Become an Instructor</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              You can join SkillBridge as{" "}
              <span className="text-accent">a creator or coach!</span>
            </h2>
          </div>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 whitespace-nowrap rounded-full px-8"
          >
            Drop Information
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
