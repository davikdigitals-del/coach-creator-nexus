import { Play, Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  {
    title: "Scaling a Startup from $0 to $1M Revenue",
    creator: "James Carter",
    category: "Business Strategy",
    duration: "24 min",
    isPremium: true,
  },
  {
    title: "Negotiation Tactics for Freelancers & Consultants",
    creator: "Elena Rodriguez",
    category: "Career Growth",
    duration: "18 min",
    isPremium: true,
  },
  {
    title: "Introduction to Financial Planning for Beginners",
    creator: "David Park",
    category: "Finance",
    duration: "12 min",
    isPremium: false,
  },
  {
    title: "Building a Personal Brand on Social Media",
    creator: "Amara Osei",
    category: "Marketing",
    duration: "15 min",
    isPremium: true,
  },
];

const PremiumVideoSection = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
              <Crown className="h-3.5 w-3.5" />
              Premium Content
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Business & Growth <span className="text-primary">Videos</span>
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Watch expert-led business strategy, growth, and career development videos. Free members get a 10-second preview.
            </p>
          </div>
          <Button variant="outline" className="rounded-full px-6 self-start md:self-auto">
            Browse All Videos
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {videos.map((video) => (
            <div
              key={video.title}
              className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-150 group cursor-pointer"
            >
              <div className="relative bg-muted aspect-video flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-150">
                  <Play className="h-5 w-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                </div>
                {video.isPremium && (
                  <div className="absolute top-2 right-2 bg-accent/90 text-accent-foreground text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Premium
                  </div>
                )}
                {!video.isPremium && (
                  <div className="absolute top-2 right-2 bg-secondary/90 text-secondary-foreground text-xs font-semibold px-2 py-1 rounded-md">
                    Free
                  </div>
                )}
                <span className="absolute bottom-2 right-2 bg-foreground/70 text-background text-xs px-2 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <span className="text-xs font-medium text-primary">{video.category}</span>
                <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground">by {video.creator}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-accent" />
            <div>
              <p className="font-display font-bold text-foreground">Unlock All Premium Content</p>
              <p className="text-sm text-muted-foreground">
                Subscribe to watch full videos, download content, and access exclusive business insights.
              </p>
            </div>
          </div>
          <Button size="lg" className="rounded-full px-8 gap-2 whitespace-nowrap">
            <Crown className="h-4 w-4" />
            Subscribe Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PremiumVideoSection;
