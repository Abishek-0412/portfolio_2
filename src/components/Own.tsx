import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { ownProjects } from "../data";
import { container, SectionHeader } from "./ui";

type OwnProject = (typeof ownProjects)[number];

function ProjectCard({
  project,
  i,
  progress,
}: {
  project: OwnProject;
  i: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const n = ownProjects.length;
  const start = i / n;
  const scale = useTransform(progress, [start, 1], [1, 1 - (n - 1 - i) * 0.05]);
  const dim = useTransform(progress, [start, start + 1 / n], [0, i === n - 1 ? 0 : 0.5]);

  return (
    <div className="sticky top-0 flex h-svh items-center pt-14 md:pt-0">
      <motion.article
        className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5"
        style={{ scale, top: `calc(${i} * 1.5rem)` }}
      >
        <div className="grid overflow-hidden rounded-[1.65rem] bg-ink-2 shadow-[inset_0_1px_0_rgba(246,238,230,0.1)] md:grid-cols-12">
          <div className="relative min-h-[200px] overflow-hidden md:col-span-5 md:min-h-[420px]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 38%, ${project.accent}66, transparent 58%)`,
              }}
            />
            {!project.wide && (
              <>
                <span className="pointer-events-none absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 md:h-72 md:w-72" />
                <span className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] md:h-[22rem] md:w-[22rem]" />
              </>
            )}
            <div className="relative z-10 flex h-full min-h-[200px] items-center justify-center md:min-h-[420px]">
              <motion.img
                src={project.image}
                alt=""
                className={`h-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)] ${
                  project.wide ? "w-[min(88%,380px)]" : "w-[min(52%,200px)]"
                }`}
                animate={reduce ? undefined : { y: [0, -12, 0] }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 6.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }
                }
              />
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-6 md:col-span-7 md:px-12 md:py-10">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-[0.18em] uppercase">
              <span className="text-ember">{project.status}</span>
              <span className="text-muted">{project.platform}</span>
            </p>
            <h3 className="mt-3 text-4xl leading-[0.95] tracking-tight md:text-6xl">{project.name}</h3>
            <p className="mt-3 max-w-[28ch] text-lg leading-snug text-cream/90 md:text-xl">{project.tagline}</p>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-muted md:text-base">{project.description}</p>

            <ul className="mt-5 max-w-xl space-y-1.5">
              {project.highlights.map((point) => (
                <li key={point} className="text-sm leading-snug text-cream/80">
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-cream/75">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="group mt-6 inline-flex w-fit items-center gap-3 rounded-full border border-cream/25 py-1.5 pr-1.5 pl-5 text-sm whitespace-nowrap text-cream transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-ember active:scale-[0.98]"
            >
              View on GitHub
              <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-base text-ink transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:bg-ember">
                <span aria-hidden>↗</span>
              </span>
            </a>
          </div>
        </div>
        <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

export function Own() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="own" className={`${container} scroll-mt-24 pt-24 md:pt-36`}>
      <SectionHeader
        index="03"
        label="Own Projects"
        title="Own Projects,"
        accent="Built by Me."
        aside="I created these myself. They have not been released, and I have not given them to anyone."
      />

      <div ref={ref} className="relative">
        {ownProjects.map((project, i) => (
          <ProjectCard key={project.name} project={project} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
