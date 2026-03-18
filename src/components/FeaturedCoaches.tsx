import { Star, Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const coaches = [
  {
    name: "Sarah Chen",
    specialty: "Business Strategy",
    rating: 4.9,
    reviews: 234,
    hourlyRate: 85,
    nextAvailable: "Tomorrow, 2:00 PM",
    initials: "SC",
  },
  {
    name: "Marcus Johnson",
    specialty: "Data Science & AI",
    rating: 4.8,
    reviews: 189,
    hourlyRate: 120,
    nextAvailable: "Today, 5:00 PM",
    initials: "MJ",
  },
  {
    name: "Elena Rodriguez",
    specialty: "UX/UI Design",
    rating: 4.9,
    reviews: 312,
    hourlyRate: 95,
    nextAvailable: "Wed, 10:00 AM",
    initials: "ER",
  },
  {
    name: "David Park",
    specialty: "Full-Stack Dev",
    rating: 4.7,
    reviews: 156,
    hourlyRate: 110,
    nextAvailable: "Thu, 3:00 PM",
    initials: "DP",
  },
];

const FeaturedCoaches = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Featured <span className="text-primary">Coaches</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Book 1-on-1 sessions with verified industry experts
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coaches.map((coach) => (
            <div
              key={coach.name}
              className="bg-background rounded-xl border border-border p-5 hover:shadow-lg transition-shadow duration-150 text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-primary">{coach.initials}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground">{coach.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{coach.specialty}</p>

              <div className="flex items-center justify-center gap-1 mb-3">
                <Star className="h-4 w-4 text-accent fill-accent" />
                <span className="text-sm font-medium text-foreground">{coach.rating}</span>
                <span className="text-xs text-muted-foreground">({coach.reviews})</span>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{coach.nextAvailable}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Video className="h-3.5 w-3.5" />
                  <span>Video Call Available</span>
                </div>
              </div>

              <p className="text-primary font-bold text-lg mb-3">
                ${coach.hourlyRate}<span className="text-sm text-muted-foreground font-normal">/hr</span>
              </p>

              <Button size="sm" className="w-full">
                Book Session
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoaches;
