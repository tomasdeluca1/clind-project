import Link from "next/link";
import { Github, ListStart } from "lucide-react";
import { motion } from "framer-motion";
import { JSX, useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

export default function Footer(): JSX.Element {
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/proxySaas");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: any = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data.error) {
          setError(data.error);
        } else {
          console.error("Unexpected data format:", data);
          setError("Invalid data format received" as any);
        }
      } catch (error: any) {
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
              className="group flex items-center gap-4 px-4 py-3 bg-primary/20 hover:bg-primary/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Image
                src="https://huev.site/_next/image?url=https%3A%2F%2Fs3.us-east-2.amazonaws.com%2Fhuev.site.s3%2FindexContext%2Fcasual-profile-picture.jpg&w=3840&q=75"
                alt="Huevsite"
                width={48}
                height={48}
                className="rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all object-cover w-12 h-12"
                priority={true}
                quality={100}
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">Huevsite</span>
                <span className="text-white/80 text-sm">
                  Building useful tools
                </span>
              </div>
            </a>
          </motion.div>

          {/* Tagline Section */}
          <div className="text-center md:text-left flex flex-col space-y-4">
            <h2 className=" flex items-center gap-2 text-2xl font-bold text-primary mb-1">
              <ListStart className="w-6 h-6" />
              Focus on what matters
            </h2>
            <p className="text-neutral-content/70 max-w-md">
              Discover a powerful tool designed to help you conquer anxiety and
              enhance your productivity.
            </p>
          </div>

          {/* Projects Section */}
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-5 text-neutral-content/90 border-b border-base-300 pb-2">
              Shipped by Huevsite
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects ? (
                projects.map((project) => {
                  if (project.name !== "Clind App") {
                    return (
                      <motion.div
                        key={project.name}
                        whileHover={{ scale: 1.05 }}
                        className="w-full"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2 rounded-lg bg-base-200 hover:bg-primary group transition-shadow duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
                        >
                          <span className="text-base-content/90 transition-colors font-semibold text-sm">
                            {project.name}
                          </span>
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
}
