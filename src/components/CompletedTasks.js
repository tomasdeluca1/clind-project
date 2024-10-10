import { useState } from "react";
import { ChevronRight, Trash, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CompletedTasks({ tasks, onUpdateTask, onDeleteTask }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedTasks = tasks.filter((task) => task.isCompleted);

  function handleUncomplete(task) {
    onUpdateTask(task._id, { isCompleted: false });
  }

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-xl font-semibold mb-2 cursor-pointer flex items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="mr-2">Completed</span>
        <span className="text-sm text-gray-500">({completedTasks.length})</span>
        <span className="ml-2 transition-transform duration-300 ease-in-out">
          <ChevronRight
            className={`transition-transform duration-300 ease-in-out ${
              isExpanded ? "rotate-90" : "rotate-0"
            }`}
          />
        </span>
      </h2>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            className="space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {completedTasks.map((task) => (
              <motion.li
                key={task._id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between bg-success/20 text-base-content p-2 rounded"
              >
                <span className="line-through">{task.text}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleUncomplete(task)}
                    className="btn btn-sm btn-ghost text-success mr-2 tooltip"
                    data-tip="Mark as incomplete"
                  >
                    <XCircle />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task._id)}
                    className="btn btn-sm btn-ghost text-error tooltip"
                    data-tip="Delete task"
                  >
                    <Trash />
                  </button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
