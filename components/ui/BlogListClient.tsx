"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content?: string;
};

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const [selected, setSelected] = useState<Post | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <div className="grid gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="p-4 rounded neon-border bg-black/60 hover:neon-glow transition-all cursor-default">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="terminal-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <h2 className="font-mono text-neonGreen text-xl">{p.title}</h2>
              </div>
              <div className="text-sm text-neonGreen/60 font-mono">{p.date}</div>
            </div>

            <p className="text-neonGreen/80 mt-1">{p.excerpt}</p>

            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => setSelected(p)}
                className="text-sm text-neonGreen/90 underline font-mono"
              >
                Read →
              </button>

              <div className="flex gap-2 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded bg-transparent border border-neonGreen/20 text-neonGreen font-mono">{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* overlay */}
            <motion.div
              className="absolute inset-0 bg-black/60 scanline-overlay"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.article
              className="relative max-w-3xl w-full mx-4 bg-black/95 p-6 rounded neon-border neon-glow z-10 max-h-[80vh] overflow-auto"
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-mono text-2xl text-neonGreen">{selected.title}</h2>
                  <div className="text-sm text-neonGreen/60 mt-1 font-mono">{selected.date}</div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-neonGreen/80 px-2 py-1 rounded border border-neonGreen/10 hover:bg-neonGreen/6"
                  aria-label="Close article"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 text-neonGreen/90 font-mono leading-relaxed whitespace-pre-wrap break-words">
                {selected.content}
              </div>

              <div className="mt-6 flex gap-3 items-center">
                {selected.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded bg-transparent border border-neonGreen/20 text-neonGreen font-mono">{t}</span>
                ))}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
