"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "AspireAI",
    description: "AspireAI - The AI-powered career coach that helps you craft the perfect resume, ace interviews, and stay ahead with industry trends. 🚀",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    image: "/aspireai.png",
    link: "https://aspireai-megarya27s-projects.vercel.app/",
    github: "https://github.com/Megarya27/aspireai",
  },
  {
    title: "CyberGuard",
    description: "Advanced AI-powered phishing detection that analyzes email content, identifies sophisticated threats, and provides clear, actionable security guidance — no cybersecurity degree required",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    image: "/CyberGuard.png",
    link: "https://phish-me-not-ai-detect-main.vercel.app/",
    github: "https://github.com/Megarya27/phish-me-not-ai-detect-main",
  }
  //  more projects to add here
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
      {/* cyber scanline overlay */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0 scanline-overlay" />
      <motion.h2
        className="m-20 text-center text-3xl font-mono font-bold text-neonGreen transition-transform cursor-default"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        &lt;/PROJECTS&gt;
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className="relative group"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,0,0.08)] border border-neonGreen/10 bg-gradient-to-b from-black/80 via-black/60 to-black/90">
              {/* terminal window header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-green-600/10 bg-black/40">
                    <div className="flex items-center gap-2 terminal-dots">
                      <span className="dot-red" />
                      <span className="dot-yellow" />
                      <span className="dot-green" />
                    </div>
                  <div className="text-xs font-mono text-neonGreen/70">{project.title}</div>
              </div>

              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 brightness-[0.6]"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-neonGreen font-mono">{project.title}</h3>
                <pre className="text-neonGreen/90 text-sm mb-4 font-mono bg-black/20 p-3 rounded-[6px] border border-neonGreen/10 whitespace-pre-wrap">{project.description}</pre>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono text-neonGreen rounded bg-transparent border border-neonGreen/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-black rounded-lg transition-transform duration-200 bg-gradient-to-r from-neonGreen to-neonGreen/70 hover:scale-105 shadow-[0_6px_18px_rgba(0,255,0,0.08)]"
                  >
                    View
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-neonGreen/90 rounded-lg border border-neonGreen/30 hover:bg-neonGreen/10 transition-colors duration-200 font-mono"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
