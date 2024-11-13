"use client";
import Link from "next/link";
import { ListStart } from "lucide-react";
import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error.message}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        className="navbar bg-base-100 z-20 shadow"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
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
                <motion.div
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-10 rounded-full">
                    <Image
                      src={user.picture}
                      alt={user.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                      quality={90}
                      fetchPriority={true}
                    />
                  </div>
                </motion.div>
                <motion.ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.li whileHover={{ scale: 1.05 }}>
                    <Link
                      href={`/calendar/${user.sub}`}
                      className="flex items-center justify-between hover:bg-base-200 transition-colors duration-300 rounded-lg p-2"
                    >
                      Calendar
                      <span className="badge badge-primary glass shadow-sm bg-primary/80">
                        New
                      </span>
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ scale: 1.05 }}>
                    <Link
                      href={`/settings/${user.sub}`}
                      className="flex items-center justify-between hover:bg-base-200 transition-colors duration-300 rounded-lg p-2"
                    >
                      Settings
                      <span className="badge badge-primary glass shadow-sm bg-primary/80">
                        New
                      </span>
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ scale: 1.05 }}>
                    <Link
                      href="/api/auth/logout"
                      className="block hover:bg-base-200 transition-colors duration-300 rounded-lg p-2"
                    >
                      Logout
                    </Link>
                  </motion.li>
                </motion.ul>
              </div>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/api/auth/login"
                className="btn btn-primary text-white transition-all duration-300 animate-pulse hover:animate-none"
              >
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </motion.header>
      <main className="flex-1 p-4">{children}</main>
      <Footer />
    </motion.div>
  );
}
