import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Video, Wallet, BarChart3 } from "lucide-react";

export default function CreatorDashboard() {
  const { user, profile } = useAuth();

  const { data: courses } = useQuery({
    queryKey: ["creator-courses", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*").eq("creator_id", user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: videos } = useQuery({
    queryKey: ["creator-videos", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("videos").select("*").eq("owner_id", user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: wallet } = useQuery({
    queryKey: ["creator-wallet", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("wallets").select("*").eq("user_id", user!.id).single();
      return data;
    },
    enabled: !!user,
  });

  const totalEnrollments = courses?.reduce((sum, c) => sum + (c.enrollment_count || 0), 0) || 0;

  const stats = [
    { label: "Published Courses", value: courses?.filter(c => c.is_published).length || 0, icon: <BookOpen className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
    { label: "Published Videos", value: videos?.filter(v => v.is_published).length || 0, icon: <Video className="h-5 w-5" />, color: "bg-secondary/10 text-secondary" },
    { label: "Total Enrollments", value: totalEnrollments, icon: <BarChart3 className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
    { label: "Wallet Balance", value: `$${wallet?.balance || 0}`, icon: <Wallet className="h-5 w-5" />, color: "bg-destructive/10 text-destructive" },
  ];

  return (
    <DashboardLayout role="creator">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Welcome, {profile?.full_name || "Creator"}! 🚀
          </h1>
          <p className="text-muted-foreground mt-1">Manage your courses and videos</p>
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
            <h3 className="font-display font-semibold text-foreground mb-4">My Courses</h3>
            {courses && courses.length > 0 ? (
              <div className="space-y-3">
                {courses.slice(0, 5).map((c: any) => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.enrollment_count} enrollments</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${c.is_published ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}>
                      {c.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No courses yet. Start creating!</p>
            )}
          </Card>

          <Card className="p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">My Videos</h3>
            {videos && videos.length > 0 ? (
              <div className="space-y-3">
                {videos.slice(0, 5).map((v: any) => (
                  <div key={v.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{v.title}</p>
                      <p className="text-xs text-muted-foreground">{v.view_count} views</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{v.is_free ? "Free" : `$${v.price}`}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No videos yet. Start uploading!</p>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
