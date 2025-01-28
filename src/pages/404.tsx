import Link from "next/link";
import { Home } from "lucide-react";
import { JSX } from "react";

export default function Custom404(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-base-content/70 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/" className="btn btn-primary">
          <Home className="mr-2" />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
