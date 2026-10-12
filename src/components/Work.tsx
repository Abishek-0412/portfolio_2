import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { projects } from "../data";
import { container, ease, SectionHeader } from "./ui";

type Project = (typeof projects)[number];

// Indent + width (in %) for the skeleton "code" lines in the preview window.
const lines: [number, number][] = [
  [0, 46], [1, 72], [2, 58], [2, 80], [1, 34], [0, 18], [0, 52], [1, 66], [2, 40],
];

function PreviewCard({ p }: { p: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#140c08]">
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full opacity-50 blur-3xl"
        style={{ background: p.accent }}
      />
      <div className="relative flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-cream/60">{p.file}</span>
      </div>
      <div className="relative grid flex-1 grid-cols-[1fr_auto] gap-4 p-5">
        <div className="space-y-2 pt-1">
          {lines.map(([indent, w], j) => (
            <motion.div
              key={j}
              className="flex items-center gap-2"
              style={{ paddingLeft: indent * 14 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: j * 0.04, duration: 0.4 }}
            >
              <span className="w-4 text-right font-mono text-[9px] text-cream/25">{j + 1}</span>
              <span
                className="h-1.5 rounded-full"
                style={{ width: `${w}%`, background: j % 3 === 0 ? p.accent : "rgba(246,238,230,0.18)" }}
              />
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col items-end justify-between text-right">
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] tracking-wider text-cream/70 uppercase">
            {p.kind}
          </span>
          <div>
            <p className="text-2xl tracking-tight text-cream">{p.name}</p>
            <p className="mt-1 text-xs text-cream/60">{p.tags.join(" · ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(0);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 0.5 });

  // Scrolling moves rows out from under a still pointer without a pointerleave — hide the preview.
  useEffect(() => {
    const hide = () => setHovered(null);
    window.addEventListener("scroll", hide, { passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, []);

  return (
    <section
      id="work"
      className={`${container} py-24 md:py-36`}
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <SectionHeader
        index="02"
        label="Selected Projects"
        title="Built for Production,"
        accent="Designed to Scale."
        aside="Five platforms across e-commerce, rewards, mobile, AI agents and medical imaging — each one taken from architecture to delivery."
      />

      <ul className="border-t border-line" onPointerLeave={() => setHovered(null)}>
        {projects.map((p, i) => {
          const isOpen = open === i;
          return (
            <motion.li
              key={p.name}
              className="border-b border-line"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                onPointerEnter={() => setHovered(i)}
                aria-expanded={isOpen}
                className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-12 md:gap-8 md:py-8"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ember/[0.07] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                <span className="relative flex items-center gap-3 text-xs tracking-[0.2em] text-muted uppercase md:col-span-3">
                  <span className="tabular-nums">0{i + 1}</span>
                  <span className="hidden h-px w-6 bg-line md:block" />
                  <span className="hidden md:block">{p.kind}</span>
                </span>
                <span className="relative text-3xl tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:col-span-5 md:text-5xl">
                  {p.name}
                </span>
                <span className="relative hidden text-muted md:col-span-3 md:block">{p.tagline}</span>
                <motion.span
                  className="relative grid h-10 w-10 place-items-center justify-self-end rounded-full border border-line text-xl transition-colors group-hover:border-ember group-hover:text-ember md:col-span-1"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 pb-10 md:grid-cols-12 md:gap-8">
                      <div className="md:col-span-5 md:col-start-4">
                        <p className="mb-4 text-cream md:hidden">{p.tagline}</p>
                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span key={t} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-cream/80">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ul className="space-y-3 text-muted md:col-span-4">
                        {p.points.map((pt, j) => (
                          <motion.li
                            key={pt}
                            className="flex gap-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + j * 0.08, duration: 0.5, ease }}
                          >
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                            {pt}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>

      {/* cursor-following code-window preview (desktop) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-30 hidden h-[230px] w-[380px] md:block"
        style={{ x, y, translateX: "-50%", translateY: "-115%" }}
        animate={{ opacity: hovered !== null ? 1 : 0, scale: hovered !== null ? 1 : 0.7, rotate: hovered !== null ? -2 : 0 }}
        transition={{ duration: 0.4, ease }}
      >
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease }}
            >
              <PreviewCard p={projects[hovered]} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
