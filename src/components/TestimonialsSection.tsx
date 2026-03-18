import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amara Osei",
    role: "Learner",
    text: "Coursevia completely changed how I learn. The courses are practical, and hiring a coach for 1-on-1 sessions helped me land my dream job.",
    rating: 5,
    initials: "AO",
  },
  {
    name: "Daniel Kim",
    role: "Course Creator",
    text: "I uploaded my first course and earned over $3,000 in the first month. The platform handles everything — I just focus on teaching.",
    rating: 5,
    initials: "DK",
  },
  {
    name: "Sarah Mitchell",
    role: "Coach",
    text: "As a business coach, Coursevia gives me a professional presence, built-in video calls, and steady client bookings. The 95% payout is unmatched.",
    rating: 5,
    initials: "SM",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Trusted by <span className="text-primary">Thousands</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            See what learners, coaches, and creators are saying about Coursevia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-150 relative"
            >
              <Quote className="h-8 w-8 text-primary/15 absolute top-4 right-4" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
