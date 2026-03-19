import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4 prose prose-neutral dark:prose-invert">
          <h1 className="text-4xl font-display font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>

          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly: name, email, phone, country, profile details, and verification documents (for coaches and creators).</p>

          <h2>2. How We Use Your Information</h2>
          <p>Your information is used to provide platform services, process payments, verify identities, and improve user experience.</p>

          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures. Verification documents are stored securely and accessible only to authorized admin personnel.</p>

          <h2>4. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with service providers necessary for platform operations.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information. Contact support for data requests.</p>

          <h2>6. Cookies</h2>
          <p>We use essential cookies for authentication and session management. Analytics cookies help us improve the platform.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
