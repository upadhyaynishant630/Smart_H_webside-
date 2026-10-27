import { motion, useReducedMotion } from "framer-motion";

// Yahan apne real brand names / logo images daalo.
// Image logo ke liye: { name: "Brand", src: "/logos/brand.svg" }
// tone: "grad" = gradient text, "solid" = normal text, "shine" = shimmer text
const brands = [
  { name: "NORTHWIND", font: "serif-bold", tone: "solid" },
  { name: "AURORA", font: "serif-wide", tone: "grad" },
  { name: "Lumière", font: "serif-italic", tone: "shine" },
  { name: "nexora", font: "sans-black", tone: "grad" },
  { name: "VERTEX", font: "serif-bold", tone: "shine" },
  { name: "ELEVATE", font: "serif-wide", tone: "solid" },
];

const rowTwo = [...brands].reverse();

function Logo({ brand }) {
  return (
    <div className="sh-logo" aria-label={brand.name}>
      {brand.src ? (
        <img src={brand.src} alt={brand.name} loading="lazy" className="sh-logo-img" />
      ) : (
        <>
          <span className="sh-logo-dot" aria-hidden="true" />
          <span className={`sh-logo-text sh-font-${brand.font} sh-tone-${brand.tone}`}>
            {brand.name}
          </span>
        </>
      )}
    </div>
  );
}

function MarqueeRow({ items, reverse, reduce }) {
  const trackClass = reduce
    ? "sh-track"
    : reverse
      ? "sh-track sh-track-rev"
      : "sh-track sh-track-fwd";

  return (
    <div className="sh-row">
      <div className={trackClass}>
        {[...items, ...items].map((b, i) => (
          <Logo key={`${b.name}-${i}`} brand={b} />
        ))}
      </div>
    </div>
  );
}

export function BrandMarquee() {
  const reduce = useReducedMotion();

  return (
    <section className="sh-brand relative overflow-hidden py-14 md:py-20">
      <style>{`
        /* ---------- Keyframes ---------- */
        @keyframes sh-scroll-fwd {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes sh-scroll-rev {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        @keyframes sh-shimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes sh-pulse {
          0%   { transform: scale(1);   opacity: 0.9; }
          70%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes sh-float-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(40px, 30px, 0) scale(1.15); }
        }
        @keyframes sh-float-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(-50px, -25px, 0) scale(1.1); }
        }
        @keyframes sh-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* ---------- Glow layer: top/bottom edges par fade ---------- */
        .sh-glow {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 28%, #000 72%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 28%, #000 72%, transparent 100%);
        }

        /* ---------- Background glow blobs ---------- */
        .sh-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          pointer-events: none;
        }
        .sh-blob-a {
          width: 320px; height: 320px; top: -40px; left: 8%;
          background: rgba(37, 99, 235, 0.18);
          animation: sh-float-a 14s ease-in-out infinite;
        }
        .sh-blob-b {
          width: 280px; height: 280px; bottom: -40px; right: 10%;
          background: rgba(124, 58, 237, 0.16);
          animation: sh-float-b 16s ease-in-out infinite;
        }

        /* ---------- Badge ---------- */
        .sh-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border: 1px solid rgba(37, 99, 235, 0.35);
          background: rgba(37, 99, 235, 0.08);
          color: #2563eb;
        }
        .sh-badge-dot {
          position: relative;
          width: 8px; height: 8px;
          border-radius: 9999px;
          background: #2563eb;
        }
        .sh-badge-dot::after {
          content: "";
          position: absolute; inset: 0;
          border-radius: 9999px;
          background: #2563eb;
          animation: sh-pulse 2s ease-out infinite;
        }

        /* ---------- Heading ---------- */
        .sh-title {
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .sh-title-grad {
          background-image: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4, #2563eb);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: sh-shimmer 5s linear infinite;
        }
        .sh-title-line {
          display: block;
          height: 3px;
          width: 84px;
          margin-top: 16px;
          border-radius: 9999px;
          background-image: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4);
          transform-origin: left center;
          animation: sh-line-grow 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .sh-quote {
          margin-top: 18px;
          font-size: 1rem;
          line-height: 1.65;
          font-style: italic;
        }

        /* ---------- Marquee rows ---------- */
        .sh-rows {
          position: relative;
          z-index: 1;
          min-width: 0;
          flex: 1 1 0%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
        }
        .sh-row { overflow: hidden; padding: 10px 0; }
        .sh-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .sh-track-fwd { animation: sh-scroll-fwd 32s linear infinite; }
        .sh-track-rev { animation: sh-scroll-rev 40s linear infinite; }
        .sh-rows:hover .sh-track { animation-play-state: paused; }

        /* ---------- Logo pill ---------- */
        .sh-logo {
          position: relative;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 12px;
          margin-right: 20px;
          padding: 14px 28px;
          border-radius: 9999px;
          border: 1px solid rgba(148, 163, 184, 0.28);
          background: rgba(148, 163, 184, 0.07);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          transition: transform 0.35s ease, border-color 0.35s ease,
            box-shadow 0.35s ease, background 0.35s ease;
        }
        .sh-logo:hover {
          transform: translateY(-6px) scale(1.04);
          border-color: rgba(37, 99, 235, 0.6);
          background: rgba(37, 99, 235, 0.09);
          box-shadow: 0 14px 34px -10px rgba(37, 99, 235, 0.45);
        }
        .sh-logo-dot {
          width: 8px; height: 8px;
          border-radius: 9999px;
          background-image: linear-gradient(135deg, #2563eb, #7c3aed);
          flex-shrink: 0;
        }
        .sh-logo-img {
          height: 34px;
          width: auto;
          opacity: 0.75;
          filter: grayscale(1);
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
        .sh-logo:hover .sh-logo-img { opacity: 1; filter: grayscale(0); }

        /* ---------- Brand text fonts ---------- */
        .sh-logo-text {
          white-space: nowrap;
          user-select: none;
          font-size: clamp(1.4rem, 2.6vw, 2rem);
          line-height: 1;
        }
        .sh-font-serif-bold {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .sh-font-serif-wide {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 300;
          letter-spacing: 0.32em;
        }
        .sh-font-serif-italic {
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        .sh-font-sans-black {
          font-family: ui-sans-serif, system-ui, "Segoe UI", sans-serif;
          font-weight: 900;
          font-style: italic;
          letter-spacing: -0.05em;
        }

        /* ---------- Brand text tones ---------- */
        .sh-tone-solid { opacity: 0.88; }
        .sh-tone-grad {
          background-image: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .sh-tone-shine {
          background-image: linear-gradient(
            110deg,
            #64748b 20%,
            #2563eb 40%,
            #06b6d4 50%,
            #7c3aed 60%,
            #64748b 80%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: sh-shimmer 4s linear infinite;
        }

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .sh-blob, .sh-badge-dot::after, .sh-title-grad,
          .sh-title-line, .sh-tone-shine, .sh-track {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background glow blobs (top/bottom edges par fade hote hain) */}
      <div className="sh-glow" aria-hidden="true">
        <span className="sh-blob sh-blob-a" />
        <span className="sh-blob sh-blob-b" />
      </div>

      <div className="container-x relative z-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-14">
        {/* Left: heading */}
        <motion.div
          className="max-w-sm shrink-0"
          initial={reduce ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="sh-badge">
            <span className="sh-badge-dot" aria-hidden="true" />
            Trusted Partners
          </span>

          <h2 className="sh-title mt-5 text-foreground">
            Featured <span className="sh-title-grad">In</span>
          </h2>
          <span className="sh-title-line" aria-hidden="true" />

          <p className="sh-quote text-muted-foreground">
            “Trusted by leading brands and loved by customers across India.”
          </p>
        </motion.div>

        {/* Right: two marquee rows */}
        <motion.div
          className="sh-rows"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <MarqueeRow items={brands} reverse={false} reduce={reduce} />
          <MarqueeRow items={rowTwo} reverse reduce={reduce} />
        </motion.div>
      </div>
    </section>
  );
}