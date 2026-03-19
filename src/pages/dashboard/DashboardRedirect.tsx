import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardRedirect() {
  const { roles, isReady } = useAuth();
  const navigate = useNavigate();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Redirect based on primary role
  if (roles.includes("admin")) {
    navigate("/admin/dashboard", { replace: true });
  } else if (roles.includes("coach")) {
    navigate("/coach/dashboard", { replace: true });
  } else if (roles.includes("creator")) {
    navigate("/creator/dashboard", { replace: true });
  } else {
    // Default: show learner dashboard
    return null; // Will be handled by the route rendering LearnerDashboard
  }

  return null;
}
