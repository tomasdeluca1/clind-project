import { motion } from "framer-motion";
import { Check, Brain, Zap } from "lucide-react";
import ButtonSignIn from "./ButtonSignIn";

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps): JSX.Element {
  return (
    <motion.div
      className="card bg-base-200 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body items-center text-center">
        <div className="text-primary text-4xl mb-4">{icon}</div>
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </motion.div>
  );
}

export default function LandingPage(): JSX.Element {
  const features = [
    {
      icon: <Brain />,
      title: "Clear Your Mind",
      description:
        "Dump your thoughts and tasks into Clind and free up mental space for what matters.",
    },
    {
      icon: <Check />,
      title: "Stay Organized",
      description:
        "Keep track of your tasks with our intuitive and simple interface.",
    },
    {
      icon: <Zap />,
      title: "Boost Productivity",
      description:
        "Focus on your priorities and get more done with our task management system.",
    },
  ];

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Clear Tasks, Clean Mind
          </motion.h1>
          <motion.p
            className="py-6 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Streamline your thoughts, boost productivity, and achieve peace of
            mind with our intuitive task management app.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ButtonSignIn />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
