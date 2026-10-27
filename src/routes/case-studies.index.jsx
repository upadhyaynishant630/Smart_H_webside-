import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Layers3,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import {
  CtaBand,
  PageHero,
  Reveal,
} from "@/components/ui/brand";
import { CaseStudyCard } from "@/components/ui/cards";
import { caseStudies } from "@/data/content";
import secure from "@/assets/hero/hero-secure.jpg";
import { cn } from "@/lib/utils";

/* =======================================================
   ROUTE META
======================================================= */

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — Smart H" },
      {
        name: "description",
        content:
          "Explore illustrative Smart H case studies showing how structured thinking, technology and thoughtful execution can address cloud, data and security challenges.",
      },
      {
        property: "og:title",
        content: "Case Studies — Smart H",
      },
      {
        property: "og:description",
        content:
          "Explore project scenarios and the thinking behind Smart H's approach to digital challenges.",
      },
    ],
  }),
  component: CaseStudies,
});

/* =======================================================
   SAFE DATA
======================================================= */

const SAFE_CASE_STUDIES = Array.isArray(caseStudies)
  ? caseStudies.filter(Boolean)
  : [];

const CASE_CATEGORIES = [
  "All",
  ...new Set(
    SAFE_CASE_STUDIES.map((study) => study.category).filter(
      (category) =>
        typeof category === "string" && category.trim().length > 0,
    ),
  ),
];

/* =======================================================
   ADDITIONAL SECTION DATA
======================================================= */

const APPROACH_STEPS = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Understand the challenge",
    description:
      "We start by understanding the context, existing constraints, goals and the people affected by the problem.",
    icon: Compass,
    accent: "violet",
  },
  {
    number: "02",
    title: "Define",
    subtitle: "Shape the right approach",
    description:
      "We identify priorities, outline possible solutions and develop a practical direction aligned with the objective.",
    icon: Workflow,
    accent: "cyan",
  },
  {
    number: "03",
    title: "Build",
    subtitle: "Create with intention",
    description:
      "We translate the plan into a considered solution, focusing on usability, quality, security and maintainability.",
    icon: Layers3,
    accent: "blue",
  },
  {
    number: "04",
    title: "Improve",
    subtitle: "Refine for the future",
    description:
      "We review the outcome, identify opportunities to improve and plan sensible next steps based on available evidence.",
    icon: ShieldCheck,
    accent: "mint",
  },
];

/* =======================================================
   MAIN PAGE
======================================================= */

function CaseStudies() {
  const [active, setActive] = useState("All");
  const reduceMotion = useReducedMotion();

  const filteredStudies =
    active === "All"
      ? SAFE_CASE_STUDIES
      : SAFE_CASE_STUDIES.filter(
          (study) => study.category === active,
        );

  return (
    <main className="sh-case-studies-page">
      <style>{`
        /* =================================================
           SMART H CASE STUDIES — DESIGN SYSTEM
        ================================================= */

        .sh-case-studies-page {
          --cs-ink: #101a36;
          --cs-ink-light: #182447;
          --cs-blue: #243ec8;
          --cs-violet: #7775ff;
          --cs-cyan: #42d5e8;
          --cs-mint: #80f0d1;
          --cs-text: #4f5870;
          --cs-muted: #7c849a;
          --cs-line: rgba(16, 26, 54, 0.10);
          --cs-surface: #f5f7fc;
          --cs-white: #ffffff;

          position: relative;
          width: 100%;
          min-width: 0;
          overflow: clip;

          color: var(--cs-ink);
          background: #ffffff;
        }

        .sh-case-studies-page *,
        .sh-case-studies-page *::before,
        .sh-case-studies-page *::after {
          box-sizing: border-box;
        }

        .sh-case-studies-page a {
          text-decoration: none;
        }

        .sh-case-studies-page button {
          font: inherit;
        }

        .sh-case-studies-page button:focus-visible,
        .sh-case-studies-page a:focus-visible {
          outline: 3px solid var(--cs-cyan);
          outline-offset: 4px;
        }

        .sh-cs-layout {
          width: min(1240px, calc(100% - 64px));
          margin-inline: auto;
        }

        /* =================================================
           INTRO / FILTER SECTION
        ================================================= */

        .sh-cs-listing {
          position: relative;
          padding-top: clamp(60px, 7.5vw, 96px);
          padding-bottom: clamp(72px, 8vw, 112px);

          background:
            radial-gradient(
              ellipse at 4% 10%,
              rgba(119, 117, 255, 0.055),
              transparent 28%
            ),
            #ffffff;
        }

        .sh-cs-listing::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;

          width: min(1180px, calc(100% - 64px));
          height: 1px;

          transform: translateX(-50%);

          background: linear-gradient(
            90deg,
            transparent,
            rgba(16, 26, 54, 0.11),
            transparent
          );

          pointer-events: none;
        }

        .sh-cs-intro-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;

          margin-bottom: 36px;
        }

        .sh-cs-heading {
          max-width: 720px;
        }

        .sh-cs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          margin-bottom: 17px;

          color: var(--cs-blue);
          font-size: 11px;
          font-weight: 750;
          line-height: 1.4;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .sh-cs-eyebrow::before {
          content: "";
          width: 22px;
          height: 2px;
          border-radius: 99px;

          background: linear-gradient(
            90deg,
            var(--cs-blue),
            var(--cs-cyan)
          );
        }

        .sh-cs-heading h2 {
          margin: 0;

          color: var(--cs-ink);
          font-size: clamp(30px, 4.1vw, 49px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.055em;
          text-wrap: balance;
        }

        .sh-cs-heading h2 span {
          color: var(--cs-blue);
        }

        .sh-cs-heading > p {
          max-width: 630px;
          margin: 17px 0 0;

          color: var(--cs-text);
          font-size: 15px;
          line-height: 1.85;
        }

        .sh-cs-count {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 13px;

          padding: 15px 18px;

          border: 1px solid rgba(16, 26, 54, 0.08);
          border-radius: 17px;

          background: rgba(255, 255, 255, 0.8);

          box-shadow:
            0 7px 24px rgba(16, 26, 54, 0.035),
            inset 0 1px 0 #ffffff;
        }

        .sh-cs-count-icon {
          display: grid;
          place-items: center;
          flex-shrink: 0;

          width: 40px;
          height: 40px;

          border: 1px solid rgba(119, 117, 255, 0.12);
          border-radius: 12px;

          color: var(--cs-blue);
          background: #f1f2ff;
        }

        .sh-cs-count-copy {
          display: grid;
          gap: 3px;
        }

        .sh-cs-count-number {
          color: var(--cs-ink);
          font-size: 21px;
          font-weight: 750;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        .sh-cs-count-label {
          color: var(--cs-muted);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        /* =================================================
           FILTER TOOLBAR
        ================================================= */

        .sh-cs-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;

          padding: 18px 0 20px;
          margin-bottom: 27px;

          border-top: 1px solid var(--cs-line);
          border-bottom: 1px solid var(--cs-line);
        }

        .sh-cs-filter-heading {
          display: flex;
          align-items: center;
          gap: 9px;
          flex: 0 0 auto;

          color: var(--cs-ink);
          font-size: 12px;
          font-weight: 700;
        }

        .sh-cs-filter-heading svg {
          color: var(--cs-blue);
        }

        .sh-cs-filters {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 8px;
        }

        .sh-cs-filter {
          position: relative;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          min-height: 39px;
          padding: 9px 16px;

          border: 1px solid rgba(16, 26, 54, 0.11);
          border-radius: 100px;

          color: #535d76;
          background: #ffffff;

          font-size: 11px;
          font-weight: 650;
          line-height: 1.2;
          white-space: nowrap;

          cursor: pointer;

          transition:
            background 200ms ease,
            border-color 200ms ease,
            color 200ms ease,
            box-shadow 200ms ease,
            transform 200ms ease;
        }

        .sh-cs-filter:hover {
          transform: translateY(-1px);

          border-color: rgba(36, 62, 200, 0.32);
          color: var(--cs-blue);
          background: #f8f9ff;
        }

        .sh-cs-filter.is-active {
          border-color: var(--cs-ink);
          color: #ffffff;
          background: var(--cs-ink);

          box-shadow: 0 5px 14px rgba(16, 26, 54, 0.12);
        }

        .sh-cs-filter.is-active:hover {
          color: #ffffff;
          background: #1a2a55;
        }

        .sh-cs-filter-dot {
          width: 6px;
          height: 6px;
          flex-shrink: 0;

          border-radius: 100px;
          background: var(--cs-cyan);
        }

        /* =================================================
           CASE STUDY CARD GRID
        ================================================= */

        .sh-cs-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
          gap: 25px;
        }

        .sh-cs-card-shell {
          position: relative;
          display: flex;
          min-width: 0;

          transform: translateZ(0);

          transition:
            transform 260ms ease,
            filter 260ms ease;
        }

        .sh-cs-card-shell:hover {
          transform: translateY(-5px);
        }

        .sh-cs-card-shell > * {
          width: 100%;
          min-width: 0;
        }

        .sh-cs-card-shell a:focus-visible {
          border-radius: 18px;
        }

        /* =================================================
           EMPTY STATE
        ================================================= */

        .sh-cs-empty {
          grid-column: 1 / -1;

          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;

          min-height: 280px;
          padding: 38px 24px;

          border: 1px dashed rgba(16, 26, 54, 0.19);
          border-radius: 22px;

          text-align: center;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(119, 117, 255, 0.07),
              transparent 60%
            ),
            #fbfcff;
        }

        .sh-cs-empty-icon {
          display: grid;
          place-items: center;

          width: 56px;
          height: 56px;
          margin-bottom: 17px;

          border: 1px solid rgba(119, 117, 255, 0.16);
          border-radius: 17px;

          color: var(--cs-blue);
          background: #eff1ff;
        }

        .sh-cs-empty h3 {
          margin: 0;

          color: var(--cs-ink);
          font-size: 21px;
          font-weight: 700;
          letter-spacing: -0.035em;
        }

        .sh-cs-empty p {
          max-width: 440px;
          margin: 10px 0 20px;

          color: var(--cs-text);
          font-size: 13px;
          line-height: 1.8;
        }

        .sh-cs-reset {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          min-height: 42px;
          padding: 11px 16px;

          border: 0;
          border-radius: 999px;

          color: #ffffff;
          background: var(--cs-ink);

          font-size: 12px;
          font-weight: 650;

          cursor: pointer;

          transition:
            background 180ms ease,
            transform 180ms ease;
        }

        .sh-cs-reset:hover {
          transform: translateY(-2px);
          background: var(--cs-blue);
        }

        /* =================================================
           HONESTY / CONTEXT NOTE
        ================================================= */

        .sh-cs-note {
          display: flex;
          align-items: flex-start;
          gap: 12px;

          margin-top: 35px;
          padding: 17px 19px;

          border: 1px solid rgba(36, 62, 200, 0.10);
          border-radius: 14px;

          color: #475371;
          background: rgba(245, 247, 252, 0.9);
        }

        .sh-cs-note-icon {
          display: grid;
          place-items: center;
          flex-shrink: 0;

          width: 30px;
          height: 30px;

          border-radius: 10px;

          color: var(--cs-blue);
          background: #e9edff;
        }

        .sh-cs-note p {
          margin: 0;

          font-size: 11px;
          line-height: 1.85;
        }

        .sh-cs-note strong {
          color: var(--cs-ink);
          font-weight: 750;
        }

        /* =================================================
           NEW SECTION — OUR APPROACH
        ================================================= */

        .sh-cs-approach {
          position: relative;
          isolation: isolate;

          padding: clamp(74px, 9vw, 118px) 0;

          overflow: hidden;

          color: #ffffff;

          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(119, 117, 255, 0.17),
              transparent 39%
            ),
            radial-gradient(
              ellipse at 100% 95%,
              rgba(66, 213, 232, 0.10),
              transparent 37%
            ),
            #101a36;
        }

        .sh-cs-approach::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.023) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.023) 1px,
              transparent 1px
            );

          background-size: 48px 48px;

          mask-image: linear-gradient(
            to bottom,
            transparent,
            #000 18%,
            #000 80%,
            transparent
          );

          pointer-events: none;
        }

        .sh-cs-approach-orb {
          position: absolute;
          z-index: -1;

          width: 390px;
          height: 390px;

          border-radius: 50%;

          background: rgba(119, 117, 255, 0.09);
          filter: blur(75px);

          pointer-events: none;
        }

        .sh-cs-approach-orb.one {
          top: -220px;
          right: 12%;
        }

        .sh-cs-approach-orb.two {
          bottom: -270px;
          left: 12%;

          background: rgba(66, 213, 232, 0.07);
        }

        .sh-cs-approach-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(240px, 390px);
          align-items: end;
          gap: 38px;

          margin-bottom: 48px;
        }

        .sh-cs-approach .sh-cs-eyebrow {
          color: var(--cs-cyan);
        }

        .sh-cs-approach .sh-cs-eyebrow::before {
          background: linear-gradient(
            90deg,
            var(--cs-cyan),
            var(--cs-violet)
          );
        }

        .sh-cs-approach-title {
          max-width: 690px;
          margin: 0;

          color: #ffffff;

          font-size: clamp(31px, 4.3vw, 52px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.055em;
          text-wrap: balance;
        }

        .sh-cs-approach-title span {
          color: var(--cs-cyan);
        }

        .sh-cs-approach-lead {
          max-width: 390px;
          margin: 0 0 4px;

          color: #b4bfd9;
          font-size: 13px;
          line-height: 1.9;
        }

        .sh-cs-steps {
          position: relative;

          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .sh-cs-step {
          position: relative;
          min-width: 0;
          min-height: 294px;

          display: flex;
          flex-direction: column;

          padding: 23px 21px 22px;

          border: 1px solid rgba(190, 204, 255, 0.13);
          border-radius: 18px;

          background: rgba(255, 255, 255, 0.035);

          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);

          transition:
            background 250ms ease,
            border-color 250ms ease,
            transform 250ms ease,
            box-shadow 250ms ease;
        }

        .sh-cs-step:hover {
          transform: translateY(-6px);

          border-color: rgba(83, 222, 236, 0.38);
          background: rgba(255, 255, 255, 0.065);

          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.14);
        }

        .sh-cs-step-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;

          margin-bottom: 27px;
        }

        .sh-cs-step-number {
          color: #9ca8c7;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.13em;
          font-variant-numeric: tabular-nums;
        }

        .sh-cs-step-icon {
          display: grid;
          place-items: center;

          width: 46px;
          height: 46px;

          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 14px;

          transition:
            transform 250ms ease,
            border-color 250ms ease,
            background 250ms ease;
        }

        .sh-cs-step:hover .sh-cs-step-icon {
          transform: rotate(-4deg) scale(1.04);
          border-color: rgba(83, 222, 236, 0.36);
        }

        .sh-cs-step[data-accent="violet"] .sh-cs-step-icon {
          color: #aaa5ff;
          background: rgba(119, 117, 255, 0.13);
        }

        .sh-cs-step[data-accent="cyan"] .sh-cs-step-icon {
          color: #75e6f2;
          background: rgba(66, 213, 232, 0.10);
        }

        .sh-cs-step[data-accent="blue"] .sh-cs-step-icon {
          color: #99b8ff;
          background: rgba(91, 132, 255, 0.12);
        }

        .sh-cs-step[data-accent="mint"] .sh-cs-step-icon {
          color: var(--cs-mint);
          background: rgba(128, 240, 209, 0.10);
        }

        .sh-cs-step h3 {
          margin: 0;

          color: #ffffff;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.045em;
        }

        .sh-cs-step-subtitle {
          display: block;
          margin-top: 8px;

          color: var(--cs-cyan);
          font-size: 11px;
          font-weight: 650;
          line-height: 1.6;
        }

        .sh-cs-step-description {
          margin: 15px 0 0;

          color: #aeb9d5;
          font-size: 12px;
          line-height: 1.85;
        }

        .sh-cs-approach-bottom {
          display: flex;
          align-items: center;
          gap: 12px;

          margin-top: 30px;
          padding-top: 24px;

          border-top: 1px solid rgba(190, 204, 255, 0.12);

          color: #aeb9d5;
          font-size: 11px;
          line-height: 1.8;
        }

        .sh-cs-approach-bottom svg {
          flex: 0 0 auto;
          color: var(--cs-cyan);
        }

        /* =================================================
           RESPONSIVE — LAPTOP
        ================================================= */

        @media (max-width: 1100px) {
          .sh-cs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px;
          }

          .sh-cs-intro-row {
            align-items: flex-start;
          }

          .sh-cs-toolbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .sh-cs-filters {
            justify-content: flex-start;
          }

          .sh-cs-steps {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .sh-cs-step {
            min-height: 260px;
          }
        }

        /* =================================================
           RESPONSIVE — TABLET
        ================================================= */

        @media (max-width: 760px) {
          .sh-cs-layout {
            width: calc(100% - 40px);
          }

          .sh-cs-listing {
            padding-top: 60px;
            padding-bottom: 74px;
          }

          .sh-cs-listing::before {
            width: calc(100% - 40px);
          }

          .sh-cs-intro-row {
            flex-direction: column;
            gap: 23px;
            margin-bottom: 28px;
          }

          .sh-cs-heading {
            max-width: 100%;
          }

          .sh-cs-heading h2 {
            font-size: clamp(31px, 6.2vw, 43px);
          }

          .sh-cs-heading > p {
            margin-top: 13px;
            font-size: 13px;
            line-height: 1.8;
          }

          .sh-cs-count {
            padding: 11px 14px;
          }

          .sh-cs-count-icon {
            width: 36px;
            height: 36px;
          }

          .sh-cs-toolbar {
            gap: 15px;
            margin-bottom: 22px;
            padding: 16px 0;
          }

          .sh-cs-filters {
            gap: 7px;
            width: 100%;
          }

          .sh-cs-filter {
            min-height: 37px;
            padding: 9px 13px;
            font-size: 10px;
          }

          .sh-cs-grid {
            gap: 17px;
          }

          .sh-cs-approach {
            padding: 72px 0;
          }

          .sh-cs-approach-header {
            grid-template-columns: minmax(0, 1fr);
            gap: 17px;
            margin-bottom: 32px;
          }

          .sh-cs-approach-lead {
            max-width: 600px;
          }

          .sh-cs-step {
            padding: 20px;
          }

          .sh-cs-note {
            margin-top: 26px;
            padding: 15px;
          }
        }

        /* =================================================
           RESPONSIVE — MOBILE
        ================================================= */

        @media (max-width: 540px) {
          .sh-cs-layout {
            width: calc(100% - 32px);
          }

          .sh-cs-listing {
            padding-top: 49px;
            padding-bottom: 58px;
          }

          .sh-cs-listing::before {
            width: calc(100% - 32px);
          }

          .sh-cs-eyebrow {
            margin-bottom: 13px;
            font-size: 10px;
            letter-spacing: 0.13em;
          }

          .sh-cs-heading h2 {
            font-size: clamp(29px, 8vw, 38px);
            line-height: 1.12;
          }

          .sh-cs-heading > p {
            font-size: 12px;
          }

          .sh-cs-count {
            gap: 11px;
          }

          .sh-cs-toolbar {
            gap: 13px;
            padding: 15px 0;
          }

          .sh-cs-filter-heading {
            font-size: 11px;
          }

          .sh-cs-filters {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;

            width: calc(100% + 16px);
            padding: 1px 16px 8px 1px;

            overflow-x: auto;
            overscroll-behavior-x: contain;
            scrollbar-width: thin;
            scrollbar-color: rgba(36, 62, 200, 0.23) transparent;
          }

          .sh-cs-filter {
            flex-shrink: 0;
            min-height: 36px;
            padding: 9px 13px;
          }

          .sh-cs-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 21px;
          }

          .sh-cs-card-shell:hover {
            transform: translateY(-2px);
          }

          .sh-cs-note {
            gap: 10px;
            padding: 13px;
            border-radius: 12px;
          }

          .sh-cs-note p {
            font-size: 10px;
          }

          .sh-cs-note-icon {
            width: 27px;
            height: 27px;
          }

          .sh-cs-approach {
            padding: 59px 0;
          }

          .sh-cs-approach-title {
            font-size: clamp(30px, 8vw, 38px);
            line-height: 1.12;
          }

          .sh-cs-approach-lead {
            font-size: 12px;
            line-height: 1.85;
          }

          .sh-cs-steps {
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
          }

          .sh-cs-step {
            min-height: auto;
            padding: 20px;
          }

          .sh-cs-step-top {
            margin-bottom: 18px;
          }

          .sh-cs-step h3 {
            font-size: 21px;
          }

          .sh-cs-step-description {
            max-width: 450px;
            margin-top: 11px;
          }

          .sh-cs-approach-bottom {
            align-items: flex-start;
            margin-top: 23px;
            padding-top: 20px;
          }

          .sh-cs-approach-orb {
            width: 240px;
            height: 240px;
            filter: blur(55px);
          }
        }

        /* =================================================
           SMALL MOBILE
        ================================================= */

        @media (max-width: 360px) {
          .sh-cs-layout {
            width: calc(100% - 26px);
          }

          .sh-cs-heading h2,
          .sh-cs-approach-title {
            font-size: 29px;
          }

          .sh-cs-filter {
            padding-inline: 11px;
            font-size: 10px;
          }

          .sh-cs-step {
            padding: 17px;
          }
        }

        /* =================================================
           ACCESSIBILITY
        ================================================= */

        @media (prefers-reduced-motion: reduce) {
          .sh-case-studies-page *,
          .sh-case-studies-page *::before,
          .sh-case-studies-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ===================================================
          1. HERO
      =================================================== */}

      <PageHero
        eyebrow="Case studies"
        title="How engagements take shape."
        lead="Explore illustrative scenarios that show how Smart H approaches complex digital challenges. Each scenario highlights the thinking, process and decisions behind a considered solution."
        image={secure}
      />

      {/* ===================================================
          2. CASE STUDIES + FILTERS
      =================================================== */}

      <section
        className="sh-cs-listing"
        aria-labelledby="sh-cs-listing-title"
      >
        <div className="sh-cs-layout">
          <Reveal>
            <div className="sh-cs-intro-row">
              <div className="sh-cs-heading">
                <span className="sh-cs-eyebrow">
                  Selected scenarios
                </span>

                <h2 id="sh-cs-listing-title">
                  Thoughtful work.
                  <br />
                  <span>Purposeful solutions.</span>
                </h2>

                <p>
                  Every challenge has its own context. Explore
                  the scenarios below to see how structured
                  thinking, technology and practical execution
                  can come together.
                </p>
              </div>

              <motion.div
                className="sh-cs-count"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 14 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="sh-cs-count-icon">
                  <Layers3 size={20} aria-hidden="true" />
                </span>

                <span className="sh-cs-count-copy">
                  <span className="sh-cs-count-number">
                    {filteredStudies.length
                      .toString()
                      .padStart(2, "0")}
                  </span>

                  <span className="sh-cs-count-label">
                    {filteredStudies.length === 1
                      ? "Scenario"
                      : "Scenarios"}
                  </span>
                </span>
              </motion.div>
            </div>
          </Reveal>

          {/* FILTER TOOLBAR */}

          <Reveal delay={0.06}>
            <div className="sh-cs-toolbar">
              <div className="sh-cs-filter-heading">
                <Sparkles
                  size={16}
                  aria-hidden="true"
                />
                <span>Explore by focus area</span>
              </div>

              <div
                className="sh-cs-filters"
                role="group"
                aria-label="Filter case studies by category"
              >
                {CASE_CATEGORIES.map((category) => {
                  const isActive = active === category;

                  return (
                    <motion.button
                      key={category}
                      type="button"
                      aria-pressed={isActive}
                      className={cn(
                        "sh-cs-filter",
                        isActive && "is-active",
                      )}
                      onClick={() => setActive(category)}
                      whileTap={
                        reduceMotion
                          ? undefined
                          : { scale: 0.96 }
                      }
                      transition={{
                        duration: reduceMotion ? 0 : 0.15,
                      }}
                    >
                      {isActive && (
                        <span
                          className="sh-cs-filter-dot"
                          aria-hidden="true"
                        />
                      )}

                      {category}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* CARD GRID */}

          <div
            className="sh-cs-grid"
            aria-live="polite"
            aria-busy="false"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={
                    study.slug ||
                    `${study.category || "scenario"}-${index}`
                  }
                  className="sh-cs-card-shell"
                  layout
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 9,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.32,
                    delay: reduceMotion
                      ? 0
                      : Math.min(index * 0.045, 0.18),
                    ease: [0.22, 1, 0.36, 1],
                    layout: {
                      duration: reduceMotion ? 0 : 0.25,
                    },
                  }}
                >
                  <Reveal
                    delay={
                      reduceMotion
                        ? 0
                        : Math.min(index * 0.035, 0.14)
                    }
                  >
                    <CaseStudyCard study={study} />
                  </Reveal>
                </motion.div>
              ))}

              {filteredStudies.length === 0 && (
                <motion.div
                  key="empty-state"
                  className="sh-cs-empty"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 8,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                  }}
                >
                  <span className="sh-cs-empty-icon">
                    <Layers3
                      size={25}
                      aria-hidden="true"
                    />
                  </span>

                  <h3>No scenarios in this view</h3>

                  <p>
                    There are currently no case studies in this
                    category. Explore all available scenarios
                    instead.
                  </p>

                  <button
                    type="button"
                    className="sh-cs-reset"
                    onClick={() => setActive("All")}
                  >
                    View all scenarios
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                    />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TRANSPARENT CONTEXT NOTE */}

          <Reveal delay={0.08}>
            <aside className="sh-cs-note">
              <span className="sh-cs-note-icon">
                <CheckCircle2
                  size={17}
                  aria-hidden="true"
                />
              </span>

              <p>
                <strong>A note on these scenarios:</strong>{" "}
                The examples on this page are illustrative
                engagement scenarios. They do not represent
                verified client engagements, named client
                endorsements or guaranteed business outcomes.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ===================================================
          3. NEW SECTION — OUR APPROACH
      =================================================== */}

      <section
        className="sh-cs-approach"
        aria-labelledby="sh-cs-approach-title"
      >
        <div
          className="sh-cs-approach-orb one"
          aria-hidden="true"
        />

        <div
          className="sh-cs-approach-orb two"
          aria-hidden="true"
        />

        <div className="sh-cs-layout">
          <Reveal>
            <div className="sh-cs-approach-header">
              <div>
                <span className="sh-cs-eyebrow">
                  The Smart H approach
                </span>

                <h2
                  id="sh-cs-approach-title"
                  className="sh-cs-approach-title"
                >
                  Clarity first.
                  <br />
                  <span>Progress by design.</span>
                </h2>
              </div>

              <p className="sh-cs-approach-lead">
                Strong solutions begin with understanding the
                problem. Our approach connects discovery,
                deliberate planning, thoughtful implementation
                and continuous improvement.
              </p>
            </div>
          </Reveal>

          <div className="sh-cs-steps">
            {APPROACH_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  className="sh-cs-step"
                  data-accent={step.accent}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 24,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.18,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.48,
                    delay: reduceMotion
                      ? 0
                      : index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="sh-cs-step-top">
                    <span className="sh-cs-step-number">
                      STEP / {step.number}
                    </span>

                    <span className="sh-cs-step-icon">
                      <Icon
                        size={22}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <h3>{step.title}</h3>

                  <span className="sh-cs-step-subtitle">
                    {step.subtitle}
                  </span>

                  <p className="sh-cs-step-description">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="sh-cs-approach-bottom">
              <CheckCircle2
                size={18}
                aria-hidden="true"
              />

              <span>
                A considered process keeps the focus on the
                problem, the people involved and the value the
                solution is intended to deliver.
              </span>

              <ArrowDownRight
                size={17}
                aria-hidden="true"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================
          4. EXISTING CTA
      =================================================== */}

      <CtaBand />
    </main>
  );
}