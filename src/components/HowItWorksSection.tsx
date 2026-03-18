import { UserPlus, Search, CreditCard, Play } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds and tell us your goals — learn, coach, or create content.",
  },
  {
    icon: Search,
    title: "Discover Content & Coaches",
    description: "Browse courses, business videos, and professional coaches curated for your needs.",
  },
  {
    icon: CreditCard,
    title: "Purchase or Subscribe",
    description: "Buy individual courses, book coaching sessions, or subscribe for full premium access.",
  },
  {
    icon: Play,
    title: "Learn & Grow",
    description: "Watch courses, join live video sessions with coaches, and track your progress.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            How <span className="text-primary">Coursevia</span> Works
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Getting started is easy — whether you want to learn, teach, or coach
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={step.title} className="text-center group">
              <div className="relative mx-auto mb-5">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors duration-150">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
