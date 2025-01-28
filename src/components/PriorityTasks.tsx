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
    <motion.ul className="space-y-4 w-full">
      <AnimatePresence>
        {priorityTasks.map((task) => (
          <motion.li
            key={task._id?.toString() || ""}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-primary/90 to-primary glass text-base-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 gap-3"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleComplete(task)}
                className="btn btn-circle btn-sm btn-outline btn-ghost  bg-green-100 text-green-500 hover:bg-green-100/20 flex items-center justify-center hover:text-base-100  tooltip tooltip-right hover:bg-base-content"
                data-tip="Mark as complete"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleRemovePriority(task)}
                className="btn btn-circle btn-sm btn-outline btn-ghost bg-red-100 text-red-500 hover:bg-red-100/20 flex items-center justify-center hover:text-base-100  tooltip tooltip-right  "
                data-tip="Remove priority"
              >
                <PinOff className="w-4 h-4" />
              </button>
            </div>

            {editingId === task._id?.toString() ? (
              <div className="flex-grow flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="textarea textarea-bordered w-full text-base-content bg-base-100/90 focus:bg-base-100 transition-all duration-200 focus:ring-2 focus:ring-primary/50 focus:outline-none"
                  placeholder="Update task..."
                  autoFocus
                />
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleSave(task)}
                    className="btn btn-xs bg-base-100/20 hover:bg-base-100/30 text-base-100 border-0 flex-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn btn-xs bg-base-100/20 hover:bg-error/30 text-base-100 border-0 flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-wrap flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3">
                <p className="break-words w-full sm:w-auto text-base font-medium">
                  {task.text}
                </p>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleEdit(task)}
                    className="btn btn-xs bg-base-100/20 hover:bg-base-100/30 text-base-100 border-0 flex-1 sm:flex-none gap-2"
                  >
                    <span className=" inline">Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteTask(task._id?.toString() || "")}
                    className="btn btn-xs bg-base-100/20 hover:bg-error/30 text-base-100 border-0 flex-1 sm:flex-none gap-2"
                  >
                    <span className="inline">Delete</span>
                  </button>
                </div>
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
          className={`text-base-content/60 italic text-center p-4 bg-base-200/50 rounded-lg ${
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
