import { useState } from "react";
import { ChevronRight, Trash, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Task, TaskUpdate } from "@/types";

interface CompletedTasksProps {
  tasks: Task[];
  onUpdateTask: (id: string, update: TaskUpdate) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
}

export default function CompletedTasks({
  tasks,
  onUpdateTask,
  onDeleteTask,
}: CompletedTasksProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedTasks = tasks.filter((task) => task.isCompleted);

  function handleUncomplete(task: Task) {
    if (task._id) {
      onUpdateTask(task._id.toString(), { isCompleted: false });
    }
  }

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ChevronRight
          className={`transform transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
        Completed Tasks ({completedTasks.length})
      </h2>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-2 mt-2"
          >
            {completedTasks.map((task) => (
              <motion.li
                key={task._id?.toString()}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between p-2 rounded bg-success/20"
              >
                <span className="line-through">{task.text}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUncomplete(task)}
                    className="btn btn-sm btn-ghost tooltip"
                    data-tip="Mark as incomplete"
                  >
                    <XCircle />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task._id?.toString() || "")}
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
