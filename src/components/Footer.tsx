import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
              <MessageSquare size={14} className="text-primary-50" />
            </div>
            <span className="font-bold text-text text-[15px] tracking-tight">Chattie</span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {[
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-muted hover:text-text transition-colors duration-150 relative group py-0.5"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary-600 transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/signup"
            className="cursor-pointer text-sm font-semibold bg-primary-800 hover:bg-primary-600 text-primary-50 px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            Get Started 
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px bg-border/20" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Chattie. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Built with ❤️ for the modern web
          </p>
        </div>
      </div>
    </footer>
  );
}