import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is Coursevia?", a: "Coursevia is a multi-vendor marketplace for online courses, business videos, and coaching. Learners can buy courses, watch videos, and hire coaches. Coaches and creators can sell services and content." },
  { q: "How do I become a coach?", a: "Sign up, select 'I want to coach' during onboarding, then complete the verification process including ID, selfie, and phone verification. Once approved by admin, your profile will be visible." },
  { q: "What payment methods are supported?", a: "Coursevia supports manual bank transfer payments (with invoice upload) and is preparing for card payments. All payments are processed securely through the platform." },
  { q: "What commission does Coursevia take?", a: "Coursevia takes 5% commission on course sales and coaching bookings. Subscription revenue is kept by the platform." },
  { q: "Can free users watch videos?", a: "Free users can preview premium videos for 10 seconds. To watch full premium content, you need a Premium subscription." },
  { q: "How do withdrawals work?", a: "Coaches and creators can request withdrawals from their wallet balance. Admin reviews and approves withdrawal requests, then funds are transferred to the provided bank details." },
  { q: "Is my data safe?", a: "Yes. We use industry-standard security practices. All communication stays within the platform, and we verify coaches and creators through ID verification." },
  { q: "Can I share my phone number or email with coaches?", a: "No. Coursevia blocks external contact sharing to protect all users. All communication must stay within the platform's messaging system." },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-foreground text-center">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-center mt-4">Everything you need to know about Coursevia</p>

          <Accordion type="single" collapsible className="mt-12 space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-lg px-4">
                <AccordionTrigger className="text-left font-display font-medium text-foreground">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
}
