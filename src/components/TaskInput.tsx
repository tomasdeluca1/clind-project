import { useState } from "react";
import { TaskInputProps } from "@/types";

export default function TaskInput({ onAddTask, isLoading }: TaskInputProps) {
  const [taskText, setTaskText] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col sm:flex-row gap-2"
    >
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a new task"
        className="input input-bordered w-full sm:max-w-xs"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="btn btn-primary w-full sm:w-auto"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
