import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { projects } from "../data";
import { container, ease, SectionHeader } from "./ui";

type Project = (typeof projects)[number];

/** One full-bleed card; it pins while the next one slides over it, shrinking and dimming as it's covered. */
function ProjectCard({ p, i, progress }: { p: Project; i: number; progress: MotionValue<number> }) {
  const n = projects.length;
  const start = i / n;
  const scale = useTransform(progress, [start, 1], [1, 1 - (n - 1 - i) * 0.05]);
  const dim = useTransform(progress, [start, start + 1 / n], [0, i === n - 1 ? 0 : 0.5]);

  return (
    <div className="sticky top-0 flex h-svh items-center pt-14 md:pt-0">
      <motion.article
        className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-line bg-ink-2"
        style={{ scale, top: `calc(${i} * 1.5rem)` }}
      >
        <div
          className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full opacity-35 blur-[120px]"
          style={{ background: p.accent }}
        />
        <div className="relative grid gap-8 p-6 md:grid-cols-12 md:gap-10 md:p-12">
          <div className="flex flex-col md:col-span-6">
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-muted uppercase">
              <span className="tabular-nums" style={{ color: p.accent }}>
                0{i + 1}
              </span>
              <span className="h-px w-6 bg-line" />
              {p.kind}
            </div>

            <h3 className="mt-6 text-4xl leading-[0.95] tracking-tight md:mt-12 md:text-7xl">{p.name}</h3>
            <p className="mt-3 text-cream/80 md:text-xl">{p.tagline}</p>

            <div className="mt-6 md:mt-auto md:pt-12">
              <p className="mb-3 hidden text-xs tracking-[0.2em] text-muted uppercase md:block">Tech</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-cream/80 md:px-3.5 md:py-1.5 md:text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-6 md:border-l md:border-line md:pl-10">
            <p className="hidden justify-between text-xs tracking-[0.2em] text-muted uppercase md:flex">
              What I built
              <span className="tabular-nums">
                0{i + 1} / 0{n}
              </span>
            </p>
            <ol className="text-sm md:mt-auto md:text-lg">
              {p.points.map((pt, j) => (
                <motion.li
                  key={pt}
                  className="flex gap-4 border-t border-line py-3 first:border-t-0 md:gap-6 md:py-5 md:first:border-t"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.15 + j * 0.08, duration: 0.6, ease }}
                >
                  <span className="pt-0.5 text-xs tabular-nums md:pt-1.5" style={{ color: p.accent }}>
                    0{j + 1}
                  </span>
                  <span className="text-cream/80">{pt}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
        <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

export function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="work" className={`${container} pt-24 md:pt-36`}>
      <SectionHeader
        index="02"
        label="Selected Projects"
        title="Built for Production,"
        accent="Designed to Scale."
        aside="Five platforms across e-commerce, rewards, mobile, AI agents and medical imaging — each one taken from architecture to delivery."
      />

      <div ref={ref} className="relative">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
