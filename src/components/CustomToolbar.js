import React from "react";
import { Navigate } from "react-big-calendar";

function CustomToolbar({ onNavigate, label, onView, view }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-base-200 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => onNavigate(Navigate.PREVIOUS)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => onNavigate(Navigate.TODAY)}
        >
          Today
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => onNavigate(Navigate.NEXT)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <h2 className="text-xl font-semibold text-primary">{label}</h2>
      <div className="btn-group">
        <button
          className={`btn btn-sm ${
            view === "month" ? "btn-active" : "btn-ghost"
          }`}
          onClick={() => onView("month")}
        >
          Month
        </button>
        <button
          className={`btn btn-sm ${
            view === "week" ? "btn-active" : "btn-ghost"
          }`}
          onClick={() => onView("week")}
        >
          Week
        </button>
        <button
          className={`btn btn-sm ${
            view === "day" ? "btn-active" : "btn-ghost"
          }`}
          onClick={() => onView("day")}
        >
          Day
        </button>
      </div>
    </div>
  );
}

export default CustomToolbar;
