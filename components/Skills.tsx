"use client";
import { FaPython, FaJava, FaHtml5, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss, SiPrisma, SiWireshark, SiCplusplus } from 'react-icons/si';
import { GiPortculis } from 'react-icons/gi'; // for John The Ripper
import { BiNetworkChart } from 'react-icons/bi'; // for Nmap

import { motion } from 'framer-motion';

import Marquee from "react-fast-marquee";


const Skills = () => {
  return (
    <section className="relative bg-transparent">
      {/* cyber overlay */}
      <div aria-hidden className="absolute inset-0 pointer-events-none scanline-overlay" />

      <div className="max-w-6xl px-4 mx-auto relative z-10">
        <div className="relative mb-12 overflow-hidden">
          {/* Left gradient fade */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black via-transparent to-transparent z-10 pointer-events-none"></div>
          {/* Right gradient fade */}
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black via-transparent to-transparent z-10 pointer-events-none"></div>

          {/* Terminal-style heading */}
          <div className="my-12 text-center">
              <h1 className="font-mono text-neonGreen text-xl md:text-3xl tracking-wider">&lt;lang[uages] /&gt;</h1>
              <p className="text-xs text-neonGreen/60 font-mono mt-2">languages i wield</p>
          </div>

          <Marquee speed={50} gradient={false}>
            <div className="flex mb-12 items-center">
              {languages.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center mx-12"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                      <Icon size={44} className="text-neonGreen drop-shadow-[0_6px_16px_rgba(0,255,0,0.12)]" />
                      <span className="text-sm font-mono text-neonGreen mt-2">{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </Marquee>

          <div className="my-12 text-center">
              <h1 className="font-mono text-neonGreen text-xl md:text-3xl tracking-wider">&lt;tools /&gt;</h1>
              <p className="text-xs text-neonGreen/60 font-mono mt-2">technologies & tools</p>
          </div>

          <Marquee speed={50} gradient={false}>
            <div className="flex mb-12 items-center">
              {techSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center mx-12"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                      <Icon size={44} className="text-neonGreen drop-shadow-[0_6px_16px_rgba(0,255,0,0.12)]" />
                      <span className="text-sm font-mono text-neonGreen mt-2">{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </Marquee>

          {/* subtle matrix column (visual only) */}
          <div className="absolute right-4 top-4 hidden md:block">
            <div className="text-neonGreen/40 font-mono text-xs leading-4 select-none opacity-70">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className={`animate-pulse ${i % 2 ? 'opacity-40' : 'opacity-60'}`}>0{Math.floor(Math.random()*9)}1{Math.floor(Math.random()*9)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const languages = [
  { name: 'Python', icon: FaPython },
  { name: 'HTML5', icon: FaHtml5 },
  { name: 'Java', icon: FaJava },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'C++', icon: SiCplusplus },
];

const techSkills = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'React', icon: FaReact },
  { name: 'Prisma', icon: SiPrisma },
  { name: 'Wireshark', icon: SiWireshark },
  { name: 'John The Ripper', icon: GiPortculis },
  { name: 'Nmap', icon: BiNetworkChart },
];

export default Skills;
