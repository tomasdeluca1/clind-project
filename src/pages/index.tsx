import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import PriorityTasks from "@/components/PriorityTasks";
import CompletedTasks from "@/components/CompletedTasks";
import UnfinishedTasksModal from "@/components/UnfinishedTasksModal";
import { getSession } from "@auth0/nextjs-auth0";
import Head from "next/head";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Task, TaskUpdate } from "@/types";
import { useRouter } from "next/router";
import { useFeatures } from "@/hooks/useFeatures";

export default function Home({
  initialTasks,
}: {
  initialTasks: { data: Task[] };
}) {
  const { user, isLoading } = useUser();
  const { canUseFeature } = useFeatures();
  const [tasks, setTasks] = useState<Task[]>(initialTasks.data || []);
  const [uncompletedTasks, setUncompletedTasks] = useState<Task[]>([]);
  const [showUnfinishedModal, setShowUnfinishedModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const today = new Date().toISOString().split("T")[0];
        const lastLoginDate = await updateUserLastLogin(user.sub || "", today);

        if (lastLoginDate < today) {
          const unfinishedTasks =
            initialTasks.data?.filter((task: Task) => !task.isCompleted) || [];
          if (unfinishedTasks.length > 0) {
            setUncompletedTasks(unfinishedTasks);
            setShowUnfinishedModal(true);
          }
        }
      }
    };

    fetchData();
  }, [user, initialTasks]);

  async function updateUserLastLogin(userId: string, date: string) {
    try {
      const response = await fetch(`/api/users/lastLogin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          lastLoginDate: new Date(date).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.lastLoginDate;
    } catch (error) {
      console.error("Error updating last login date:", error);
      return null;
    }
  }

  const handleSelectUnfinishedTasks = (selectedTaskIds: string[]) => {
    const selectedTasks = uncompletedTasks.filter((task) =>
      selectedTaskIds.includes(task._id?.toString() || "")
    );
    setTasks((prevTasks) => [...prevTasks, ...selectedTasks]);
    setShowUnfinishedModal(false);
  };

  async function handleAddTask(text: string) {
    if (canUseFeature("task_creation")) {
      const response = await fetch(`/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask.data]);
    } else {
      alert("Upgrade your subscription to add more tasks.");
    }
  }

  async function handleUpdateTask(id: string, updateData: TaskUpdate) {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updateData }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id?.toString() === id ? { ...task, ...updatedTask.data } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id?.toString() !== id)
      );
      setUncompletedTasks((prevTasks) =>
        prevTasks.filter((task) => task._id?.toString() !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const priorityTasks = tasks.filter((task: Task) => task.isPriority);
  const nonPriorityTasks = tasks.filter(
    (task) => !task.isPriority && !task.isCompleted
  );

  if (isLoading) return <LoadingSpinner />;

  if (!user) {
    router.push("/landing");
    return null;
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="title" content="Clind - Clear Tasks, Clean Mind" />
        <meta
          name="description"
          content="Clind: Clear Tasks, Clean Mind. Streamline your thoughts, boost productivity, and achieve peace of mind with our intuitive task management app."
        />
        <meta
          name="keywords"
          content="task management, productivity, mental clarity, brain dump, priority tasks, to-do list, time management, focus, goal setting, personal organization, mindfulness, stress reduction, work-life balance, efficiency, habit formation"
        />
        <meta name="author" content="Clind" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Clind - Clear Tasks, Clean Mind" />
        <meta
          property="og:description"
          content="Declutter your mind and boost productivity with Clind's intuitive task management system. Prioritize, focus, and achieve more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.clind.site" />
        <meta property="og:image" content="/og-image-clind.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clind - Clear Tasks, Clean Mind" />
        <meta
          name="twitter:description"
          content="Streamline your thoughts, boost productivity, and achieve peace of mind with Clind's task management app."
        />
        <meta
          name="twitter:image"
          content="https://www.clind.site/og-image-clind.png"
        />
        <link rel="canonical" href="https://www.clind.site" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" sizes="16x16" href="/miniatura.png" />
        <link rel="icon" sizes="32x32" href="/miniatura.png" />
        <link rel="icon" sizes="48x48" href="/miniatura.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/miniatura.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/miniatura.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/miniatura.png"
        />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2">Give your mind a break</h1>
        <p className="text-lg text-base-content/70 mb-6">
          Streamline your thoughts, boost productivity, and achieve peace of
          mind
        </p>
        <TaskInput onAddTask={handleAddTask} totalTasks={tasks.length} />
        <div className="flex flex-col-reverse lg:flex-row mt-8 gap-6">
          <div className="w-full lg:w-3/5 max-h-[500px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-2">Today&#39;s tasks</h2>
            <TaskList
              tasks={nonPriorityTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              priorityTasks={priorityTasks}
            />
          </div>
          <div className="w-full lg:w-2/5 flex flex-col-reverse lg:flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Top 3 Priorities</h2>
              <PriorityTasks
                tasks={priorityTasks.slice(0, 3)}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
            <div>
              <CompletedTasks
                tasks={tasks.filter((task) => task.isCompleted)}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </div>
        </div>
      </div>
      {showUnfinishedModal && (
        <UnfinishedTasksModal
          tasks={uncompletedTasks}
          onClose={() => setShowUnfinishedModal(false)}
          onSelectTasks={handleSelectUnfinishedTasks}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const session = await getSession(req, res);

  if (!session || !session.user) {
    return {
      props: {
        initialTasks: [],
        lastLoginDate: null,
      },
    };
  }

  try {
    const [tasksResponse, userResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        headers: {
          Cookie: req.headers.cookie,
        },
      }),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.sub}`,
        {
          headers: {
            Cookie: req.headers.cookie,
          },
        }
      ),
    ]);

    if (!tasksResponse.ok || !userResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const initialTasks = await tasksResponse.json();
    const userData = await userResponse.json();
    return {
      props: {
        initialTasks,
        lastLoginDate: userData.lastLoginDate || null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialTasks: [],
        lastLoginDate: null,
        error: "Failed to load data. Please try again later.",
      },
    };
  }
}
