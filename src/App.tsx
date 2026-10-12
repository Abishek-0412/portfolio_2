import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { useCallback, useEffect, useState } from "react";
import { Cursor, Nav, Preloader } from "./components/Chrome";
import { Hero } from "./components/Hero";
import { About, AiDev, Contact, Experience, Faq, HowIBuild, Marquee, Stack } from "./components/Sections";
import { Work } from "./components/Work";

export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  // Smooth scrolling + smooth in-page anchor links
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <Cursor />
      <Nav ready={!loading} />
      {/* Scroll target for the logo — the hero itself is sticky, so it can't serve as one */}
      <div id="top" className="absolute top-0" />
      <Hero ready={!loading} />
      {/* Content slides up over the sticky hero */}
      <main className="relative z-10 -mt-px rounded-t-[2.5rem] bg-ink shadow-[0_-40px_80px_rgba(0,0,0,0.35)]">
        <About />
        <Work />
        <Marquee />
        <Experience />
        <AiDev />
        <HowIBuild />
        <Stack />
        <Faq />
        <Contact />
      </main>
    </>
  );
}
