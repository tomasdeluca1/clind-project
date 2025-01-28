import { JSX } from "react";
import HeroSection from "./HeroSection";
import FeatureCard from "./FeatureCard";
import VideoSection from "./VideoSection";
import PricingSection from "./pricing/PricingSection";
import { Brain, Target, Sparkles, ListTodo, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import IntroSection from "./IntroSection";
import MethodsContainer from "./MethodsContainer";
import FinalCTA from "./FinalCTA";
import TestimonialsSection from "./TestimonialsSection";

export default function LandingPage(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: "Mental Clarity",
      description:
        "Clear your mind by organizing your thoughts and tasks effectively",
      features: [
        "Priority Three Rule method",
        "Visual task organization",
        "Focus mode",
        "Daily task limits",
      ],
    },

    {
      icon: <Sparkles className="w-12 h-12 text-primary" />,
      title: "Boost Productivity",
      description:
        "Transform your productivity with our intuitive task management",
      features: [
        "Quick task entry",
        "Drag and drop organization",
        "Task completion analytics",
        "Productivity insights",
      ],
    },
    {
      icon: <ListTodo className="w-12 h-12 text-primary" />,
      title: "Task Prioritization",
      description:
        "Use proven methods like Priority Three Rule and 1-3-5 Rule to organize your work",
      features: [
        "Priority-based organization",
        "Task categorization",
        "Multiple view options",
        "Smart task suggestions",
      ],
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Instant Focus",
      description:
        "Clear interface that helps you focus on what matters most right now",
      features: [
        "Distraction-free mode",
        "One-click prioritization",
        "Task filtering",
        "Quick actions",
      ],
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Team Collaboration",
      description:
        "Share tasks and track progress with your team (coming soon)",
      features: [
        "Team task sharing",
        "Progress tracking",
        "Role-based access",
        "Team analytics",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <HeroSection />
      </div>

      <section className="bg-base-100 py-24">
        <div className="container mx-auto px-4">
          <IntroSection />
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-base-100 to-base-200/70">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Our Methods</h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              We&#39;ve implemented proven productivity methods to help you
              manage your tasks effectively and maintain focus throughout your
              day.
            </p>
          </motion.div>
          <MethodsContainer />
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-base-200/70 to-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Why Choose Clind?</h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              Discover how Clind can transform your daily workflow and help you
              achieve more.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 mb-16 sm:mb-24">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TODO: Add video section back in */}
      {/* <section className="bg-base-200 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">See Clind in Action</h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              Watch how Clind can help you organize your tasks and maintain
              focus.
            </p>
          </motion.div>
          <div className="flex justify-center">
            <motion.button
              className="btn btn-primary btn-lg gap-2"
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Watch Demo
            </motion.button>
          </div>
          <VideoSection isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
      </section> */}
      <section className="py-24 bg-gradient-to-b from-base-200/70 to-base-100">
        <TestimonialsSection />
      </section>
      <section className="py-24 bg-gradient-to-b from-base-100 to-base-200/50">
        <div className="container mx-auto px-4">
          <PricingSection />
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-base-200/50 to-base-100">
        <div className="container mx-auto px-4">
          <FinalCTA />
        </div>
      </section>
    </div>
  );
}
