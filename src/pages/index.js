import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import PriorityTasks from "@/components/PriorityTasks";
import CompletedTasks from "@/components/CompletedTasks";
import LandingPage from "@/components/LandingPage";
import { getSession } from "@auth0/nextjs-auth0";

export default function Home({ initialTasks }) {
  const { user, isLoading } = useUser();
  const [tasks, setTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("lastVisitDate");

    if (storedDate !== today) {
      // It's a new day, start with an empty board
      setTasks([]);
      setUncompletedTasks(initialTasks.filter((task) => !task.isCompleted));
      localStorage.setItem("lastVisitDate", today);
    } else {
      // It's the same day, use initialTasks
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  async function handleAddTask(text) {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTask = await response.json();
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  async function handleUpdateTask(id, updateData) {
    const response = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updateData }),
    });
    if (response.ok) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, ...updateData } : task
        )
      );
      if (updateData.isCompleted) {
        setUncompletedTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== id)
        );
      }
    }
  }

  async function handleDeleteTask(id) {
    const response = await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      setUncompletedTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );
    }
  }

  const priorityTasks = tasks.filter((task) => task.isPriority);
  const nonPriorityTasks = tasks.filter(
    (task) => !task.isPriority && !task.isCompleted
  );

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <LandingPage />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Give your mind a break</h1>
      <p className="text-lg text-base-content/70 mb-6">
        Streamline your thoughts, boost productivity, and achieve peace of mind
      </p>
      <TaskInput onAddTask={handleAddTask} />
      <div className="flex flex-col lg:flex-row mt-8 gap-4">
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-semibold mb-2">Today&apos;s Tasks</h2>
          <TaskList
            tasks={nonPriorityTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            priorityTasks={priorityTasks}
          />
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              Today&apos;s Priorities
            </h2>
            <PriorityTasks
              tasks={priorityTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <CompletedTasks
            tasks={tasks.filter((task) => task.isCompleted)}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
          {uncompletedTasks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Uncompleted Tasks</h2>
              <TaskList
                tasks={uncompletedTasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession(req, res);

  if (!session || !session.user) {
    return {
      props: {
        initialTasks: [],
      },
    };
  }

  try {
    const response = await Promise.race([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        headers: {
          Cookie: req.headers.cookie,
        },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 5000)
      ),
    ]);

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const initialTasks = await response.json();

    return {
      props: {
        initialTasks,
      },
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      props: {
        initialTasks: [],
        error: "Failed to load tasks. Please try again later.",
      },
    };
  }
}
