import { Check, Pin, XCircle } from "lucide-react";
import { useState, useCallback } from "react";
import { capitalize } from "../utils/functions";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { TaskListProps, Task } from "@/types";

export default function TaskList({
  tasks = [],
  onUpdateTask,
  onDeleteTask,
  priorityTasks = [],
}: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  function handleEdit(task: Task) {
    setEditingId(task._id?.toString() || null);
    setEditText(capitalize(task.text));
  }

  function handleSave(task: Task) {
    if (task._id) {
      onUpdateTask(task._id.toString(), { text: editText });
      setEditingId(null);
    }
  }

  function handlePrioritize(task: Task) {
    if (task._id) {
      onUpdateTask(task._id.toString(), { isPriority: true });
    }
  }

  const triggerFireworks = useCallback(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ff0000", "#00ff00", "#0000ff"],
          emojis: ["🎉", "✨", "🎊"],
        })
      );
    }, 250);
  }, []);

  function handleComplete(task: Task) {
    if (!task.isCompleted) {
      triggerFireworks();
    }
    onUpdateTask(task._id?.toString() || "", {
      isCompleted: !task.isCompleted,
    });
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-base-content/50">
        Add some tasks and clear your mind!
      </div>
    );
  }

  return (
    <motion.ul className="space-y-2">
      <AnimatePresence>
        {tasks &&
          tasks.map((task) => (
            <motion.li
              key={task._id?.toString() || ""}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between p-2 rounded border-0 ${
                task.isCompleted ? "bg-success/20" : "bg-primary/5"
              }`}
            >
              <button
                onClick={() => handleComplete(task)}
                className={`btn btn-sm btn-outline mr-1 btn-ghost bg-transparent ${
                  task.isCompleted ? "text-success" : "text-primary"
                } hover:bg-transparent border-0 tooltip-top tooltip`}
                data-tip={
                  task.isCompleted ? "Mark as incomplete" : "Mark as complete"
                }
              >
                {task.isCompleted ? <XCircle /> : <Check />}
              </button>

              {!task.isCompleted && priorityTasks.length < 3 && (
                <button
                  onClick={() => handlePrioritize(task)}
                  className="btn btn-sm btn-outline mr-1 btn-ghost bg-transparent text-success hover:bg-success border-0 hover:text-black tooltip-top tooltip tooltip-success"
                  data-tip="Set as priority"
                >
                  <Pin />
                </button>
              )}
              {editingId === task._id?.toString() ? (
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="input input-bordered input-sm w-full max-w-xs mr-2"
                  />
                  <button
                    onClick={() => handleSave(task)}
                    className="btn btn-sm btn-primary text-white"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className={task.isCompleted ? "line-through" : ""}>
                    {capitalize(task.text)}
                  </span>
                  <div className="flex items-center">
                    {!task.isCompleted && (
                      <button
                        onClick={() => handleEdit(task)}
                        className="btn btn-sm btn-ghost mr-1"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteTask(task._id?.toString() || "")}
                      className="btn btn-sm btn-ghost text-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </motion.li>
          ))}
      </AnimatePresence>
    </motion.ul>
  );
}
