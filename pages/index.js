import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import TaskInput from "components/TaskInput";
import TaskList from "components/TaskList";
import PriorityTasks from "components/PriorityTasks";
import CompletedTasks from "components/CompletedTasks";
import LandingPage from "components/LandingPage";
import Head from "next/head";

export default function Home() {
  const { user, isLoading } = useUser();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  async function fetchTasks() {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    setTasks(data);
  }

  async function handleAddTask(text) {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  }

  async function handleUpdateTask(id, updateData) {
    const response = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updateData }),
    });
    if (response.ok) {
      fetchTasks();
    }
  }

  async function handleDeleteTask(id) {
    const response = await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      fetchTasks();
    }
  }

  const priorityTasks = tasks.filter((task) => task.isPriority);
  const nonPriorityTasks = tasks.filter(
    (task) => !task.isPriority && !task.isCompleted
  );

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <LandingPage />;

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2">Give your mind a break</h1>
        <p className="text-lg text-base-content/70 mb-6">
          Streamline your thoughts, boost productivity, and achieve peace of
          mind
        </p>
        <TaskInput onAddTask={handleAddTask} />
        <div className="flex flex-col md:flex-row mt-8 gap-4">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">All Tasks</h2>
            <TaskList
              tasks={nonPriorityTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              priorityTasks={priorityTasks}
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">
                Today&#39;s Priorities
              </h2>
              <PriorityTasks
                tasks={priorityTasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
            <CompletedTasks
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </>
  );
}
