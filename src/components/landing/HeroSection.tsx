import Link from "next/link";
import { motion } from "framer-motion";
import { ListStart } from "lucide-react";

export default function HeroSection() {
  return (
    <motion.header
      className="flex flex-col items-center text-center mb-24 px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link href="/api/auth/login">
        <motion.div
          className="mb-6 rounded-full p-5 bg-base-200 border-4 border-primary shadow-sm transition-all hover:shadow-md hover:scale-105"
          whileTap={{ scale: 0.95 }}
        >
          <ListStart className="w-20 h-20 text-primary" />
        </motion.div>
      </Link>

      <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent drop-shadow-md">
        Simplify Your Tasks, Clear Your Mind
      </h1>

      <p className="text-lg lg:text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
        Transform your daily chaos into calm, organized productivity.
      </p>

      <motion.div className="mt-8" whileHover={{ scale: 1.05 }}>
        <Link
          href="/api/auth/login"
          className="btn btn-primary btn-lg text-white flex items-center gap-3 px-6 py-3 rounded-lg shadow-md transition-all hover:shadow-xl hover:bg-opacity-90"
        >
          Start Your Journey to Clarity
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </motion.div>
    </motion.header>
  );
}
