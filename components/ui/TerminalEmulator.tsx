"use client";
import React, { useEffect, useRef, useState } from "react";

const demoCommands = [
  { cmd: "whoami", out: "arya" },
  { cmd: "ls", out: "aspireai  cyberguard  honeypot" },
  { cmd: "ls projects", out: "aspireai  cyberguard  honeypot" },
  { cmd: "cat flag.txt", out: "flag{static-demo-12345}" },
  { cmd: "help", out: "Available commands: whoami, ls, ls projects, cat flag.txt, clear, help" },
];

export default function TerminalEmulator({ className = "" }: { className?: string }) {
  const [lines, setLines] = useState<string[]>([
    "Welcome to the CTF Playground. Try: whoami, ls projects, cat flag.txt",
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const histIndexRef = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // auto-focus input when component mounts
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const run = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setLines((l) => [...l, `> ${text}`]);
  setHistory((h) => [...h, text]);
  histIndexRef.current = null;

    // handle built-in commands
    if (text === "clear") {
      setLines([]);
      return;
    }

    const match = demoCommands.find((c) => c.cmd === text);
    if (match) {
      setTimeout(() => setLines((l) => [...l, match.out]), 120);
      return;
    }

    // partial matches: commands starting with ls
    if (text.startsWith("ls")) {
      setTimeout(() => setLines((l) => [...l, "aspireai  cyberguard  honeypot"]), 120);
      return;
    }

    setTimeout(() => setLines((l) => [...l, `command not found: ${text}`]), 120);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!input.trim()) return;
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIndexRef.current === null ? history.length - 1 : Math.max(0, histIndexRef.current - 1);
      histIndexRef.current = idx;
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
      if (histIndexRef.current === null) return;
      const next = Math.min(history.length - 1, histIndexRef.current + 1);
      histIndexRef.current = next;
      setInput(history[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // simple tab completion
      const candidates = demoCommands.map((c) => c.cmd).filter((c) => c.startsWith(input));
      if (candidates.length === 1) {
        setInput(candidates[0]);
      } else if (candidates.length > 1) {
        setLines((l) => [...l, candidates.join("  ")]);
      }
    }
  };

  return (
    <div className={`w-full max-w-3xl mx-auto font-mono text-sm ${className}`}>
      <div
        ref={ref}
        className="h-72 overflow-auto bg-black/80 p-4 rounded neon-border text-neonGreen/90"
        aria-live="polite"
      >
        {lines.length === 0 && <div className="text-neonGreen/70">(terminal cleared)</div>}
        {lines.map((ln, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {ln.startsWith("> ") ? (
              <span className="text-neonGreen">{ln}</span>
            ) : (
              <span className="text-neonGreen/80">{ln}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2 items-center">
        <div className="px-3 py-2 bg-black/60 rounded border border-neonGreen/10 text-neonGreen/90 font-mono">arya@ctf:~$</div>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type a command (try: help)"
          className="flex-1 bg-black/60 p-2 rounded border border-neonGreen/10 text-neonGreen/90"
        />
        <button
          onClick={() => {
            if (!input.trim()) return;
            run(input);
            setInput("");
            inputRef.current?.focus();
          }}
          className="px-3 py-2 bg-neonGreen text-black rounded font-mono"
        >
          Run
        </button>
      </div>
    </div>
  );
}
