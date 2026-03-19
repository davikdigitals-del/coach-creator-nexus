import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BookOpen, Users, Video, GraduationCap } from "lucide-react";

type RoleOption = {
  role: "learner" | "coach" | "creator";
  title: string;
  description: string;
  icon: React.ReactNode;
};

const roleOptions: RoleOption[] = [
  {
    role: "learner",
    title: "I want to learn",
    description: "Browse courses, watch videos, and hire coaches",
    icon: <GraduationCap className="h-8 w-8" />,
  },
  {
    role: "coach",
    title: "I want to coach",
    description: "Offer coaching services, hold sessions, and earn",
    icon: <Users className="h-8 w-8" />,
  },
  {
    role: "creator",
    title: "I want to create content",
    description: "Upload courses and videos, build your audience, and earn",
    icon: <Video className="h-8 w-8" />,
  },
];

export default function Onboarding() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!selectedRole || !user) return;
    setLoading(true);

    try {
      // Insert role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({ user_id: user.id, role: selectedRole as any });

      if (roleError) throw roleError;

      // Update profile onboarding status
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("user_id", user.id);

      if (profileError) throw profileError;

      // If coach, create coach profile
      if (selectedRole === "coach") {
        await supabase.from("coach_profiles").insert({ user_id: user.id });
      }

      await refreshProfile();
      toast.success("Welcome to Coursevia!");

      const redirectMap: Record<string, string> = {
        learner: "/dashboard",
        coach: "/coach/dashboard",
        creator: "/creator/dashboard",
      };
      navigate(redirectMap[selectedRole] || "/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Welcome to Coursevia!</h1>
          <p className="text-muted-foreground mt-2">What brings you here? Choose your primary role.</p>
        </div>

        <div className="space-y-3">
          {roleOptions.map((option) => (
            <button
              key={option.role}
              onClick={() => setSelectedRole(option.role)}
              className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left ${
                selectedRole === option.role
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className={`p-3 rounded-lg ${selectedRole === option.role ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {option.icon}
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          className="w-full h-12 mt-6 text-base"
          disabled={!selectedRole || loading}
        >
          {loading ? "Setting up..." : "Continue"}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          You can always change your role or add more roles later in settings.
        </p>
      </div>
    </div>
  );
}
