import { CheckCircle, List, Target } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-primary">Clind</span>
          </h1>
          <p className="text-xl text-base-content/70">
            Clear Tasks, Clean Mind
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-6">
              Simplify Your Life, Task by Task
            </h2>
            <p className="text-lg mb-6">
              Clind: Where clarity meets productivity. Effortlessly organize,
              prioritize, and focus on what truly matters. Experience the power
              of a decluttered mind.
            </p>
            <Link
              href="/api/auth/login"
              className="btn btn-primary text-white btn-lg"
            >
              Start Clearing Your Mind
            </Link>
          </motion.div>
          <motion.div
            className="bg-base-200 p-6 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              Clear Your Mind: Quick Tutorial
            </h3>
            <div className="relative aspect-video">
              <iframe
                src="https://www.youtube.com/embed/mu5OVvIrNQM"
                title="Clind Tutorial Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <span className="text-white text-lg font-semibold bg-primary px-4 py-2 rounded-full shadow-md">
                  Watch Tutorial
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FeatureCard
            icon={<List className="w-12 h-12 text-primary" />}
            title="Brain Dump"
            description="Quickly jot down all your tasks without overthinking. Free your mind from the clutter of remembering everything."
          />
          <FeatureCard
            icon={<Target className="w-12 h-12 text-primary" />}
            title="Daily Focus"
            description="Choose up to 3 priority tasks each day. Stay focused on what's truly important without getting overwhelmed."
          />
          <FeatureCard
            icon={<CheckCircle className="w-12 h-12 text-primary" />}
            title="Sense of Achievement"
            description="Mark tasks as complete and watch your productivity soar. Celebrate the small wins that lead to big results."
          />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-6">
            Ready to Experience Mental Clarity?
          </h2>
          <p className="text-lg mb-8">
            Join Clind today and transform the way you manage your tasks and
            thoughts.
          </p>
          <Link
            href="/api/auth/login"
            className="btn btn-primary text-white btn-lg"
          >
            Get Started for Free
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-base-200 p-6 rounded-lg shadow-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-base-content/70 text-center">{description}</p>
    </motion.div>
  );
}
