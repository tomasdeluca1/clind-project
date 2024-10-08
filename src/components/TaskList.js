import { Check, Pin, XCircle } from "lucide-react";
import { useState } from "react";
import { capitalize } from "../utils/functions";

export default function TaskList({
  tasks,
  onUpdateTask,
  onDeleteTask,
  priorityTasks,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  function handleEdit(task) {
    setEditingId(task._id);
    setEditText(capitalize(task.text));
  }

  function handleSave(task) {
    onUpdateTask(task._id, { text: editText });
    setEditingId(null);
  }

  function handlePrioritize(task) {
    onUpdateTask(task._id, { isPriority: true });
  }

  function handleComplete(task) {
    onUpdateTask(task._id, { isCompleted: !task.isCompleted });
  }

  return tasks.length === 0 ? (
    <div className="text-base-content/50">
      Add some tasks and clear your mind!
    </div>
  ) : (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task._id}
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
          {editingId === task._id ? (
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
                  onClick={() => onDeleteTask(task._id)}
                  className="btn btn-sm btn-ghost text-error"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
