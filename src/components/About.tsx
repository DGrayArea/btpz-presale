import React from "react";
import { Brain, Shield, Scale, Gem, Cpu } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="card-highlight flex flex-col items-start cursor-pointer ">
    <div className="w-12 h-12 mb-4 rounded-lg bg-btpz-gold/10 flex items-center justify-center text-btpz-gold">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Optimized Consensus",
      description:
        "RoAI enhances the Raft consensus with machine learning for optimized leader selection and intelligent replication.",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description:
        "Advanced threat detection and anomaly recognition powered by distributed AI algorithms.",
    },
    {
      icon: Scale,
      title: "Smart Auto-Scaling",
      description:
        "Dynamic resource allocation based on network demands and predictive load analysis.",
    },
    {
      icon: Cpu,
      title: "Tasty Hybrid Rewards",
      description:
        "Earn rewards through both participation (PoS) and computational contribution (AI training).",
    },
    {
      icon: Gem,
      title: "Scarce & Valuable",
      description:
        "Limited 21M $BTPZ supply, inspired by Bitcoin's model with improved energy efficiency.",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            About <span className="text-gradient">BitcoinPizza</span> Token
          </h2>
          <p className="text-lg text-muted-foreground">
            BitcoinPizza Token ($BTPZ) combines blockchain technology with
            artificial intelligence through our revolutionary RoAI consensus
            mechanism. This AI-enhanced version of the Raft consensus protocol
            delivers superior performance, intelligent decision-making, and
            adaptive scaling for next-generation applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
