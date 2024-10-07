import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { ListStart } from "lucide-react";
import Image from "next/image";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <header className="navbar bg-base-200">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost text-primary normal-case text-xl"
          >
            <ListStart /> Clind
          </Link>
        </div>
        <div className="flex-none">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.picture} alt={user.name} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href={`/calendar/${user.sub}`}>
                      Calendar <span className="badge">New</span>
                    </Link>{" "}
                  </li>
                  <li>
                    <Link href={`/settings/${user.sub}`}>
                      Settings <span className="badge">New</span>
                    </Link>{" "}
                  </li>
                  <li>
                    <Link href="/api/auth/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link href="/api/auth/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className=" footer footer-center p-6 bg-base-300 text-base-content">
        <div className="container max-w-3xl flex flex-col md:flex-row md:justify-between items-center space-y-2 md:space-y-0">
          <p>Copyright © 2024 - All rights reserved</p>
          <p className="text-lg font-semibold text-primary drop-shadow-xl p-2 rounded-lg">
            Focus on what matters
          </p>
          <p>
            <a
              href="https://huev.site"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-white flex drop-shadow-xl items-center font-bold gap-2 text-md scale-95 hover:scale-100 transition-all duration-300 px-3 py-1 rounded-md"
            >
              <Image
                src="https://huev.site/_next/image?url=%2Fhuev-logo.png&w=256&q=100"
                alt="Huevsite"
                width={50}
                height={50}
              />
              by Huevsite
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
