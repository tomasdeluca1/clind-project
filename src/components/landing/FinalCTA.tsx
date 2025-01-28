import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function FinalCTA() {
  return (
    <motion.section
      className="text-center max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <h2 className="text-4xl font-bold mb-6">
        Ready to Experience True Mental Clarity?
      </h2>
      <p className="text-xl text-base-content/70 mb-8">
        Join thousands who have discovered the power of organized thinking with
        Clind.
      </p>
      <motion.div whileHover={{ scale: 1.02 }}>
        <Link
          href="/api/auth/login"
          className="btn btn-primary btn-lg text-white gap-3 text-xl"
        >
          Begin Your Transformation
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
    </motion.section>
  );
}
