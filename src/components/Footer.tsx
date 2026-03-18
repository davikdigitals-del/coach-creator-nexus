import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/70 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-7 w-7 text-primary" />
              <span className="font-display text-lg font-bold text-background">
                Course<span className="text-primary">via</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Courses, Coaching, and Business Growth in One Platform. Learn from experts, hire coaches, and grow your career.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-background mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="hover:text-background transition-colors duration-150">Browse Courses</Link></li>
              <li><Link to="/videos" className="hover:text-background transition-colors duration-150">Business Videos</Link></li>
              <li><Link to="/coaches" className="hover:text-background transition-colors duration-150">Find a Coach</Link></li>
              <li><Link to="/pricing" className="hover:text-background transition-colors duration-150">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-background mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-background transition-colors duration-150">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors duration-150">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-background transition-colors duration-150">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-background transition-colors duration-150">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-background transition-colors duration-150">About Coursevia</Link></li>
              <li><Link to="/blog" className="hover:text-background transition-colors duration-150">Blog</Link></li>
              <li><Link to="/how-it-works" className="hover:text-background transition-colors duration-150">How It Works</Link></li>
              <li><Link to="/community" className="hover:text-background transition-colors duration-150">Community Guidelines</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center text-sm">
          <p>© 2026 Coursevia. All rights reserved. Platform fee: 5% on all transactions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
