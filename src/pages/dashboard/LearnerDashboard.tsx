import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, Video, Calendar, Star, CreditCard, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function LearnerDashboard() {
  const { user, roles, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (roles.length > 0 && !roles.includes("learner") && !roles.includes("admin")) {
      if (roles.includes("coach")) navigate("/coach/dashboard");
      else if (roles.includes("creator")) navigate("/creator/dashboard");
    }
  }, [roles]);

  const { data: enrollments } = useQuery({
    queryKey: ["enrollments", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("enrollments").select("*, courses(title, thumbnail_url)").eq("user_id", user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: bookings } = useQuery({
    queryKey: ["learner-bookings", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("bookings").select("*").eq("learner_id", user!.id).order("scheduled_at", { ascending: true });
      return data || [];
    },
    enabled: !!user,
  });

  const { data: subscription } = useQuery({
    queryKey: ["subscription", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user!.id).single();
      return data;
    },
    enabled: !!user,
  });

  const stats = [
    { label: "Enrolled Courses", value: enrollments?.length || 0, icon: <BookOpen className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
    { label: "Upcoming Bookings", value: bookings?.filter(b => b.status === "confirmed").length || 0, icon: <Calendar className="h-5 w-5" />, color: "bg-secondary/10 text-secondary" },
    { label: "Subscription", value: subscription?.plan === "premium" ? "Premium" : "Free", icon: <Star className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
  ];

  return (
    <DashboardLayout role="learner">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Welcome back, {profile?.full_name || "Learner"}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's your learning overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <h3 className="font-display font-semibold text-foreground mb-4">Recent Courses</h3>
            {enrollments && enrollments.length > 0 ? (
              <div className="space-y-3">
                {enrollments.slice(0, 5).map((e: any) => (
                  <div key={e.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{e.courses?.title || "Course"}</p>
                      <p className="text-xs text-muted-foreground">{e.progress_percent}% complete</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No courses yet. Start exploring!</p>
            )}
          </Card>

          <Card className="p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Upcoming Sessions</h3>
            {bookings && bookings.filter(b => b.status === "confirmed").length > 0 ? (
              <div className="space-y-3">
                {bookings.filter(b => b.status === "confirmed").slice(0, 5).map((b: any) => (
                  <div key={b.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">Coaching Session</p>
                      <p className="text-xs text-muted-foreground">{new Date(b.scheduled_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming sessions</p>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
