"use client";
import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};

// removed unused wordVariants (was causing ESLint no-unused-vars)

const aboutMeText =
  "Hi, I am Arya, a computer science student at the University of Technology Sydney, where I immerse myself in the ever-evolving world of technology. My passion lies at the intersection of software engineering and cybersecurity, where I explore the art of building robust systems and fortifying them against digital threats. Whether it's crafting efficient algorithms or uncovering vulnerabilities in complex systems, I thrive on solving challenging problems and advancing technological innovation. I am dedicated to using my skills to create a safer, smarter digital future, one line of code at a time.";

export default function About() {
  return (
    <motion.div
      className="min-h-60 justify-center relative bg-black overflow-visible flex"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hacker-style scanlines / grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(0,255,0,0.02) 0 1px, transparent 1px 6px), linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.25))',
          mixBlendMode: 'overlay',
        }}
      />
      <div
        id="about"
        className="flex flex-col bg-transparent  md:flex-row mb-28 md:px-16  w-2/3 h-full"
      >
        {/* Text Section (terminal / hacker aesthetic) */}
  <div className="flex flex-col md:text-3xl sm:text-2xl p-8 rounded-xl justify-center  border shadow-2xl border-neonGreen/30 bg-black/60 transition-all duration-300 backdrop-blur-sm">
          <motion.div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_rgba(255,0,0,0.2)]" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,200,0,0.12)]" />
              <span className="w-3 h-3 rounded-full bg-neonGreen shadow-[0_0_8px_rgba(0,255,0,0.12)]" />
            </div>
            <motion.h2
              className="md:text-2xl sm:text-xl font-mono font-semibold text-neonGreen/90 tracking-wider cursor-default"
              initial={{ x: 0 }}
              animate={{ x: [0, -4, 0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 6, repeatType: "loop" }}
            >
              <Typewriter words={["[root@arya ~]$ _"]} cursor cursorStyle="_" typeSpeed={60} deleteSpeed={40} delaySpeed={2000} />
            </motion.h2>
          </motion.div>

          <motion.pre
            className="pt-3 text-neonGreen/90 md:text-base sm:text-sm font-mono leading-relaxed whitespace-pre-wrap bg-[rgba(0,0,0,0.2)] p-4 rounded border border-neonGreen/20"
            variants={containerVariants}
          >
            {aboutMeText}
          </motion.pre>

          {/* small code-like badge row */}
          <motion.div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1 rounded bg-transparent text-neonGreen border border-neonGreen/30">next</span>
            <span className="text-xs px-3 py-1 rounded bg-transparent text-neonGreen border border-neonGreen/30">ts</span>
            <span className="text-xs px-3 py-1 rounded bg-transparent text-neonGreen border border-neonGreen/30">tailwind</span>
            <span className="text-xs px-3 py-1 rounded bg-transparent text-neonGreen border border-neonGreen/30">three</span>
            <span className="text-xs px-3 py-1 rounded bg-transparent text-neonGreen border border-neonGreen/30">security</span>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="flex relative justify-center items-center md:min-w-80 md:min-h-80 md:max-h-96 md:max-w-96">
          <div className="absolute -inset-2 rounded-full blur-xl bg-gradient-to-r from-green-500/20 via-green-300/10 to-transparent opacity-80" />
          <motion.img
            src="/file(1).png"
            alt="About Image"
            className="rounded-full shadow-lg w-56 h-56 md:w-80 md:h-80 object-cover ring-2 ring-green-500/20"
            initial={{ scale: 0.98, rotate: -2 }}
            animate={{ scale: [0.98, 1.02, 0.98], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 6 }}
            variants={containerVariants}
          />
        </div>
      </div>
    </motion.div>
  );
}