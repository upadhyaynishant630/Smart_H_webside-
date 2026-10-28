

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";


const defaultBrands = [
  { name: "NORTHWIND", font: "serif-bold", tone: "solid" },
  { name: "AURORA", font: "serif-wide", tone: "grad" },
  { name: "Lumière", font: "serif-italic", tone: "shine" },
  { name: "nexora", font: "sans-black", tone: "grad" },
  { name: "VERTEX", font: "serif-bold", tone: "shine" },
  { name: "ELEVATE", font: "serif-wide", tone: "solid" },
];

function BrandLogo({ brand }) {
  const font = brand.font || "serif-bold";
  const tone = brand.tone || "solid";

  return (
    <div className="sh-logo" role="img" aria-label={brand.name}>
      {brand.src ? (
        <img
          src={brand.src}
          alt={brand.name}
          loading="lazy"
          decoding="async"
          className="sh-logo-img"
        />
      ) : (
        <>
          <span className="sh-logo-dot" aria-hidden="true" />
          <span className={`sh-logo-text sh-font-${font} sh-tone-${tone}`}>
            {brand.name}
          </span>
        </>
      )}
    </div>
  );
}

function MarqueeRow({ items, reverse = false, reduceMotion = false }) {
  const trackClass = reduceMotion
    ? "sh-track sh-track-static"
    : reverse
      ? "sh-track sh-track-rev"
      : "sh-track sh-track-fwd";

  return (
    <div className={`sh-row${reduceMotion ? " sh-row-static" : ""}`}>
      <div className={trackClass}>
        <div className="sh-track-group">
          {items.map((brand, index) => (
            <BrandLogo key={`${brand.name}-${index}`} brand={brand} />
          ))}
        </div>

        {!reduceMotion && (
          <div className="sh-track-group" aria-hidden="true">
            {items.map((brand, index) => (
              <BrandLogo key={`${brand.name}-duplicate-${index}`} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function BrandMarquee({ brands = defaultBrands }) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = Boolean(prefersReducedMotion);
  const titleId = useId();
  const brandItems = Array.isArray(brands) ? brands : defaultBrands;
  const secondRow = [...brandItems].reverse();

  return (
    <section
      className={`sh-brand${reduceMotion ? " sh-reduced-motion" : ""}`}
      aria-labelledby={titleId}
    >
      <style>{`
        .sh-brand,
        .sh-brand * {
          box-sizing: border-box;
        }

        .sh-brand {
          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          padding: clamp(3.25rem, 7vw, 5.5rem) clamp(1rem, 4vw, 2rem);
          color: #0f172a;
          background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
        }

        .sh-brand .sh-glow {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%);
        }

        .sh-brand .sh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(64px);
          pointer-events: none;
          will-change: transform;
        }

        .sh-brand .sh-blob-a {
          top: -5rem;
          left: 5%;
          width: clamp(11rem, 27vw, 20rem);
          height: clamp(11rem, 27vw, 20rem);
          background: rgba(37, 99, 235, 0.16);
          animation: sh-float-a 14s ease-in-out infinite;
        }

        .sh-brand .sh-blob-b {
          right: 5%;
          bottom: -5rem;
          width: clamp(10rem, 24vw, 18rem);
          height: clamp(10rem, 24vw, 18rem);
          background: rgba(124, 58, 237, 0.14);
          animation: sh-float-b 16s ease-in-out infinite;
        }

        .sh-brand .sh-container {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(15rem, 0.78fr) minmax(0, 1.5fr);
          align-items: center;
          gap: clamp(2rem, 5vw, 4.5rem);
          width: 100%;
          max-width: 1240px;
          margin-inline: auto;
        }

        .sh-brand .sh-heading {
          min-width: 0;
          max-width: 25rem;
        }

        .sh-brand .sh-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          max-width: 100%;
          padding: 0.45rem 0.85rem;
          border: 1px solid rgba(37, 99, 235, 0.28);
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.07);
          color: #2563eb;
          font-size: 0.72rem;
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .sh-brand .sh-badge-dot {
          position: relative;
          display: inline-block;
          flex: 0 0 0.5rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: #2563eb;
        }

        .sh-brand .sh-badge-dot::after {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: #2563eb;
          content: "";
          animation: sh-pulse 2s ease-out infinite;
        }

        .sh-brand .sh-title {
          margin: 1.2rem 0 0;
          color: #0f172a;
          font-size: clamp(2.15rem, 4.5vw, 3.5rem);
          font-weight: 750;
          line-height: 1.08;
          letter-spacing: -0.045em;
          overflow-wrap: anywhere;
        }

        .sh-brand .sh-title-grad {
          color: #2563eb;
          background-image: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4, #2563eb);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: sh-shimmer 5s linear infinite;
        }

        .sh-brand .sh-title-line {
          display: block;
          width: 5.25rem;
          height: 3px;
          margin-top: 1.1rem;
          border-radius: 999px;
          background: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4);
          transform-origin: left center;
          animation: sh-line-grow 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .sh-brand .sh-quote {
          max-width: 27rem;
          margin: 1.1rem 0 0;
          color: #64748b;
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          line-height: 1.75;
          font-style: italic;
          overflow-wrap: anywhere;
        }

        .sh-brand .sh-rows {
          position: relative;
          min-width: 0;
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%);
        }

        .sh-brand .sh-row {
          width: 100%;
          min-width: 0;
          overflow: hidden;
          padding: 0.65rem 0;
        }

        .sh-brand .sh-track {
          display: flex;
          width: max-content;
          max-width: none;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .sh-brand .sh-track-fwd {
          animation: sh-scroll-fwd 34s linear infinite;
        }

        .sh-brand .sh-track-rev {
          animation: sh-scroll-rev 40s linear infinite;
        }

        .sh-brand .sh-rows:hover .sh-track-fwd,
        .sh-brand .sh-rows:hover .sh-track-rev {
          animation-play-state: paused;
        }

        .sh-brand .sh-track-group {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 1rem;
          padding-right: 1rem;
        }

        .sh-brand .sh-logo {
          position: relative;
          z-index: 0;
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          min-height: 4rem;
          max-width: min(80vw, 20rem);
          padding: 0.85rem clamp(1rem, 2.4vw, 1.75rem);
          border: 1px solid rgba(148, 163, 184, 0.28);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.76);
          box-shadow: 0 8px 26px rgba(15, 23, 42, 0.035);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }

        .sh-brand .sh-logo:hover {
          z-index: 2;
          transform: translateY(-4px) scale(1.025);
          border-color: rgba(37, 99, 235, 0.5);
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.12);
        }

        .sh-brand .sh-logo-dot {
          display: inline-block;
          flex: 0 0 0.5rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }

        .sh-brand .sh-logo-img {
          display: block;
          width: auto;
          max-width: min(42vw, 10rem);
          height: auto;
          max-height: 2.25rem;
          object-fit: contain;
          opacity: 0.82;
          filter: grayscale(1);
          transition: opacity 0.3s ease, filter 0.3s ease;
        }

        .sh-brand .sh-logo:hover .sh-logo-img {
          opacity: 1;
          filter: grayscale(0);
        }

        .sh-brand .sh-logo-text {
          display: inline-block;
          max-width: 100%;
          color: #334155;
          font-size: clamp(1.1rem, 1.9vw, 1.65rem);
          line-height: 1.1;
          white-space: nowrap;
          user-select: none;
        }

        .sh-brand .sh-font-serif-bold {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .sh-brand .sh-font-serif-wide {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          letter-spacing: 0.2em;
        }

        .sh-brand .sh-font-serif-italic {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 600;
          font-style: italic;
          letter-spacing: 0.01em;
        }

        .sh-brand .sh-font-sans-black {
          font-family: ui-sans-serif, system-ui, "Segoe UI", sans-serif;
          font-weight: 900;
          font-style: italic;
          letter-spacing: -0.05em;
        }

        .sh-brand .sh-tone-solid {
          opacity: 0.9;
        }

        .sh-brand .sh-tone-grad {
          color: #2563eb;
          background-image: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sh-brand .sh-tone-shine {
          color: #2563eb;
          background-image: linear-gradient(110deg, #64748b 20%, #2563eb 40%, #06b6d4 50%, #7c3aed 60%, #64748b 80%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: sh-shimmer 4s linear infinite;
        }

        .sh-brand .sh-track-static {
          width: max-content;
          animation: none;
        }

        .sh-brand .sh-row-static {
          overflow-x: auto;
          overflow-y: hidden;
          overscroll-behavior-inline: contain;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }

        .sh-brand.sh-reduced-motion .sh-blob,
        .sh-brand.sh-reduced-motion .sh-badge-dot::after,
        .sh-brand.sh-reduced-motion .sh-title-grad,
        .sh-brand.sh-reduced-motion .sh-title-line,
        .sh-brand.sh-reduced-motion .sh-tone-shine,
        .sh-brand.sh-reduced-motion .sh-track {
          animation: none !important;
        }

        @keyframes sh-scroll-fwd {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes sh-scroll-rev {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @keyframes sh-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes sh-pulse {
          0% { transform: scale(1); opacity: 0.9; }
          70%, 100% { transform: scale(2.4); opacity: 0; }
        }

        @keyframes sh-float-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(28px, 22px, 0) scale(1.1); }
        }

        @keyframes sh-float-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-30px, -18px, 0) scale(1.08); }
        }

        @keyframes sh-line-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @media (max-width: 900px) {
          .sh-brand .sh-container {
            grid-template-columns: minmax(0, 1fr);
            gap: 2rem;
          }

          .sh-brand .sh-heading {
            max-width: 42rem;
          }

          .sh-brand .sh-rows {
            width: 100%;
          }

          .sh-brand .sh-logo {
            min-height: 3.75rem;
          }
        }

        @media (max-width: 560px) {
          .sh-brand {
            padding: 3rem 0.85rem;
          }

          .sh-brand .sh-container {
            gap: 1.6rem;
          }

          .sh-brand .sh-badge {
            gap: 0.5rem;
            padding: 0.4rem 0.7rem;
            font-size: 0.65rem;
            letter-spacing: 0.1em;
          }

          .sh-brand .sh-title {
            margin-top: 1rem;
            font-size: clamp(2rem, 9vw, 2.7rem);
          }

          .sh-brand .sh-quote {
            margin-top: 0.9rem;
            font-size: 0.95rem;
            line-height: 1.65;
          }

          .sh-brand .sh-row {
            padding: 0.45rem 0;
          }

          .sh-brand .sh-track-group {
            gap: 0.7rem;
            padding-right: 0.7rem;
          }

          .sh-brand .sh-logo {
            min-height: 3.35rem;
            padding: 0.7rem 1rem;
            gap: 0.5rem;
          }

          .sh-brand .sh-logo-text {
            font-size: 1.1rem;
          }

          .sh-brand .sh-logo-img {
            max-width: 7.5rem;
            max-height: 1.8rem;
          }

          .sh-brand .sh-track-fwd {
            animation-duration: 27s;
          }

          .sh-brand .sh-track-rev {
            animation-duration: 32s;
          }
        }

        @media (max-width: 360px) {
          .sh-brand .sh-logo {
            padding-inline: 0.8rem;
          }

          .sh-brand .sh-logo-text {
            font-size: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sh-brand .sh-blob,
          .sh-brand .sh-badge-dot::after,
          .sh-brand .sh-title-grad,
          .sh-brand .sh-title-line,
          .sh-brand .sh-tone-shine,
          .sh-brand .sh-track {
            animation: none !important;
          }

          .sh-brand .sh-logo,
          .sh-brand .sh-logo-img {
            transition: none !important;
          }
        }
      `}</style>

      <div className="sh-glow" aria-hidden="true">
        <span className="sh-blob sh-blob-a" />
        <span className="sh-blob sh-blob-b" />
      </div>

      <div className="sh-container">
        <motion.div
          className="sh-heading"
          initial={reduceMotion ? false : { opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="sh-badge">
            <span className="sh-badge-dot" aria-hidden="true" />
            Trusted Partners
          </span>

          <h2 className="sh-title" id={titleId}>
            Featured <span className="sh-title-grad">In</span>
          </h2>
          <span className="sh-title-line" aria-hidden="true" />

          <p className="sh-quote">
            “Trusted by leading brands and loved by customers across India.”
          </p>
        </motion.div>

        <motion.div
          className="sh-rows"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Featured partner brands"
        >
          <MarqueeRow items={brandItems} reduceMotion={reduceMotion} />
          <MarqueeRow items={secondRow} reverse reduceMotion={reduceMotion} />
        </motion.div>
      </div>
    </section>
  );
}

export default BrandMarquee;
