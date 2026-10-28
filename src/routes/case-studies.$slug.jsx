import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Lightbulb,
  ListChecks,
  ShieldCheck,
  Target,
  Workflow,
  Info,
  Layers3,
} from "lucide-react";

import {
  ButtonLink,
  CtaBand,
  PageHero,
  Reveal,
  SectionHeading,
} from "@/components/ui/brand";

import { CaseStudyCard } from "@/components/ui/cards";
import { caseStudies, getCaseStudy } from "@/data/content";

/* =======================================================
   ROUTE + SEO
======================================================= */

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);

    if (!study) {
      throw notFound();
    }

    return { study };
  },

  head: ({ loaderData }) => {
    const study = loaderData?.study;

    const title = study
      ? `${study.title} — SmartEDGE`
      : "Case Study — SmartEDGE";

    const description =
      study?.summary ||
      "Explore the thinking, approach and solutions behind a SmartEDGE case study.";

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "article",
        },
      ],
    };
  },

  component: CaseStudyDetail,
});

/* =======================================================
   HELPERS
======================================================= */

const safeText = (value) =>
  typeof value === "string" ? value.trim() : "";

const getSectionId = (label) =>
  `sh-cd-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

const BLOCK_ICONS = {
  Context: Compass,
  Challenge: Target,
  Solution: Lightbulb,
};

/* =======================================================
   MAIN COMPONENT
======================================================= */

function CaseStudyDetail() {
  const { study } = Route.useLoaderData();

  const reduceMotion = useReducedMotion();

  const related = useMemo(() => {
    if (!Array.isArray(caseStudies)) return [];

    return caseStudies.filter(
      (item) =>
        item &&
        item.slug !== study.slug &&
        item.slug &&
        item.title,
    );
  }, [study.slug]);

  const blocks = useMemo(
    () =>
      [
        {
          label: "Context",
          body: study.context,
        },
        {
          label: "Challenge",
          body: study.challenge,
        },
        {
          label: "Solution",
          body: study.solution,
        },
      ].filter((block) => {
        if (typeof block.body === "string") {
          return block.body.trim().length > 0;
        }

        return block.body !== null && block.body !== undefined;
      }),
    [study],
  );

  const approach = Array.isArray(study.approach)
    ? study.approach.filter(
        (step) =>
          typeof step === "string" && step.trim().length > 0,
      )
    : [];

  const outcome = safeText(study.outcome);

  const sectionLinks = [
    ...blocks.map((block) => ({
      label: block.label,
      id: getSectionId(block.label),
    })),
    ...(approach.length > 0
      ? [{ label: "Our approach", id: "sh-cd-approach" }]
      : []),
    ...(outcome
      ? [{ label: "Measuring outcomes", id: "sh-cd-outcomes" }]
      : []),
  ];

  return (
    <main className="sh-case-detail">
      <style>{`
        /* =================================================
           SmartEDGE CASE STUDY DETAIL — DESIGN SYSTEM
        ================================================= */

        .sh-case-detail {
          --cd-ink: #101a36;
          --cd-ink-soft: #1a274b;
          --cd-blue: #243ec8;
          --cd-violet: #7775ff;
          --cd-cyan: #42d5e8;
          --cd-mint: #80f0d1;
          --cd-text: #505b74;
          --cd-muted: #7b849b;
          --cd-line: rgba(16, 26, 54, 0.1);
          --cd-surface: #f5f7fc;
          --cd-white: #ffffff;

          position: relative;
          isolation: isolate;

          width: 100%;
          min-width: 0;
          overflow: clip;

          color: var(--cd-ink);
          background: #ffffff;
        }

        .sh-case-detail *,
        .sh-case-detail *::before,
        .sh-case-detail *::after {
          box-sizing: border-box;
        }

        .sh-case-detail a {
          text-decoration: none;
        }

        .sh-case-detail button,
        .sh-case-detail input {
          font: inherit;
        }

        .sh-case-detail a:focus-visible,
        .sh-case-detail button:focus-visible {
          outline: 3px solid var(--cd-cyan);
          outline-offset: 4px;
        }

        .sh-cd-container {
          width: min(1220px, calc(100% - 64px));
          margin-inline: auto;
        }

        /* =================================================
           DETAIL SECTION
        ================================================= */

        .sh-cd-main {
          position: relative;
          padding: clamp(52px, 6.5vw, 88px) 0
            clamp(78px, 8vw, 112px);

          background:
            radial-gradient(
              ellipse at 3% 4%,
              rgba(119, 117, 255, 0.045),
              transparent 32%
            ),
            #ffffff;
        }

        .sh-cd-main::before {
          content: "";

          position: absolute;
          top: 0;
          left: 50%;

          width: min(1220px, calc(100% - 64px));
          height: 1px;

          transform: translateX(-50%);

          background: linear-gradient(
            90deg,
            transparent,
            rgba(16, 26, 54, 0.12),
            transparent
          );

          pointer-events: none;
        }

        /* =================================================
           SAMPLE NOTICE
        ================================================= */

        .sh-cd-sample-notice {
          position: relative;

          display: flex;
          align-items: flex-start;
          gap: 15px;

          margin-bottom: 36px;
          padding: 21px 23px;

          border: 1px solid rgba(119, 117, 255, 0.22);
          border-radius: 18px;

          background:
            radial-gradient(
              circle at 0% 0%,
              rgba(119, 117, 255, 0.08),
              transparent 48%
            ),
            #fbfbff;

          box-shadow:
            0 10px 28px rgba(16, 26, 54, 0.035),
            inset 0 1px 0 #ffffff;
        }

        .sh-cd-sample-icon {
          display: grid;
          place-items: center;
          flex-shrink: 0;

          width: 43px;
          height: 43px;

          border: 1px solid rgba(119, 117, 255, 0.18);
          border-radius: 13px;

          color: var(--cd-blue);
          background: #eeefff;
        }

        .sh-cd-sample-copy {
          flex: 1;
          min-width: 0;
        }

        .sh-cd-sample-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          margin-bottom: 6px;

          color: var(--cd-blue);
          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .sh-cd-sample-copy p {
          margin: 0;

          color: #56617c;
          font-size: 12px;
          line-height: 1.85;
        }

        .sh-cd-sample-copy strong {
          color: var(--cd-ink);
          font-weight: 750;
        }

        /* =================================================
           TWO COLUMN LAYOUT
        ================================================= */

        .sh-cd-layout {
          display: grid;
          grid-template-columns: 236px minmax(0, 1fr);
          align-items: start;
          gap: clamp(32px, 5vw, 70px);
        }

        /* =================================================
           STICKY NAVIGATION
        ================================================= */

        .sh-cd-sidebar {
          position: sticky;
          top: 110px;

          min-width: 0;
          padding: 22px 18px 20px;

          border: 1px solid rgba(16, 26, 54, 0.09);
          border-radius: 19px;

          background: rgba(255, 255, 255, 0.93);

          box-shadow:
            0 12px 34px rgba(16, 26, 54, 0.045),
            inset 0 1px 0 #ffffff;
        }

        .sh-cd-sidebar-label {
          display: block;

          margin-bottom: 17px;
          padding: 0 3px;

          color: var(--cd-muted);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.14em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .sh-cd-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .sh-cd-sidebar-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;

          min-height: 42px;
          padding: 11px 12px;

          border: 1px solid transparent;
          border-radius: 11px;

          color: #626c83;

          font-size: 12px;
          font-weight: 600;
          line-height: 1.45;

          transition:
            color 180ms ease,
            background 180ms ease,
            border-color 180ms ease,
            transform 180ms ease;
        }

        .sh-cd-sidebar-link svg {
          flex: 0 0 auto;
          opacity: 0.6;

          transition:
            transform 180ms ease,
            opacity 180ms ease;
        }

        .sh-cd-sidebar-link:hover {
          transform: translateX(2px);

          color: var(--cd-blue);
          border-color: rgba(36, 62, 200, 0.09);
          background: #f5f6ff;
        }

        .sh-cd-sidebar-link:hover svg {
          transform: translateX(2px);
          opacity: 1;
        }

        .sh-cd-sidebar-divider {
          height: 1px;
          margin: 19px 0;

          background: var(--cd-line);
        }

        .sh-cd-sidebar-note {
          display: flex;
          align-items: flex-start;
          gap: 9px;

          padding: 2px 3px 0;

          color: var(--cd-muted);
          font-size: 10px;
          line-height: 1.8;
        }

        .sh-cd-sidebar-note svg {
          flex: 0 0 auto;
          margin-top: 2px;

          color: var(--cd-blue);
        }

        .sh-cd-sidebar-cta {
          margin-top: 20px;
        }

        .sh-cd-sidebar-cta > * {
          width: 100%;
          justify-content: center;
        }

        /* =================================================
           CONTENT COLUMN
        ================================================= */

        .sh-cd-content {
          display: flex;
          flex-direction: column;
          gap: 22px;

          min-width: 0;
        }

        .sh-cd-block {
          position: relative;
          min-width: 0;

          padding: clamp(25px, 3.4vw, 38px);

          border: 1px solid rgba(16, 26, 54, 0.085);
          border-radius: 21px;

          background: #ffffff;

          box-shadow:
            0 8px 30px rgba(16, 26, 54, 0.025),
            inset 0 1px 0 #ffffff;

          scroll-margin-top: 118px;

          transition:
            border-color 220ms ease,
            box-shadow 220ms ease,
            transform 220ms ease;
        }

        .sh-cd-block:hover {
          border-color: rgba(119, 117, 255, 0.20);

          box-shadow:
            0 16px 38px rgba(16, 26, 54, 0.045),
            inset 0 1px 0 #ffffff;
        }

        .sh-cd-block-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;

          margin-bottom: 21px;
        }

        .sh-cd-block-icon {
          display: grid;
          place-items: center;
          flex-shrink: 0;

          width: 49px;
          height: 49px;

          border: 1px solid rgba(119, 117, 255, 0.13);
          border-radius: 15px;

          color: var(--cd-blue);

          background:
            linear-gradient(
              140deg,
              rgba(119, 117, 255, 0.11),
              rgba(66, 213, 232, 0.065)
            );
        }

        .sh-cd-block-label {
          display: block;
          margin: 2px 0 6px;

          color: var(--cd-blue);
          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .sh-cd-block-heading {
          margin: 0;

          color: var(--cd-ink);
          font-size: clamp(22px, 2.4vw, 29px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.045em;
          text-wrap: balance;
        }

        .sh-cd-block-body {
          margin: 0;

          color: var(--cd-text);
          font-size: 15px;
          line-height: 1.95;

          overflow-wrap: anywhere;
          white-space: pre-line;
        }

        .sh-cd-block-index {
          position: absolute;
          top: 27px;
          right: 28px;

          color: rgba(16, 26, 54, 0.105);

          font-size: 34px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.06em;

          pointer-events: none;
        }

        /* =================================================
           APPROACH TIMELINE
        ================================================= */

        .sh-cd-approach {
          position: relative;
          padding: clamp(26px, 3.4vw, 38px);

          border: 1px solid rgba(16, 26, 54, 0.09);
          border-radius: 21px;

          background:
            radial-gradient(
              ellipse at 100% 0%,
              rgba(119, 117, 255, 0.055),
              transparent 38%
            ),
            #fafbff;

          scroll-margin-top: 118px;
        }

        .sh-cd-approach-header {
          display: flex;
          align-items: flex-start;
          gap: 15px;

          margin-bottom: 27px;
        }

        .sh-cd-approach-icon {
          display: grid;
          place-items: center;
          flex-shrink: 0;

          width: 49px;
          height: 49px;

          border: 1px solid rgba(119, 117, 255, 0.14);
          border-radius: 15px;

          color: var(--cd-blue);
          background: #eeefff;
        }

        .sh-cd-approach-heading {
          margin: 2px 0 0;

          color: var(--cd-ink);
          font-size: clamp(22px, 2.4vw, 29px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.045em;
        }

        .sh-cd-approach-lead {
          margin: 8px 0 0;

          color: var(--cd-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .sh-cd-timeline {
          position: relative;

          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sh-cd-timeline::before {
          content: "";

          position: absolute;
          top: 27px;
          bottom: 27px;
          left: 23px;

          width: 1px;

          background: linear-gradient(
            to bottom,
            rgba(119, 117, 255, 0.30),
            rgba(66, 213, 232, 0.45),
            rgba(119, 117, 255, 0.15)
          );

          pointer-events: none;
        }

        .sh-cd-timeline-item {
          position: relative;

          display: grid;
          grid-template-columns: 47px minmax(0, 1fr);
          align-items: start;
          gap: 15px;

          min-width: 0;
          padding: 17px 16px 17px 0;

          border: 1px solid transparent;
          border-radius: 15px;

          transition:
            background 220ms ease,
            border-color 220ms ease,
            transform 220ms ease;
        }

        .sh-cd-timeline-item:hover {
          transform: translateX(3px);

          border-color: rgba(119, 117, 255, 0.12);
          background: rgba(255, 255, 255, 0.82);
        }

        .sh-cd-timeline-number {
          position: relative;
          z-index: 1;

          display: grid;
          place-items: center;

          width: 47px;
          height: 47px;

          border: 1px solid rgba(119, 117, 255, 0.16);
          border-radius: 14px;

          color: var(--cd-blue);
          background: #f0f1ff;

          font-size: 12px;
          font-weight: 800;
          font-variant-numeric: tabular-nums;

          transition:
            color 180ms ease,
            background 180ms ease,
            border-color 180ms ease;
        }

        .sh-cd-timeline-item:hover .sh-cd-timeline-number {
          border-color: rgba(36, 62, 200, 0.26);
          color: #ffffff;
          background: var(--cd-blue);
        }

        .sh-cd-timeline-copy {
          min-width: 0;
          padding-top: 2px;

          color: var(--cd-text);
          font-size: 13px;
          line-height: 1.85;

          overflow-wrap: anywhere;
        }

        /* =================================================
           OUTCOME SECTION
        ================================================= */

        .sh-cd-outcome {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          padding: clamp(27px, 3.6vw, 40px);

          border: 1px solid rgba(83, 222, 236, 0.16);
          border-radius: 21px;

          background:
            radial-gradient(
              ellipse at 100% 0%,
              rgba(119, 117, 255, 0.19),
              transparent 43%
            ),
            radial-gradient(
              ellipse at 0% 100%,
              rgba(66, 213, 232, 0.09),
              transparent 40%
            ),
            #101a36;

          scroll-margin-top: 118px;
        }

        .sh-cd-outcome::after {
          content: "";

          position: absolute;
          z-index: -1;
          top: -70px;
          right: -70px;

          width: 200px;
          height: 200px;

          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 50%;

          box-shadow:
            0 0 0 26px rgba(255, 255, 255, 0.018),
            0 0 0 52px rgba(255, 255, 255, 0.013);

          pointer-events: none;
        }

        .sh-cd-outcome-header {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }

        .sh-cd-outcome-icon {
          display: grid;
          place-items: center;
          flex-shrink: 0;

          width: 49px;
          height: 49px;

          border: 1px solid rgba(128, 240, 209, 0.22);
          border-radius: 15px;

          color: var(--cd-mint);
          background: rgba(128, 240, 209, 0.09);
        }

        .sh-cd-outcome-eyebrow {
          display: block;
          margin: 2px 0 7px;

          color: var(--cd-cyan);
          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .sh-cd-outcome h2 {
          margin: 0;

          color: #ffffff;
          font-size: clamp(22px, 2.4vw, 29px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.045em;
        }

        .sh-cd-outcome-body {
          margin: 20px 0 0;

          color: #c0cbe4;
          font-size: 14px;
          line-height: 1.95;

          overflow-wrap: anywhere;
          white-space: pre-line;
        }

        .sh-cd-outcome-footnote {
          display: flex;
          align-items: flex-start;
          gap: 9px;

          margin-top: 22px;
          padding-top: 17px;

          border-top: 1px solid rgba(190, 204, 255, 0.14);

          color: #9eaccb;
          font-size: 10px;
          line-height: 1.8;
        }

        .sh-cd-outcome-footnote svg {
          flex-shrink: 0;
          margin-top: 1px;

          color: var(--cd-cyan);
        }

        /* =================================================
           RELATED STUDIES
        ================================================= */

        .sh-cd-related {
          position: relative;

          padding: clamp(67px, 8vw, 100px) 0;

          border-top: 1px solid rgba(16, 26, 54, 0.055);

          background:
            radial-gradient(
              ellipse at 100% 0%,
              rgba(119, 117, 255, 0.06),
              transparent 32%
            ),
            #f5f7fc;
        }

        .sh-cd-related-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;

          margin-bottom: 34px;
        }

        .sh-cd-related-intro {
          max-width: 650px;
        }

        .sh-cd-related-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 13px;

          color: var(--cd-blue);
          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .sh-cd-related-eyebrow::before {
          content: "";

          width: 20px;
          height: 2px;
          border-radius: 20px;

          background: linear-gradient(
            90deg,
            var(--cd-blue),
            var(--cd-cyan)
          );
        }

        .sh-cd-related-title {
          margin: 0;

          color: var(--cd-ink);
          font-size: clamp(29px, 3.6vw, 42px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.05em;
        }

        .sh-cd-related-description {
          margin: 12px 0 0;

          color: var(--cd-text);
          font-size: 13px;
          line-height: 1.8;
        }

        .sh-cd-back-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          min-height: 43px;
          padding: 11px 15px;

          flex-shrink: 0;

          border: 1px solid rgba(16, 26, 54, 0.12);
          border-radius: 100px;

          color: var(--cd-ink);
          background: rgba(255, 255, 255, 0.82);

          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;

          transition:
            color 180ms ease,
            background 180ms ease,
            border-color 180ms ease,
            transform 180ms ease;
        }

        .sh-cd-back-link:hover {
          transform: translateY(-2px);

          color: var(--cd-blue);
          border-color: rgba(36, 62, 200, 0.26);
          background: #ffffff;
        }

        .sh-cd-back-link svg {
          transition: transform 180ms ease;
        }

        .sh-cd-back-link:hover svg {
          transform: translate(2px, -2px);
        }

        .sh-cd-related-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: stretch;
          gap: 24px;
        }

        .sh-cd-related-card {
          display: flex;
          min-width: 0;
          transform: translateZ(0);

          transition: transform 230ms ease;
        }

        .sh-cd-related-card:hover {
          transform: translateY(-5px);
        }

        .sh-cd-related-card > * {
          width: 100%;
          min-width: 0;
        }

        .sh-cd-related-empty {
          display: flex;
          align-items: flex-start;
          gap: 15px;

          padding: 25px;

          border: 1px dashed rgba(16, 26, 54, 0.16);
          border-radius: 18px;

          background: rgba(255, 255, 255, 0.7);
        }

        .sh-cd-related-empty-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 44px;
          height: 44px;

          border-radius: 13px;

          color: var(--cd-blue);
          background: #eef0ff;
        }

        .sh-cd-related-empty h3 {
          margin: 1px 0 6px;

          color: var(--cd-ink);
          font-size: 16px;
          font-weight: 700;
        }

        .sh-cd-related-empty p {
          margin: 0;

          color: var(--cd-text);
          font-size: 12px;
          line-height: 1.8;
        }

        /* =================================================
           RESPONSIVE — LAPTOP
        ================================================= */

        @media (max-width: 1050px) {
          .sh-cd-container {
            width: min(100% - 48px, 1220px);
          }

          .sh-cd-main::before {
            width: calc(100% - 48px);
          }

          .sh-cd-layout {
            grid-template-columns: 205px minmax(0, 1fr);
            gap: 28px;
          }

          .sh-cd-sidebar {
            top: 96px;
            padding: 18px 14px;
          }

          .sh-cd-block,
          .sh-cd-approach,
          .sh-cd-outcome {
            padding: 27px;
          }

          .sh-cd-block-index {
            top: 23px;
            right: 22px;
          }
        }

        /* =================================================
           RESPONSIVE — TABLET
        ================================================= */

        @media (max-width: 760px) {
          .sh-cd-container {
            width: calc(100% - 40px);
          }

          .sh-cd-main {
            padding: 48px 0 70px;
          }

          .sh-cd-main::before {
            width: calc(100% - 40px);
          }

          .sh-cd-sample-notice {
            gap: 12px;
            margin-bottom: 26px;
            padding: 17px;
            border-radius: 15px;
          }

          .sh-cd-sample-icon {
            width: 39px;
            height: 39px;
          }

          .sh-cd-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 27px;
          }

          .sh-cd-sidebar {
            position: relative;
            top: auto;

            min-width: 0;
            padding: 15px;

            border-radius: 16px;
          }

          .sh-cd-sidebar-label {
            margin: 0 0 12px;
          }

          .sh-cd-sidebar-nav {
            flex-direction: row;
            gap: 7px;

            padding-bottom: 5px;
            overflow-x: auto;
            overscroll-behavior-x: contain;
            scrollbar-width: thin;
            scrollbar-color: rgba(36, 62, 200, 0.22) transparent;
          }

          .sh-cd-sidebar-link {
            flex-shrink: 0;
            min-height: 38px;
            padding: 10px 12px;

            background: #f7f8fd;
            font-size: 11px;
          }

          .sh-cd-sidebar-divider,
          .sh-cd-sidebar-note,
          .sh-cd-sidebar-cta {
            display: none;
          }

          .sh-cd-content {
            gap: 18px;
          }

          .sh-cd-block,
          .sh-cd-approach,
          .sh-cd-outcome {
            padding: 25px;
            border-radius: 18px;
          }

          .sh-cd-block-body {
            font-size: 14px;
            line-height: 1.9;
          }

          .sh-cd-timeline-copy {
            font-size: 12px;
          }

          .sh-cd-related {
            padding: 66px 0;
          }

          .sh-cd-related-grid {
            gap: 18px;
          }

          .sh-cd-related-top {
            align-items: flex-start;
            flex-direction: column;
            gap: 19px;
          }
        }

        /* =================================================
           RESPONSIVE — MOBILE
        ================================================= */

        @media (max-width: 540px) {
          .sh-cd-container {
            width: calc(100% - 32px);
          }

          .sh-cd-main {
            padding: 37px 0 56px;
          }

          .sh-cd-main::before {
            width: calc(100% - 32px);
          }

          .sh-cd-sample-notice {
            gap: 10px;
            padding: 14px;
            margin-bottom: 21px;
            border-radius: 13px;
          }

          .sh-cd-sample-icon {
            width: 34px;
            height: 34px;
            border-radius: 10px;
          }

          .sh-cd-sample-icon svg {
            width: 17px;
            height: 17px;
          }

          .sh-cd-sample-label {
            font-size: 9px;
          }

          .sh-cd-sample-copy p {
            font-size: 11px;
            line-height: 1.8;
          }

          .sh-cd-layout {
            gap: 20px;
          }

          .sh-cd-sidebar {
            padding: 12px;
            border-radius: 14px;
          }

          .sh-cd-sidebar-label {
            margin-bottom: 10px;
            font-size: 9px;
          }

          .sh-cd-sidebar-nav {
            gap: 6px;
          }

          .sh-cd-sidebar-link {
            min-height: 36px;
            padding: 9px 11px;
            font-size: 10px;
          }

          .sh-cd-sidebar-link svg {
            width: 13px;
            height: 13px;
          }

          .sh-cd-content {
            gap: 14px;
          }

          .sh-cd-block,
          .sh-cd-approach,
          .sh-cd-outcome {
            padding: 20px;
            border-radius: 16px;
            scroll-margin-top: 85px;
          }

          .sh-cd-block-header,
          .sh-cd-approach-header,
          .sh-cd-outcome-header {
            gap: 12px;
            margin-bottom: 18px;
          }

          .sh-cd-block-icon,
          .sh-cd-approach-icon,
          .sh-cd-outcome-icon {
            width: 41px;
            height: 41px;
            border-radius: 12px;
          }

          .sh-cd-block-icon svg,
          .sh-cd-approach-icon svg,
          .sh-cd-outcome-icon svg {
            width: 19px;
            height: 19px;
          }

          .sh-cd-block-label,
          .sh-cd-outcome-eyebrow {
            font-size: 9px;
          }

          .sh-cd-block-heading,
          .sh-cd-approach-heading,
          .sh-cd-outcome h2 {
            font-size: 22px;
          }

          .sh-cd-block-index {
            top: 22px;
            right: 18px;
            font-size: 24px;
          }

          .sh-cd-block-body {
            font-size: 13px;
            line-height: 1.9;
          }

          .sh-cd-approach-lead {
            font-size: 11px;
          }

          .sh-cd-timeline {
            gap: 6px;
          }

          .sh-cd-timeline::before {
            top: 21px;
            bottom: 21px;
            left: 18px;
          }

          .sh-cd-timeline-item {
            grid-template-columns: 37px minmax(0, 1fr);
            gap: 11px;

            padding: 12px 9px 12px 0;
            border-radius: 12px;
          }

          .sh-cd-timeline-number {
            width: 37px;
            height: 37px;
            border-radius: 11px;
            font-size: 10px;
          }

          .sh-cd-timeline-copy {
            padding-top: 1px;
            font-size: 11px;
            line-height: 1.8;
          }

          .sh-cd-outcome-body {
            margin-top: 15px;
            font-size: 12px;
            line-height: 1.9;
          }

          .sh-cd-outcome-footnote {
            margin-top: 17px;
            padding-top: 14px;
            font-size: 9px;
          }

          .sh-cd-related {
            padding: 52px 0;
          }

          .sh-cd-related-top {
            gap: 18px;
            margin-bottom: 25px;
          }

          .sh-cd-related-title {
            font-size: clamp(28px, 7vw, 35px);
          }

          .sh-cd-related-description {
            font-size: 12px;
          }

          .sh-cd-related-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 17px;
          }

          .sh-cd-related-card:hover {
            transform: translateY(-2px);
          }

          .sh-cd-related-empty {
            gap: 12px;
            padding: 17px;
          }

          .sh-cd-related-empty-icon {
            width: 38px;
            height: 38px;
            border-radius: 11px;
          }
        }

        @media (max-width: 360px) {
          .sh-cd-container {
            width: calc(100% - 26px);
          }

          .sh-cd-block,
          .sh-cd-approach,
          .sh-cd-outcome {
            padding: 17px;
          }

          .sh-cd-block-heading,
          .sh-cd-approach-heading,
          .sh-cd-outcome h2 {
            font-size: 20px;
          }

          .sh-cd-sample-notice {
            padding: 12px;
          }
        }

        /* =================================================
           REDUCED MOTION ACCESSIBILITY
        ================================================= */

        @media (prefers-reduced-motion: reduce) {
          .sh-case-detail *,
          .sh-case-detail *::before,
          .sh-case-detail *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* =================================================
          1. HERO SECTION
      ================================================= */}

      <PageHero
        eyebrow={study.category || "Case study"}
        title={study.title}
        lead={study.summary}
        image={study.image}
      >
        <ButtonLink to="/contact" variant="signal">
          Discuss a similar project
        </ButtonLink>
      </PageHero>

      {/* =================================================
          2. PROJECT STORY
      ================================================= */}

      <section className="sh-cd-main">
        <div className="sh-cd-container">
          {/* HONEST SAMPLE DISCLOSURE */}

          {study.isSample && (
            <Reveal>
              <motion.aside
                className="sh-cd-sample-notice"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 12 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="sh-cd-sample-icon">
                  <Info size={20} aria-hidden="true" />
                </span>

                <div className="sh-cd-sample-copy">
                  <span className="sh-cd-sample-label">
                    Illustrative sample scenario
                  </span>

                  <p>
                    This is an{" "}
                    <strong>illustrative sample scenario</strong>{" "}
                    describing how SmartEDGE would approach this
                    type of project. It does not represent a
                    named client, a verified engagement or
                    reported business results.
                  </p>
                </div>
              </motion.aside>
            </Reveal>
          )}

          <div className="sh-cd-layout">
            {/* LEFT — STICKY SECTION NAVIGATION */}

            <motion.aside
              className="sh-cd-sidebar"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, x: -12 }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="sh-cd-sidebar-label">
                Inside this case study
              </span>

              <nav
                className="sh-cd-sidebar-nav"
                aria-label="Case study sections"
              >
                {sectionLinks.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="sh-cd-sidebar-link"
                  >
                    <span>{item.label}</span>

                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </nav>

              <div className="sh-cd-sidebar-divider" />

              <div className="sh-cd-sidebar-note">
                <CheckCircle2
                  size={15}
                  aria-hidden="true"
                />

                <span>
                  Explore the context, decisions and process
                  behind the proposed solution.
                </span>
              </div>

              <div className="sh-cd-sidebar-cta">
                <ButtonLink
                  to="/contact"
                  variant="signal"
                >
                  Start a conversation
                </ButtonLink>
              </div>
            </motion.aside>

            {/* RIGHT — MAIN CONTENT */}

            <div className="sh-cd-content">
              {/* CONTEXT / CHALLENGE / SOLUTION */}

              {blocks.map((block, index) => {
                const Icon =
                  BLOCK_ICONS[block.label] || Layers3;

                return (
                  <Reveal key={block.label} delay={index * 0.04}>
                    <motion.article
                      id={getSectionId(block.label)}
                      className="sh-cd-block"
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, y: 18 }
                      }
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.15,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.43,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="sh-cd-block-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="sh-cd-block-header">
                        <span className="sh-cd-block-icon">
                          <Icon
                            size={23}
                            strokeWidth={1.7}
                            aria-hidden="true"
                          />
                        </span>

                        <div>
                          <span className="sh-cd-block-label">
                            Project story
                          </span>

                          <h2 className="sh-cd-block-heading">
                            {block.label}
                          </h2>
                        </div>
                      </div>

                      <p className="sh-cd-block-body">
                        {block.body}
                      </p>
                    </motion.article>
                  </Reveal>
                );
              })}

              {/* APPROACH TIMELINE */}

              {approach.length > 0 && (
                <Reveal>
                  <section
                    id="sh-cd-approach"
                    className="sh-cd-approach"
                    aria-labelledby="sh-cd-approach-title"
                  >
                    <div className="sh-cd-approach-header">
                      <span className="sh-cd-approach-icon">
                        <ListChecks
                          size={23}
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </span>

                      <div>
                        <h2
                          id="sh-cd-approach-title"
                          className="sh-cd-approach-heading"
                        >
                          Our approach
                        </h2>

                        <p className="sh-cd-approach-lead">
                          A structured sequence of decisions and
                          actions designed around the challenge.
                        </p>
                      </div>
                    </div>

                    <div className="sh-cd-timeline">
                      {approach.map((step, index) => (
                        <motion.div
                          key={`${index}-${step}`}
                          className="sh-cd-timeline-item"
                          initial={
                            reduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  x: 13,
                                }
                          }
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.2,
                          }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.35,
                            delay: reduceMotion
                              ? 0
                              : Math.min(index * 0.055, 0.22),
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <span className="sh-cd-timeline-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="sh-cd-timeline-copy">
                            {step}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </Reveal>
              )}

              {/* OUTCOMES */}

              {outcome && (
                <Reveal>
                  <motion.section
                    id="sh-cd-outcomes"
                    className="sh-cd-outcome"
                    aria-labelledby="sh-cd-outcome-title"
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 18 }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.16,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.43,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="sh-cd-outcome-header">
                      <span className="sh-cd-outcome-icon">
                        <ShieldCheck
                          size={23}
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </span>

                      <div>
                        <span className="sh-cd-outcome-eyebrow">
                          Evaluation and next steps
                        </span>

                        <h2 id="sh-cd-outcome-title">
                          Measuring outcomes
                        </h2>
                      </div>
                    </div>

                    <p className="sh-cd-outcome-body">
                      {outcome}
                    </p>

                    {study.isSample && (
                      <div className="sh-cd-outcome-footnote">
                        <Info
                          size={14}
                          aria-hidden="true"
                        />

                        <span>
                          Outcomes described in this scenario
                          should be treated as illustrative
                          evaluation goals, not as measured or
                          guaranteed results.
                        </span>
                      </div>
                    )}
                  </motion.section>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          3. RELATED CASE STUDIES
      ================================================= */}

      <section
        className="sh-cd-related"
        aria-labelledby="sh-cd-related-title"
      >
        <div className="sh-cd-container">
          <Reveal>
            <div className="sh-cd-related-top">
              <div className="sh-cd-related-intro">
                <span className="sh-cd-related-eyebrow">
                  Continue exploring
                </span>

                <h2
                  id="sh-cd-related-title"
                  className="sh-cd-related-title"
                >
                  More ways to think about challenges.
                </h2>

                <p className="sh-cd-related-description">
                  Explore other illustrative scenarios and
                  approaches across SmartEDGE's areas of focus.
                </p>
              </div>

              <Link
                to="/case-studies/"
                className="sh-cd-back-link"
              >
                All case studies
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>

          {related.length > 0 ? (
            <div className="sh-cd-related-grid">
              {related.map((item, index) => (
                <motion.div
                  key={item.slug}
                  className="sh-cd-related-card"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 20 }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion
                      ? 0
                      : Math.min(index * 0.07, 0.21),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <CaseStudyCard study={item} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="sh-cd-related-empty">
              <span className="sh-cd-related-empty-icon">
                <Layers3
                  size={21}
                  aria-hidden="true"
                />
              </span>

              <div>
                <h3>More scenarios are on the way.</h3>

                <p>
                  Visit the complete case studies page to explore
                  the available scenarios.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          4. EXISTING CONTACT CTA
      ================================================= */}

      <CtaBand />
    </main>
  );
}