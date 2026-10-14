import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { agentRun, ai, experience, faqs, flow, milestones, profile, reasons, skills, stats, tools } from "../data";
import { container, ease, FadeUp, PillButton, RevealText, SectionHeader } from "./ui";

/* ───────────────────────── About ───────────────────────── */

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = profile.summary.split(" ");

  return (
    <section id="about" className={`${container} pt-24 pb-20 md:pt-36 md:pb-28`}>
      <SectionHeader index="01" label="About" title="Full Stack Engineer," accent="AI-Integrated Builder." />

      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <FadeUp className="md:col-span-3">
          <div className="rounded-2xl border border-line p-5">
            <p className="mb-1 text-xs tracking-[0.2em] text-muted uppercase">Currently</p>
            <p className="text-cream">{profile.title}</p>
            <p className="text-sm text-muted">Brightspot Technology Solutions</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-cream/80">
              <span className="h-2 w-2 rounded-full bg-[#7dff9b]" /> Open to opportunities
            </div>
          </div>
        </FadeUp>
        <p ref={ref} className="text-2xl leading-snug md:col-span-9 md:text-[2.1rem] md:leading-[1.25]">
          {words.map((w, i) => (
            <ScrollWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-12 md:grid-cols-12 md:gap-8">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08} className="md:col-span-3">
            <p className="text-5xl tracking-tight text-ember md:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 max-w-[18ch] text-sm text-muted">{s.label}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Marquee ───────────────────────── */

export function Marquee() {
  const row = [...tools, ...tools];
  return (
    <section className="overflow-hidden border-y border-line py-8" aria-label="Tools and technologies">
      <motion.div
        className="flex w-max gap-10 text-4xl tracking-tight whitespace-nowrap md:text-6xl"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={i % 2 ? "text-outline" : "text-cream"}>{t}</span>
            <span className="text-2xl text-ember md:text-3xl">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Experience ───────────────────────── */

export function Experience() {
  const [tab, setTab] = useState(0);

  return (
    <section id="experience" className={`${container} py-24 md:py-36`}>
      <SectionHeader index="03" label="Experience" title="Leading Teams," accent="Shipping Systems." />

      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <FadeUp className="md:col-span-3">
          <div className="md:sticky md:top-28">
            <p className="text-sm tracking-[0.15em] text-ember uppercase">{experience.period}</p>
            <h3 className="mt-3 text-2xl leading-tight tracking-tight">{experience.role}</h3>
            <p className="mt-2 text-muted">
              {experience.company}
              <br />
              {experience.location}
            </p>
          </div>
        </FadeUp>

        <div className="md:col-span-9">
          <div className="mb-8 inline-flex rounded-full border border-line p-1" role="tablist">
            {experience.tabs.map((t, i) => (
              <button
                key={t.label}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors md:px-6 ${tab === i ? "text-ink" : "text-cream/70 hover:text-cream"}`}
              >
                {tab === i && (
                  <motion.span layoutId="exp-tab" className="absolute inset-0 rounded-full bg-cream" transition={{ duration: 0.5, ease }} />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              className="border-t border-line"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.06 } }, hidden: {} }}
            >
              {experience.tabs[tab].items.map((item, i) => (
                <motion.li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline border-b border-line py-5 text-lg text-cream/90 md:text-xl"
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                >
                  <span className="text-sm text-muted tabular-nums">0{i + 1}</span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>

          <div className="mt-16">
            <p className="mb-4 text-xs tracking-[0.22em] text-muted uppercase">Education</p>
            <ul className="border-t border-line">
              {milestones.map((m, i) => (
                <motion.li
                  key={m.title}
                  className="group grid gap-1 border-b border-line py-6 md:grid-cols-9 md:items-center md:gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                >
                  <h3 className="text-xl tracking-tight transition-colors group-hover:text-ember md:col-span-4 md:text-2xl">{m.title}</h3>
                  <p className="text-muted md:col-span-3">{m.meta}</p>
                  <p className="text-sm tracking-[0.15em] text-cream/70 uppercase md:col-span-2 md:text-right">{m.period}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── AI-Integrated Development ───────────────────────── */

function AgentTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const cmd = agentRun[0].text;
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (alive) {
        setTyped(0);
        setShown(0);
        await sleep(500);
        for (let c = 1; c <= cmd.length && alive; c++) {
          setTyped(c);
          await sleep(45);
        }
        for (let k = 1; k < agentRun.length && alive; k++) {
          await sleep(agentRun[k].t === "step" ? 850 : 400);
          setShown(k);
        }
        await sleep(3500);
      }
    })();
    return () => {
      alive = false;
    };
  }, [inView, cmd]);

  const progress = shown / (agentRun.length - 1);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0705] shadow-[0_30px_120px_-30px_rgba(155,123,255,0.35)]">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#9b7bff] opacity-25 blur-3xl" />
      <div className="relative flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-cream/50">aRa — agent run</span>
      </div>
      <div className="relative min-h-[320px] space-y-2.5 p-5 font-mono text-[13px] leading-relaxed md:p-6 md:text-sm">
        <p className="text-cream">
          <span className="text-[#7dff9b]">➜</span> <span className="text-[#9b7bff]">~</span> {cmd.slice(0, typed)}
          {shown === 0 && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-cream/80" />}
        </p>
        {agentRun.slice(1, shown + 1).map((l, idx) => {
          const k = idx + 1;
          const running = l.t === "step" && k === shown && shown < agentRun.length - 1;
          return (
            <motion.p key={k} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              {l.t === "dim" && <span className="text-cream/45">{l.text}</span>}
              {l.t === "ok" && <span className="text-[#7dff9b]">{l.text}</span>}
              {l.t === "step" && (
                <span className="flex gap-3">
                  <span className={running ? "text-[#febc2e]" : "text-[#7dff9b]"}>{running ? "◌" : "●"}</span>
                  <span className="w-28 shrink-0 text-cream">{l.text}</span>
                  <span className="text-cream/55">{running ? "running…" : `${l.status} ✓`}</span>
                </span>
              )}
            </motion.p>
          );
        })}
      </div>
      <div className="relative h-1 bg-white/5">
        <motion.div className="h-full bg-gradient-to-r from-[#9b7bff] to-ember" animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.5, ease }} />
      </div>
    </div>
  );
}

export function AiDev() {
  return (
    <section id="ai" className={`${container} py-24 md:py-36`}>
      <SectionHeader
        index="04"
        label="AI-Integrated Dev"
        title="Agents in the Loop,"
        accent="Not Just in the Pitch."
        aside="I design LLM pipelines and agent systems for real workflows — and use AI tooling every day to ship faster without cutting corners."
      />

      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 md:col-start-4">
          {ai.points.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.1} className="border-t border-line py-6">
              <p className="mb-2 flex items-center gap-3 text-lg text-cream">
                <span className="text-xs text-[#9b7bff] tabular-nums">0{i + 1}</span>
                {p.title}
              </p>
              <p className="text-muted">{p.body}</p>
            </FadeUp>
          ))}
          <FadeUp delay={0.3} className="flex flex-wrap gap-2 border-t border-line pt-6">
            {ai.tools.map((t) => (
              <span key={t} className="rounded-full border border-line px-3 py-1.5 text-sm text-cream/75 transition-colors hover:border-[#9b7bff] hover:text-cream">
                {t}
              </span>
            ))}
          </FadeUp>
        </div>
        <FadeUp delay={0.15} className="md:col-span-5">
          <AgentTerminal />
        </FadeUp>
      </div>
    </section>
  );
}

/* ───────────────────────── How I Build ───────────────────────── */

function Connector({ delay }: { delay: number }) {
  return (
    <div className="relative flex items-center justify-center md:flex-1 md:px-2">
      {/* vertical (mobile) */}
      <div className="relative h-10 w-px bg-cream/20 md:hidden">
        <motion.span
          className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-ember shadow-[0_0_12px_#f0640d]"
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
        />
      </div>
      {/* horizontal (desktop) */}
      <div className="relative hidden h-px w-full bg-cream/20 md:block">
        <motion.span
          className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-ember shadow-[0_0_12px_#f0640d]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

export function HowIBuild() {
  return (
    <section id="process" className={`${container} py-24 md:py-36`}>
      <SectionHeader
        index="05"
        label="How I Build"
        title="Architecture That"
        accent="Holds Under Load."
        aside="Event-driven services, async workers and a tuned data layer — instrumented end to end so every request can be traced."
      />

      <FadeUp className="mb-16 rounded-3xl border border-line bg-ink-2/60 p-6 md:p-10">
        <div className="flex flex-col items-stretch md:flex-row md:items-center">
          {flow.map((n, i) => (
            <div key={n.name} className="contents">
              <motion.div
                className="rounded-2xl border border-line bg-ink px-5 py-4 text-center md:min-w-[170px]"
                whileHover={{ y: -4, borderColor: "rgba(240,100,13,0.6)" }}
              >
                <p className="text-xs tracking-[0.2em] text-muted uppercase">{n.name}</p>
                <p className="mt-1 text-cream">{n.tech}</p>
              </motion.div>
              {i < flow.length - 1 && <Connector delay={i * 0.4} />}
            </div>
          ))}
        </div>
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-dashed border-ember/40 px-5 py-4">
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-ember/15 to-transparent"
            animate={{ left: ["-35%", "100%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />
          <p className="relative flex flex-col gap-1 text-sm md:flex-row md:items-center md:justify-between">
            <span className="tracking-[0.2em] text-ember uppercase">Observability layer</span>
            <span className="text-cream/80">OpenTelemetry traces → Datadog logs & alerts · Flipt feature flags</span>
          </p>
        </div>
      </FadeUp>

      <div className="grid gap-5 md:grid-cols-3">
        {reasons.map((r, i) => (
          <motion.article
            key={r.title}
            className="group relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-8"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease, delay: i * 0.12 }}
            whileHover={{ y: -8 }}
          >
            <div className="hero-bg absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative">
              <span className="mb-12 block text-sm text-muted transition-colors group-hover:text-cream/80">0{i + 1}</span>
              <h3 className="mb-3 text-2xl tracking-tight">{r.title}</h3>
              <p className="text-muted transition-colors group-hover:text-cream/90">{r.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Stack ───────────────────────── */

export function Stack() {
  return (
    <section id="stack" className="rounded-[2.5rem] bg-cream text-ink">
      <div className={`${container} py-24 md:py-36`}>
        <SectionHeader
          index="06"
          label="Stack"
          title="Tools of the Trade"
          accent="Across the Stack."
          aside="Comprehensive knowledge built through years of hands-on engineering — frontend to cloud, with security and observability baked in."
          light
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-ink/15 pt-12 md:grid-cols-12 md:gap-8">
          {skills.map((s, i) => (
            <FadeUp key={s.group} delay={i * 0.08} className={i === 0 ? "md:col-span-3" : "md:col-span-2"}>
              <p className="mb-1 text-xs text-blood tabular-nums">0{i + 1}</p>
              <h3 className="mb-5 text-lg font-medium">{s.group}</h3>
              <ul className="space-y-2 text-ink/65">
                {s.items.map((it) => (
                  <li key={it} className="transition-transform duration-300 hover:translate-x-1.5 hover:text-blood">
                    {it}
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className={`${container} py-24 md:py-36`}>
      <SectionHeader index="07" label="FAQ" title="Frequently Asked" accent="Questions" />
      <div className="md:grid md:grid-cols-12 md:gap-8">
        <ul className="border-t border-line md:col-span-9 md:col-start-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl md:text-2xl"
                >
                  {f.q}
                  <motion.span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                    animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#f0640d" : "rgba(246,238,230,0.1)" }}
                    transition={{ duration: 0.4, ease }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="max-w-3xl overflow-hidden pr-14 text-muted"
                    >
                      <span className="block pb-7">{f.a}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const nameX = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  return (
    <section id="contact" ref={ref} className="hero-bg grain relative overflow-hidden rounded-t-[2.5rem]">
      <div className={`${container} relative z-10 pt-24 md:pt-36`}>
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <FadeUp className="flex items-center gap-3 text-xs tracking-[0.22em] text-cream/75 uppercase md:col-span-3 md:items-start md:pt-4">
            <span>(08)</span> Contact
          </FadeUp>
          <div className="md:col-span-9">
            <h2 className="mb-10 text-[2.8rem] leading-[1] tracking-tight md:text-[5.6vw] xl:text-[5.5rem]">
              <RevealText text="Ready to Build" className="block" />
              <RevealText text="Something Reliable?" className="block" delay={0.12} />
            </h2>
            <div className="flex flex-wrap gap-4">
              <PillButton href={`mailto:${profile.email}`}>Get in Touch</PillButton>
              <PillButton href={profile.resume} variant="dark" download>
                Download Resume
              </PillButton>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-cream/25 py-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 md:col-start-4">
            <p className="mb-3 text-xs tracking-[0.2em] text-cream/60 uppercase">Reach Out</p>
            <a href={`mailto:${profile.email}`} className="text-lg underline-offset-4 hover:underline">
              {profile.email}
            </a>
            <p className="mt-1 text-cream/70">{profile.location}</p>
          </div>
          <div className="md:col-span-3">
            <p className="mb-3 text-xs tracking-[0.2em] text-cream/60 uppercase">Find Me On</p>
            <ul className="space-y-1 text-lg">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2">
                    {s.label}
                    <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3 md:text-right">
            <p className="mb-3 text-xs tracking-[0.2em] text-cream/60 uppercase">Copyright</p>
            <p className="text-lg">© Abishek N {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      <div className={`${container} relative overflow-hidden`}>
        <motion.p
          aria-hidden
          className="pb-6 text-[13vw] leading-[0.85] font-medium tracking-tighter whitespace-nowrap text-cream/95 select-none md:text-[10vw] xl:text-[9.5rem]"
          style={{ x: nameX }}
        >
          ABISHEK<span className="text-cream/40">.N</span>
        </motion.p>
      </div>
    </section>
  );
}
