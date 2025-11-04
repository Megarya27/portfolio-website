"use client";
import React, { useState } from "react";
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
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImgError((s) => ({ ...s, [id]: true }));
  };

  const certificates = [
    {
      id: "c1",
      name: "COMPTIA SECURITY +",
      issuer: "CompTIA",
      date: "In progress",
      credentialUrl: "",
      // prefer user-provided PNG if available in public folder
      image: "/comptia_secplus.png",
      status: "In Progress",
      description: "Preparing certification materials and hands-on labs for Security+.",
    },
    {
      id: "c2",
      name: "TryHackMe SAL1",
      issuer: "TryHackMe",
      date: "Coming soon",
      credentialUrl: "",
      image: "/sal1.png",
      status: "Coming Soon",
      description: "Structured attack labs (SAL1) — scheduled to complete soon.",
    },
  ];

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

      {/* Certificates Section */}
      <section id="certificates" className="mt-16">
        <motion.h3
          className="text-2xl font-mono text-neonGreen mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CERTIFICATES
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert.id)}
              className="cursor-pointer neon-border neon-glow p-4 rounded-lg bg-black/30 hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {cert.image && !imgError[cert.id] ? (
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 object-cover rounded-md"
                      onError={() => handleImgError(cert.id)}
                    />
                  ) : (
                    <div className="w-14 h-14 neon-border rounded-md flex items-center justify-center text-neonGreen font-mono">CERT</div>
                  )}
                  <div>
                    <div className="font-mono text-neonGreen/90 text-sm">{cert.name}</div>
                    <div className="text-xs text-neonGreen/60 font-mono">{cert.issuer}</div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className={`px-2 py-1 rounded-full text-xs font-mono ${
                    cert.status === "Coming Soon"
                      ? "bg-gray-800 text-gray-300"
                      : cert.status === "In Progress"
                      ? "bg-yellow-900 text-yellow-300"
                      : "bg-green-900 text-green-300"
                  }`}>{cert.status}</div>
                  <div className="text-xs text-neonGreen/60 font-mono mt-1">{cert.date}</div>
                </div>
              </div>

              <div className="text-neonGreen/70 text-sm font-mono truncate">{cert.description}</div>
            </div>
          ))}
        </div>

        {/* certificate modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-[6000] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedCert(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative neon-border neon-glow bg-black/30 rounded-lg max-w-2xl w-full mx-4 p-6"
            >
              {(() => {
                const cert = certificates.find((c) => c.id === selectedCert)!;
                return (
                  <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-mono text-neonGreen text-lg">{cert.name}</h4>
                            <div className="text-neonGreen/70 text-sm font-mono">{cert.issuer} • {cert.date}</div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <div className={`px-2 py-1 rounded-full text-xs font-mono ${
                              cert.status === "Coming Soon"
                                ? "bg-gray-800 text-gray-300"
                                : cert.status === "In Progress"
                                ? "bg-yellow-900 text-yellow-300"
                                : "bg-green-900 text-green-300"
                            }`}>{cert.status}</div>
                            <button onClick={() => setSelectedCert(null)} className="text-neonGreen/60">✕</button>
                          </div>
                        </div>
                        <div className="mt-4 text-neonGreen/70 font-mono text-sm">
                          {cert.description}
                        </div>
                        {cert.credentialUrl ? (
                          <div className="mt-4">
                            <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-neonGreen/90 font-mono underline">View credential</a>
                          </div>
                        ) : (
                          <div className="mt-4 text-neonGreen/50 text-xs font-mono">{cert.status === "Coming Soon" ? "Credential coming soon." : "Work in progress — credential will be available soon."}</div>
                        )}
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </section>
    </section>
  );
};

export default Projects;
