import { motion } from "framer-motion";
import { JSX } from "react";

interface VideoSectionProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export default function VideoSection({
  isExpanded,
  setIsExpanded,
}: VideoSectionProps): JSX.Element {
  return (
    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center mb-16 sm:mb-24 lg:mb-32">
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
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
