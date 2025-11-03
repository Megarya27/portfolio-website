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
          "fixed top-12 inset-x-0 mx-auto z-[5000] flex items-center justify-center space-x-4 font-mono",
          className
        )}
      >
        {/* Desktop Menu */}
        <div
          className="hidden sm:flex max-w-fit bg-gradient-to-tl from-[#008000] via-[#000000] to-[#000000] fixed inset-x-0 mx-auto rounded-full text-green-500 shadow-[0px_2px_3px_-1px_rgba(0,255,0,0.1),0px_1px_0px_0px_rgba(0,255,0,0.02),0px_0px_0px_1px_rgba(0,255,0,0.08)] pr-2 pl-8 py-2 items-center justify-center"
        >
          {navItems.map((navItem, idx) => (
            <button
              key={`link-${idx}`}
              onClick={() => handleScroll(navItem.link)}
              className={cn(
                "flex max-w-fit rounded-full items-center pr-2 pl-8 py-2 justify-center space-x-4 text-xl hover:text-white dark:text-green-500 dark:hover:text-white"
              )}
            >
              <span className="block">{navItem.icon}</span>
              <span className="text-sm">{navItem.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
