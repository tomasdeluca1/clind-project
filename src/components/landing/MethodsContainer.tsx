import { CheckCircle, List } from "lucide-react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

export default function MethodsContainer() {
  return (
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
          Focus on your three most important tasks each day. This proven method
          helps you maintain clarity and achieve meaningful progress.
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
          Structure your day with one major task, three medium tasks, and five
          small tasks for optimal productivity balance.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="badge badge-lg bg-primary text-primary-content font-bold shadow-md hover:shadow-lg transition-shadow">
              1
            </div>
            <span className="text-base">Major task for significant impact</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="badge badge-lg bg-primary/90 text-primary-content font-bold shadow-md hover:shadow-lg transition-shadow">
              3
            </div>
            <span className="text-base">Medium tasks to maintain momentum</span>
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
  );
}
