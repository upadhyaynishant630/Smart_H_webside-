
import { useCallback, useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { heroSlides } from "@/data/heroSlides";
import { ButtonLink } from "@/components/ui/brand";

// ======================================================
// CONFIGURATION
// ======================================================

const AUTOPLAY_INTERVAL = 3000;
const COUNTER_DURATION = 1800;
const SWIPE_THRESHOLD = 48;

const HERO_SLIDES = Array.isArray(heroSlides)
  ? heroSlides
  : [];

// ======================================================
// SOLAR PERFORMANCE STATISTICS
// ======================================================

const heroStats = [
  {
    id: "experience",
    value: 7,
    suffix: "+",
    label: "Years Experience",
    description: "Years Experience",
  },
  {
    id: "projects",
    value: 500,
    suffix: "+",
    label: "Projects Completed",
    description: "Projects Completed",
  },
  {
    id: "solar",
    value: 5,
    suffix: "MW+",
    label: "Solar Installed",
    description: "Solar Installed",
  },
  {
    id: "satisfaction",
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Client Satisfaction",
  },
];

// ======================================================
// COUNTING NUMBER COMPONENT
// ======================================================

function AnimatedStatValue({
  value,
  suffix = "",
  duration = COUNTER_DURATION,
}) {
  const [count, setCount] = useState(0);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frameId = null;
    let startTime = null;
    let cancelled = false;

    const safeDuration = Math.max(
      1,
      Number(duration) || COUNTER_DURATION
    );

    if (reduceMotion) {
      setCount(value);
      return undefined;
    }

    setCount(0);

    const animate = (timestamp) => {
      if (cancelled) return;

      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const progress = Math.min(
        elapsed / safeDuration,
        1
      );

      // Smooth ease-out counting.
      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      const nextValue = Math.round(
        value * easedProgress
      );

      setCount(
        progress >= 1 ? value : nextValue
      );

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      cancelled = true;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [value, duration, reduceMotion]);

  return (
    <span
      className="se-hero-stats__value"
      aria-hidden="true"
    >
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// ======================================================
// SOLAR HERO STATS
// ======================================================

function SolarHeroStats() {
  return (
    <section
      className="se-hero-stats"
      aria-label="SmartEdge solar performance highlights"
    >
      <div className="se-hero-stats__inner">
        {heroStats.map((stat) => (
          <div
            key={stat.id}
            className="se-hero-stats__item"
            role="group"
            aria-label={`${stat.value}${stat.suffix} ${stat.description}`}
          >
            <AnimatedStatValue
              value={stat.value}
              suffix={stat.suffix}
              duration={COUNTER_DURATION}
            />

            <span className="se-hero-stats__label">
              {stat.label}
            </span>

            <span
              className="se-hero-stats__accent"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ======================================================
// COMPLETE HERO CAROUSEL STYLES
// ======================================================

const heroCarouselStyles = `

/* =========================================
   BASE
========================================= */

.se-hero,
.se-hero *,
.se-hero *::before,
.se-hero *::after,
.se-hero-stats,
.se-hero-stats *,
.se-hero-stats *::before,
.se-hero-stats *::after {
  box-sizing: border-box;
}

.se-hero {
  --se-header-offset: 82px;
  --se-bg: #06111f;
  --se-white: #f7fbff;
  --se-muted: rgba(233, 241, 251, .78);
  --se-accent: #70edf1;

  position: relative;
  isolation: isolate;

  width: 100%;
  height: min(920px, max(520px, calc(100svh - var(--se-header-offset))));
  min-height: 520px;

  overflow: hidden;

  color: var(--se-white);
  background: var(--se-bg);

  font-family: inherit;
  -webkit-tap-highlight-color: transparent;
}

.se-hero button {
  font: inherit;
}

/* =========================================
   BACKGROUND IMAGES
========================================= */

.se-hero__images,
.se-hero__image-layer {
  position: absolute;
  inset: 0;
}

.se-hero__images {
  z-index: 0;
  overflow: hidden;
  background: var(--se-bg);
}

.se-hero__image-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;

  opacity: 0;
  pointer-events: none;

  background: var(--se-bg);

  transition:
    opacity 1100ms cubic-bezier(.22, 1, .36, 1);
}

.se-hero__image-layer.is-active {
  opacity: 1;
}

.se-hero__image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  transform: scale(1.035);

  user-select: none;
  -webkit-user-drag: none;

  will-change: transform;
}

.se-hero__image.is-kenburns {
  animation:
    seHeroKenBurns
    6s
    cubic-bezier(.2, .65, .3, 1)
    both;
}

@keyframes seHeroKenBurns {
  from {
    transform: scale(1.035) translate3d(0, 0, 0);
  }

  to {
    transform: scale(1.09) translate3d(-1%, -.5%, 0);
  }
}

/* =========================================
   IMAGE OVERLAY
========================================= */

.se-hero__overlay {
  position: absolute;
  z-index: 1;
  inset: 0;

  pointer-events: none;

  background:
    linear-gradient(
      90deg,
      rgba(3, 10, 20, .96) 0%,
      rgba(4, 13, 26, .88) 29%,
      rgba(4, 13, 26, .58) 56%,
      rgba(4, 13, 26, .17) 100%
    ),
    linear-gradient(
      0deg,
      rgba(3, 10, 20, .88) 0%,
      rgba(3, 10, 20, .08) 40%,
      rgba(3, 10, 20, .27) 100%
    );
}

/* =========================================
   AMBIENT BACKGROUND
========================================= */

.se-hero__ambient {
  position: absolute;
  z-index: 1;
  inset: 0;

  pointer-events: none;

  background:
    radial-gradient(
      ellipse at 72% 42%,
      rgba(42, 215, 226, .16),
      transparent 31%
    ),
    radial-gradient(
      ellipse at 12% 94%,
      rgba(25, 111, 164, .18),
      transparent 35%
    ),
    linear-gradient(
      115deg,
      rgba(3, 13, 25, .12),
      transparent 58%
    );

  animation: seHeroAmbient 12s ease-in-out infinite alternate;
}

@keyframes seHeroAmbient {
  from {
    opacity: .72;
    transform: scale(1);
  }

  to {
    opacity: 1;
    transform: scale(1.035);
  }
}

/* =========================================
   BACKGROUND GRID
========================================= */

.se-hero__grid {
  position: absolute;
  z-index: 1;

  inset: -8% -4%;

  pointer-events: none;
  opacity: .14;

  background-image:
    linear-gradient(
      rgba(207, 231, 255, .12) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(207, 231, 255, .12) 1px,
      transparent 1px
    );

  background-size: 76px 76px;

  mask-image:
    linear-gradient(90deg, #000 0%, transparent 78%);

  -webkit-mask-image:
    linear-gradient(90deg, #000 0%, transparent 78%);

  animation: seHeroGridDrift 30s linear infinite;
}

@keyframes seHeroGridDrift {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-38px, 38px, 0);
  }
}

/* =========================================
   DECORATIVE ORB
========================================= */

.se-hero__orb {
  position: absolute;
  z-index: 1;

  top: 50%;
  right: clamp(-230px, -11vw, -100px);

  width: clamp(360px, 46vw, 720px);

  aspect-ratio: 1;

  border: 1px solid rgba(112, 237, 241, .24);
  border-radius: 50%;

  pointer-events: none;

  transform: translateY(-50%);

  box-shadow:
    0 0 0 38px rgba(112, 237, 241, .025),
    0 0 0 84px rgba(112, 237, 241, .018),
    inset 0 0 95px rgba(112, 237, 241, .045);

  animation: seHeroOrbFloat 10s ease-in-out infinite alternate;
}

.se-hero__orb::before,
.se-hero__orb::after {
  position: absolute;
  inset: 13%;

  content: "";

  border: 1px solid rgba(112, 237, 241, .15);
  border-radius: 50%;
}

.se-hero__orb::after {
  inset: 27%;
  border-color: rgba(112, 237, 241, .12);
}

@keyframes seHeroOrbFloat {
  from {
    transform: translate3d(0, -51%, 0) scale(.985);
  }

  to {
    transform: translate3d(-16px, -49%, 0) scale(1.025);
  }
}

/* =========================================
   LIGHT SHINE
========================================= */

.se-hero__shine {
  position: absolute;
  z-index: 1;

  top: -30%;
  left: -40%;

  width: 22%;
  height: 160%;

  pointer-events: none;
  opacity: .26;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, .14),
      transparent
    );

  transform: rotate(18deg);

  animation: seHeroShine 13s ease-in-out infinite;
}

@keyframes seHeroShine {
  0%, 35% {
    left: -40%;
    opacity: 0;
  }

  48% {
    opacity: .3;
  }

  75%, 100% {
    left: 120%;
    opacity: 0;
  }
}

/* =========================================
   HERO CONTENT
========================================= */

.se-hero__inner {
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;

  width: min(1320px, calc(100% - 104px));
  height: 100%;

  margin-inline: auto;

  padding: clamp(22px, 4vh, 44px) 0 102px;
}

.se-hero__copy {
  width: min(100%, 850px);
  min-width: 0;
}

/* =========================================
   EYEBROW
========================================= */

.se-hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;

  margin: 0 0 clamp(15px, 2.2vh, 24px);

  color: var(--se-accent);

  font-size: clamp(.66rem, .82vw, .78rem);
  font-weight: 800;
  line-height: 1.5;

  letter-spacing: .17em;
  text-transform: uppercase;

  overflow-wrap: anywhere;
}

.se-hero__eyebrow-line {
  position: relative;

  display: inline-block;

  width: 38px;
  height: 2px;
  flex: 0 0 auto;

  overflow: hidden;

  border-radius: 10px;
  background: rgba(112, 237, 241, .42);
}

.se-hero__eyebrow-line::after {
  position: absolute;
  inset: 0;

  content: "";

  border-radius: inherit;
  background: var(--se-accent);

  transform-origin: left center;

  animation:
    seHeroLineReveal
    850ms
    cubic-bezier(.22, 1, .36, 1)
    both;
}

@keyframes seHeroLineReveal {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

/* =========================================
   HEADING
========================================= */

.se-hero__title {
  position: relative;

  max-width: 850px;
  margin: 0;

  color: var(--se-white);

  font-size: clamp(2.8rem, 5.15vw, 5.6rem);
  font-weight: 790;
  line-height: .99;

  letter-spacing: -.063em;

  text-wrap: balance;
  overflow-wrap: anywhere;

  text-shadow: 0 5px 34px rgba(0, 0, 0, .26);
}

.se-hero__title::after {
  display: block;

  width: clamp(56px, 8vw, 92px);
  height: 4px;

  margin-top: clamp(17px, 2.4vh, 24px);

  content: "";

  border-radius: 99px;

  background:
    linear-gradient(
      90deg,
      var(--se-accent),
      rgba(112, 237, 241, .08)
    );

  box-shadow: 0 0 22px rgba(112, 237, 241, .32);

  transform-origin: left center;

  animation:
    seHeroUnderline
    800ms
    180ms
    cubic-bezier(.22, 1, .36, 1)
    both;
}

@keyframes seHeroUnderline {
  from {
    opacity: 0;
    transform: scaleX(.2);
  }

  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

/* =========================================
   DESCRIPTION
========================================= */

.se-hero__description {
  max-width: 610px;

  margin: clamp(14px, 2.1vh, 22px) 0 0;

  color: var(--se-muted);

  font-size: clamp(.96rem, 1.18vw, 1.13rem);
  font-weight: 400;
  line-height: 1.68;

  letter-spacing: .005em;

  text-wrap: pretty;
  overflow-wrap: anywhere;
}

/* =========================================
   CTA BUTTONS
========================================= */

.se-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 13px;

  margin-top: clamp(22px, 3vh, 32px);
}

.se-hero__action {
  display: inline-flex;
  max-width: 100%;
}

.se-hero .se-hero__action a,
.se-hero .se-hero__action button {
  display: inline-flex;

  min-height: 52px;
  max-width: 100%;

  align-items: center;
  justify-content: center;
  gap: 12px;

  padding: 13px 24px;

  border: 1px solid transparent;
  border-radius: 999px;

  font-size: .91rem;
  font-weight: 760;
  line-height: 1.25;

  text-align: center;
  text-decoration: none;

  white-space: normal;
  overflow-wrap: anywhere;

  cursor: pointer;

  transition:
    color 240ms ease,
    background 240ms ease,
    border-color 240ms ease,
    box-shadow 240ms ease,
    transform 240ms ease;
}

.se-hero .se-hero__action a::after,
.se-hero .se-hero__action button::after {
  display: inline-block;

  content: "↗";

  font-size: 1.08em;
  line-height: 1;

  transition: transform 240ms ease;
}

.se-hero .se-hero__action a:hover::after,
.se-hero .se-hero__action button:hover::after {
  transform: translate(3px, -3px);
}

/* Primary CTA */

.se-hero .se-hero__action--primary a,
.se-hero .se-hero__action--primary button {
  color: #04141d;

  border-color: rgba(255, 255, 255, .36);

  background:
    linear-gradient(
      130deg,
      #b0fbf4 0%,
      #70edf1 50%,
      #2cc8d8 100%
    );

  box-shadow:
    0 10px 32px rgba(36, 194, 211, .24),
    inset 0 1px 0 rgba(255, 255, 255, .72);
}

.se-hero .se-hero__action--primary a:hover,
.se-hero .se-hero__action--primary button:hover {
  color: #04141d;

  box-shadow:
    0 16px 42px rgba(36, 194, 211, .37),
    inset 0 1px 0 rgba(255, 255, 255, .8);

  transform: translateY(-2px);
}

/* Secondary CTA */

.se-hero .se-hero__action--secondary a,
.se-hero .se-hero__action--secondary button {
  color: var(--se-white);

  border-color: rgba(232, 242, 255, .35);

  background: rgba(8, 22, 37, .39);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .08);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.se-hero .se-hero__action--secondary a:hover,
.se-hero .se-hero__action--secondary button:hover {
  color: var(--se-accent);

  border-color: rgba(112, 237, 241, .78);

  background: rgba(12, 37, 52, .7);

  transform: translateY(-2px);
}

/* =========================================
   BOTTOM CONTROLS
========================================= */

.se-hero__bottom {
  position: absolute;
  z-index: 3;

  right: 0;
  bottom: 0;
  left: 0;

  display: flex;

  width: min(1320px, calc(100% - 104px));

  align-items: center;
  justify-content: space-between;

  gap: 28px;

  margin-inline: auto;

  padding: 0 0 clamp(18px, 3vh, 28px);
}

/* Progress */

.se-hero__progress {
  display: flex;

  min-width: 0;
  max-width: 520px;

  flex: 1 1 auto;

  align-items: center;

  gap: clamp(8px, 1vw, 14px);
}

.se-hero__progress-button {
  display: block;

  min-width: 0;
  flex: 1 1 0;

  padding: 10px 0;

  border: 0;
  background: transparent;

  cursor: pointer;
}

.se-hero__progress-track {
  position: relative;

  display: block;

  width: 100%;
  height: 3px;

  overflow: hidden;

  border-radius: 99px;

  background: rgba(231, 240, 255, .28);

  transition:
    background 200ms ease,
    height 200ms ease;
}

.se-hero__progress-button:hover .se-hero__progress-track,
.se-hero__progress-button:focus-visible .se-hero__progress-track {
  height: 4px;
  background: rgba(231, 240, 255, .48);
}

.se-hero__progress-fill {
  position: absolute;
  inset: 0;

  display: block;

  transform: scaleX(1);
  transform-origin: left center;

  border-radius: inherit;

  background: var(--se-accent);

  box-shadow: 0 0 14px rgba(112, 237, 241, .52);
}

.se-hero__progress-fill.is-running {
  transform: scaleX(0);

  animation:
    seHeroProgress
    3000ms
    linear
    forwards;
}

@keyframes seHeroProgress {
  to {
    transform: scaleX(1);
  }
}

/* Arrow controls */

.se-hero__controls {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 9px;
}

.se-hero__control {
  display: grid;

  width: 46px;
  height: 46px;

  flex: 0 0 auto;

  place-items: center;

  padding: 0;

  border: 1px solid rgba(232, 242, 255, .32);
  border-radius: 50%;

  color: var(--se-white);

  background: rgba(7, 19, 33, .51);

  cursor: pointer;

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  transition:
    color 220ms ease,
    border-color 220ms ease,
    background 220ms ease,
    transform 220ms ease,
    box-shadow 220ms ease;
}

.se-hero__control:hover {
  color: var(--se-accent);

  border-color: rgba(112, 237, 241, .82);

  background: rgba(13, 39, 54, .83);

  box-shadow: 0 0 24px rgba(112, 237, 241, .12);

  transform: translateY(-2px);
}

.se-hero__control:active {
  transform: scale(.95);
}

.se-hero__control svg {
  width: 19px;
  height: 19px;
  stroke-width: 1.8;
}

.se-hero__progress-button:focus-visible,
.se-hero__control:focus-visible,
.se-hero .se-hero__action a:focus-visible,
.se-hero .se-hero__action button:focus-visible {
  outline: 2px solid var(--se-accent);
  outline-offset: 4px;
}

/* =========================================
   SOLAR STATS BAR
========================================= */

.se-hero-stats {
  position: relative;
  isolation: isolate;

  width: 100%;
  min-width: 0;

  overflow: hidden;

  color: #ffffff;

  background:
    radial-gradient(
      ellipse at 50% 0%,
      rgba(39, 91, 177, .22),
      transparent 65%
    ),
    linear-gradient(
      110deg,
      #0b2250 0%,
      #091d46 50%,
      #0b2250 100%
    );

  border-bottom: 1px solid rgba(255, 255, 255, .07);
}

.se-hero-stats::before {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;

  content: "";

  background:
    linear-gradient(
      90deg,
      transparent 0%,
      #2457ed 22%,
      #70edf1 50%,
      #2457ed 78%,
      transparent 100%
    );

  opacity: .8;
}

.se-hero-stats::after {
  position: absolute;

  top: 0;
  left: -35%;

  width: 30%;
  height: 100%;

  content: "";

  pointer-events: none;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(112, 237, 241, .055),
      transparent
    );

  transform: skewX(-18deg);

  animation: seHeroStatsShine 9s ease-in-out infinite;
}

@keyframes seHeroStatsShine {
  0%, 35% {
    left: -35%;
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  75%, 100% {
    left: 120%;
    opacity: 0;
  }
}

.se-hero-stats__inner {
  position: relative;
  z-index: 1;

  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  width: min(1320px, calc(100% - 104px));

  min-height: 126px;

  align-items: stretch;

  margin-inline: auto;

  padding-block: 19px;
}

.se-hero-stats__item {
  position: relative;

  display: flex;

  min-width: 0;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 9px;

  padding: 8px 14px;

  text-align: center;

  opacity: 0;

  animation:
    seHeroStatReveal
    .75s
    cubic-bezier(.22, 1, .36, 1)
    forwards;
}

.se-hero-stats__item:nth-child(1) {
  animation-delay: .08s;
}

.se-hero-stats__item:nth-child(2) {
  animation-delay: .17s;
}

.se-hero-stats__item:nth-child(3) {
  animation-delay: .26s;
}

.se-hero-stats__item:nth-child(4) {
  animation-delay: .35s;
}

@keyframes seHeroStatReveal {
  from {
    opacity: 0;
    transform: translateY(17px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vertical dividers */

.se-hero-stats__item:not(:last-child)::after {
  position: absolute;

  top: 12%;
  right: 0;

  width: 1px;
  height: 76%;

  content: "";

  background:
    linear-gradient(
      180deg,
      transparent,
      rgba(255, 255, 255, .16),
      transparent
    );
}

/* Number */

.se-hero-stats__value {
  display: block;

  color: #ffffff;

  font-size: clamp(2rem, 3.45vw, 3.35rem);

  font-weight: 800;
  line-height: 1;

  letter-spacing: -.045em;

  font-variant-numeric: tabular-nums;

  text-shadow:
    0 3px 18px rgba(0, 0, 0, .12);

  transition:
    color 300ms ease,
    transform 300ms ease,
    text-shadow 300ms ease;
}

/* Labels */

.se-hero-stats__label {
  display: block;

  max-width: 100%;
  margin: 0;

  color: rgba(233, 241, 251, .88);

  font-size: clamp(.75rem, 1vw, .98rem);
  font-weight: 500;

  line-height: 1.5;
  letter-spacing: .005em;

  overflow-wrap: anywhere;

  transition: color 300ms ease;
}

/* Accent */

.se-hero-stats__accent {
  width: 0;
  height: 2px;

  margin-top: -3px;

  border-radius: 99px;

  background:
    linear-gradient(90deg, #2457ed, #70edf1);

  transition: width 300ms ease;
}

/* Hover */

.se-hero-stats__item:hover .se-hero-stats__value {
  color: #9cf6f2;

  transform: translateY(-4px);

  text-shadow:
    0 0 25px rgba(112, 237, 241, .35);
}

.se-hero-stats__item:hover .se-hero-stats__label {
  color: #ffffff;
}

.se-hero-stats__item:hover .se-hero-stats__accent {
  width: 34px;
}

/* =========================================
   LARGE TABLETS
========================================= */

@media (max-width: 1024px) {

  .se-hero {
    --se-header-offset: 76px;
  }

  .se-hero__inner,
  .se-hero__bottom {
    width: calc(100% - 64px);
  }

  .se-hero__title {
    max-width: 760px;

    font-size: clamp(
      2.6rem,
      6vw,
      4.8rem
    );
  }

  .se-hero__bottom {
    gap: 22px;
  }

  .se-hero-stats__inner {
    width: calc(100% - 64px);
    min-height: 115px;
  }
}

/* =========================================
   TABLET AND MOBILE
========================================= */

@media (max-width: 680px) {

  .se-hero {
    --se-header-offset: 70px;

    height: min(
      840px,
      max(540px, calc(100svh - var(--se-header-offset)))
    );

    min-height: 540px;
  }

  .se-hero__overlay {
    background:
      linear-gradient(
        90deg,
        rgba(3, 10, 20, .92) 0%,
        rgba(4, 13, 26, .76) 62%,
        rgba(4, 13, 26, .46) 100%
      ),
      linear-gradient(
        0deg,
        rgba(3, 10, 20, .97) 0%,
        rgba(3, 10, 20, .67) 38%,
        rgba(3, 10, 20, .12) 78%,
        rgba(3, 10, 20, .36) 100%
      );
  }

  .se-hero__grid {
    opacity: .10;
    background-size: 50px 50px;
  }

  .se-hero__orb {
    top: 26%;
    right: -220px;

    width: 460px;
    opacity: .62;
  }

  .se-hero__inner,
  .se-hero__bottom {
    width: calc(100% - 40px);
  }

  .se-hero__inner {
    align-items: center;
    padding: 22px 0 96px;
  }

  .se-hero__copy {
    width: 100%;
  }

  .se-hero__eyebrow {
    gap: 9px;
    margin-bottom: 14px;

    font-size: .64rem;
    letter-spacing: .13em;
  }

  .se-hero__eyebrow-line {
    width: 27px;
  }

  .se-hero__title {
    max-width: 600px;

    font-size: clamp(
      2.35rem,
      8.8vw,
      3.8rem
    );

    line-height: 1.015;
    letter-spacing: -.055em;
  }

  .se-hero__title::after {
    width: 58px;
    height: 3px;
    margin-top: 15px;
  }

  .se-hero__description {
    max-width: 540px;

    margin-top: 14px;

    font-size: .94rem;
    line-height: 1.58;
  }

  .se-hero__actions {
    gap: 10px;
    margin-top: 20px;
  }

  .se-hero .se-hero__action a,
  .se-hero .se-hero__action button {
    min-height: 46px;
    padding: 11px 17px;
    font-size: .83rem;
  }

  .se-hero__bottom {
    gap: 15px;
    padding-bottom: 15px;
  }

  .se-hero__progress {
    gap: 7px;
  }

  .se-hero__progress-button {
    padding: 8px 0;
  }

  .se-hero__controls {
    gap: 6px;
  }

  .se-hero__control {
    width: 39px;
    height: 39px;
  }

  .se-hero__control svg {
    width: 16px;
    height: 16px;
  }

  /* Stats - 2 columns */

  .se-hero-stats__inner {
    width: calc(100% - 32px);

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    min-height: 0;

    padding-block: 12px;
  }

  .se-hero-stats__item {
    min-height: 98px;

    padding: 13px 8px;

    gap: 7px;
  }

  .se-hero-stats__item:nth-child(2)::after {
    display: none;
  }

  .se-hero-stats__item:nth-child(1)::after,
  .se-hero-stats__item:nth-child(3)::after {
    top: 14%;
    height: 72%;
  }

  /* Horizontal row separator */

  .se-hero-stats__item:nth-child(-n+2)::before {
    position: absolute;

    right: 8%;
    bottom: 0;
    left: 8%;

    height: 1px;

    content: "";

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, .16),
        transparent
      );
  }

  .se-hero-stats__value {
    font-size: clamp(2rem, 7vw, 2.65rem);
  }

  .se-hero-stats__label {
    font-size: .78rem;
  }
}

/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 390px) {

  .se-hero {
    --se-header-offset: 64px;

    height: min(
      840px,
      max(520px, calc(100svh - var(--se-header-offset)))
    );

    min-height: 520px;
  }

  .se-hero__inner,
  .se-hero__bottom {
    width: calc(100% - 32px);
  }

  .se-hero__title {
    font-size: clamp(
      2.1rem,
      8.8vw,
      2.6rem
    );

    letter-spacing: -.05em;
  }

  .se-hero__description {
    margin-top: 12px;

    font-size: .88rem;
    line-height: 1.5;
  }

  .se-hero__actions {
    gap: 8px;
    margin-top: 16px;
  }

  .se-hero .se-hero__action a,
  .se-hero .se-hero__action button {
    min-height: 43px;
    padding: 10px 13px;
    font-size: .78rem;
  }

  .se-hero__bottom {
    gap: 10px;
  }

  .se-hero__control {
    width: 35px;
    height: 35px;
  }

  .se-hero-stats__inner {
    width: calc(100% - 20px);
  }

  .se-hero-stats__item {
    min-height: 90px;
    padding-inline: 5px;
  }

  .se-hero-stats__value {
    font-size: 2rem;
  }

  .se-hero-stats__label {
    font-size: .7rem;
  }
}

/* =========================================
   SHORT LANDSCAPE SCREENS
========================================= */

@media (max-height: 700px) and (min-width: 681px) {

  .se-hero {
    height: min(
      920px,
      max(520px, calc(100svh - var(--se-header-offset)))
    );

    min-height: 520px;
  }

  .se-hero__inner {
    padding-top: 14px;
    padding-bottom: 88px;
  }

  .se-hero__eyebrow {
    margin-bottom: 10px;
  }

  .se-hero__title {
    font-size: clamp(
      2.25rem,
      4.5vw,
      4rem
    );

    line-height: .98;
  }

  .se-hero__title::after {
    height: 3px;
    margin-top: 13px;
  }

  .se-hero__description {
    margin-top: 10px;
    line-height: 1.48;
  }

  .se-hero__actions {
    margin-top: 14px;
  }

  .se-hero__bottom {
    padding-bottom: 10px;
  }

  .se-hero-stats__inner {
    min-height: 100px;
    padding-block: 10px;
  }
}

@media (max-height: 650px) and (max-width: 680px) {

  .se-hero {
    height: 520px;
    min-height: 520px;
  }

  .se-hero__inner {
    padding-top: 12px;
    padding-bottom: 82px;
  }

  .se-hero__eyebrow {
    margin-bottom: 9px;
  }

  .se-hero__title {
    font-size: clamp(
      1.95rem,
      7.5vw,
      2.8rem
    );

    line-height: .99;
  }

  .se-hero__title::after {
    margin-top: 10px;
  }

  .se-hero__description {
    margin-top: 9px;

    font-size: .83rem;
    line-height: 1.42;
  }

  .se-hero__actions {
    margin-top: 12px;
  }

  .se-hero .se-hero__action a,
  .se-hero .se-hero__action button {
    min-height: 39px;
    padding: 8px 12px;
  }

  .se-hero__bottom {
    padding-bottom: 7px;
  }
}

/* =========================================
   REDUCED MOTION
========================================= */

@media (prefers-reduced-motion: reduce) {

  .se-hero *,
  .se-hero *::before,
  .se-hero *::after,
  .se-hero-stats *,
  .se-hero-stats *::before,
  .se-hero-stats *::after {

    animation-duration: .01ms !important;

    animation-iteration-count: 1 !important;

    scroll-behavior: auto !important;

    transition-duration: .01ms !important;
  }

  .se-hero__image {
    transform: none !important;
  }

  .se-hero-stats__item {
    opacity: 1 !important;
    transform: none !important;
  }
}

`;

// ======================================================
// MAIN HERO CAROUSEL
// ======================================================

export function HeroCarousel() {
  const slides = HERO_SLIDES;

  const count = slides.length;

  const [index, setIndex] = useState(0);

  const reduceMotion = useReducedMotion();

  const touchStartX = useRef(null);

  // Always keep the index inside the available slide range.
  const activeIndex = count > 0
    ? index % count
    : 0;

  // ---------------------------------------------
  // GO TO SPECIFIC SLIDE
  // ---------------------------------------------

  const goToSlide = useCallback(
    (targetIndex) => {
      if (count < 1) return;

      const nextIndex =
        ((targetIndex % count) + count) % count;

      setIndex(nextIndex);
    },
    [count]
  );

  // ---------------------------------------------
  // NEXT SLIDE
  // ---------------------------------------------

  const nextSlide = useCallback(() => {
    if (count < 2) return;

    setIndex((currentIndex) => {
      return (currentIndex + 1) % count;
    });
  }, [count]);

  // ---------------------------------------------
  // PREVIOUS SLIDE
  // ---------------------------------------------

  const previousSlide = useCallback(() => {
    if (count < 2) return;

    setIndex((currentIndex) => {
      return (currentIndex - 1 + count) % count;
    });
  }, [count]);

  // =============================================
  // AUTOMATIC SLIDER
  // =============================================

  /*
    Runs independently of hover and focus.

    Every 3000ms:
    1. Read the latest slide index.
    2. Move to the next slide.
    3. Loop back to the first slide.
    4. Continue automatically.

    Manual arrow buttons do not disable autoplay.
  */

  useEffect(() => {
    if (count < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setIndex((currentIndex) => {
        return (currentIndex + 1) % count;
      });
    }, AUTOPLAY_INTERVAL);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [count]);

  // =============================================
  // PRELOAD NEXT SLIDE IMAGE
  // =============================================

  useEffect(() => {
    if (count < 2) return undefined;

    const upcomingSlide =
      slides[(activeIndex + 1) % count];

    if (!upcomingSlide?.image) {
      return undefined;
    }

    const preloadImage = new window.Image();

    preloadImage.src = upcomingSlide.image;

    return undefined;
  }, [activeIndex, count, slides]);

  // =============================================
  // EMPTY SLIDE PROTECTION
  // =============================================

  if (count === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex];

  // =============================================
  // ANIMATION CONFIGURATION
  // =============================================

  const reveal = (delay = 0) => ({
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: 24,
          filter: "blur(6px)",
        },

    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },

    transition: {
      duration: reduceMotion ? 0 : 0.78,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  // =============================================
  // KEYBOARD NAVIGATION
  // =============================================

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextSlide();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previousSlide();
    }
  };

  // =============================================
  // TOUCH NAVIGATION
  // =============================================

  const handleTouchStart = (event) => {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const endX =
      event.changedTouches[0]?.clientX ??
      touchStartX.current;

    const distance =
      endX - touchStartX.current;

    touchStartX.current = null;

    if (Math.abs(distance) <= SWIPE_THRESHOLD) {
      return;
    }

    if (distance < 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  };

  // =============================================
  // RENDER
  // =============================================

  return (
    <>
      <style>{heroCarouselStyles}</style>

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section
        className="se-hero"

        aria-roledescription="carousel"

        aria-label="Featured highlights"

        onKeyDown={handleKeyDown}

        onTouchStart={handleTouchStart}

        onTouchEnd={handleTouchEnd}
      >

        {/* BACKGROUND IMAGES */}

        <div
          className="se-hero__images"
          aria-hidden="true"
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.id ?? slideIndex}

              className={
                `se-hero__image-layer${
                  slideIndex === activeIndex
                    ? " is-active"
                    : ""
                }`
              }
            >
              {slide.image ? (
                <img
                  src={slide.image}

                  alt=""

                  width="1920"
                  height="1088"

                  loading={
                    slideIndex === activeIndex ||
                    slideIndex === 0
                      ? "eager"
                      : "lazy"
                  }

                  fetchPriority={
                    slideIndex === 0
                      ? "high"
                      : "low"
                  }

                  draggable="false"

                  className={
                    `se-hero__image${
                      slideIndex === activeIndex &&
                      !reduceMotion
                        ? " is-kenburns"
                        : ""
                    }`
                  }

                  style={{
                    objectPosition:
                      slide.focal || "center center",
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>

        {/* VISUAL EFFECTS */}

        <div
          className="se-hero__overlay"
          aria-hidden="true"
        />

        <div
          className="se-hero__ambient"
          aria-hidden="true"
        />

        <div
          className="se-hero__grid"
          aria-hidden="true"
        />

        <div
          className="se-hero__orb"
          aria-hidden="true"
        />

        <div
          className="se-hero__shine"
          aria-hidden="true"
        />

        {/* =========================================
            HERO CONTENT
        ========================================= */}

        <div className="se-hero__inner">

          <div
            className="se-hero__copy"
            role="group"
            aria-live="off"
            aria-atomic="true"
          >

            <AnimatePresence
              mode="wait"
              initial={false}
            >

              <motion.div
                key={activeSlide.id ?? activeIndex}

                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 10,
                        scale: .99,
                      }
                }

                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}

                exit={
                  reduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        y: -10,
                        scale: .995,
                      }
                }

                transition={{
                  duration: reduceMotion ? 0 : .42,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                {/* EYEBROW */}

                {activeSlide.eyebrow ? (
                  <motion.div
                    {...reveal(0)}
                    className="se-hero__eyebrow"
                  >
                    <span
                      className="se-hero__eyebrow-line"
                      aria-hidden="true"
                    />

                    <span>
                      {activeSlide.eyebrow}
                    </span>
                  </motion.div>
                ) : null}

                {/* TITLE */}

                {activeSlide.title ? (
                  <motion.h1
                    {...reveal(.07)}
                    className="se-hero__title"
                  >
                    {activeSlide.title}
                  </motion.h1>
                ) : null}

                {/* DESCRIPTION */}

                {activeSlide.body ? (
                  <motion.p
                    {...reveal(.15)}
                    className="se-hero__description"
                  >
                    {activeSlide.body}
                  </motion.p>
                ) : null}

                {/* CTA BUTTONS */}

                <motion.div
                  {...reveal(.23)}
                  className="se-hero__actions"
                >

                  {/* PRIMARY CTA */}

                  {activeSlide.primary?.to &&
                    activeSlide.primary?.label && (
                      <motion.div
                        className="se-hero__action se-hero__action--primary"

                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                scale: 1.035,
                                y: -2,
                              }
                        }

                        whileTap={
                          reduceMotion
                            ? undefined
                            : {
                                scale: .98,
                              }
                        }
                      >
                        <ButtonLink
                          to={activeSlide.primary.to}
                          variant="primary"
                        >
                          {activeSlide.primary.label}
                        </ButtonLink>
                      </motion.div>
                    )}

                  {/* SECONDARY CTA */}

                  {activeSlide.secondary?.to &&
                    activeSlide.secondary?.label && (
                      <motion.div
                        className="se-hero__action se-hero__action--secondary"

                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                scale: 1.025,
                                y: -2,
                              }
                        }

                        whileTap={
                          reduceMotion
                            ? undefined
                            : {
                                scale: .98,
                              }
                        }
                      >
                        <ButtonLink
                          to={activeSlide.secondary.to}
                          variant="ghostLight"
                        >
                          {activeSlide.secondary.label}
                        </ButtonLink>
                      </motion.div>
                    )}

                </motion.div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

        {/* =========================================
            PROGRESS + NAVIGATION
        ========================================= */}

        <div className="se-hero__bottom">

          {/* PROGRESS INDICATORS */}

          <div
            className="se-hero__progress"
            role="group"
            aria-label="Choose a featured slide"
          >
            {slides.map((slide, slideIndex) => {
              const isActive =
                slideIndex === activeIndex;

              const slideName =
                slide.eyebrow ||
                slide.title ||
                "Featured slide";

              return (
                <button
                  key={slide.id ?? slideIndex}

                  type="button"

                  className="se-hero__progress-button"

                  aria-label={`Show ${slideName}`}

                  aria-current={
                    isActive
                      ? "true"
                      : undefined
                  }

                  onClick={() => {
                    goToSlide(slideIndex);
                  }}
                >

                  <span
                    className="se-hero__progress-track"
                    aria-hidden="true"
                  >

                    {isActive ? (
                      <span
                        key={`${slide.id ?? slideIndex}-${activeIndex}`}
                        className="se-hero__progress-fill is-running"

                        style={{
                          animationDuration:
                            `${AUTOPLAY_INTERVAL}ms`,
                        }}
                      />
                    ) : null}

                  </span>

                </button>
              );
            })}
          </div>

          {/* ARROW CONTROLS */}

          <div
            className="se-hero__controls"
            role="group"
            aria-label="Carousel controls"
          >

            <button
              type="button"

              className="se-hero__control"

              onClick={previousSlide}

              aria-label="Previous slide"

              title="Previous slide"
            >
              <ChevronLeft aria-hidden="true" />
            </button>

            <button
              type="button"

              className="se-hero__control"

              onClick={nextSlide}

              aria-label="Next slide"

              title="Next slide"
            >
              <ChevronRight aria-hidden="true" />
            </button>

          </div>

        </div>

      </section>

      {/* =========================================
          SOLAR PERFORMANCE STATISTICS
          DIRECTLY BELOW THE HERO
      ========================================= */}

      <SolarHeroStats />

    </>
  );
}

export default HeroCarousel;
