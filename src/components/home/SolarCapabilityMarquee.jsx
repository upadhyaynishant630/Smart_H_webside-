import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  BatteryCharging,
  ClipboardCheck,
  Compass,
  Factory,
  FileText,
  Gauge,
  Home,
  IndianRupee,
  Layers,
  Leaf,
  Lightbulb,
  PlugZap,
  Ruler,
  Settings,
  ShieldCheck,
  Sun,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";


const TONES = ["amber", "blue", "violet", "cyan", "green", "rose"];

// Order matters: the first matching rule wins.
const ICON_RULES = [
  { test: /subsid|incentive|scheme|rebate|financ|loan|emi/, icon: IndianRupee, tone: "cyan" },
  { test: /net\s*meter|metering|grid|export/, icon: Gauge, tone: "violet" },
  { test: /safety|protect|earthing|surge|compliance|standard/, icon: ShieldCheck, tone: "green" },
  { test: /roof|structure|mounting|terrace/, icon: Home, tone: "blue" },
  { test: /siz|load|capacity|calculat|estimat/, icon: Ruler, tone: "blue" },
  { test: /install|commission|erect|setup|set-up/, icon: Wrench, tone: "amber" },
  { test: /batter|storage|backup|hybrid/, icon: BatteryCharging, tone: "cyan" },
  { test: /inverter|wiring|cable|connection/, icon: PlugZap, tone: "rose" },
  { test: /monitor|track|performance|analytic/, icon: Activity, tone: "cyan" },
  { test: /maint|clean|service|repair|amc|warranty/, icon: Settings, tone: "violet" },
  { test: /permit|approv|document|paper|licen|discom|application/, icon: FileText, tone: "blue" },
  { test: /survey|site|assess|audit|inspect|feasib|shadow/, icon: ClipboardCheck, tone: "rose" },
  { test: /design|plan|layout|engineer/, icon: Compass, tone: "violet" },
  { test: /saving|\broi\b|payback|cost|bill|return|budget/, icon: TrendingUp, tone: "green" },
  { test: /commercial|industrial|factory|business/, icon: Factory, tone: "blue" },
  { test: /home|house|resident/, icon: Home, tone: "amber" },
  { test: /eco-?friendly|green|carbon|sustainab|environment/, icon: Leaf, tone: "green" },
  { test: /panel|module|photovoltaic|\bpv\b|solar/, icon: Sun, tone: "amber" },
  { test: /energy|power|electric/, icon: Zap, tone: "amber" },
];

// Used when no rule matches, so neighbouring pills still look different.
const FALLBACKS = [
  { icon: Sun, tone: "amber" },
  { icon: Zap, tone: "blue" },
  { icon: Leaf, tone: "green" },
  { icon: Compass, tone: "violet" },
  { icon: Lightbulb, tone: "cyan" },
  { icon: Layers, tone: "rose" },
];

function isIconComponent(value) {
  return (
    typeof value === "function" ||
    (typeof value === "object" && value !== null && "$$typeof" in value)
  );
}

function resolveVisual(item, index) {
  const lowerName = item.name.toLowerCase();
  const rule = ICON_RULES.find((entry) => entry.test.test(lowerName));
  const fallback = FALLBACKS[index % FALLBACKS.length];

  const Icon = isIconComponent(item.icon)
    ? item.icon
    : rule
      ? rule.icon
      : fallback.icon;

  const tone = TONES.includes(item.tone)
    ? item.tone
    : rule
      ? rule.tone
      : fallback.tone;

  return { ...item, Icon, tone };
}

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
        .map(resolveVisual)
    : [];

  if (capabilities.length === 0) return null;

  const count = capabilities.length;

  // Repeat items inside one group so a single group is always wider than very
  // large screens; the loop then never shows an empty gap.
  const repeat = reduceMotion ? 1 : Math.max(1, Math.ceil(16 / count));
  const pillsPerGroup = count * repeat;

  // Second row starts from the middle and runs backwards so rows don't mirror.
  const half = Math.floor(count / 2);
  const rotated = [...capabilities.slice(half), ...capabilities.slice(0, half)];

  const rows = [
    {
      key: "forward",
      reverse: false,
      items: capabilities,
      duration: Math.max(28, pillsPerGroup * 4),
    },
    {
      key: "reverse",
      reverse: true,
      items: [...rotated].reverse(),
      duration: Math.max(32, pillsPerGroup * 4.6),
    },
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
          --scm-blue: var(--primary-600, #2459d6);
          --scm-violet: #79e900;
          --scm-cyan: #12b7c8;
          --scm-amber: #f4ad36;
          --scm-gutter: clamp(1rem, 4vw, 2rem);
          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          padding: clamp(3.25rem, 7vw, 5.75rem) 0;
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

        /* ---------- Heading row ---------- */
        .scm-section .scm-head {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr);
          align-items: end;
          gap: clamp(1.5rem, 4vw, 4rem);
          width: 100%;
          max-width: 1240px;
          margin-inline: auto;
          padding-inline: var(--scm-gutter);
          margin-bottom: clamp(1.9rem, 4vw, 3rem);
        }

        .scm-section .scm-heading {
          min-width: 0;
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
          background-image: linear-gradient(100deg, var(--scm-blue) 0%, #178a00 42%, #55c500 72%, var(--scm-blue) 100%);
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
          max-width: 30rem;
          margin: 0;
          padding-left: 1.1rem;
          border-left: 3px solid rgba(36, 89, 214, .22);
          color: var(--scm-muted);
          font-size: clamp(.95rem, 1.35vw, 1.06rem);
          line-height: 1.78;
          overflow-wrap: anywhere;
        }

        /* ---------- Full-width marquee ---------- */
        .scm-section .scm-marquee {
          position: relative;
          z-index: 1;
          width: 100%;
          min-width: 0;
          overflow: hidden;
          padding: .2rem 0;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);
        }

        .scm-section .scm-row {
          width: 100%;
          min-width: 0;
          overflow: hidden;
          padding: .75rem 0;
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
          animation: scm-scroll-forward var(--scm-dur, 40s) linear infinite;
        }

        .scm-section .scm-track--reverse {
          animation: scm-scroll-reverse var(--scm-dur, 46s) linear infinite;
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

        /* ---------- Pills ---------- */
        .scm-section .scm-pill {
          --t-fg: #c78316;
          --t-bg1: #fff9ea;
          --t-bg2: #fff0cd;
          --t-bd: rgba(244, 173, 54, .30);
          --t-sh: rgba(244, 173, 54, .12);
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
          font-size: .91rem;
          font-weight: 750;
          line-height: 1.35;
          white-space: nowrap;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform .32s ease, border-color .32s ease, box-shadow .32s ease, background .32s ease;
        }

        .scm-section .scm-tone--amber  { --t-fg: #c78316; --t-bg1: #fff9ea; --t-bg2: #fff0cd; --t-bd: rgba(244, 173, 54, .32); --t-sh: rgba(244, 173, 54, .14); }
        .scm-section .scm-tone--blue   { --t-fg: #2459d6; --t-bg1: #f3f7ff; --t-bg2: #dfe9ff; --t-bd: rgba(36, 89, 214, .26);  --t-sh: rgba(36, 89, 214, .12); }
        .scm-section .scm-tone--violet { --t-fg: #178a00; --t-bg1: #f3fcef; --t-bg2: #daf3c7; --t-bd: rgba(23, 138, 0, .28); --t-sh: rgba(23, 138, 0, .12); }
        .scm-section .scm-tone--cyan   { --t-fg: #0e93a3; --t-bg1: #f0fcfd; --t-bg2: #d3f5f9; --t-bd: rgba(18, 183, 200, .30); --t-sh: rgba(18, 183, 200, .12); }
        .scm-section .scm-tone--green  { --t-fg: #178a58; --t-bg1: #f1fbf6; --t-bg2: #d5f3e3; --t-bd: rgba(23, 138, 88, .28);  --t-sh: rgba(23, 138, 88, .12); }
        .scm-section .scm-tone--rose   { --t-fg: #d1456b; --t-bg1: #fff4f7; --t-bg2: #ffe0e8; --t-bd: rgba(209, 69, 107, .28); --t-sh: rgba(209, 69, 107, .12); }

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
          border-color: var(--t-bd);
          background: rgba(255, 255, 255, .98);
         
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
          border: 1px solid var(--t-bd);
          border-radius: 50%;
          color: var(--t-fg);
          background: linear-gradient(145deg, var(--t-bg1), var(--t-bg2));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .95), 0 4px 10px var(--t-sh);
          transition: transform .35s ease, background .35s ease, color .35s ease;
        }

        .scm-section .scm-icon-wrap svg {
          width: 1.05rem;
          height: 1.05rem;
          stroke-width: 1.9;
          transition: transform .45s ease;
        }

     
        .scm-section .scm-pill:hover .scm-icon-wrap svg {
          transform: scale(1.08) rotate(8deg);
        }

        .scm-section .scm-label {
          display: inline-block;
          max-width: 100%;
          overflow-wrap: anywhere;
        }

        /* ---------- Reduced motion: static, swipeable row ---------- */
        .scm-section.scm-reduced-motion .scm-marquee {
          -webkit-mask-image: none;
          mask-image: none;
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
          padding-inline: var(--scm-gutter);
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

        /* ---------- Responsive ---------- */
        @media (max-width: 900px) {
          .scm-section .scm-head {
            grid-template-columns: minmax(0, 1fr);
            align-items: start;
            gap: 1.25rem;
          }

          .scm-section .scm-quote {
            max-width: 40rem;
          }
        }

        @media (max-width: 560px) {
          .scm-section {
            padding: 3rem 0;
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
            font-size: .94rem;
            line-height: 1.68;
          }

          .scm-section .scm-row {
            padding: .55rem 0;
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

          .scm-section .scm-track--forward,
          .scm-section .scm-track--reverse {
            animation-duration: calc(var(--scm-dur, 40s) * .8);
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

      <motion.div
        className="scm-head"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="scm-heading">
          
          <h2 id={headingId} className="scm-title">
            {titleFirst}{" "}
            <span className="scm-title-highlight">{titleHighlight}</span>
          </h2>
          <span className="scm-title-line" aria-hidden="true" />
        </div>

        <p className="scm-quote">{quote}</p>
      </motion.div>

      <motion.div
        className="scm-marquee"
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        role="region"
        aria-label={ariaLabel}
      >
        {rows.map(({ key, reverse, items: rowItems, duration }) => {
          const direction = reverse ? "reverse" : "forward";
          const trackClass = reduceMotion
            ? "scm-track scm-track-static"
            : `scm-track scm-track--${direction}`;

          // One group = the items repeated `repeat` times.
          const groupItems = Array.from({ length: repeat }).flatMap(() => rowItems);

          return (
            <div
              key={key}
              className={`scm-row${reduceMotion ? " scm-row-static" : ""}`}
              aria-hidden={reverse ? "true" : undefined}
              tabIndex={reduceMotion && !reverse ? 0 : undefined}
            >
              <div
                className={trackClass}
                style={reduceMotion ? undefined : { "--scm-dur": `${duration}s` }}
              >
                {[0, 1].slice(0, reduceMotion ? 1 : 2).map((copyIndex) => (
                  <div
                    key={`${key}-group-${copyIndex}`}
                    className="scm-group"
                    aria-hidden={copyIndex > 0 ? "true" : undefined}
                  >
                    {groupItems.map((item, itemIndex) => {
                      const Icon = item.Icon;
                      return (
                        <span
                          className={`scm-pill scm-tone--${item.tone}`}
                          key={`${item.name}-${itemIndex}`}
                        >
                          <span className="scm-icon-wrap" aria-hidden="true">
                            <Icon aria-hidden="true" focusable="false" />
                          </span>
                          <span className="scm-label">{item.name}</span>
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default SolarCapabilityMarquee;