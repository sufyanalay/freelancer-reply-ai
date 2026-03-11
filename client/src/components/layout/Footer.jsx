import { Link } from "react-router-dom";
import { MessageSquareReply } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Logo + Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <MessageSquareReply size={14} />
              </div>
              <span className="font-bold text-lg tracking-tight">FreelancerReply AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering influencers with AI-driven replies to handle clients professionally.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
            <Link to="/tool" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tool</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} FreelancerReply AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for influencers, by creators.
          </p>
        </div>
      </div>
    </footer>
  );
}