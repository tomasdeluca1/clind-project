import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "@/components/Modal";
import { useState } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import CustomToolbar from "@/components/CustomToolbar";
import CustomDateHeader from "@/components/CustomDateHeader";
import { motion, AnimatePresence } from "framer-motion";
import { Task } from "@/types";
import Link from "next/link";
import { useSubscription } from "@/components/guards/RouteGuard";

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export default function UserCalendar({
  initialTasks,
}: {
  initialTasks: { success: boolean; data: Task[] };
}) {
  console.log(initialTasks);
  const [tasks, setTasks] = useState(initialTasks.data);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = tasks.map((task: Task) => ({
    title: task.text,
    start: new Date(task.createdAt),
    end: new Date(task.createdAt),
    allDay: true,
    resource: task,
  }));

  const handleSelectEvent = (event: { start: Date }) => {
    setSelectedDate(event.start);
    setIsModalOpen(true);
  };

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const getDaySummary = (date: Date) => {
    const dayTasks = tasks.filter((task: Task) =>
      moment(task.createdAt).isSame(date, "day")
    );
    const priorityTasks = dayTasks.filter((task: Task) => task.isPriority);
    const completedTasks = dayTasks.filter((task: Task) => task.isCompleted);

    return { dayTasks, priorityTasks, completedTasks };
  };
  const { subscriptionTier } = useSubscription();

  if (subscriptionTier === "free") {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Calendar Feature</h3>
        <p className="text-base-content/70 mb-4">
          Upgrade to access the calendar feature and organize your tasks better.
        </p>
        <Link href="/pricing" className="btn btn-primary">
          Upgrade Now
        </Link>
      </div>
    );
  }
  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {selectedDate && (
              <motion.div
                className="bg-base-100 p-4 md:p-6 rounded-xl md:h-screen pb-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary">
                  {moment(selectedDate).format("MMMM D, YYYY")}
                </h2>
                <DaySummary summary={getDaySummary(selectedDate)} />
              </motion.div>
            )}
          </Modal>
        )}
      </AnimatePresence>
      <motion.div
        className="container mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Mind Break Calendar</h1>
        <p className="text-lg text-base-content/70 mb-6">
          Clear your mind, boost your output, and tap into your brain&#39;s
          hidden power
        </p>
        <motion.div
          className="bg-base-100 mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <style jsx global>{`
            .rbc-off-range-bg {
              background-color: var(--base-100);
              opacity: 0.5;
            }
          `}</style>
          <Calendar<{
            title: string;
            start: Date;
            end: Date;
            allDay: boolean;
            resource: Task;
          }>
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "75vh", maxHeight: 800 }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            className="text-base-content bg-base-200 rounded-xl shadow-lg"
            views={["month", "week", "day"]}
            defaultView="month"
            toolbar={true}
            popup
            eventPropGetter={(event) => ({
              className: `bg-primary/90 text-primary-content rounded-lg p-2 transition-all duration-300 hover:bg-primary ${
                event.resource.isPriority ? "border-l-4 border-accent" : ""
              }`,
            })}
            dayPropGetter={(date) => ({
              className:
                "hover:bg-base-200 bg-base-100 transition-colors duration-300",
            })}
            components={{
              toolbar: (props: any) => <CustomToolbar {...props} />,
              month: { dateHeader: CustomDateHeader },
            }}
            formats={{
              timeGutterFormat: (date: Date) => "",
              dayFormat: "ddd",
              dayRangeHeaderFormat: ({ start, end }) =>
                `${moment(start).format("MMM D")} - ${moment(end).format(
                  "MMM D"
                )}`,
            }}
            allDayAccessor={() => true}
            showAllEvents
          />
        </motion.div>
      </motion.div>
    </>
  );
}

function DaySummary({
  summary,
}: {
  summary: { dayTasks: Task[]; priorityTasks: Task[]; completedTasks: Task[] };
}) {
  const { dayTasks, priorityTasks, completedTasks } = summary;

  return (
    <div className="space-y-6">
      <TaskSection
        title="Completed Stuff"
        tasks={completedTasks}
        icon="check-circle"
        green={true}
      />
      <TaskSection
        title="Top responsabilities"
        tasks={priorityTasks}
        icon="star"
        green={false}
      />
      <TaskSection
        title="Your mind this day"
        tasks={dayTasks}
        icon="clipboard-list"
        green={false}
      />
    </div>
  );
}

function TaskSection({
  title,
  tasks,
  icon,
  green,
}: {
  title: string;
  tasks: Task[];
  icon: string;
  green: boolean;
}) {
  return (
    <section className="bg-base-200 rounded-lg p-4 shadow-md">
      <h3
        className={`text-xl font-semibold mb-3 flex items-center ${
          green && "text-success"
        }`}
      >
        <Icon name={icon} className="w-6 h-6 mr-2" />
        {title}
      </h3>
      <TaskList tasks={tasks} />
    </section>
  );
}

function TaskList({ tasks }: { tasks: Task[] }) {
  return tasks.length > 0 ? (
    <ul className="space-y-2">
      {tasks.map((task: Task) => (
        <li
          key={task._id?.toString()}
          className="flex items-center bg-base-100 p-2 rounded"
        >
          <span
            className={`w-2 h-2 rounded-full mr-3 ${
              task.isPriority ? "bg-accent" : "bg-primary"
            }`}
          ></span>
          <span
            className={
              task.isCompleted ? "line-through text-base-content/70" : ""
            }
          >
            {task.text}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-base-content/70 italic">No tasks for this category.</p>
  );
}

function Icon({ name, className }: { name: string; className: string }) {
  const icons = {
    "clipboard-list": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
    "check-circle": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return icons[name as keyof typeof icons] || null;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context.req, context.res);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  }

  const { userId } = context.params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?userId=${userId}`,
    {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }
  );
  const initialTasks = await response.json();

  return {
    props: {
      initialTasks: initialTasks || [],
    },
  };
}
