
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is BitcoinPizza Token?",
    answer: "BitcoinPizza Token ($BTPZ) is a next-generation cryptocurrency that combines blockchain technology with artificial intelligence through our innovative RoAI consensus mechanism. It's designed to be more energy-efficient, secure, and scalable than traditional blockchain networks."
  },
  {
    question: "What is RoAI Consensus?",
    answer: "RoAI (Raft-optimized Artificial Intelligence) is our proprietary consensus mechanism that enhances the Raft protocol with machine learning algorithms. This enables intelligent leader selection, anomaly detection, and network optimization for a more efficient and secure blockchain."
  },
  {
    question: "When is the token presale?",
    answer: "The $BTPZ token presale is scheduled to begin in Q3 2025. Join our community channels to receive the latest updates and secure your spot in our whitelist."
  },
  {
    question: "What blockchain does BTPZ run on?",
    answer: "BitcoinPizza Token is built on our own custom blockchain infrastructure powered by the RoAI consensus mechanism. It's designed from the ground up to support AI-enhanced applications with high throughput and security."
  },
  {
    question: "What makes BTPZ different from other cryptocurrencies?",
    answer: "BTPZ stands out through its AI-powered consensus mechanism, which enables more intelligent decision-making, predictive analysis, and adaptive scaling. Additionally, our hybrid reward system incentivizes both network participation and computational contribution to AI training."
  },
  {
    question: "What is the total supply of BTPZ tokens?",
    answer: "The total supply of BTPZ is capped at 21 million tokens, inspired by Bitcoin's model. This creates scarcity while our more efficient consensus mechanism reduces environmental impact."
  },
  {
    question: "How can I participate in the BTPZ ecosystem?",
    answer: "You can participate by joining our presale, providing liquidity once the token is live, running a validator node, or developing applications on our platform. We welcome developers, investors, and enthusiasts alike."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about BitcoinPizza Token and our technology
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6 py-1">
                <AccordionTrigger className="text-left font-semibold py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
