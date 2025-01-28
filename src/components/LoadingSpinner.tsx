import { ListStart } from "lucide-react";
import { JSX } from "react";

export default function LoadingSpinner(): JSX.Element {
  return (
    <div className="flex items-center justify-center h-screen fixed top-0 left-0 w-full z-0">
      <div className="relative w-24 h-24">
        <svg
          className="animate-spin w-full h-full text-primary"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            d="M50 10 A40 40 0 0 1 90 50"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-30 h-30 bg-base-100 rounded-full flex items-center justify-center text-primary text-5xl">
            <ListStart className="animate-pulse h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
