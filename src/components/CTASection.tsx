import { ArrowRight, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 space-y-8">
        <div className="bg-primary rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-primary-foreground">
            <p className="text-sm font-medium opacity-80 mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" /> Become a Coach or Creator
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              Share your expertise on{" "}
              <span className="text-accent">Coursevia</span> and earn!
            </h2>
            <p className="mt-3 opacity-80 max-w-lg">
              Join as a coach to offer live sessions, or as a creator to sell courses and business videos. You keep 95% of every sale.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 whitespace-nowrap rounded-full px-8"
            >
              <BookOpen className="h-4 w-4" />
              Start Teaching
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 whitespace-nowrap rounded-full px-8"
            >
              Become a Coach
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
