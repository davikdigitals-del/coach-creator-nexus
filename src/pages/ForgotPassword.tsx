import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success("Password reset link sent!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-display font-bold text-primary">Coursevia</Link>
          <h1 className="text-2xl font-display font-bold mt-4 text-foreground">Reset your password</h1>
          <p className="text-muted-foreground mt-1">We'll send you a reset link</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground">Check your email</h3>
              <p className="text-sm text-muted-foreground mt-2">
                We sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-11" disabled={loading}>
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          )}
        </div>

        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
