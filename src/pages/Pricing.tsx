import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic access",
    features: [
      "Browse all courses and coaches",
      "10-second video previews",
      "Limited messaging",
      "Basic profile",
      "Community access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "$19",
    period: "/month",
    description: "Full access to everything",
    features: [
      "Watch all premium videos",
      "Download permitted content",
      "Unlimited messaging",
      "Priority support",
      "Advanced analytics",
      "Certificate of completion",
      "Early access to new content",
    ],
    cta: "Subscribe Now",
    popular: true,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-foreground text-center">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground text-center mt-4">Choose the plan that works for you</p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {plans.map((plan) => (
              <Card key={plan.name} className={`p-8 relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">Most Popular</span>
                )}
                <h3 className="text-xl font-display font-bold text-foreground">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
                <ul className="space-y-3 mt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button className={`w-full mt-8 ${plan.popular ? "" : "variant-outline"}`} variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Courses and coaching sessions are purchased separately. Platform commission: 5%.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
