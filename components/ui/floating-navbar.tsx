"use client";
import React, { JSX, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";


export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Initially visible
  // mobile menu state removed (not used)
  const [isMobile, setIsMobile] = useState(false); // State to track screen size

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Check if screen width is smaller than 640px
    };

    handleResize(); // Run on component mount
    window.addEventListener("resize", handleResize); // Update on window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction <= 0); // Show on scroll up, hide on scroll down
      }
    }
  });

  const handleScroll = (link: string) => {
    // Route navigation
    if (link.startsWith("/")) {
      window.location.href = link;
      return;
    }

    // In-page anchor like "#section"
    if (link.startsWith("#")) {
      const id = link.slice(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Absolute URL (open new tab)
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.open(link, "_blank");
      return;
    }

    // Fallback: try to find element by id
    const element = document.getElementById(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isMobile) return null; // Hide navigation bar on mobile

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }} // Smoother animation
        className={cn(
          "fixed top-12 inset-x-0 mx-auto z-[5000] flex items-center justify-center space-x-4 font-mono pointer-events-auto",
          className
        )}
      >
        <div className="relative">
          {/* Decorative neon glow and scanline backdrop */}
          <div
            className="hidden sm:flex max-w-fit relative rounded-full pr-2 pl-8 py-2 items-center justify-center overflow-hidden bg-gradient-to-tl from-[#002200] via-[#003300] to-[#001100] text-neonGreen shadow-[0_6px_30px_-10px_rgba(0,255,0,0.25)] neon-glow"
          >
            {/* subtle left neon bar */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-neonGreen/40 rounded-r-md blur-sm" aria-hidden />

            {/* scanline overlay */}
            <span className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,#0000,rgba(0,0,0,0.04) 1px)] mix-blend-overlay animate-[scan_8s_linear_infinite]" aria-hidden />

            {navItems.map((navItem, idx) => (
              <button
                key={`link-${idx}`}
                onClick={() => handleScroll(navItem.link)}
                className={cn(
                  "flex max-w-fit rounded-full items-center pr-2 pl-8 py-2 justify-center space-x-4 text-xl hover:text-white",
                  "transition-colors duration-200 ease-in-out",
                )}
              >
                <span className="block opacity-90">{navItem.icon}</span>
                <span className="text-sm font-mono tracking-wide text-neonGreen/90">{navItem.name}</span>
              </button>
            ))}
          </div>

          {/* terminal control dots centered under the navbar for flair */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 text-[8px] pointer-events-none">
            <span className="h-2 w-2 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(255,0,0,0.6)]" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/80 shadow-[0_0_8px_rgba(255,200,0,0.45)]" />
            <span className="h-2 w-2 rounded-full bg-neonGreen shadow-[0_0_10px_rgba(0,255,136,0.7)] animate-pulse" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
