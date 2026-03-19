import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Globe, Users, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-foreground text-center">About Coursevia</h1>
          <p className="text-lg text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
            Coursevia is a modern multi-vendor learning and coaching marketplace that connects learners, coaches, and content creators in one secure ecosystem.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              { icon: <Globe className="h-8 w-8" />, title: "Global Marketplace", desc: "Access courses and coaches from around the world" },
              { icon: <Shield className="h-8 w-8" />, title: "Secure Platform", desc: "All transactions and communications stay within Coursevia" },
              { icon: <Users className="h-8 w-8" />, title: "Community Driven", desc: "Built for learners, coaches, and creators to thrive together" },
              { icon: <Award className="h-8 w-8" />, title: "Quality Assured", desc: "Verified coaches and creators ensure premium content" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl bg-card border border-border">
                <div className="p-3 rounded-lg bg-primary/10 text-primary h-fit">{item.icon}</div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
