import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Home, BookOpen, Video, Users, MessageSquare, CreditCard, Settings,
  LogOut, Bell, Calendar, BarChart3, Upload, Wallet, Shield, Menu, X,
  Star, Heart, UserCheck, FileText, Flag, Layers, Globe
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const learnerNav: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: <Home className="h-4 w-4" /> },
  { label: "My Courses", path: "/dashboard/courses", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Videos", path: "/dashboard/videos", icon: <Video className="h-4 w-4" /> },
  { label: "Bookings", path: "/dashboard/bookings", icon: <Calendar className="h-4 w-4" /> },
  { label: "Wishlist", path: "/dashboard/wishlist", icon: <Heart className="h-4 w-4" /> },
  { label: "Messages", path: "/dashboard/messages", icon: <MessageSquare className="h-4 w-4" /> },
  { label: "Payments", path: "/dashboard/payments", icon: <CreditCard className="h-4 w-4" /> },
  { label: "Subscription", path: "/dashboard/subscription", icon: <Star className="h-4 w-4" /> },
  { label: "Settings", path: "/dashboard/settings", icon: <Settings className="h-4 w-4" /> },
];

const coachNav: NavItem[] = [
  { label: "Dashboard", path: "/coach/dashboard", icon: <Home className="h-4 w-4" /> },
  { label: "Profile", path: "/coach/profile", icon: <UserCheck className="h-4 w-4" /> },
  { label: "Services", path: "/coach/services", icon: <Layers className="h-4 w-4" /> },
  { label: "Calendar", path: "/coach/calendar", icon: <Calendar className="h-4 w-4" /> },
  { label: "Bookings", path: "/coach/bookings", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Clients", path: "/coach/clients", icon: <Users className="h-4 w-4" /> },
  { label: "Messages", path: "/coach/messages", icon: <MessageSquare className="h-4 w-4" /> },
  { label: "Videos", path: "/coach/videos", icon: <Video className="h-4 w-4" /> },
  { label: "Wallet", path: "/coach/wallet", icon: <Wallet className="h-4 w-4" /> },
  { label: "Reviews", path: "/coach/reviews", icon: <Star className="h-4 w-4" /> },
  { label: "Settings", path: "/coach/settings", icon: <Settings className="h-4 w-4" /> },
];

const creatorNav: NavItem[] = [
  { label: "Dashboard", path: "/creator/dashboard", icon: <Home className="h-4 w-4" /> },
  { label: "Upload Course", path: "/creator/upload-course", icon: <Upload className="h-4 w-4" /> },
  { label: "Upload Video", path: "/creator/upload-video", icon: <Video className="h-4 w-4" /> },
  { label: "My Content", path: "/creator/content", icon: <FileText className="h-4 w-4" /> },
  { label: "Analytics", path: "/creator/analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Messages", path: "/creator/messages", icon: <MessageSquare className="h-4 w-4" /> },
  { label: "Wallet", path: "/creator/wallet", icon: <Wallet className="h-4 w-4" /> },
  { label: "Settings", path: "/creator/settings", icon: <Settings className="h-4 w-4" /> },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <Home className="h-4 w-4" /> },
  { label: "Users", path: "/admin/users", icon: <Users className="h-4 w-4" /> },
  { label: "Courses", path: "/admin/courses", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Videos", path: "/admin/videos", icon: <Video className="h-4 w-4" /> },
  { label: "Coaches", path: "/admin/coaches", icon: <UserCheck className="h-4 w-4" /> },
  { label: "Bookings", path: "/admin/bookings", icon: <Calendar className="h-4 w-4" /> },
  { label: "Payments", path: "/admin/payments", icon: <CreditCard className="h-4 w-4" /> },
  { label: "Wallets", path: "/admin/wallets", icon: <Wallet className="h-4 w-4" /> },
  { label: "Withdrawals", path: "/admin/withdrawals", icon: <Wallet className="h-4 w-4" /> },
  { label: "Verifications", path: "/admin/verifications", icon: <Shield className="h-4 w-4" /> },
  { label: "Categories", path: "/admin/categories", icon: <Layers className="h-4 w-4" /> },
  { label: "Reports", path: "/admin/reports", icon: <Flag className="h-4 w-4" /> },
  { label: "Messages", path: "/admin/messages", icon: <MessageSquare className="h-4 w-4" /> },
  { label: "Analytics", path: "/admin/analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Settings", path: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "learner" | "coach" | "creator" | "admin";
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navMap = { learner: learnerNav, coach: coachNav, creator: creatorNav, admin: adminNav };
  const navItems = navMap[role];
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <Link to="/" className="text-xl font-display font-bold text-primary">Coursevia</Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {(profile?.full_name || user?.email || "U")[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{profile?.full_name || "User"}</p>
                <p className="text-xs text-muted-foreground capitalize">{roleLabel}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur border-b border-border px-4 lg:px-6 h-14 flex items-center justify-between">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="font-display font-semibold text-foreground">{roleLabel} Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(role === "admin" ? "/admin/dashboard" : "/dashboard")}>
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
