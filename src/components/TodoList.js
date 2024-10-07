// This component is not currently used in any file.
// It has been kept for reference or potential future use.
// Consider removing it if it's no longer needed in the project.

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default function TodoList({ todos, setTodos }) {
  const [newTodo, setNewTodo] = useState("");
  const { user } = useUser();

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  }

  async function handleAddTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    });

    const addedTodo = await response.json();
    setTodos([addedTodo, ...todos]);
    setNewTodo("");
  }

  async function handleArchiveTodo(todoId) {
    await updateTodo(todoId, { status: "archived" });
  }

  async function handleCompleteTodo(todoId, isCompleted) {
    await updateTodo(todoId, { isCompleted });
  }

  async function updateTodo(todoId, updateData) {
    const response = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todoId, ...updateData }),
    });

    if (response.ok) {
      fetchTodos();
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="input input-bordered flex-grow"
          />
          <button type="submit" className="btn btn-primary ml-2">
            Add
          </button>
        </div>
      </form>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-base-200 p-3 rounded-lg"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleCompleteTodo(todo._id, !todo.isCompleted)}
                className="checkbox mr-2"
              />
              <span className={todo.isCompleted ? "line-through" : ""}>
                {todo.text}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-base-content/60 mr-2">
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleArchiveTodo(todo._id)}
                className="btn btn-sm btn-outline btn-warning"
              >
                Archive
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
