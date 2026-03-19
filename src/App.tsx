import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./pages/Onboarding";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Videos from "./pages/Videos";
import Coaches from "./pages/Coaches";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AdminLogin from "./pages/AdminLogin";

import LearnerDashboard from "./pages/dashboard/LearnerDashboard";
import CoachDashboard from "./pages/dashboard/CoachDashboard";
import CreatorDashboard from "./pages/dashboard/CreatorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Learner Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><LearnerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/*" element={<ProtectedRoute><LearnerDashboard /></ProtectedRoute>} />

            {/* Coach Dashboard */}
            <Route path="/coach/dashboard" element={<ProtectedRoute requiredRole="coach"><CoachDashboard /></ProtectedRoute>} />
            <Route path="/coach/*" element={<ProtectedRoute requiredRole="coach"><CoachDashboard /></ProtectedRoute>} />

            {/* Creator Dashboard */}
            <Route path="/creator/dashboard" element={<ProtectedRoute requiredRole="creator"><CreatorDashboard /></ProtectedRoute>} />
            <Route path="/creator/*" element={<ProtectedRoute requiredRole="creator"><CreatorDashboard /></ProtectedRoute>} />

            {/* Admin Dashboard */}
            <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
