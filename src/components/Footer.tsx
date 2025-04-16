import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Github, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/80 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-btpz-gold text-2xl">🍕</span>
              <span className="font-bold text-xl">
                Bitcoin<span className="text-btpz-gold">Pizza</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              BitcoinPizza Token is revolutionizing blockchain technology with
              AI-powered consensus mechanisms for a smarter, more secure, and
              scalable future.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-btpz-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              {/* <a href="#" className="text-muted-foreground hover:text-btpz-gold transition-colors" aria-label="Discord">
                <Discord size={20} />
              </a> */}
              <a
                href="#"
                className="text-muted-foreground hover:text-btpz-gold transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-btpz-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Send size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-btpz-gold transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="text-muted-foreground hover:text-btpz-gold transition-colors"
                >
                  RoAI Benefits
                </a>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className="text-muted-foreground hover:text-btpz-gold transition-colors"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-muted-foreground hover:text-btpz-gold transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <Link
                  to="/presale"
                  className="text-muted-foreground hover:text-btpz-gold transition-colors"
                >
                  Presale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-btpz-gold transition-colors"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-btpz-gold transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-btpz-gold transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-btpz-gold transition-colors"
                >
                  Media Kit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-btpz-gold transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} BitcoinPizza Token. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-btpz-gold transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-btpz-gold transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-btpz-gold transition-colors"
            >
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
