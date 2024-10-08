import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "@/components/Modal";
import { useState } from "react";
import { getSession } from "@auth0/nextjs-auth0";

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export default function UserCalendar({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = tasks.map((task) => ({
    title: task.text,
    start: new Date(task.createdAt),
    end: new Date(task.createdAt),
    allDay: true,
    resource: task,
  }));

  const handleSelectEvent = (event) => {
    setSelectedDate(event.start);
    setIsModalOpen(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const getDaySummary = (date) => {
    const dayTasks = tasks.filter((task) =>
      moment(task.createdAt).isSame(date, "day")
    );
    const priorityTasks = dayTasks.filter((task) => task.isPriority);
    const completedTasks = dayTasks.filter((task) => task.isCompleted);

    return { dayTasks, priorityTasks, completedTasks };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Task Calendar</h1>
      <div className="bg-base-200 p-4 rounded-lg shadow-lg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "70vh", maxHeight: 700 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          className="bg-base-100 text-base-content rounded-lg shadow-md"
          views={["month", "week", "day"]}
          defaultView="month"
          toolbar={true}
          popup
          eventPropGetter={(event) => ({
            className: `bg-primary text-primary-content rounded-md p-1 ${
              event.resource.isPriority ? "border-l-4 border-accent" : ""
            }`,
          })}
          dayPropGetter={(date) => ({
            className: "hover:bg-base-200 transition-colors duration-200",
          })}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedDate && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {moment(selectedDate).format("MMMM D, YYYY")}
            </h2>
            <DaySummary summary={getDaySummary(selectedDate)} />
          </div>
        )}
      </Modal>
    </div>
  );
}

function DaySummary({ summary }) {
  const { dayTasks, priorityTasks, completedTasks } = summary;

  return (
    <div className="space-y-6">
      <TaskSection title="All Tasks" tasks={dayTasks} icon="clipboard-list" />
      <TaskSection title="Priority Tasks" tasks={priorityTasks} icon="star" />
      <TaskSection
        title="Completed Tasks"
        tasks={completedTasks}
        icon="check-circle"
      />
    </div>
  );
}

function TaskSection({ title, tasks, icon }) {
  return (
    <section className="bg-base-200 rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold mb-3 flex items-center">
        <Icon name={icon} className="w-6 h-6 mr-2" />
        {title}
      </h3>
      <TaskList tasks={tasks} />
    </section>
  );
}

function TaskList({ tasks }) {
  return tasks.length > 0 ? (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task._id}
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

function Icon({ name, className }) {
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

  return icons[name] || null;
}

export async function getServerSideProps(context) {
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
      initialTasks,
    },
  };
}
