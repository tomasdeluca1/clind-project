import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { JSX } from "react";

export default function HeroSection(): JSX.Element {
  return (
    <motion.header
      className="text-center mb-24"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link href="/api/auth/login">
        <motion.div
          className="inline-block mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/miniatura.png"
            alt="Clind Logo"
            width={100}
            height={100}
            className="mx-auto rounded-2xl shadow-xl"
            priority
          />
        </motion.div>
      </Link>
      <h1 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
        Simplify Your Tasks, Clear Your Mind
      </h1>
      <p className="text-2xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
        Transform your daily chaos into calm, organized productivity
      </p>
      <motion.div className="mt-8" whileHover={{ scale: 1.02 }}>
        <Link
          href="/api/auth/login"
          className="btn btn-primary btn-lg text-white gap-3 text-xl"
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
