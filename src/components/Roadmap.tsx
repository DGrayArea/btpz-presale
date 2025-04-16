import React, { useRef, useEffect, useState } from "react";
import { Check } from "lucide-react";

// Roadmap animation with Intersection Observer
const RoadmapItem = ({
  phase,
  title,
  date,
  description,
  completed,
  position,
}: {
  phase: string;
  title: string;
  date: string;
  description: string;
  completed: boolean;
  position: "left" | "right";
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`mb-12 w-full flex ${position === "left" ? "justify-start" : "justify-end"} relative cursor-pointer `}
    >
      {/* Dot on timeline */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-btpz-gold rounded-full z-10 mt-6"></div>

      <div
        className={`w-5/12 ${
          isVisible
            ? "opacity-100 transform-none transition-all duration-700"
            : `opacity-0 ${position === "left" ? "-translate-x-12" : "translate-x-12"} transition-all duration-700`
        }`}
      >
        <div className="card-highlight">
          <span className="bg-btpz-gold/10 text-btpz-gold text-xs font-semibold px-2.5 py-1 rounded inline-block mb-2">
            {phase}
          </span>
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{date}</p>
          <p className="text-muted-foreground">{description}</p>

          {completed && (
            <div className="absolute top-3 right-3 bg-btpz-gold/10 p-1 rounded-full">
              <Check className="text-btpz-gold" size={16} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const roadmapItems = [
  {
    phase: "Phase 1",
    title: "Project Initialization",
    date: "Q2 2025",
    description:
      "Concept development, team formation, and technical research into AI consensus mechanisms.",
    completed: true,
    position: "left" as const,
  },
  {
    phase: "Phase 2",
    title: "Token Presale",
    date: "Q3 2025",
    description:
      "Initial token offering, community building, and strategic partnerships.",
    completed: false,
    position: "right" as const,
  },
  {
    phase: "Phase 3",
    title: "RoAI Consensus Development",
    date: "Q4 2025",
    description:
      "Core protocol development, AI layer integration, and testnet deployment.",
    completed: false,
    position: "left" as const,
  },
  {
    phase: "Phase 4",
    title: "Mainnet Launch",
    date: "Q1 2026",
    description:
      "Full network deployment, security audits, and initial dApp ecosystem.",
    completed: false,
    position: "right" as const,
  },
  {
    phase: "Phase 5",
    title: "Ecosystem Expansion",
    date: "Q2-Q3 2026",
    description:
      "Developer tools, cross-chain integration, and enterprise partnerships.",
    completed: false,
    position: "left" as const,
  },
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Our <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The journey from concept to a fully functional AI-powered blockchain
            ecosystem
          </p>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          {roadmapItems.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot">
                {item.completed && (
                  <Check className="text-btpz-gold" size={14} />
                )}
              </div>
              <div className="ml-3">
                <span className="bg-btpz-gold/10 text-btpz-gold text-xs font-semibold px-2.5 py-1 rounded inline-block mb-2">
                  {item.phase}
                </span>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.date}
                </p>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-btpz-gold/30 rounded-full"></div>

            <div className="flex flex-wrap">
              {roadmapItems.map((item, index) => (
                <RoadmapItem
                  key={index}
                  phase={item.phase}
                  title={item.title}
                  date={item.date}
                  description={item.description}
                  completed={item.completed}
                  position={item.position}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
