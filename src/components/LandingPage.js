import { Brain, Target, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <motion.header
          className="text-center mb-16 sm:mb-24 lg:mb-32"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/api/auth/login">
            <motion.div
              className="inline-block mb-6 sm:mb-8"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
            >
              <Image
                src="/miniatura.png"
                alt="Clind Logo"
                width={80}
                height={80}
                className="mx-auto rounded-2xl shadow-xl sm:w-[100px] sm:h-[100px]"
              />
            </motion.div>
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
            Clear Mind, Clear Focus
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-base-content/80 max-w-3xl mx-auto leading-relaxed font-light">
            Let go of mental noise. Focus on what moves you forward.
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center mb-16 sm:mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 sm:space-y-8 lg:space-y-10"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Release Your Mental Load
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-base-content/70 leading-relaxed font-light">
              Stop holding everything in your head. Clind provides a clean space
              to unload your thoughts and focus only on what&apos;s essential.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/api/auth/login"
                className="inline-flex items-center btn btn-primary text-white gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl btn-md sm:btn-lg"
              >
                Free Your Mind
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
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
          </motion.div>
          <motion.div
            className="relative rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden bg-base-300"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="aspect-video relative">
              <iframe
                src="https://www.youtube.com/embed/mu5OVvIrNQM"
                title="Experience Mental Clarity"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              ></iframe>
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                <motion.span
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-primary text-white rounded-full font-bold shadow-xl flex items-center gap-2 sm:gap-3 text-base sm:text-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo
                </motion.span>
              </div> */}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-24 lg:mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <FeatureCard
            icon={
              <Brain className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary" />
            }
            title="Brain Dump"
            description="Release every thought weighing on your mind into a secure digital space."
          />
          <FeatureCard
            icon={
              <Target className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary" />
            }
            title="Essential Focus"
            description="Identify and concentrate on the few tasks that truly drive progress."
          />
          <FeatureCard
            icon={
              <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary" />
            }
            title="Mental Space"
            description="Experience the clarity that comes from having room to think."
          />
        </motion.div>

        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-10">
            Ready for Mental Freedom?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-base-content/70 mb-8 sm:mb-10 lg:mb-12 leading-relaxed font-light">
            Join those who have discovered the power of a decluttered mind.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/api/auth/login"
              className="btn btn-primary text-white gap-2 sm:gap-3 text-base sm:text-lg"
            >
              Start Fresh
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
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
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-base-100 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -8 }}
    >
      <div className="flex justify-center mb-8">{icon}</div>
      <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>
      <p className="text-base-content/70 text-xl text-center leading-relaxed font-light">
        {description}
      </p>
    </motion.div>
  );
}
