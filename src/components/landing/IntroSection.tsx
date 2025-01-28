import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function IntroSection() {
  return (
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
            Clind is designed with your mental well-being in mind. We help you
            focus on what truly matters by combining proven productivity methods
            with a calming, intuitive interface.
          </p>
        </div>
        <div className="bg-base-100 rounded-3xl p-0 shadow-xl relative cursor-pointer group">
          <div className="relative">
            <Image
              src="/showoff.gif"
              alt="Clind Dashboard Preview"
              width={600}
              height={400}
              className="rounded-xl shadow-lg hover:shadow-xl w-full transition-shadow duration-300 group-hover:opacity-95"
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
  );
}
