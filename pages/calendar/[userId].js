import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/router";
import Modal from "components/Modal";

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export default function UserCalendar() {
  const router = useRouter();
  const { userId } = router.query;
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  async function fetchTasks() {
    const response = await fetch(`/api/tasks?userId=${userId}`);
    const data = await response.json();
    setTasks(data);
  }

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
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          className="bg-base-100 text-base-content"
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
    <div className="space-y-4">
      <section>
        <h3 className="text-xl font-semibold mb-2">All Tasks</h3>
        <TaskList tasks={dayTasks} />
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">Priority Tasks</h3>
        <TaskList tasks={priorityTasks} />
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">Completed Tasks</h3>
        <TaskList tasks={completedTasks} />
      </section>
    </div>
  );
}

function TaskList({ tasks }) {
  return tasks.length > 0 ? (
    <ul className="list-disc list-inside">
      {tasks.map((task) => (
        <li key={task._id} className="mb-1">
          {task.text}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-base-content/70 italic">No tasks for this category.</p>
  );
}
