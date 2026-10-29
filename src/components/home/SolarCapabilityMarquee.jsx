import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sun } from "lucide-react";

/** Homepage-only, animated solar capability marquee. */
export function SolarCapabilityMarquee({
  items = [],
  badge = "Solar planning capabilities",
  titleFirst = "Solar work",
  titleHighlight = "done thoughtfully",
  quote = "A practical solar project starts with the site and the way power is used.",
  ariaLabel = "Solar planning capabilities",
}) {
  const reduceMotion = Boolean(useReducedMotion());
  const headingId = useId();

  const capabilities = Array.isArray(items)
    ? items
        .filter(
          (item) =>
            item &&
            typeof item.name === "string" &&
            item.name.trim().length > 0,
        )
        .map((item) => ({ ...item, name: item.name.trim() }))
    : [];

  if (capabilities.length === 0) return null;

  const rows = [
    { reverse: false, items: capabilities, key: "forward" },
    { reverse: true, items: [...capabilities].reverse(), key: "reverse" },
  ];

  return (
    <section
      className={`scm-section${reduceMotion ? " scm-reduced-motion" : ""}`}
      aria-labelledby={headingId}
    >
      <style>{`
        .scm-section,
        .scm-section *,
        .scm-section *::before,
        .scm-section *::after {
          box-sizing: border-box;
        }

        .scm-section {
          --scm-ink: #0b1730;
          --scm-muted: #627087;
          --scm-blue: #2459d6;
          --scm-violet: #7952d8;
          --scm-cyan: #12b7c8;
          --scm-amber: #f4ad36;
          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          padding: clamp(3.25rem, 7vw, 5.75rem) clamp(1rem, 4vw, 2rem);
          color: var(--scm-ink);
          background:
            radial-gradient(ellipse at 12% 12%, rgba(244, 173, 54, .11), transparent 32%),
            radial-gradient(ellipse at 88% 84%, rgba(36, 89, 214, .10), transparent 35%),
            linear-gradient(180deg, #fff 0%, #f7faff 100%);
        }

        .scm-section .scm-glow {
          position: absolute;
          z-index: 0;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%);
        }

        .scm-section .scm-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(68px);
          pointer-events: none;
          will-change: transform;
        }

        .scm-section .scm-blob--sun {
          top: -5rem;
          left: 4%;
          width: clamp(10rem, 25vw, 19rem);
          height: clamp(10rem, 25vw, 19rem);
          background: rgba(244, 173, 54, .20);
          animation: scm-float-sun 15s ease-in-out infinite;
        }

        .scm-section .scm-blob--blue {
          right: 3%;
          bottom: -6rem;
          width: clamp(12rem, 28vw, 21rem);
          height: clamp(12rem, 28vw, 21rem);
          background: rgba(36, 89, 214, .15);
          animation: scm-float-blue 17s ease-in-out infinite;
        }

        .scm-section .scm-shell {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(15rem, .8fr) minmax(0, 1.45fr);
          align-items: center;
          gap: clamp(2rem, 5vw, 4.75rem);
          width: 100%;
          max-width: 1240px;
          margin-inline: auto;
        }

        .scm-section .scm-heading {
          min-width: 0;
          max-width: 31rem;
        }

        .scm-section .scm-badge {
          display: inline-flex;
          align-items: center;
          gap: .65rem;
          max-width: 100%;
          padding: .48rem .85rem;
          border: 1px solid rgba(36, 89, 214, .22);
          border-radius: 999px;
          color: var(--scm-blue);
          background: rgba(255, 255, 255, .82);
          box-shadow: 0 6px 20px rgba(12, 23, 48, .035);
          font-size: .69rem;
          font-weight: 800;
          line-height: 1.4;
          letter-spacing: .12em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .scm-section .scm-badge-dot {
          position: relative;
          display: inline-block;
          flex: 0 0 .5rem;
          width: .5rem;
          height: .5rem;
          border-radius: 50%;
          background: var(--scm-amber);
          box-shadow: 0 0 0 4px rgba(244, 173, 54, .14);
        }

        .scm-section .scm-badge-dot::after {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--scm-amber);
          content: "";
          animation: scm-pulse 2.2s ease-out infinite;
        }

        .scm-section .scm-title {
          margin: 1.15rem 0 0;
          color: var(--scm-ink);
          font-size: clamp(2.15rem, 4.2vw, 3.65rem);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -.052em;
          text-wrap: balance;
          overflow-wrap: anywhere;
        }

        .scm-section .scm-title-highlight {
          color: var(--scm-blue);
          background-image: linear-gradient(100deg, #2459d6 0%, #7150d6 42%, #0daec3 72%, #2459d6 100%);
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: scm-title-shimmer 6s linear infinite;
        }

        .scm-section .scm-title-line {
          display: block;
          width: 5.2rem;
          height: 3px;
          margin-top: 1.15rem;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--scm-blue), var(--scm-violet), var(--scm-cyan), var(--scm-amber));
          transform-origin: left center;
          animation: scm-line-grow .95s cubic-bezier(.22, 1, .36, 1) both;
        }

        .scm-section .scm-quote {
          max-width: 28rem;
          margin: 1.1rem 0 0;
          color: var(--scm-muted);
          font-size: clamp(.95rem, 1.35vw, 1.06rem);
          line-height: 1.78;
          overflow-wrap: anywhere;
        }

        .scm-section .scm-marquee {
          position: relative;
          min-width: 0;
          width: 100%;
          overflow: hidden;
          padding: .35rem 0;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%);
        }

        .scm-section .scm-row {
          width: 100%;
          min-width: 0;
          overflow: hidden;
          padding: .55rem 0;
        }

        .scm-section .scm-track {
          display: flex;
          width: max-content;
          max-width: none;
          align-items: center;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .scm-section .scm-track--forward {
          animation: scm-scroll-forward 34s linear infinite;
        }

        .scm-section .scm-track--reverse {
          animation: scm-scroll-reverse 40s linear infinite;
        }

        .scm-section .scm-marquee:hover .scm-track--forward,
        .scm-section .scm-marquee:hover .scm-track--reverse {
          animation-play-state: paused;
        }

        .scm-section .scm-group {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: .85rem;
          padding-right: .85rem;
        }

        .scm-section .scm-pill {
          position: relative;
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: .7rem;
          min-height: 4rem;
          max-width: min(82vw, 24rem);
          padding: .85rem 1.2rem .85rem .9rem;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, .30);
          border-radius: 999px;
          color: #26344d;
          background: rgba(255, 255, 255, .84);
          box-shadow: 0 8px 26px rgba(12, 23, 48, .055), inset 0 1px 0 rgba(255, 255, 255, .9);
          font-size: .91rem;
          font-weight: 750;
          line-height: 1.35;
          white-space: nowrap;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform .32s ease, border-color .32s ease, box-shadow .32s ease, background .32s ease;
        }

        .scm-section .scm-pill::after {
          position: absolute;
          top: -60%;
          left: -45%;
          width: 32%;
          height: 220%;
          content: "";
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .76), transparent);
          transform: rotate(22deg) translateX(-180%);
          transition: transform .7s ease;
        }

        .scm-section .scm-pill:hover {
          z-index: 2;
          border-color: rgba(36, 89, 214, .35);
          background: rgba(255, 255, 255, .98);
          box-shadow: 0 15px 34px rgba(36, 89, 214, .12), 0 3px 10px rgba(12, 23, 48, .04);
          transform: translateY(-3px);
        }

        .scm-section .scm-pill:hover::after {
          transform: rotate(22deg) translateX(560%);
        }

        .scm-section .scm-icon-wrap {
          position: relative;
          display: grid;
          width: 2.15rem;
          height: 2.15rem;
          flex: 0 0 2.15rem;
          place-items: center;
          border: 1px solid rgba(244, 173, 54, .28);
          border-radius: 50%;
          color: #c78316;
          background: linear-gradient(145deg, #fff9ea, #fff0cd);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .95), 0 4px 10px rgba(244, 173, 54, .10);
          transition: transform .35s ease, background .35s ease, color .35s ease;
        }

        .scm-section .scm-icon-wrap svg {
          width: 1.05rem;
          height: 1.05rem;
          stroke-width: 1.9;
          transition: transform .45s ease;
        }

        .scm-section .scm-pill:hover .scm-icon-wrap {
          color: #fff;
          border-color: transparent;
          background: linear-gradient(135deg, var(--scm-blue), var(--scm-violet));
          transform: rotate(-8deg) scale(1.06);
        }

        .scm-section .scm-pill:hover .scm-icon-wrap svg {
          transform: rotate(28deg);
        }

        .scm-section .scm-label {
          display: inline-block;
          max-width: 100%;
          overflow-wrap: anywhere;
        }

        .scm-section .scm-row-static {
          overflow-x: auto;
          overflow-y: hidden;
          overscroll-behavior-inline: contain;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }

        .scm-section .scm-track-static {
          width: max-content;
          animation: none !important;
        }

        @keyframes scm-scroll-forward {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes scm-scroll-reverse {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @keyframes scm-title-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }

        @keyframes scm-pulse {
          0% { transform: scale(1); opacity: .8; }
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }

        @keyframes scm-float-sun {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(24px, 20px, 0) scale(1.08); }
        }

        @keyframes scm-float-blue {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-26px, -20px, 0) scale(1.07); }
        }

        @keyframes scm-line-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @media (max-width: 900px) {
          .scm-section .scm-shell {
            grid-template-columns: minmax(0, 1fr);
            gap: 1.8rem;
          }

          .scm-section .scm-heading {
            max-width: 44rem;
          }

          .scm-section .scm-marquee {
            width: 100%;
          }

          .scm-section .scm-title {
            max-width: 42rem;
          }
        }

        @media (max-width: 560px) {
          .scm-section {
            padding: 3rem .85rem;
          }

          .scm-section .scm-shell {
            gap: 1.45rem;
          }

          .scm-section .scm-badge {
            gap: .52rem;
            padding: .4rem .7rem;
            font-size: .63rem;
            letter-spacing: .095em;
          }

          .scm-section .scm-title {
            margin-top: .95rem;
            font-size: clamp(2rem, 8.8vw, 2.8rem);
            line-height: 1.08;
          }

          .scm-section .scm-title-line {
            margin-top: .9rem;
          }

          .scm-section .scm-quote {
            margin-top: .85rem;
            font-size: .94rem;
            line-height: 1.68;
          }

          .scm-section .scm-row {
            padding: .4rem 0;
          }

          .scm-section .scm-group {
            gap: .65rem;
            padding-right: .65rem;
          }

          .scm-section .scm-pill {
            min-height: 3.3rem;
            gap: .55rem;
            padding: .62rem .9rem .62rem .65rem;
            font-size: .82rem;
          }

          .scm-section .scm-icon-wrap {
            width: 1.85rem;
            height: 1.85rem;
            flex-basis: 1.85rem;
          }

          .scm-section .scm-icon-wrap svg {
            width: .92rem;
            height: .92rem;
          }

          .scm-section .scm-track--forward {
            animation-duration: 27s;
          }

          .scm-section .scm-track--reverse {
            animation-duration: 32s;
          }
        }

        @media (max-width: 360px) {
          .scm-section .scm-pill {
            padding-inline: .58rem .78rem;
            font-size: .78rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scm-section .scm-blob,
          .scm-section .scm-badge-dot::after,
          .scm-section .scm-title-highlight,
          .scm-section .scm-title-line,
          .scm-section .scm-track {
            animation: none !important;
          }

          .scm-section .scm-pill,
          .scm-section .scm-icon-wrap,
          .scm-section .scm-icon-wrap svg {
            transition: none !important;
          }
        }
      `}</style>

      <div className="scm-glow" aria-hidden="true">
        <span className="scm-blob scm-blob--sun" />
        <span className="scm-blob scm-blob--blue" />
      </div>

      <div className="scm-shell">
        <motion.div
          className="scm-heading"
          initial={reduceMotion ? false : { opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="scm-badge">
            <span className="scm-badge-dot" aria-hidden="true" />
            {badge}
          </span>

          <h2 id={headingId} className="scm-title">
            {titleFirst} <span className="scm-title-highlight">{titleHighlight}</span>
          </h2>
          <span className="scm-title-line" aria-hidden="true" />

          <p className="scm-quote">{quote}</p>
        </motion.div>

        <motion.div
          className="scm-marquee"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label={ariaLabel}
        >
          {rows.map(({ reverse, items: rowItems, key }) => {
            const direction = reverse ? "reverse" : "forward";
            const trackClass = reduceMotion
              ? "scm-track scm-track-static"
              : `scm-track scm-track--${direction}`;

            return (
              <div
                key={key}
                className={`scm-row${reduceMotion ? " scm-row-static" : ""}`}
                aria-hidden={reverse ? "true" : undefined}
              >
                <div className={trackClass}>
                  {[0, 1].slice(0, reduceMotion ? 1 : 2).map((copyIndex) => (
                    <div
                      key={`${key}-group-${copyIndex}`}
                      className="scm-group"
                      aria-hidden={copyIndex > 0 ? "true" : undefined}
                    >
                      {rowItems.map((item, itemIndex) => (
                        <span
                          className="scm-pill"
                          key={`${item.name}-${itemIndex}`}
                        >
                          <span className="scm-icon-wrap" aria-hidden="true">
                            <Sun />
                          </span>
                          <span className="scm-label">{item.name}</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default SolarCapabilityMarquee;
