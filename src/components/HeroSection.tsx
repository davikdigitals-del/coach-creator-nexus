import { Search, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPerson from "@/assets/hero-person.png";

const HeroSection = () => {
  return (
    <section className="relative bg-card overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <span className="text-secondary font-semibold text-sm tracking-wide uppercase">
              Start your favourite course
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Now learning from anywhere, and build your{" "}
              <span className="text-primary">bright career.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Access world-class courses, hire expert coaches, and build the skills that matter — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="gap-2">
                <Search className="h-4 w-4" />
                Explore Courses
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Find a Coach
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">1,235+ Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="text-sm font-medium text-foreground">4.8 Rating</span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <img
                src={heroPerson}
                alt="Student learning online"
                className="w-full max-w-md lg:max-w-lg object-contain animate-fade-in"
              />
              <div className="absolute top-8 right-0 bg-card rounded-xl shadow-lg p-3 flex items-center gap-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Star className="h-4 w-4 text-accent fill-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">4.8</p>
                  <p className="text-xs text-muted-foreground">Rating (886)</p>
                </div>
              </div>
              <div className="absolute bottom-16 left-0 bg-primary text-primary-foreground rounded-xl shadow-lg p-3 flex items-center gap-2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <BookOpen className="h-5 w-5" />
                <div>
                  <p className="text-lg font-bold">1,235</p>
                  <p className="text-xs opacity-80">courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
