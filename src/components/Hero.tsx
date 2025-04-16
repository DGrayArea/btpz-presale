import React, { useEffect, useState } from "react";
import { Download, Wallet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-btpz-gold/10 rounded-full filter blur-[100px] animate-spin-slow"></div>
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-btpz-orange/10 rounded-full filter blur-[80px] animate-spin-slow"
        style={{ animationDirection: "reverse" }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-block mb-3 py-1 px-3 rounded-full bg-secondary border border-btpz-gold/30 text-sm font-medium">
              <span className="mr-1.5">🍕</span> Next-Gen Blockchain Technology
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
              <span className="block leading-tight">
                Bitcoin<span className="text-gradient">Pizza</span> Token
              </span>
              <span className="block text-2xl md:text-3xl font-semibold text-muted-foreground mt-3">
                $BTPZ
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 font-medium max-w-2xl mx-auto">
              Smart. Secure. Scalable.
              <span className="block">Fueled by RoAI Consensus.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-base px-6 h-12" size="lg">
                <Download size={18} className="mr-2" /> Download Whitepaper
              </Button>
              <Link to="/presale">
                <Button
                  variant="outline"
                  className="group text-base px-6 h-12"
                  size="lg"
                >
                  <span>Join Presale</span>
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
            </div>
          </div>

          {/* Pizza coin animation */}
          <div
            className={`mt-16 mx-auto relative w-48 h-48 transition-all duration-1000 cursor-pointer ${isVisible ? "opacity-100 transform-none" : "opacity-0 scale-90"}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-gold animate-float"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center animate-pulse-glow">
              <div className="w-40 h-40 rounded-full border-4 border-btpz-gold/30"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-5xl">
              🍕
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
