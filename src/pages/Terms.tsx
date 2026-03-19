import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4 prose prose-neutral dark:prose-invert">
          <h1 className="text-4xl font-display font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using Coursevia, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>

          <h2>2. User Accounts</h2>
          <p>You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials.</p>

          <h2>3. Platform Commission</h2>
          <p>Coursevia charges a 5% commission on all course sales and coaching bookings. Subscription revenue is retained by the platform.</p>

          <h2>4. Content Policy</h2>
          <p>Users must not upload illegal, harmful, or infringing content. Coursevia reserves the right to remove any content that violates these terms.</p>

          <h2>5. Communication Policy</h2>
          <p>All communication between users must remain within the platform. Sharing personal contact information (phone numbers, emails, external links) is strictly prohibited.</p>

          <h2>6. Payments & Refunds</h2>
          <p>All payments are processed through the platform. Refund requests are handled on a case-by-case basis by the admin team.</p>

          <h2>7. Verification</h2>
          <p>Coaches and creators must complete identity verification. Coursevia reserves the right to reject or suspend accounts that fail verification.</p>

          <h2>8. Limitation of Liability</h2>
          <p>Coursevia is not liable for any indirect, incidental, or consequential damages arising from use of the platform.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
