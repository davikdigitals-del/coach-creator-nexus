import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Users, BookOpen, Video, CreditCard, Shield, Wallet, Calendar, Flag } from "lucide-react";

export default function AdminDashboard() {
  const { profile } = useAuth();

  const { data: usersCount } = useQuery({
    queryKey: ["admin-users-count"],
    queryFn: async () => {
      const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: coursesCount } = useQuery({
    queryKey: ["admin-courses-count"],
    queryFn: async () => {
      const { count } = await supabase.from("courses").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: videosCount } = useQuery({
    queryKey: ["admin-videos-count"],
    queryFn: async () => {
      const { count } = await supabase.from("videos").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: pendingVerifications } = useQuery({
    queryKey: ["admin-pending-verifications"],
    queryFn: async () => {
      const { count } = await supabase.from("verification_requests").select("*", { count: "exact", head: true }).eq("status", "pending");
      return count || 0;
    },
  });

  const { data: pendingWithdrawals } = useQuery({
    queryKey: ["admin-pending-withdrawals"],
    queryFn: async () => {
      const { count } = await supabase.from("withdrawal_requests").select("*", { count: "exact", head: true }).eq("status", "pending");
      return count || 0;
    },
  });

  const { data: totalPayments } = useQuery({
    queryKey: ["admin-total-payments"],
    queryFn: async () => {
      const { data } = await supabase.from("payments").select("amount").eq("status", "completed");
      return data?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
    },
  });

  const { data: reportsCount } = useQuery({
    queryKey: ["admin-reports-count"],
    queryFn: async () => {
      const { count } = await supabase.from("reports").select("*", { count: "exact", head: true }).eq("status", "pending");
      return count || 0;
    },
  });

  const { data: bookingsCount } = useQuery({
    queryKey: ["admin-bookings-count"],
    queryFn: async () => {
      const { count } = await supabase.from("bookings").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const stats = [
    { label: "Total Users", value: usersCount || 0, icon: <Users className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
    { label: "Total Courses", value: coursesCount || 0, icon: <BookOpen className="h-5 w-5" />, color: "bg-secondary/10 text-secondary" },
    { label: "Total Videos", value: videosCount || 0, icon: <Video className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
    { label: "Total Revenue", value: `$${totalPayments || 0}`, icon: <CreditCard className="h-5 w-5" />, color: "bg-destructive/10 text-destructive" },
    { label: "Pending Verifications", value: pendingVerifications || 0, icon: <Shield className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
    { label: "Pending Withdrawals", value: pendingWithdrawals || 0, icon: <Wallet className="h-5 w-5" />, color: "bg-secondary/10 text-secondary" },
    { label: "Total Bookings", value: bookingsCount || 0, icon: <Calendar className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
    { label: "Open Reports", value: reportsCount || 0, icon: <Flag className="h-5 w-5" />, color: "bg-destructive/10 text-destructive" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Admin Dashboard 🛡️
          </h1>
          <p className="text-muted-foreground mt-1">Platform overview and management</p>
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
      </div>
    </DashboardLayout>
  );
}
