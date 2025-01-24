import { Brain, Target, Sparkles, CheckCircle, List, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function LandingPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero Section */}
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

        {/* Introduction Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                More Than Just Another Task Manager
              </h2>
              <p className="text-xl text-base-content/70 leading-relaxed">
                Clind is designed with your mental well-being in mind. We help
                you focus on what truly matters by combining proven productivity
                methods with a calming, intuitive interface.
              </p>
            </div>
            <div className="bg-base-100 rounded-3xl p-0 shadow-xl relative cursor-pointer group">
              <div className="relative">
                <Image
                  src="/showoff.gif"
                  alt="Clind Dashboard Preview"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group-hover:opacity-95"
                  priority
                  quality={100}
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                />
                <div
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    const modal = document.createElement("div");
                    modal.className =
                      "fixed inset-0 bg-black/80 z-50 p-8 flex items-center justify-center";

                    const img = document.createElement("img");
                    img.src = "/showoff.gif";
                    img.className =
                      "max-w-[90vw] max-h-[90vh] object-contain rounded-xl";

                    const motionDiv = document.createElement("div");
                    motionDiv.style.opacity = "0";
                    motionDiv.style.transform = "scale(0.9)";
                    motionDiv.style.transition = "all 0.3s ease-out";
                    motionDiv.appendChild(img);
                    modal.appendChild(motionDiv);

                    // Animate in
                    requestAnimationFrame(() => {
                      motionDiv.style.opacity = "1";
                      motionDiv.style.transform = "scale(1)";
                    });

                    const closeModal = () => {
                      motionDiv.style.opacity = "0";
                      motionDiv.style.transform = "scale(0.9)";
                      setTimeout(() => {
                        document.body.style.overflow = "auto";
                        modal.remove();
                      }, 300);
                    };

                    modal.addEventListener("click", (e) => {
                      if (e.target === modal) {
                        closeModal();
                      }
                    });

                    motionDiv.onclick = closeModal;

                    document.body.appendChild(modal);
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                >
                  <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ">
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">Click to play</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Priority Methods Section */}
        <motion.section
          className="grid md:grid-cols-2 gap-12 mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-base-100 p-8 rounded-3xl shadow-xl">
            <Star className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-4">The Priority Three Rule</h3>
            <p className="text-base-content/70 mb-6">
              Focus on your three most important tasks each day. This proven
              method helps you maintain clarity and achieve meaningful progress.
            </p>
            <ul className="space-y-3">
              {[
                "Drop ALL your mind tasks",
                "Identify top priorities",
                "Maintain pinpoint focus",
                "Achieve daily wins",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-base-100 p-8 rounded-3xl shadow-xl">
            <List className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-4">The 1-3-5 Rule</h3>
            <p className="text-base-content/70 mb-6">
              Structure your day with one major task, three medium tasks, and
              five small tasks for optimal productivity balance.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="badge badge-lg bg-primary text-primary-content font-bold shadow-md hover:shadow-lg transition-shadow">
                  1
                </div>
                <span className="text-base">
                  Major task for significant impact
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="badge badge-lg bg-primary/90 text-primary-content font-bold shadow-md hover:shadow-lg transition-shadow">
                  3
                </div>
                <span className="text-base">
                  Medium tasks to maintain momentum
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="badge badge-lg bg-primary/80 text-primary-content font-bold shadow-md hover:shadow-lg transition-shadow">
                  5
                </div>
                <span className="text-base">Small tasks for quick wins</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <FeatureCard
            icon={<Brain className="w-16 h-16 text-primary" />}
            title="Mental Clarity"
            description="Free your mind from the constant weight of remembering tasks"
          />
          <FeatureCard
            icon={<Target className="w-16 h-16 text-primary" />}
            title="Focused Progress"
            description="Achieve more by focusing on what truly moves the needle"
          />
          <FeatureCard
            icon={<Sparkles className="w-16 h-16 text-primary" />}
            title="Peace of Mind"
            description="Experience the calm that comes with organized productivity"
          />
        </motion.section>

        {/* Final CTA */}
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
            Join thousands who have discovered the power of organized thinking
            with Clind.
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

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center mb-16 sm:mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 sm:space-y-8 lg:space-y-10"
          >
            {/* ... existing content ... */}
          </motion.div>

          <motion.div
            className={`fixed inset-0 z-50 bg-base-100/95 transition-all duration-500 ease-in-out ${
              isExpanded
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }`}
            initial={false}
            animate={isExpanded ? { scale: 1 } : { scale: 0.8 }}
          >
            <motion.button
              className="absolute top-4 right-4 btn btn-circle btn-ghost text-xl"
              onClick={() => setIsExpanded(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
            <div className="h-full flex items-center justify-center p-4 sm:p-8">
              <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/mu5OVvIrNQM"
                  title="Experience Mental Clarity"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden bg-base-300 cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => setIsExpanded(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                <motion.span
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-primary text-white rounded-full font-bold shadow-xl flex items-center gap-2 sm:gap-3 text-base sm:text-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Expand View
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
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
      <p className="text-base-content/70 text-xl text-center leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
