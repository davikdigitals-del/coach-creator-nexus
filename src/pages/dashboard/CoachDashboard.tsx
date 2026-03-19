import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Users, Calendar, Wallet, Star, Video } from "lucide-react";

export default function CoachDashboard() {
  const { user, profile } = useAuth();

  const { data: coachProfile } = useQuery({
    queryKey: ["coach-profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("coach_profiles").select("*").eq("user_id", user!.id).single();
      return data;
    },
    enabled: !!user,
  });

  const { data: bookings } = useQuery({
    queryKey: ["coach-bookings", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("bookings").select("*").eq("coach_id", user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: wallet } = useQuery({
    queryKey: ["coach-wallet", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("wallets").select("*").eq("user_id", user!.id).single();
      return data;
    },
    enabled: !!user,
  });

  const stats = [
    { label: "Total Sessions", value: coachProfile?.total_sessions || 0, icon: <Calendar className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
    { label: "Pending Bookings", value: bookings?.filter(b => b.status === "pending").length || 0, icon: <Users className="h-5 w-5" />, color: "bg-secondary/10 text-secondary" },
    { label: "Wallet Balance", value: `$${wallet?.balance || 0}`, icon: <Wallet className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
    { label: "Rating", value: coachProfile?.rating_avg || "N/A", icon: <Star className="h-5 w-5" />, color: "bg-destructive/10 text-destructive" },
  ];

  return (
    <DashboardLayout role="coach">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Welcome, Coach {profile?.full_name || ""}! 🎯
          </h1>
          <p className="text-muted-foreground mt-1">Manage your coaching business</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Recent Bookings</h3>
            {bookings && bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings.slice(0, 5).map((b: any) => (
                  <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">{new Date(b.scheduled_at).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground capitalize">{b.status}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">${b.price}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No bookings yet</p>
            )}
          </Card>

          <Card className="p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Verification Status</h3>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-foreground">
                {coachProfile?.is_verified ? (
                  <span className="text-secondary font-medium">✓ Verified Coach</span>
                ) : (
                  <span className="text-accent font-medium">⏳ Verification Pending</span>
                )}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
