import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-foreground text-center">Contact Us</h1>
          <p className="text-muted-foreground text-center mt-4">We'd love to hear from you</p>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground">Get in touch</h2>
              <p className="text-muted-foreground mt-2">Have a question? Send us a message and we'll respond as soon as possible.</p>

              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10"><Mail className="h-5 w-5 text-primary" /></div>
                  <span className="text-foreground">support@coursevia.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10"><MapPin className="h-5 w-5 text-primary" /></div>
                  <span className="text-foreground">Global - Online Platform</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-xl p-6">
              <div>
                <Label>Name</Label>
                <Input placeholder="Your name" required className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" required className="mt-1" />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea placeholder="How can we help?" rows={4} required className="mt-1" />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
