import { useState } from "react";
import { useFeatures } from "@/hooks/useFeatures";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface TaskInputProps {
  onAddTask: (text: string) => void;
  totalTasks?: number;
}

export default function TaskInput({
  onAddTask,
  totalTasks = 0,
}: TaskInputProps) {
  const [text, setText] = useState("");
  const { getCurrentTier } = useFeatures();
  const [isShaking, setIsShaking] = useState(false);

  const currentTier = getCurrentTier();
  const isAtFreeLimit = currentTier?.tier === "free" && totalTasks >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (isAtFreeLimit) {
      setIsShaking(true);
      toast.error("Free tier limit reached! Upgrade to add more tasks.", {
        description: "The free plan is limited to 5 tasks.",
        action: {
          label: "Upgrade",
          onClick: () => (window.location.href = "/pricing"),
        },
      });
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    onAddTask(text);
    setText("");
  };

  return (
    <AnimatePresence>
      <motion.form
        onSubmit={handleSubmit}
        animate={
          isShaking
            ? {
                x: [-10, 10, -10, 10, 0],
                transition: { duration: 0.5 },
              }
            : {}
        }
        className="flex gap-2"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            isAtFreeLimit ? "Upgrade to add more tasks" : "Add a new task..."
          }
          className={`input input-bordered flex-1`}
        />
        <button type="submit" className={`btn btn-primary `}>
          Add Task
        </button>
      </motion.form>
    </AnimatePresence>
  );
}
