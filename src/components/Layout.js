import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { ListStart } from "lucide-react";
import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";
export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error.message}</div>;

  return (
    <motion.div
      className="min-h-screen bg-base-100 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        className="navbar bg-base-200 z-20"
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
                <motion.label
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
                    />
                  </div>
                </motion.label>
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
                className="btn btn-primary text-white"
              >
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </motion.header>
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {children}
      </main>
      <motion.footer
        className="footer footer-center p-6 bg-base-300 text-base-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="container max-w-3xl flex flex-col md:flex-row md:justify-between items-center space-y-2 md:space-y-0">
          <p>Copyright © 2024 - All rights reserved</p>
          <motion.p
            className="text-lg font-semibold text-primary drop-shadow-xl p-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            Focus on what matters
          </motion.p>
          <motion.p whileHover={{ scale: 1.05 }}>
            <a
              href="https://huev.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex drop-shadow-xl items-center font-bold gap-2 text-md scale-95 hover:scale-100 transition-all duration-300 px-3 py-1 rounded-md"
            >
              <Image
                src="https://huev.site/_next/image?url=%2Fhuev-logo.png&w=256&q=100"
                alt="Huevsite"
                width={50}
                height={50}
              />
              by Huevsite
            </a>
          </motion.p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
