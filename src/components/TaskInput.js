import { useState } from "react";

export default function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  function handleSubmit(e) {
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
      />
      <button type="submit" className="btn btn-primary w-full sm:w-auto">
        Add Task
      </button>
    </form>
  );
}
