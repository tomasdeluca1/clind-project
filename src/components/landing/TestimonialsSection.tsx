import { motion } from "framer-motion";
import Image from "next/image";
import { JSX } from "react";
import { Quote } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface Testimonial {
  quote: string;
  handle: string;
  avatar: string;
}

export default function TestimonialsSection(): JSX.Element {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        sliderRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      sliderRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });

      // Update current index
      const newIndex =
        direction === "left"
          ? Math.max(0, currentIndex - 1)
          : Math.min(testimonials.length - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isHovering) {
      intervalId = setInterval(() => {
        if (sliderRef.current) {
          const isAtEnd =
            sliderRef.current.scrollLeft >=
            sliderRef.current.scrollWidth - sliderRef.current.clientWidth - 10;

          if (isAtEnd) {
            // Reset to start
            sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
            setCurrentIndex(0);
          } else {
            scroll("right");
          }
        }
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovering, currentIndex]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials");
        if (!response.ok) throw new Error("Failed to fetch testimonials");
        const data = await response.json();
        console.log(data);
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Join thousands of professionals who have found their path to
            productivity with Clind
          </p>
        </motion.div>

        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 btn btn-circle btn-ghost bg-base-100/80 backdrop-blur-sm"
          >
            ←
          </button>

          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.handle}
                className="bg-base-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[300px] snap-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.handle}
                      className="rounded-full object-cover border-2 border-primary"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium mb-2 line-clamp-2">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <a
                      href={`https://twitter.com/${testimonial.handle.slice(
                        1
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      {testimonial.handle}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 btn btn-circle btn-ghost bg-base-100/80 backdrop-blur-sm"
          >
            →
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-4"
                    : "bg-base-content/20 hover:bg-base-content/40"
                }`}
                onClick={() => {
                  if (sliderRef.current) {
                    const newScrollPosition = index * 300;
                    sliderRef.current.scrollTo({
                      left: newScrollPosition,
                      behavior: "smooth",
                    });
                    setCurrentIndex(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
