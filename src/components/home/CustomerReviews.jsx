
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  PanelsTopLeft,
  ShieldCheck,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";

const solarCards = [
  {
    id: "roof-assessment",
    label: "ROOF ASSESSMENT",
    title: "Start with the right roof.",
    text: "Roof condition, usable area, shading and safe access should be assessed before a solar layout is finalized.",
    icon: PanelsTopLeft,
  },
  {
    id: "system-sizing",
    label: "SMART SYSTEM SIZING",
    title: "Size the system around real usage.",
    text: "Electricity bills, daytime consumption and future requirements help guide the appropriate system capacity.",
    icon: Gauge,
  },
  {
    id: "clear-proposal",
    label: "CLEAR PROJECT SCOPE",
    title: "Know what your proposal includes.",
    text: "Understand the planned equipment, installation scope, electrical work, approvals and exclusions before committing.",
    icon: ClipboardCheck,
  },
  {
    id: "electrical-safety",
    label: "SAFETY FIRST",
    title: "Put safety into every stage.",
    text: "Mounting, wiring, protective devices, maintenance access and commissioning should be handled with appropriate technical care.",
    icon: ShieldCheck,
  },
  {
    id: "energy-planning",
    label: "ENERGY PLANNING",
    title: "Plan for your energy needs.",
    text: "Understand generation estimates, grid connection requirements and whether battery storage is appropriate for your property.",
    icon: Zap,
  },
  {
    id: "ongoing-care",
    label: "LONG-TERM CARE",
    title: "Know how to care for your system.",
    text: "Plan suitable inspections, panel cleaning, monitoring and maintenance according to the equipment manufacturer's guidance.",
    icon: Wrench,
  },
];

const transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

function SolarCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="solar-review-card">
      <div className="solar-review-card-top">
        <span className="solar-review-icon">
          <Icon aria-hidden="true" />
        </span>

        <span className="solar-review-label">
          {item.label}
        </span>
      </div>

      <h3 className="solar-review-card-title">
        {item.title}
      </h3>

      <p className="solar-review-card-text">
        {item.text}
      </p>

      <div className="solar-review-card-divider" />

      <div className="solar-review-card-footer">
        <span className="solar-review-check">
          <CheckCircle2 aria-hidden="true" />
          <span>Solar planning essential</span>
        </span>

        <span
          className="solar-review-arrow"
          aria-hidden="true"
        >
          <ArrowUpRight />
        </span>
      </div>
    </article>
  );
}

export function CustomerReviews() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="solar-review-section"
      aria-labelledby="solar-review-heading"
    >
      <style>{`
        .solar-review-section,
        .solar-review-section * {
          box-sizing: border-box;
        }

        .solar-review-section {
          --solar-navy: #071126;
          --solar-blue: #2f5bff;
          --solar-muted: #65708a;
          --solar-amber: #f4ad36;

          position: relative;
          isolation: isolate;
          width: 100%;
          overflow: hidden;
          padding: clamp(64px, 8vw, 108px) 0;
          color: var(--solar-navy);
          background:
            radial-gradient(
              ellipse at 4% 12%,
              rgba(47, 91, 255, .09),
              transparent 34%
            ),
            radial-gradient(
              ellipse at 96% 83%,
              rgba(244, 173, 54, .14),
              transparent 32%
            ),
            linear-gradient(
              145deg,
              #fbfcff 0%,
              #f5f7ff 54%,
              #ffffff 100%
            );
        }

        .solar-review-container {
          width: min(92%, 1180px);
          margin-inline: auto;
        }

        .solar-review-heading {
          position: relative;
          margin: 0 auto clamp(32px, 4.5vw, 50px);
          text-align: center;
        }

        .solar-review-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-bottom: 20px;
          padding: 9px 15px;
          border: 1px solid rgba(47, 91, 255, .16);
          border-radius: 999px;
          background: rgba(255, 255, 255, .85);
          box-shadow: 0 5px 22px rgba(40, 52, 110, .055);
          color: var(--solar-blue);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .16em;
          line-height: 1;
          text-transform: uppercase;
        }

        .solar-review-kicker svg {
          width: 16px;
          height: 16px;
          color: var(--solar-amber);
          flex-shrink: 0;
        }

        .solar-review-title {
          max-width: 850px;
          margin: 0 auto;
          color: var(--solar-navy);
          font-size: clamp(34px, 5.2vw, 62px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -.055em;
          overflow-wrap: anywhere;
        }

        .solar-review-title-highlight {
          display: inline-block;
          background: linear-gradient(
            100deg,
            var(--solar-blue) 8%,
            #5277ff 54%,
            #bd7c13 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .solar-review-description {
          max-width: 620px;
          margin: 19px auto 0;
          color: var(--solar-muted);
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.85;
        }

        .solar-review-heading-accent {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 22px;
        }

        .solar-review-heading-accent span {
          display: block;
          width: 34px;
          height: 3px;
          border-radius: 99px;
          background: linear-gradient(
            90deg,
            var(--solar-blue),
            #6687ff
          );
        }

        .solar-review-heading-accent span:nth-child(2) {
          width: 10px;
          background: var(--solar-amber);
        }

        /* One horizontal marquee row */
        .solar-review-marquee {
          width: 100%;
          overflow: hidden;
          padding: 16px 0 25px;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 4%,
            #000 96%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 4%,
            #000 96%,
            transparent 100%
          );
        }

        .solar-review-track {
          display: flex;
          align-items: stretch;
          width: max-content;
          max-width: none;
          gap: 0;
        }

        .solar-review-group {
          display: flex;
          flex: 0 0 auto;
          align-items: stretch;
          gap: 18px;
          padding-right: 18px;
        }

        .solar-review-track--moving {
          animation: solar-review-scroll 44s linear infinite;
          will-change: transform;
        }

        .solar-review-marquee:hover .solar-review-track,
        .solar-review-marquee:focus-within .solar-review-track {
          animation-play-state: paused;
        }

        .solar-review-card {
          position: relative;
          display: flex;
          flex: 0 0 auto;
          flex-direction: column;
          width: clamp(290px, 29vw, 360px);
          min-height: 270px;
          margin: 0;
          padding: clamp(22px, 2.4vw, 30px);
          overflow: hidden;
          border: 1px solid rgba(99, 112, 167, .16);
          border-radius: 24px;
          background: rgba(255, 255, 255, .91);
          box-shadow:
            0 12px 34px rgba(38, 49, 101, .055),
            inset 0 1px 0 rgba(255, 255, 255, .95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition:
            transform 350ms ease,
            border-color 350ms ease,
            box-shadow 350ms ease;
        }

        .solar-review-card::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--solar-blue),
            #6687ff,
            var(--solar-amber)
          );
          opacity: .7;
          content: "";
        }

        .solar-review-card:hover {
          transform: translateY(-6px);
          border-color: rgba(47, 91, 255, .28);
          box-shadow: 0 22px 48px rgba(38, 49, 101, .11);
        }

        .solar-review-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .solar-review-icon {
          display: grid;
          width: 48px;
          height: 48px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(47, 91, 255, .12);
          border-radius: 15px;
          background: linear-gradient(
            145deg,
            rgba(47, 91, 255, .09),
            rgba(244, 173, 54, .13)
          );
          color: var(--solar-blue);
        }

        .solar-review-icon svg {
          width: 23px;
          height: 23px;
        }

        .solar-review-label {
          max-width: 190px;
          padding: 7px 10px;
          border: 1px solid rgba(47, 91, 255, .13);
          border-radius: 999px;
          background: rgba(47, 91, 255, .045);
          color: var(--solar-blue);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .11em;
          line-height: 1.4;
          text-align: center;
        }

        .solar-review-card-title {
          margin: 22px 0 0;
          color: var(--solar-navy);
          font-size: clamp(19px, 1.5vw, 22px);
          font-weight: 800;
          line-height: 1.3;
          letter-spacing: -.025em;
        }

        .solar-review-card-text {
          flex: 1 0 auto;
          margin: 12px 0 22px;
          color: #5b6680;
          font-size: 14px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .solar-review-card-divider {
          width: 100%;
          height: 1px;
          flex: 0 0 auto;
          margin-bottom: 18px;
          background: linear-gradient(
            90deg,
            rgba(47, 91, 255, .18),
            rgba(99, 112, 167, .07),
            transparent
          );
        }

        .solar-review-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .solar-review-check {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #546078;
          font-size: 11px;
          font-weight: 650;
        }

        .solar-review-check svg {
          width: 15px;
          height: 15px;
          color: #23876c;
          flex: 0 0 auto;
        }

        .solar-review-arrow {
          display: grid;
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(99, 112, 167, .14);
          border-radius: 50%;
          color: #72809b;
          transition:
            color 300ms ease,
            background 300ms ease,
            transform 300ms ease;
        }

        .solar-review-arrow svg {
          width: 16px;
          height: 16px;
        }

        .solar-review-card:hover .solar-review-arrow {
          transform: translate(2px, -2px);
          border-color: transparent;
          background: var(--solar-blue);
          color: white;
        }

        @keyframes solar-review-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 640px) {
          .solar-review-section {
            padding: 58px 0 62px;
          }

          .solar-review-container {
            width: calc(100% - 36px);
          }

          .solar-review-title {
            font-size: clamp(32px, 9vw, 44px);
            line-height: 1.12;
          }

          .solar-review-description {
            margin-top: 15px;
            font-size: 14px;
            line-height: 1.75;
          }

          .solar-review-card {
            width: min(84vw, 330px);
            min-height: 265px;
            padding: 22px;
            border-radius: 21px;
          }

          .solar-review-track--moving {
            animation-duration: 36s;
          }

          .solar-review-label {
            font-size: 8px;
            letter-spacing: .08em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .solar-review-track--moving {
            animation: none !important;
            transform: none !important;
            will-change: auto !important;
          }

          .solar-review-marquee {
            overflow-x: auto;
            -webkit-mask-image: none;
            mask-image: none;
            scrollbar-width: thin;
          }

          .solar-review-card {
            transition: none;
          }
        }
      `}</style>

      {/* Section heading */}
      <motion.div
        className="solar-review-heading solar-review-container"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 24 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
      >
        <div className="solar-review-kicker">
          <Sun aria-hidden="true" />
          Solar project essentials
        </div>

        <h2
          className="solar-review-title"
          id="solar-review-heading"
        >
          A better solar journey starts with{" "}
          <span className="solar-review-title-highlight">
            the right details.
          </span>
        </h2>

        <p className="solar-review-description">
          From roof assessment to ongoing care, understand the
          important decisions behind a practical solar project.
        </p>

        <div
          className="solar-review-heading-accent"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>
      </motion.div>

      {/* One single horizontal marquee row */}
      <motion.div
        className="solar-review-marquee"
        role="region"
        aria-label="Solar project essentials"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 20 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          ...transition,
          delay: 0.1,
        }}
      >
        <div
          className={
            reduceMotion
              ? "solar-review-track"
              : "solar-review-track solar-review-track--moving"
          }
        >
          <div className="solar-review-group">
            {solarCards.map((item) => (
              <SolarCard
                key={item.id}
                item={item}
              />
            ))}
          </div>

          {!reduceMotion && (
            <div
              className="solar-review-group"
              aria-hidden="true"
            >
              {solarCards.map((item) => (
                <SolarCard
                  key={`duplicate-${item.id}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default CustomerReviews;
