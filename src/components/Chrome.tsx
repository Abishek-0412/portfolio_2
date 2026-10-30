import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
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

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Own Projects", href: "#own" },
  { label: "Experience", href: "#experience" },
  { label: "AI", href: "#ai" },
  { label: "Stack", href: "#stack" },
];

export function Nav({ ready }: { ready: boolean }) {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 80));

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1));
    const mark = () => {
      const line = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    mark();
    window.addEventListener("scroll", mark, { passive: true });
    return () => window.removeEventListener("scroll", mark);
  }, []);

  useEffect(() => {
    const close = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    window.addEventListener("resize", close);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("resize", close);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div className="fixed top-0 left-0 z-50 h-[3px] w-full origin-left bg-ember" style={{ scaleX }} />
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,padding,backdrop-filter] duration-500 ${
          solid || open ? "border-b border-line bg-ink/75 py-3 backdrop-blur-xl" : "py-5 md:py-7"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
      >
        <div className={`${container} flex items-center justify-between gap-4`}>
        <a href="#top" className="text-2xl tracking-tight md:text-[1.7rem]" data-cursor="hover" onClick={() => setOpen(false)}>
          {profile.firstName}
          <span className="text-cream/50">.{profile.lastName}</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-cream/80 xl:flex">
          {navLinks.map((link) => {
            const on = active === link.href.slice(1);
            return (
              <a key={link.href} href={link.href} className={`group relative whitespace-nowrap transition-colors duration-300 ${on ? "text-cream" : "hover:text-cream"}`}>
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-ember transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-hover:bg-cream"}`} />
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-sm text-cream xl:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
          <span className="hidden sm:inline-flex" onClick={() => setOpen(false)}>
            <PillButton href="#contact">Get in Touch</PillButton>
          </span>
        </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            className="fixed inset-0 z-30 bg-ink px-5 pt-28 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="mx-auto flex w-full max-w-[1440px] flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease, delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="block py-4 text-3xl tracking-tight"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-6 sm:hidden" onClick={() => setOpen(false)}>
                <PillButton href="#contact">Get in Touch</PillButton>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
