import React from "react";
import { Bitcoin, BarChart, Cloud } from "lucide-react";

interface UseCaseCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="card-highlight flex flex-col items-start h-full cursor-pointer ">
      <div className="w-16 h-16 mb-5 rounded-lg bg-btpz-gold/10 flex items-center justify-center text-btpz-gold">
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const UseCases = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Use <span className="text-gradient">Cases</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            BitcoinPizza Token enables a new generation of decentralized
            applications powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UseCaseCard
            icon={Bitcoin}
            title="AI-Enhanced DeFi"
            description="Smart lending protocols that use machine learning to optimize interest rates, predict market movements, and automatically balance portfolios for maximum returns while minimizing risk."
          />

          <UseCaseCard
            icon={BarChart}
            title="Intelligent Smart Contracts"
            description="Self-optimizing contracts that can adapt to changing conditions, detect potential exploits before they happen, and automatically suggest improvements to code efficiency."
          />

          <UseCaseCard
            icon={Cloud}
            title="Federated AI Learning"
            description="Decentralized machine learning networks where models are trained across distributed nodes while preserving data privacy and ensuring fair compensation for computational resources."
          />
        </div>
      </div>
    </section>
  );
};

export default UseCases;
