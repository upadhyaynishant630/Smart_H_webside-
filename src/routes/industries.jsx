
import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Gauge,
  Layers3,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import {
  CtaBand,
  PageHero,
  Reveal,
} from "@/components/ui/brand";

import { ThreeDIcon } from "@/components/ui/ThreeDIcon";
import {
  industries,
  industryFeatureImage,
} from "@/data/content";

/* =========================================
   INDUSTRY APPROACH CONTENT
========================================= */

const industryApproach = [
  {
    number: "01",
    icon: Layers3,
    title: "Understand the environment",
    description:
      "Consider existing systems, workflows, operating conditions and the needs of the people who use the technology.",
    points: [
      "Business context",
      "Existing infrastructure",
    ],
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Prioritize what matters",
    description:
      "Identify relevant security, resilience, governance and operational requirements before selecting a solution.",
    points: [
      "Security and risk",
      "Reliability and continuity",
    ],
  },
  {
    number: "03",
    icon: Gauge,
    title: "Design for practical outcomes",
    description:
      "Shape the approach around measurable objectives, maintainability and the organization's future needs.",
    points: [
      "Scalable solutions",
      "Long-term ownership",
    ],
  },
];

/* =========================================
   ROUTE
========================================= */

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      {
        title: "Industries | SmartEDGE",
      },
      {
        name: "description",
        content:
          "Explore how SmartEDGE technology services can adapt to the requirements of manufacturing, financial services, healthcare, retail, education and the public sector.",
      },
      {
        property: "og:title",
        content: "Industries | SmartEDGE",
      },
      {
        property: "og:description",
        content:
          "Technology services shaped around sector-specific needs, operational priorities and business requirements.",
      },
    ],
  }),
  component: Industries,
});

/* =========================================
   INDUSTRIES PAGE
========================================= */

function Industries() {
  const reduceMotion = useReducedMotion();

  const industryList = Array.isArray(industries)
    ? industries
    : [];

  return (
    <main className="sh-industries-page">
      <style>{`
        .sh-industries-page {
          --si-ink: #111a35;
          --si-muted: #66718b;
          --si-blue: #4c55ed;
          --si-purple: #855bf6;
          --si-cyan: #47d4e8;
          --si-border: rgba(85, 103, 158, 0.15);

          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          overflow-x: clip;
          background: #fff;
          color: var(--si-ink);
          font-family:
            Inter,
            Manrope,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .sh-industries-page *,
        .sh-industries-page *::before,
        .sh-industries-page *::after {
          box-sizing: border-box;
        }

        .sh-industries-page img {
          display: block;
          max-width: 100%;
        }

        .sh-industries-page a,
        .sh-industries-page button {
          -webkit-tap-highlight-color: transparent;
        }

        .si-container {
          width: calc(100% - clamp(32px, 7vw, 96px));
          max-width: 1240px;
          margin-inline: auto;
        }

        /* =====================================
           SHARED SECTION HEADINGS
        ===================================== */

        .si-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--si-blue);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.16em;
          line-height: 1.6;
          text-transform: uppercase;
        }

        .si-eyebrow::before {
          width: 24px;
          height: 2px;
          flex: 0 0 auto;
          border-radius: 99px;
          background: linear-gradient(
            90deg,
            var(--si-blue),
            var(--si-cyan)
          );
          content: "";
        }

        .si-gradient-text {
          background: linear-gradient(
            105deg,
            var(--si-blue),
            var(--si-purple) 58%,
            #159fc4
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: var(--si-blue);
        }

        .si-section-heading {
          max-width: 740px;
          margin-inline: auto;
          text-align: center;
        }

        .si-section-title {
          margin: 14px 0 0;
          color: var(--si-ink);
          font-size: clamp(30px, 4.2vw, 49px);
          font-weight: 800;
          letter-spacing: -0.06em;
          line-height: 1.13;
          overflow-wrap: anywhere;
        }

        .si-section-description {
          max-width: 570px;
          margin: 13px auto 0;
          color: var(--si-muted);
          font-size: 13px;
          line-height: 1.9;
        }

        /* =====================================
           INDUSTRY DIRECTORY
        ===================================== */

        .si-directory {
          position: relative;
          padding-block: clamp(42px, 5vw, 66px);
          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(76, 85, 237, 0.045),
              transparent 34%
            ),
            #fff;
        }

        .si-directory-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 22px;
          margin-bottom: 26px;
        }

        .si-directory-intro {
          max-width: 630px;
          min-width: 0;
        }

        .si-directory-title {
          margin: 12px 0 0;
          color: var(--si-ink);
          font-size: clamp(27px, 3.4vw, 39px);
          font-weight: 800;
          letter-spacing: -0.055em;
          line-height: 1.2;
          overflow-wrap: anywhere;
        }

        .si-directory-description {
          max-width: 570px;
          margin: 10px 0 0;
          color: var(--si-muted);
          font-size: 13px;
          line-height: 1.85;
        }

        .si-directory-count {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          flex: 0 0 auto;
          padding: 10px 13px;
          border: 1px solid var(--si-border);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          color: #55617c;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        .si-directory-count svg {
          width: 16px;
          height: 16px;
          color: var(--si-blue);
        }

        .si-industry-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
          gap: 17px;
        }

        .si-industry-reveal {
          display: flex;
          min-width: 0;
          height: 100%;
        }

        .si-industry-card {
          position: relative;
          display: flex;
          width: 100%;
          min-width: 0;
          min-height: 260px;
          flex-direction: column;
          align-items: stretch;
          padding: clamp(20px, 2.2vw, 27px);
          overflow: hidden;
          border: 1px solid rgba(85, 103, 158, 0.14);
          border-radius: 22px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.99),
            #f8f9ff
          );
          box-shadow:
            0 8px 28px rgba(25, 38, 89, 0.035),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
          transition:
            transform 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease,
            background 300ms ease;
        }

        .si-industry-card::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--si-blue),
            var(--si-purple),
            var(--si-cyan)
          );
          opacity: 0;
          transform: scaleX(0.3);
          transform-origin: left;
          transition:
            opacity 300ms ease,
            transform 300ms ease;
          content: "";
        }

        .si-industry-card:hover {
          transform: translateY(-5px);
          border-color: rgba(76, 85, 237, 0.26);
          background: #fff;
          box-shadow: 0 18px 42px rgba(25, 38, 89, 0.085);
        }

        .si-industry-card:hover::before {
          opacity: 1;
          transform: scaleX(1);
        }

        .si-industry-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .si-industry-icon {
          display: grid;
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          place-items: center;
          border: 1px solid rgba(76, 85, 237, 0.12);
          border-radius: 17px;
          background: linear-gradient(
            145deg,
            rgba(76, 85, 237, 0.09),
            rgba(71, 212, 232, 0.13)
          );
          transition:
            transform 280ms ease,
            border-color 280ms ease,
            background 280ms ease;
        }

        .si-industry-card:hover .si-industry-icon {
          transform: translateY(-2px) rotate(-3deg);
          border-color: rgba(76, 85, 237, 0.25);
          background: linear-gradient(
            145deg,
            rgba(76, 85, 237, 0.14),
            rgba(71, 212, 232, 0.18)
          );
        }

        .si-industry-number {
          align-self: flex-start;
          padding: 6px 8px;
          border: 1px solid rgba(85, 103, 158, 0.11);
          border-radius: 8px;
          background: rgba(76, 85, 237, 0.035);
          color: #8490aa;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .si-industry-title {
          margin: 22px 0 0;
          color: var(--si-ink);
          font-size: clamp(17px, 1.7vw, 20px);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }

        .si-industry-description {
          margin: 9px 0 0;
          color: var(--si-muted);
          font-size: 12px;
          line-height: 1.85;
          overflow-wrap: anywhere;
        }

        .si-industry-focus-label {
          margin: 20px 0 9px;
          color: #7d87a0;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .si-industry-focus {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 7px;
          margin-top: auto;
          padding-top: 12px;
        }

        .si-industry-tag {
          display: inline-flex;
          max-width: 100%;
          align-items: center;
          gap: 5px;
          padding: 7px 9px;
          border: 1px solid rgba(76, 85, 237, 0.1);
          border-radius: 9px;
          background: rgba(76, 85, 237, 0.045);
          color: #555f7c;
          font-size: 10px;
          font-weight: 650;
          line-height: 1.45;
          overflow-wrap: anywhere;
          transition:
            color 220ms ease,
            background 220ms ease,
            border-color 220ms ease;
        }

        .si-industry-tag svg {
          width: 12px;
          height: 12px;
          flex: 0 0 auto;
          color: var(--si-blue);
        }

        .si-industry-card:hover .si-industry-tag {
          border-color: rgba(76, 85, 237, 0.15);
          background: rgba(76, 85, 237, 0.065);
          color: #3d4771;
        }

        /* =====================================
           EMPTY DATA FALLBACK
        ===================================== */

        .si-empty-state {
          padding: 30px 20px;
          border: 1px solid var(--si-border);
          border-radius: 18px;
          background: #f8f9ff;
          color: var(--si-muted);
          font-size: 13px;
          line-height: 1.8;
          text-align: center;
        }

        /* =====================================
           OUR SECTOR-FIRST APPROACH
        ===================================== */

        .si-approach {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding-block: clamp(45px, 5.5vw, 72px);
          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(76, 85, 237, 0.17),
              transparent 36%
            ),
            radial-gradient(
              ellipse at 100% 100%,
              rgba(71, 212, 232, 0.09),
              transparent 34%
            ),
            linear-gradient(
              135deg,
              #0b1229 0%,
              #111b3c 55%,
              #0b1530 100%
            );
          color: #fff;
        }

        .si-approach::before {
          position: absolute;
          z-index: -1;
          top: -120px;
          right: -80px;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(174, 190, 255, 0.12);
          border-radius: 50%;
          box-shadow:
            0 0 0 30px rgba(174, 190, 255, 0.025),
            0 0 0 60px rgba(174, 190, 255, 0.018);
          content: "";
          pointer-events: none;
        }

        .si-approach .si-eyebrow {
          color: #b7b5ff;
        }

        .si-approach .si-eyebrow::before {
          background: linear-gradient(
            90deg,
            #9290ff,
            var(--si-cyan)
          );
        }

        .si-approach .si-section-title {
          color: #fff;
        }

        .si-approach .si-section-description {
          color: #bac4dc;
        }

        .si-approach-title-highlight {
          background: linear-gradient(
            100deg,
            #b6b4ff,
            #76e8f3
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #b6b4ff;
        }

        .si-approach-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
          gap: 15px;
          margin-top: 30px;
        }

        .si-approach-card {
          position: relative;
          display: flex;
          min-width: 0;
          min-height: 248px;
          flex-direction: column;
          padding: clamp(20px, 2.5vw, 28px);
          overflow: hidden;
          border: 1px solid rgba(174, 190, 255, 0.15);
          border-radius: 20px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.07),
            rgba(255, 255, 255, 0.025)
          );
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
          transition:
            transform 280ms ease,
            border-color 280ms ease,
            background 280ms ease,
            box-shadow 280ms ease;
        }

        .si-approach-card:hover {
          transform: translateY(-5px);
          border-color: rgba(133, 132, 255, 0.4);
          background: linear-gradient(
            145deg,
            rgba(104, 105, 245, 0.13),
            rgba(255, 255, 255, 0.04)
          );
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
        }

        .si-approach-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .si-approach-number {
          color: #a6a4ff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .si-approach-icon {
          display: grid;
          width: 50px;
          height: 50px;
          flex: 0 0 50px;
          place-items: center;
          border: 1px solid rgba(174, 190, 255, 0.17);
          border-radius: 15px;
          background: linear-gradient(
            145deg,
            rgba(123, 118, 255, 0.17),
            rgba(71, 212, 232, 0.09)
          );
          color: #b9b7ff;
          transition:
            transform 280ms ease,
            border-color 280ms ease;
        }

        .si-approach-icon svg {
          width: 23px;
          height: 23px;
        }

        .si-approach-card:hover .si-approach-icon {
          transform: translateY(-2px) rotate(-3deg);
          border-color: rgba(83, 222, 236, 0.4);
        }

        .si-approach-card h3 {
          margin: 20px 0 0;
          color: #fff;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.45;
          overflow-wrap: anywhere;
        }

        .si-approach-card p {
          margin: 9px 0 0;
          color: #b5c0d9;
          font-size: 12px;
          line-height: 1.85;
          overflow-wrap: anywhere;
        }

        .si-approach-points {
          display: grid;
          gap: 7px;
          margin: auto 0 0;
          padding: 17px 0 0;
          list-style: none;
        }

        .si-approach-points li {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          color: #d3daf0;
          font-size: 10px;
          line-height: 1.6;
        }

        .si-approach-points svg {
          width: 14px;
          height: 14px;
          flex: 0 0 auto;
          margin-top: 1px;
          color: var(--si-cyan);
        }

        /* =====================================
           CTA AREA SPACING
        ===================================== */

        .si-final-cta {
          width: 100%;
          margin: 0;
        }

        /* =====================================
           RESPONSIVE: TABLET
        ===================================== */

        @media (max-width: 1050px) {
          .si-industry-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .si-industry-card {
            min-height: 240px;
          }

          .si-approach-grid {
            gap: 12px;
          }

          .si-approach-card {
            min-height: 260px;
            padding: 20px;
          }
        }

        @media (max-width: 720px) {
          .si-directory {
            padding-block: 38px 42px;
          }

          .si-directory-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 20px;
          }

          .si-directory-count {
            padding: 8px 10px;
          }

          .si-industry-title {
            margin-top: 17px;
          }

          .si-approach {
            padding-block: 42px 46px;
          }

          .si-approach-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 11px;
            margin-top: 23px;
          }

          .si-approach-card {
            display: grid;
            grid-template-columns: 46px minmax(0, 1fr);
            min-height: 0;
            gap: 0 13px;
            padding: 17px 15px;
            border-radius: 16px;
          }

          .si-approach-card-top {
            grid-column: 1 / -1;
          }

          .si-approach-icon {
            grid-column: 1;
            grid-row: 2 / span 3;
            width: 43px;
            height: 43px;
            margin-top: 13px;
            border-radius: 13px;
          }

          .si-approach-icon svg {
            width: 20px;
            height: 20px;
          }

          .si-approach-card h3 {
            grid-column: 2;
            align-self: end;
            margin-top: 13px;
            font-size: 15px;
          }

          .si-approach-card p {
            grid-column: 2;
            margin-top: 6px;
            font-size: 11px;
          }

          .si-approach-points {
            grid-column: 2;
            gap: 5px;
            padding-top: 10px;
          }
        }

        /* =====================================
           RESPONSIVE: MOBILE
        ===================================== */

        @media (max-width: 540px) {
          .si-container {
            width: calc(100% - 32px);
          }

          .si-section-title {
            margin-top: 12px;
            font-size: clamp(28px, 7.5vw, 36px);
          }

          .si-section-description {
            margin-top: 10px;
            font-size: 12px;
            line-height: 1.8;
          }

          .si-directory {
            padding-block: 32px 36px;
          }

          .si-directory-title {
            margin-top: 9px;
            font-size: clamp(25px, 6.8vw, 33px);
          }

          .si-directory-description {
            margin-top: 8px;
            font-size: 12px;
          }

          .si-directory-head {
            gap: 13px;
            margin-bottom: 17px;
          }

          .si-industry-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 11px;
          }

          .si-industry-card {
            min-height: 0;
            padding: 19px;
            border-radius: 18px;
          }

          .si-industry-icon {
            width: 49px;
            height: 49px;
            flex-basis: 49px;
            border-radius: 14px;
          }

          .si-industry-title {
            margin-top: 15px;
            font-size: 17px;
          }

          .si-industry-description {
            margin-top: 7px;
            font-size: 12px;
            line-height: 1.8;
          }

          .si-industry-focus-label {
            margin-top: 14px;
            margin-bottom: 7px;
          }

          .si-industry-focus {
            gap: 6px;
            padding-top: 8px;
          }

          .si-industry-tag {
            padding: 6px 8px;
            font-size: 9px;
          }

          .si-approach {
            padding-block: 36px 40px;
          }

          .si-approach-grid {
            margin-top: 20px;
          }

          .si-approach-card {
            padding: 15px 13px;
          }

          .si-approach-card h3 {
            font-size: 14px;
          }

          .si-approach-card p {
            font-size: 11px;
          }
        }

        @media (max-width: 360px) {
          .si-container {
            width: calc(100% - 28px);
          }

          .si-industry-card {
            padding: 16px;
          }

          .si-approach-card {
            grid-template-columns: 41px minmax(0, 1fr);
            column-gap: 10px;
            padding: 13px 11px;
          }

          .si-approach-icon {
            width: 38px;
            height: 38px;
          }
        }

        /* =====================================
           ACCESSIBILITY
        ===================================== */

        @media (prefers-reduced-motion: reduce) {
          .sh-industries-page *,
          .sh-industries-page *::before,
          .sh-industries-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* =====================================
          1. HERO
      ===================================== */}

      <PageHero
        eyebrow="Industries"
        title="Technology shaped around how your sector works."
        lead="Every sector has its own pressures — regulation, uptime, scale or safety. Our services are designed to adapt to them."
        image={industryFeatureImage}
      />

      {/* =====================================
          2. INDUSTRY DIRECTORY
      ===================================== */}

      <section
        className="si-directory"
        aria-labelledby="si-directory-title"
      >
        <div className="si-container">
          <Reveal className="si-directory-head">
            <div className="si-directory-intro">
              <span className="si-eyebrow">
                Industry expertise
              </span>

              <h2
                className="si-directory-title"
                id="si-directory-title"
              >
                Solutions for your{" "}
                <span className="si-gradient-text">
                  business environment.
                </span>
              </h2>

              <p className="si-directory-description">
                Explore the industries we support and the
                operational priorities that can shape technology
                decisions in each sector.
              </p>
            </div>

            <div className="si-directory-count">
              <Layers3 aria-hidden="true" />
              {industryList.length}{" "}
              {industryList.length === 1 ? "industry" : "industries"}
            </div>
          </Reveal>

          {industryList.length > 0 ? (
            <div className="si-industry-grid">
              {industryList.map((industry, index) => (
                <motion.article
                  key={industry.slug}
                  id={industry.slug}
                  className="si-industry-card"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 20 }
                  }
                  whileInView={
                    reduceMotion
                      ? undefined
                      : { opacity: 1, y: 0 }
                  }
                  viewport={{
                    once: true,
                    amount: 0.12,
                  }}
                  transition={{
                    duration: 0.48,
                    delay: reduceMotion ? 0 : (index % 3) * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="si-industry-card-top">
                    <span className="si-industry-icon">
                      <ThreeDIcon
                        type={industry.icon}
                        size={49}
                      />
                    </span>

                    <span className="si-industry-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="si-industry-title">
                    {industry.title}
                  </h3>

                  <p className="si-industry-description">
                    {industry.body}
                  </p>

                  {Array.isArray(industry.focus) &&
                    industry.focus.length > 0 && (
                      <>
                        <p className="si-industry-focus-label">
                          Areas of focus
                        </p>

                        <div className="si-industry-focus">
                          {industry.focus.map((focusItem) => (
                            <span
                              key={focusItem}
                              className="si-industry-tag"
                            >
                              <CheckCircle2 aria-hidden="true" />
                              {focusItem}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                </motion.article>
              ))}
            </div>
          ) : (
            <p className="si-empty-state">
              Industry information is currently unavailable.
              Please check the industries data in your project.
            </p>
          )}
        </div>
      </section>

      {/* =====================================
          3. OUR SECTOR-FIRST APPROACH
          New supporting section
      ===================================== */}

      <section
        className="si-approach"
        aria-labelledby="si-approach-title"
      >
        <div className="si-container">
          <Reveal className="si-section-heading">
            <span className="si-eyebrow">
              Our sector-first approach
            </span>

            <h2
              className="si-section-title"
              id="si-approach-title"
            >
              The right technology starts with{" "}
              <span className="si-approach-title-highlight">
                the right context.
              </span>
            </h2>

            <p className="si-section-description">
              Effective technology choices start with understanding
              the operating environment, identifying priorities and
              selecting an approach that fits the actual need.
            </p>
          </Reveal>

          <div className="si-approach-grid">
            {industryApproach.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  className="si-approach-card"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 20 }
                  }
                  whileInView={
                    reduceMotion
                      ? undefined
                      : { opacity: 1, y: 0 }
                  }
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="si-approach-card-top">
                    <span className="si-approach-number">
                      PRINCIPLE {item.number}
                    </span>

                    <span className="si-approach-icon">
                      <Icon aria-hidden="true" />
                    </span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <ul className="si-approach-points">
                    {item.points.map((point) => (
                      <li key={point}>
                        <CheckCircle2 aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================
          4. FINAL CTA
      ===================================== */}

      <div className="si-final-cta">
        <CtaBand
          title="Don't see your industry?"
          body="Our practices can apply across different sectors. Tell us about your environment and we'll be candid about fit."
        />
      </div>
    </main>
  );
}

export default Industries;
