import { Search, BookOpen, Star, Play, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPerson from "@/assets/hero-person.png";

const HeroSection = () => {
  return (
    <section className="relative bg-card overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm tracking-wide px-4 py-1.5 rounded-full">
              <Play className="h-3.5 w-3.5 fill-primary" />
              Courses · Coaching · Business Growth
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight">
              Transform the Way You{" "}
              <span className="text-primary">Learn, Grow,</span> and Build Your{" "}
              <span className="text-secondary">Business</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              Discover expert-led courses, premium business videos, and professional coaches — all in one place. Coursevia helps learners gain practical knowledge, gives creators a platform to sell valuable content, and allows coaches to offer trusted services through a secure all-in-one ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="gap-2 rounded-full px-6">
                <Search className="h-4 w-4" />
                Explore Courses
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-full px-6">
                <Users className="h-4 w-4" />
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
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium text-foreground">25K+ Learners</span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <img
                src={heroPerson}
                alt="Student learning on Coursevia platform"
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
