import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Word-by-word masked reveal (each word slides up out of an overflow mask). */
export function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  once = true,
  animate,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** When set, plays on this flag instead of on scroll-into-view. */
  animate?: boolean;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "110%", rotate: 4 },
    show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease } },
  };
  const trigger =
    animate === undefined
      ? { whileInView: "show", viewport: { once, amount: 0.4 } }
      : { animate: animate ? "show" : "hidden" };

  return (
    <motion.span className={className} variants={container} initial="hidden" {...trigger} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block origin-bottom-left" variants={word}>
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Element drifts toward the pointer while hovered, springs back on leave. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function PillButton({
  href,
  children,
  variant = "light",
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark";
  download?: boolean;
}) {
  const base =
    variant === "light"
      ? "bg-cream text-ink"
      : "bg-transparent text-cream border border-cream/30";
  return (
    <Magnetic>
      <a
        href={href}
        download={download}
        data-cursor="hover"
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-base font-medium transition-colors ${base}`}
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-ember transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
        <span className="relative h-2 w-2 rounded-full bg-current transition-transform duration-500 group-hover:scale-150" />
        <span className="relative">{children}</span>
      </a>
    </Magnetic>
  );
}

export const container = "mx-auto w-full max-w-[1440px] px-5 md:px-10";

/** Editorial section header: index + label in the left 3 columns, title in the right 9. */
export function SectionHeader({
  index,
  label,
  title,
  accent,
  aside,
  light = false,
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  aside?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:gap-8">
      <FadeUp className={`flex items-center gap-3 text-xs tracking-[0.22em] uppercase md:col-span-3 md:items-start md:pt-4 ${light ? "text-ink/55" : "text-muted"}`}>
        <span className={light ? "text-blood" : "text-ember"}>({index})</span>
        {label}
      </FadeUp>
      <div className="md:col-span-9">
        <h2 className="text-[2.6rem] leading-[1.02] tracking-tight md:text-[4.4vw] xl:text-[4.25rem]">
          <RevealText text={title} className="block" />
          {accent && <RevealText text={accent} className={`block ${light ? "text-blood" : "text-muted"}`} delay={0.12} />}
        </h2>
        {aside && (
          <FadeUp delay={0.2} className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${light ? "text-ink/65" : "text-muted"}`}>
            {aside}
          </FadeUp>
        )}
      </div>
    </div>
  );
}
