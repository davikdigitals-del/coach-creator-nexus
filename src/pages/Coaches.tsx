import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Users, Star, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function Coaches() {
  const { data: coaches, isLoading } = useQuery({
    queryKey: ["public-coaches"],
    queryFn: async () => {
      const { data } = await supabase
        .from("coach_profiles")
        .select("*, profiles!coach_profiles_user_id_fkey(full_name, avatar_url, bio)")
        .eq("is_available", true);
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-foreground">Find a Coach</h1>
          <p className="text-muted-foreground mt-2">Connect with verified professionals for 1-on-1 sessions</p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1,2,3].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />)}
            </div>
          ) : coaches && coaches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {coaches.map((coach: any) => (
                <Link key={coach.id} to={`/coaches/${coach.user_id}`}>
                  <Card className="p-5 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                        {(coach.profiles?.full_name || "C")[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground">{coach.profiles?.full_name || "Coach"}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{coach.headline || "Professional Coach"}</p>
                      </div>
                    </div>
                    {coach.expertise && coach.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {coach.expertise.slice(0, 3).map((e: string) => (
                          <span key={e} className="badge-category text-xs">{e}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-foreground">{coach.rating_avg || "New"}</span>
                        <span className="text-xs text-muted-foreground">({coach.total_sessions} sessions)</span>
                      </div>
                      <span className="font-bold text-foreground">${coach.hourly_rate || 0}/hr</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-display font-semibold text-foreground mt-4">No coaches available</h3>
              <p className="text-muted-foreground mt-1">Coaches will appear here once they're verified</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
