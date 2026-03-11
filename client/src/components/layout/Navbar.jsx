import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquareReply } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./Navbar.css";

export function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/tool", label: "Tool" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <MessageSquareReply size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight">FreelancerReply AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={location.pathname === link.href ? "active-link" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 mobile-header-right">
          <Button asChild size="sm" className="try-free-btn rounded-full shadow-lg hover:shadow-xl transition-all">
            <Link to="/tool">Try It Free</Link>
          </Button>

          <button
            className={`hamburger-btn ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="hamburger-icon">
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={location.pathname === link.href ? "active-link" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}