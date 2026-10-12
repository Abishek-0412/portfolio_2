import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data";
import { container, ease, RevealText } from "./ui";

const ring = "FULL STACK • DEVELOPER LEAD • REACT • NODE • GO • AWS • AI AGENTS • ";

function RotatingBuild({ ready }: { ready: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % profile.builds.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.p
      className="flex flex-wrap items-baseline gap-x-2 text-lg text-cream/80 md:text-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease, delay: 1 }}
    >
      I build
      <span className="relative inline-flex h-[1.4em] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            className="inline-block font-medium text-cream"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease }}
          >
            {profile.builds[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.p>
  );
}

function Portrait({ ready, sx, sy, ringRotate }: {
  ready: boolean;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  ringRotate: MotionValue<number>;
}) {
  const rotateY = useTransform(sx, [0, 1], [-7, 7]);
  const rotateX = useTransform(sy, [0, 1], [6, -6]);

  return (
    <motion.div
      className="relative aspect-[2/3] h-[min(30svh,300px)] [perspective:1200px] max-md:[@media(max-height:700px)]:h-[24svh] md:h-[min(70vh,680px)]"
      initial={{ opacity: 0, y: 40 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease, delay: 0.25 }}
    >
      <motion.div className="relative h-full w-full" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {/* photo with clip reveal + slow settle zoom */}
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-[1.75rem] shadow-[0_40px_100px_-20px_rgba(20,6,2,0.7)] ring-1 ring-cream/15"
          initial={{ clipPath: "inset(100% 0% 0% 0% round 1.75rem)" }}
          animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 1.75rem)" } : {}}
          transition={{ duration: 1.4, ease, delay: 0.35 }}
        >
          <motion.img
            src="/abishek-portrait.webp"
            alt="Abishek N"
            className="h-full w-full object-cover object-[50%_20%]"
            initial={{ scale: 1.25 }}
            animate={ready ? { scale: 1 } : {}}
            transition={{ duration: 2.2, ease, delay: 0.35 }}
          />
          {/* warm grade so the photo sits inside the gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0640d]/25 via-transparent to-[#2a1108]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c0d07]/70 via-transparent to-transparent" />
        </motion.div>

        {/* floating glass chips */}
        <motion.div
          className="absolute -left-4 bottom-8 hidden items-center gap-2 rounded-full border border-cream/20 bg-ink/40 px-4 py-2 text-sm text-cream backdrop-blur-md md:flex"
          style={{ translateZ: 60 }}
          initial={{ opacity: 0, x: -20 }}
          animate={ready ? { opacity: 1, x: 0, y: [0, -6, 0] } : {}}
          transition={{ opacity: { delay: 1.4 }, x: { delay: 1.4, duration: 0.8, ease }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        >
          <span className="h-2 w-2 rounded-full bg-[#7dff9b]" /> Open to opportunities
        </motion.div>
        <motion.div
          className="absolute -right-5 top-[38%] hidden rounded-2xl border border-cream/20 bg-ink/40 px-4 py-3 text-right backdrop-blur-md md:block"
          style={{ translateZ: 80 }}
          initial={{ opacity: 0, x: 20 }}
          animate={ready ? { opacity: 1, x: 0, y: [0, 8, 0] } : {}}
          transition={{ opacity: { delay: 1.6 }, x: { delay: 1.6, duration: 0.8, ease }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <p className="text-2xl leading-none text-cream">5</p>
          <p className="mt-1 text-[11px] tracking-[0.15em] text-cream/70 uppercase">Platforms shipped</p>
        </motion.div>

        {/* rotating ring badge on the corner */}
        <motion.div
          className="absolute -top-6 -left-6 h-[4.5rem] w-[4.5rem] md:-top-12 md:-left-12 md:h-36 md:w-36"
          style={{ translateZ: 100 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease, delay: 1.1 }}
        >
          <div className="absolute inset-[22%] grid place-items-center rounded-full bg-gradient-to-br from-[#ff9a52] via-[#d8470a] to-[#4a0f04] text-sm tracking-tight text-cream shadow-[0_0_40px_rgba(240,100,13,0.5)] md:text-xl">
            AN
          </div>
          <motion.svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" style={{ rotate: ringRotate }}>
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              style={{ originX: "100px", originY: "100px" }}
            >
              <defs>
                <path id="circle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
              </defs>
              <text className="fill-cream text-[12.5px] tracking-[0.16em]">
                <textPath href="#circle">{ring}</textPath>
              </text>
            </motion.g>
          </motion.svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 900], [1, 0.9]);
  const dim = useTransform(scrollY, [0, 900], [0, 0.65]);
  const textY = useTransform(scrollY, [0, 900], [0, -140]);
  const ringRotate = useTransform(scrollY, [0, 900], [0, 140]);

  // Pointer-driven glow + parallax
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glowX = useTransform(sx, (v) => `${v * 100}%`);
  const glowY = useTransform(sy, (v) => `${v * 100}%`);

  return (
    <motion.section
      className="hero-bg grain sticky top-0 h-svh w-full origin-top overflow-hidden"
      style={{ scale }}
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth);
        my.set(e.clientY / window.innerHeight);
      }}
    >
      {/* pointer glow */}
      <motion.div
        className="pointer-events-none absolute h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff8a3d] opacity-40 blur-[120px]"
        style={{ left: glowX, top: glowY }}
      />

      <motion.div
        className={`${container} relative z-10 grid h-full grid-cols-1 content-center gap-6 pt-20 pb-24 md:pt-0 md:grid-cols-12 md:content-center md:items-center md:gap-8 md:pb-0`}
        style={{ y: textY }}
      >
        <div className="flex justify-center md:order-2 md:col-span-5 md:justify-end">
          <Portrait ready={ready} sx={sx} sy={sy} ringRotate={ringRotate} />
        </div>
        <div className="md:order-1 md:col-span-7">
        <motion.p
          className="mb-6 flex items-center gap-3 text-xs tracking-[0.25em] text-cream/75 uppercase"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7dff9b] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7dff9b]" />
          </span>
          Full Stack · AI-Integrated Development
        </motion.p>
        <h1 className="text-[14vw] leading-[0.95] font-normal tracking-tight md:text-[7vw] xl:text-[6.75rem]">
          <RevealText text="Engineering" animate={ready} delay={0.2} className="block" />
          <RevealText text="Systems" animate={ready} delay={0.32} className="block" />
          <RevealText text="in Motion" animate={ready} delay={0.44} className="block" />
        </h1>
        <div className="mt-8">
          <RotatingBuild ready={ready} />
        </div>
        </div>
      </motion.div>

      {/* bottom info bar */}
      <div className={`${container} absolute inset-x-0 bottom-0 z-10`}>
        <motion.div
          className="grid grid-cols-2 gap-4 border-t border-cream/25 py-5 text-sm text-cream/80 md:grid-cols-12 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 1.1 }}
        >
          <p className="md:col-span-3">
            {profile.role}
            <br />
            <span className="text-cream/55">{profile.title}</span>
          </p>
          <p className="md:col-span-3">
            4+ Years Experience
            <br />
            <span className="text-cream/55">{profile.location}</span>
          </p>
          <p className="hidden md:col-span-4 md:block">
            React · Node.js · Go · AWS
            <br />
            <span className="text-cream/55">LangGraph · OpenTelemetry</span>
          </p>
          <div className="hidden items-center justify-end gap-3 md:col-span-2 md:flex">
            <span className="text-xs tracking-[0.3em]">SCROLL</span>
            <span className="relative h-8 w-px overflow-hidden bg-cream/25">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-cream"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div className="pointer-events-none absolute inset-0 z-20 bg-ink" style={{ opacity: dim }} />
    </motion.section>
  );
}
