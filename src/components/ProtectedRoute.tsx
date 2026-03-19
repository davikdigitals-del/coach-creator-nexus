import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type AppRole = "learner" | "coach" | "creator" | "admin";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: AppRole;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isReady, roles, profile } = useAuth();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (profile && !profile.onboarding_completed && roles.length === 0) {
    return <Navigate to="/onboarding" replace />;
  }

  if (requiredRole && !roles.includes(requiredRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
