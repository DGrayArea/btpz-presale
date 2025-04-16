import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Download, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/90 backdrop-blur-md border-b border-border"
          : "py-5"
      }`}
    >
      <div className=" mx-auto px-9 md:px-12 flex items-center justify-between mb-3 md:mb-0">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-btpz-gold text-3xl">🍕</span>
          <span className="font-bold text-xl md:text-2xl">
            Bitcoin<span className="text-btpz-gold">Pizza</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium hover:text-btpz-gold transition-colors"
          >
            Home
          </Link>
          <a
            href="#about"
            className="text-sm font-medium hover:text-btpz-gold transition-colors"
          >
            About
          </a>
          <a
            href="#benefits"
            className="text-sm font-medium hover:text-btpz-gold transition-colors"
          >
            Benefits
          </a>
          <a
            href="#roadmap"
            className="text-sm font-medium hover:text-btpz-gold transition-colors"
          >
            Roadmap
          </a>
          <a
            href="#faq"
            className="text-sm font-medium hover:text-btpz-gold transition-colors"
          >
            FAQ
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Download size={16} />
            <span>Whitepaper</span>
          </Button>
          <Link to="/presale">
            <Button className="bg-gradient-gold text-black hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]">
              <Wallet size={16} className="mr-1.5" /> Connect Wallet
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#about"
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#benefits"
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Benefits
            </a>
            <a
              href="#roadmap"
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roadmap
            </a>
            <a
              href="#faq"
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="flex flex-col gap-3 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="justify-center gap-1.5"
              >
                <Download size={16} />
                <span>Whitepaper</span>
              </Button>
              <Link to="/presale" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-gold text-black justify-center">
                  <Wallet size={16} className="mr-1.5" /> Connect Wallet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
