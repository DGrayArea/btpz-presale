import React from "react";
import { Cpu, Brain, ShieldCheck, BarChart4 } from "lucide-react";

const RoAI = () => {
  return (
    <section id="benefits" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute -left-32 top-1/3 w-64 h-64 bg-btpz-gold/10 rounded-full filter blur-[80px]"></div>
      <div className="absolute -right-32 bottom-1/3 w-80 h-80 bg-btpz-orange/10 rounded-full filter blur-[100px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ro<span className="text-gradient">AI</span> Benefits
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our AI-enhanced Raft consensus protocol delivers unprecedented
            improvements in speed, security, and scalability for enterprise
            blockchain applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-card p-6 hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all cursor-pointer ">
                <Brain className="text-btpz-gold mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">
                  Predictive Leader Selection
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI algorithms select optimal leader nodes based on performance
                  history and network conditions
                </p>
              </div>

              <div className="glass-card p-6 hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all cursor-pointer ">
                <ShieldCheck className="text-btpz-gold mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">
                  AI Anomaly Detection
                </h3>
                <p className="text-muted-foreground text-sm">
                  Continuous monitoring identifies and mitigates potential
                  threats before they impact the network
                </p>
              </div>

              <div className="glass-card p-6 hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all cursor-pointer ">
                <BarChart4 className="text-btpz-gold mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">Smart Caching</h3>
                <p className="text-muted-foreground text-sm">
                  Intelligent data caching anticipates frequently accessed data
                  for faster transaction processing
                </p>
              </div>

              <div className="glass-card p-6 hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all cursor-pointer ">
                <Cpu className="text-btpz-gold mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">
                  Network Optimization
                </h3>
                <p className="text-muted-foreground text-sm">
                  Real-time traffic analysis and routing adjustments maximize
                  throughput and minimize latency
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative mx-auto w-full max-w-md">
              {/* Animated hexagon grid background */}
              <div className="absolute inset-0 bg-gradient-dark rounded-xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFD700" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    backgroundSize: "30px 30px",
                    animation: "shimmer 20s linear infinite",
                  }}
                ></div>
              </div>

              {/* Central RoAI diagram */}
              <div className="relative p-8 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-btpz-gold/10 flex items-center justify-center mb-4 animate-pulse-glow">
                  <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center text-black font-bold text-xl">
                    RoAI
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-center">
                  <h3 className="text-xl font-bold">RoAI Consensus</h3>
                  <p className="text-muted-foreground">
                    Our AI-enhanced consensus protocol that delivers up to 10x
                    performance improvement over traditional methods
                  </p>

                  <div className="pt-4 grid grid-cols-2 gap-4 w-full max-w-xs mx-auto">
                    <div className="bg-btpz-gold/10 rounded-lg py-2 px-3">
                      <div className="text-btpz-gold font-semibold text-2xl">
                        10x
                      </div>
                      <div className="text-xs">Faster</div>
                    </div>
                    <div className="bg-btpz-gold/10 rounded-lg py-2 px-3">
                      <div className="text-btpz-gold font-semibold text-2xl">
                        99.9%
                      </div>
                      <div className="text-xs">Uptime</div>
                    </div>
                    <div className="bg-btpz-gold/10 rounded-lg py-2 px-3">
                      <div className="text-btpz-gold font-semibold text-2xl">
                        60%
                      </div>
                      <div className="text-xs">Less Energy</div>
                    </div>
                    <div className="bg-btpz-gold/10 rounded-lg py-2 px-3">
                      <div className="text-btpz-gold font-semibold text-2xl">
                        24/7
                      </div>
                      <div className="text-xs">Monitoring</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoAI;
