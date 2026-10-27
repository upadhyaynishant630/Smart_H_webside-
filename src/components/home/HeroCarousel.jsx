import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/heroSlides";
import { ButtonLink } from "@/components/ui/brand";
import { cn } from "@/lib/utils";



const INTERVAL = 5500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();
  const touchX = useRef(null);
  const sectionRef = useRef(null);
  const count = heroSlides.length;

  // Scroll parallax for hero content
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const running = !paused && !hidden && !reduce;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
  }, [running, next, index]);

  const slide = heroSlides[index] ?? heroSlides[0];
  const stagger = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
    transition: { duration: 0.7, delay: reduce ? 0 : d, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <>
      <section
        ref={sectionRef}
        className="surface-dark relative isolate h-[min(88svh,860px)] min-h-145 overflow-hidden bg-midnight"
        aria-roledescription="carousel"
        aria-label="Smart H highlights"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? 0;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
          if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
          touchX.current = null;
        }}
      >
        {/* All images stay mounted and crossfade: no blank frames between slides */}
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1200 ease-brand",
              i === index ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={i !== index}
          >
            <img
              src={s.image}
              alt={s.alt}
              width={1920}
              height={1088}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              className={cn(
                "h-full w-full object-cover",
                i === index && !reduce && "animate-kenburns",
              )}
              style={{ objectPosition: s.focal }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-scrim" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-midnight to-transparent" />
        <div className="grid-lines absolute inset-0 opacity-70" />

        <motion.div
          className="container-x relative flex h-full flex-col justify-center pb-24"
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <div className="max-w-3xl" aria-live={running ? "off" : "polite"}>
            <AnimatePresence mode="wait">
              <motion.div key={slide.id}>
                <motion.span {...stagger(0)} className="eyebrow text-electric">
                  {String(index + 1).padStart(2, "0")} — {slide.eyebrow}
                </motion.span>
                <motion.h1 {...stagger(0.08)} className="text-display mt-5 text-balance">
                  {slide.title}
                </motion.h1>
                <motion.p
                  {...stagger(0.16)}
                  className="text-lead mt-6 max-w-xl text-muted-foreground"
                >
                  {slide.body}
                </motion.p>
                <motion.div {...stagger(0.24)} className="mt-9 flex flex-wrap gap-3">
                  <motion.div
                    whileHover={reduce ? undefined : { scale: 1.04 }}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                  >
                    <ButtonLink to={slide.primary.to} variant="primary">
                      {slide.primary.label}
                    </ButtonLink>
                  </motion.div>
                  {slide.secondary && (
                    <motion.div
                      whileHover={reduce ? undefined : { scale: 1.04 }}
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                    >
                      <ButtonLink to={slide.secondary.to} variant="ghostLight">
                        {slide.secondary.label}
                      </ButtonLink>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="container-x absolute inset-x-0 bottom-8 flex items-end justify-between gap-6"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-1 gap-2 sm:max-w-md" role="tablist" aria-label="Choose slide">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                onClick={() => go(i)}
                className="group flex-1 py-3"
              >
                <span className="relative block h-0.75 overflow-hidden rounded-full bg-foreground/20">
                  {i === index && (
                    <span
                      key={`${index}-${running}`}
                      className={cn("absolute inset-0 bg-signal", running ? "animate-progress" : "")}
                      style={running ? { animationDuration: `${INTERVAL}ms` } : undefined}
                    />
                  )}
                  {i < index && <span className="absolute inset-0 bg-foreground/60" />}
                </span>
                <span
                  className={cn(
                    "mt-2 hidden text-left text-xs transition-colors md:block",
                    i === index
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {s.eyebrow}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background/30 backdrop-blur transition hover:border-electric hover:text-electric"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background/30 backdrop-blur transition hover:border-electric hover:text-electric"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </section>

     
      
    </>
  );
}