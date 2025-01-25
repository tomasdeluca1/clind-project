import { PinOff, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PriorityTasksProps, Task } from "@/types";

export default function PriorityTasks({
  tasks,
  onUpdateTask,
  onDeleteTask,
}: PriorityTasksProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  function handleEdit(task: Task) {
    setEditingId(task._id?.toString() || null);
    setEditText(task.text);
  }

  function handleSave(task: Task) {
    if (task._id) {
      onUpdateTask(task._id.toString(), { text: editText });
      setEditingId(null);
    }
  }

  function handleRemovePriority(task: Task) {
    if (task._id) {
      onUpdateTask(task._id.toString(), { isPriority: false });
    }
  }

  function handleComplete(task: Task) {
    if (task._id) {
      onUpdateTask(task._id.toString(), {
        isCompleted: true,
        isPriority: false,
      });
    }
  }

  const priorityTasks = tasks.filter(
    (task) => task.isPriority && !task.isCompleted
  );

  return (
    <motion.ul className="space-y-2">
      <AnimatePresence>
        {priorityTasks.map((task) => (
          <motion.li
            key={task._id?.toString() || ""}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between bg-primary glass text-base-100 p-2 rounded"
          >
            <button
              onClick={() => handleComplete(task)}
              className="btn btn-sm btn-outline mr-1 btn-ghost bg-transparent text-base-100 hover:bg-transparent border-0 tooltip-top tooltip"
              data-tip="Mark as complete"
            >
              <Check />
            </button>
            <button
              onClick={() => handleRemovePriority(task)}
              className="btn btn-sm btn-outline text-error border-0 hover:text-base-content hover:bg-error btn-ghost mr-2 tooltip-error tooltop-right tooltip tooltip-text-white"
              data-tip="Remove priority"
            >
              <PinOff />
            </button>
            {editingId === task._id?.toString() ? (
              <div className="flex-grow flex items-center">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="input input-bordered w-full max-w-xs mr-2 text-base-content bg-base-100/50 focus:bg-base-100 transition-all duration-200"
                />
                <button
                  onClick={() => handleSave(task)}
                  className="btn btn-sm btn-ghost"
                >
                  Save
                </button>
              </div>
            ) : (
              <span className="flex-grow">{task.text}</span>
            )}
            {editingId !== task._id?.toString() && (
              <div className="flex items-center">
                <button
                  onClick={() => handleEdit(task)}
                  className="btn btn-sm btn-ghost mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTask(task._id?.toString() || "")}
                  className="btn btn-sm btn-ghost text-error"
                >
                  Delete
                </button>
              </div>
            )}
          </motion.li>
        ))}
      </AnimatePresence>
      {priorityTasks.length < 3 && (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className={`text-gray-500 italic ${
            priorityTasks.length === 0 ? "animate-pulse" : ""
          }`}
        >
          {3 - priorityTasks.length} priority slot
          {priorityTasks.length === 2 ? "" : "s"} remaining
        </motion.li>
      )}
    </motion.ul>
  );
}
