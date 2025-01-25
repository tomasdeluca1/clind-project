import { useState } from "react";
import { motion } from "framer-motion";
import { Task } from "@/types";

interface UnfinishedTasksModalProps {
  tasks: Task[];
  onClose: () => void;
  onSelectTasks: (selectedTaskIds: string[]) => void;
}

export default function UnfinishedTasksModal({
  tasks,
  onClose,
  onSelectTasks,
}: UnfinishedTasksModalProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleToggleTask = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSubmit = () => {
    onSelectTasks(selectedTasks);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 w-full h-full top-0 left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-base-100 rounded-lg p-6 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4">Unfinished Tasks</h2>
        <p className="mb-4">Select the tasks you want to keep for today:</p>
        <div className="max-h-60 overflow-y-auto mb-4">
          {tasks.map((task) => (
            <div key={task._id?.toString()} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={task._id?.toString()}
                className="checkbox checkbox-primary mr-2"
                checked={selectedTasks.includes(task._id?.toString() || "")}
                onChange={() => handleToggleTask(task._id?.toString() || "")}
              />
              <label htmlFor={task._id?.toString()} className="cursor-pointer">
                {task.text}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add Selected Tasks
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
