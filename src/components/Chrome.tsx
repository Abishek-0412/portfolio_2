import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data";
import { container, ease, PillButton } from "./ui";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.1,
      ease: [0.4, 0, 0.6, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: onDone,
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <motion.div
      className="hero-bg fixed inset-0 z-[100] flex flex-col justify-between p-[5vw]"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="overflow-hidden text-lg tracking-wide">
        <motion.p initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.6, ease }}>
          {profile.firstName}
          <span className="opacity-60">{profile.lastName}</span> — Portfolio ©{new Date().getFullYear()}
        </motion.p>
      </div>
      <div className="flex items-end justify-between">
        <p className="max-w-xs text-sm text-cream/70">Engineering reliable systems, optimizing performance, delivering great experiences.</p>
        <span className="text-[22vw] leading-[0.8] font-light tabular-nums md:text-[14vw]">{count}</span>
      </div>
    </motion.div>
  );
}

/** Small dot that tracks the pointer exactly, plus a thin ring that trails and grows over links. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  const center = { translateX: "-50%", translateY: "-50%" };
  return (
    <>
      <motion.div
        className="cursor-dot pointer-events-none fixed top-0 left-0 z-[91] h-1.5 w-1.5 rounded-full bg-ember"
        style={{ x, y, ...center }}
        animate={{ scale: hover ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="cursor-dot pointer-events-none fixed top-0 left-0 z-[90] h-7 w-7 rounded-full border border-cream/50"
        style={{ x: rx, y: ry, ...center }}
        animate={{
          scale: hover ? 1.5 : 1,
          backgroundColor: hover ? "rgba(240,100,13,0.15)" : "rgba(240,100,13,0)",
          borderColor: hover ? "rgba(240,100,13,0.8)" : "rgba(246,238,230,0.45)",
        }}
        transition={{ duration: 0.25, ease }}
      />
    </>
  );
}

export function Nav({ ready }: { ready: boolean }) {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 80));

  return (
    <>
      <motion.div className="fixed top-0 left-0 z-50 h-[3px] w-full origin-left bg-ember" style={{ scaleX }} />
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,padding,backdrop-filter] duration-500 ${
          solid ? "border-b border-line bg-ink/75 py-3 backdrop-blur-xl" : "py-5 md:py-7"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
      >
        <div className={`${container} flex items-center justify-between`}>
        <a href="#top" className="text-2xl tracking-tight md:text-[1.7rem]" data-cursor="hover">
          {profile.firstName}
          <span className="text-cream/50">.{profile.lastName}</span>
        </a>
        <nav className="hidden gap-8 text-sm text-cream/80 lg:flex">
          {["About", "Work", "Experience", "AI", "Stack"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="group relative">
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-cream transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <PillButton href="#contact">Get in Touch</PillButton>
        </div>
      </motion.header>
    </>
  );
}
