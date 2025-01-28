import { motion } from "framer-motion";
import { JSX } from "react";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  features?: string[];
}

export default function FeatureCard({
  icon,
  title,
  description,
  features = [],
}: FeatureCardProps): JSX.Element {
  return (
    <motion.div
      className="sm:min-h-[450px] group relative overflow-hidden bg-base-100 p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
      whileHover={{ y: -8 }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon with animated background */}
      <div className="relative mb-4 sm:mb-6">
        <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-150 group-hover:scale-200 transition-transform duration-500" />
        <div className="relative bg-base-100 p-2 sm:p-3 rounded-full inline-block border-2 border-primary group-hover:shadow-xl shadow-md shadow-primary/20 group-hover:shadow-primary/20 transition-all duration-500">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          {description}
        </p>

        {/* Feature List */}
        {features.length > 0 && (
          <motion.ul
            className="space-y-2 sm:space-y-3 mt-4 sm:mt-6 border-t border-base-300 pt-4 sm:pt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-base-content/80 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-base-content/70 text-primary flex-shrink-0" />
                <span className="group-hover:text-primary transition-colors">
                  {feature}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-3xl transition-colors duration-500" />
    </motion.div>
  );
}
