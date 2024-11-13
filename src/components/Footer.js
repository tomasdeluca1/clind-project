import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/proxySaas");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data.error) {
          setError(data.error);
        } else {
          console.error("Unexpected data format:", data);
          setError("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message || "Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  return (
    <motion.footer
      className="footer p-10 bg-neutral text-neutral-content border-t border-base-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Brand Section */}
          <motion.div
            className="flex flex-col items-center md:items-start space-y-4"
            whileHover={{ scale: 1.02 }}
          >
            <a
              href="https://huev.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-6 py-3 bg-secondary/90 hover:bg-secondary rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Image
                src="https://huev.site/_next/image?url=%2Fhuev-logo.png&w=256&q=100"
                alt="Huevsite"
                width={48}
                height={48}
                className="rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"
                priority={true}
                quality={90}
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">Huevsite</span>
                <span className="text-white/80 text-sm">
                  Innovation & Design
                </span>
              </div>
            </a>
          </motion.div>

          {/* Tagline Section */}
          <div className="text-center md:text-left flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-2">
              Focus on what matters
            </h2>
            <p className="text-neutral-content/70 max-w-md">
              Empowering developers & designers to build better solutions
              through innovative tools and seamless experiences.
            </p>
          </div>

          {/* Projects Section */}
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-6 text-neutral-content/90 border-b border-base-300 pb-2">
              Other Projects by Huevsite
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {projects ? (
                projects.map((project) => {
                  if (project.name !== "Clind App") {
                    return (
                      <motion.div
                        key={project.name}
                        whileHover={{ scale: 1.02 }}
                        className="w-full"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-300/30 transition-all duration-200"
                        >
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                          <span className="text-neutral-content/90 hover:text-primary transition-colors">
                            {project.name}
                          </span>
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        </a>
                      </motion.div>
                    );
                  }
                  return null;
                })
              ) : (
                <p className="text-error text-sm bg-error/10 p-3 rounded-lg">
                  {error || "Unable to load projects"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
