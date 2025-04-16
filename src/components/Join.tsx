
import React from 'react';
import { ArrowRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Join = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-btpz-black to-btpz-black/70 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
          animation: 'shimmer 15s linear infinite'
        }}></div>
      </div>
      
      {/* Gold gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-gold opacity-10 blur-[50px] animate-spin-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-gold opacity-10 blur-[80px] animate-spin-slow" style={{animationDirection: 'reverse'}}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Join the Pizza <span className="text-gradient">Revolution</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of the future of blockchain technology powered by artificial intelligence. Join our community today!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/presale">
              <Button className="btn-primary text-base px-8 h-12 group" size="lg">
                <Wallet className="mr-2" size={18} />
                <span>Join Presale</span>
              </Button>
            </Link>
            <Button variant="outline" className="text-base px-8 h-12 group" size="lg">
              <span>Read Whitepaper</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="bg-secondary/60 backdrop-blur-sm rounded-lg p-4 border border-btpz-gold/20">
              <div className="text-2xl font-bold text-btpz-gold">21M</div>
              <div className="text-sm text-muted-foreground">Max Supply</div>
            </div>
            <div className="bg-secondary/60 backdrop-blur-sm rounded-lg p-4 border border-btpz-gold/20">
              <div className="text-2xl font-bold text-btpz-gold">10x</div>
              <div className="text-sm text-muted-foreground">Performance</div>
            </div>
            <div className="bg-secondary/60 backdrop-blur-sm rounded-lg p-4 border border-btpz-gold/20">
              <div className="text-2xl font-bold text-btpz-gold">60%</div>
              <div className="text-sm text-muted-foreground">Energy Savings</div>
            </div>
            <div className="bg-secondary/60 backdrop-blur-sm rounded-lg p-4 border border-btpz-gold/20">
              <div className="text-2xl font-bold text-btpz-gold">Q3 2025</div>
              <div className="text-sm text-muted-foreground">Presale</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
