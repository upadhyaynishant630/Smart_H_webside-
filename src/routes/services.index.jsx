import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
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
  buttonStyles,
} from "@/components/ui/brand";
import { ThreeDIcon } from "@/components/ui/ThreeDIcon";
import { services } from "@/data/services";
import cloud from "@/assets/services/cloud.jpg";
import { cn } from "@/lib/utils";

/* ======================================================
   ROUTE CONFIGURATION + SEO
====================================================== */

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Smart H" },
      {
        name: "description",
        content:
          "Explore Smart H technology services across cloud infrastructure, cybersecurity, data and AI, intelligent automation, connectivity and technology consulting.",
      },
      {
        property: "og:title",
        content: "Smart H Services",
      },
      {
        property: "og:description",
        content:
          "Explore connected technology capabilities designed around your organisation's needs.",
      },
    ],
  }),
  component: Services,
});

/* ======================================================
   SERVICE DATA SAFETY
====================================================== */

const SERVICE_LIST = Array.isArray(services)
  ? services.filter(
      (service) =>
        service &&
        typeof service.slug === "string" &&
        service.slug.length > 0 &&
        typeof service.title === "string" &&
        service.title.length > 0,
    )
  : [];

/* ======================================================
   NEW SECTION: CONNECTED WORKFLOW
====================================================== */

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Understand the bigger picture",
    description:
      "We begin by understanding your current environment, priorities, constraints and the challenge you want to solve.",
    icon: Compass,
    accent: "violet",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Plan a connected solution",
    description:
      "We identify the relevant capabilities and shape a practical approach that considers systems, people and future needs.",
    icon: Layers3,
    accent: "cyan",
  },
  {
    number: "03",
    title: "Implement",
    subtitle: "Turn plans into action",
    description:
      "The selected approach is translated into a solution with attention to implementation, integration and quality.",
    icon: Workflow,
    accent: "blue",
  },
  {
    number: "04",
    title: "Improve",
    subtitle: "Keep moving forward",
    description:
      "Review, feedback and ongoing evaluation help identify sensible next steps as your organisation evolves.",
    icon: ShieldCheck,
    accent: "mint",
  },
];

/* ======================================================
   MAIN PAGE
====================================================== */

function Services() {
  const reduceMotion = useReducedMotion();

  const serviceCount = SERVICE_LIST.length;

  const serviceCountLabel = String(serviceCount).padStart(2, "0");

  const hasServices = serviceCount > 0;

  const capabilityCount = useMemo(
    () =>
      SERVICE_LIST.reduce((total, service) => {
        const capabilities = Array.isArray(service.capabilities)
          ? service.capabilities.filter(
              (item) =>
                typeof item === "string" &&
                item.trim().length > 0,
            )
          : [];

        return total + capabilities.length;
      }, 0),
    [],
  );

  return (
    <main className="sh-services-page">
      <style>{`
        /* ==================================================
           SMART H SERVICES — DESIGN SYSTEM
        ================================================== */

        .sh-services-page {
          --svc-ink: #101a36;
          --svc-ink-soft: #1b294d;
          --svc-blue: #243ec8;
          --svc-violet: #7775ff;
          --svc-cyan: #42d5e8;
          --svc-mint: #80f0d1;
          --svc-text: #505b74;
          --svc-muted: #7b849b;
          --svc-line: rgba(16, 26, 54, 0.10);
          --svc-surface: #f5f7fc;
          --svc-white: #ffffff;

          width: 100%;
          min-width: 0;
          position: relative;
          isolation: isolate;
          overflow: clip;

          color: var(--svc-ink);
          background: #ffffff;
        }

        .sh-services-page *,
        .sh-services-page *::before,
        .sh-services-page *::after {
          box-sizing: border-box;
        }

        .sh-services-page a {
          text-decoration: none;
        }

        .sh-services-page img {
          display: block;
          max-width: 100%;
        }

        .sh-services-page button {
          font: inherit;
        }

        .sh-services-page a:focus-visible,
        .sh-services-page button:focus-visible {
          outline: 3px solid var(--svc-cyan);
          outline-offset: 4px;
        }

        .sh-svc-container {
          width: min(1240px, calc(100% - 64px));
          margin-inline: auto;
        }

        /* ==================================================
           SERVICE DIRECTORY INTRO
        ================================================== */

        .sh-svc-directory {
          position: relative;
          padding: clamp(58px, 7vw, 88px) 0
            clamp(70px, 8vw, 104px);

          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(119, 117, 255, 0.06),
              transparent 34%
            ),
            #ffffff;
        }

        .sh-svc-directory::before {
          content: "";

          position: absolute;
          top: 0;
          left: 50%;

          width: min(1240px, calc(100% - 64px));
          height: 1px;

          transform: translateX(-50%);

          background: linear-gradient(
            90deg,
            transparent,
            rgba(16, 26, 54, 0.13),
            transparent
          );

          pointer-events: none;
        }

        .sh-svc-section-intro {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;

          margin-bottom: 40px;
        }

        .sh-svc-intro-copy {
          max-width: 760px;
          min-width: 0;
        }

        .sh-svc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          margin-bottom: 16px;

          color: var(--svc-blue);
          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .sh-svc-eyebrow::before {
          content: "";

          width: 23px;
          height: 2px;

          border-radius: 99px;

          background: linear-gradient(
            90deg,
            var(--svc-blue),
            var(--svc-cyan)
          );
        }

        .sh-svc-intro-title {
          margin: 0;

          color: var(--svc-ink);
          font-size: clamp(31px, 4.5vw, 49px);
          font-weight: 750;
          line-height: 1.08;
          letter-spacing: -0.055em;
          text-wrap: balance;
        }

        .sh-svc-intro-title span {
          color: var(--svc-blue);
        }

        .sh-svc-intro-description {
          max-width: 640px;
          margin: 16px 0 0;

          color: var(--svc-text);
          font-size: 14px;
          line-height: 1.9;
        }

        .sh-svc-overview-card {
          display: flex;
          align-items: center;
          gap: 13px;

          flex: 0 0 auto;

          padding: 15px 18px;

          border: 1px solid rgba(16, 26, 54, 0.09);
          border-radius: 17px;

          background: rgba(255, 255, 255, 0.85);

          box-shadow:
            0 10px 30px rgba(16, 26, 54, 0.035),
            inset 0 1px 0 #ffffff;
        }

        .sh-svc-overview-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 43px;
          height: 43px;

          border: 1px solid rgba(119, 117, 255, 0.14);
          border-radius: 13px;

          color: var(--svc-blue);
          background: #eff0ff;
        }

        .sh-svc-overview-copy {
          display: grid;
          gap: 4px;
        }

        .sh-svc-overview-number {
          color: var(--svc-ink);
          font-size: 21px;
          font-weight: 800;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        .sh-svc-overview-label {
          color: var(--svc-muted);
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ==================================================
           SERVICE CARDS LIST
        ================================================== */

        .sh-svc-list {
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        .sh-svc-card {
          position: relative;

          display: grid;
          grid-template-columns: minmax(0, 0.98fr) minmax(0, 1.02fr);

          min-width: 0;
          overflow: hidden;

          border: 1px solid rgba(16, 26, 54, 0.10);
          border-radius: 25px;

          background: #ffffff;

          box-shadow:
            0 9px 30px rgba(16, 26, 54, 0.035),
            inset 0 1px 0 #ffffff;

          transition:
            border-color 280ms ease,
            box-shadow 280ms ease,
            transform 280ms ease;
        }

        .sh-svc-card:hover {
          transform: translateY(-4px);

          border-color: rgba(119, 117, 255, 0.25);

          box-shadow:
            0 22px 55px rgba(16, 26, 54, 0.075),
            0 4px 14px rgba(36, 62, 200, 0.025);
        }

        /* Alternate image position on desktop */

        .sh-svc-card.is-reversed .sh-svc-visual {
          order: 2;
        }

        .sh-svc-card.is-reversed .sh-svc-content {
          order: 1;
        }

        /* ==================================================
           IMAGE PANEL
        ================================================== */

        .sh-svc-visual {
          position: relative;
          isolation: isolate;

          min-width: 0;
          min-height: 370px;

          overflow: hidden;

          background:
            radial-gradient(
              circle at 10% 10%,
              rgba(119, 117, 255, 0.22),
              transparent 38%
            ),
            #111d3a;
        }

        .sh-svc-visual::after {
          content: "";

          position: absolute;
          z-index: 1;
          inset: 0;

          background: linear-gradient(
            180deg,
            rgba(8, 14, 33, 0.02) 28%,
            rgba(8, 14, 33, 0.15) 64%,
            rgba(8, 14, 33, 0.58) 100%
          );

          pointer-events: none;
        }

        .sh-svc-image {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center;

          transition:
            transform 850ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 600ms ease;
        }

        .sh-svc-card:hover .sh-svc-image {
          transform: scale(1.055);
          filter: saturate(1.08);
        }

        .sh-svc-image-glow {
          position: absolute;
          z-index: 1;
          inset: 0;

          background: linear-gradient(
            125deg,
            rgba(119, 117, 255, 0.12),
            transparent 42%,
            rgba(66, 213, 232, 0.09)
          );

          opacity: 0.75;

          transition: opacity 350ms ease;

          pointer-events: none;
        }

        .sh-svc-card:hover .sh-svc-image-glow {
          opacity: 1;
        }

        .sh-svc-visual-top {
          position: absolute;
          z-index: 2;
          top: 23px;
          left: 23px;
          right: 23px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .sh-svc-image-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          padding: 9px 12px;

          border: 1px solid rgba(255, 255, 255, 0.23);
          border-radius: 100px;

          color: #ffffff;
          background: rgba(8, 14, 33, 0.33);

          font-size: 9px;
          font-weight: 750;
          line-height: 1.2;
          letter-spacing: 0.11em;
          text-transform: uppercase;

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .sh-svc-tag-dot {
          width: 6px;
          height: 6px;
          flex: 0 0 auto;

          border-radius: 50%;
          background: var(--svc-cyan);

          box-shadow: 0 0 12px rgba(66, 213, 232, 0.75);
        }

        .sh-svc-image-index {
          color: rgba(255, 255, 255, 0.9);

          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.10em;
          font-variant-numeric: tabular-nums;
        }

        .sh-svc-visual-bottom {
          position: absolute;
          z-index: 2;
          left: 25px;
          right: 25px;
          bottom: 25px;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 15px;
        }

        .sh-svc-visual-bottom-copy {
          max-width: 340px;
          min-width: 0;
        }

        .sh-svc-visual-kicker {
          display: block;
          margin-bottom: 8px;

          color: var(--svc-cyan);
          font-size: 9px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .sh-svc-visual-caption {
          margin: 0;

          color: #ffffff;
          font-size: clamp(19px, 2.2vw, 27px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.04em;
          text-wrap: balance;
        }

        .sh-svc-visual-arrow {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 43px;
          height: 43px;

          border: 1px solid rgba(255, 255, 255, 0.33);
          border-radius: 14px;

          color: #ffffff;
          background: rgba(255, 255, 255, 0.09);

          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);

          transition:
            transform 250ms ease,
            border-color 250ms ease,
            background 250ms ease;
        }

        .sh-svc-card:hover .sh-svc-visual-arrow {
          transform: translate(2px, -2px);

          border-color: rgba(66, 213, 232, 0.70);
          background: rgba(66, 213, 232, 0.13);
        }

        /* ==================================================
           CONTENT PANEL
        ================================================== */

        .sh-svc-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          min-width: 0;
          padding: clamp(28px, 3.4vw, 45px);
        }

        .sh-svc-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;

          width: 100%;
          margin-bottom: 24px;
        }

        .sh-svc-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 59px;
          height: 59px;
          flex: 0 0 auto;

          border: 1px solid rgba(119, 117, 255, 0.15);
          border-radius: 18px;

          background: linear-gradient(
            140deg,
            rgba(119, 117, 255, 0.10),
            rgba(66, 213, 232, 0.07)
          );

          transition:
            transform 280ms ease,
            border-color 280ms ease,
            background 280ms ease;
        }

        .sh-svc-card:hover .sh-svc-icon-wrap {
          transform: translateY(-2px) rotate(-3deg);

          border-color: rgba(119, 117, 255, 0.30);
          background: linear-gradient(
            140deg,
            rgba(119, 117, 255, 0.16),
            rgba(66, 213, 232, 0.11)
          );
        }

        .sh-svc-index {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          color: var(--svc-muted);
          font-size: 10px;
          font-weight: 750;
          line-height: 1.5;
          letter-spacing: 0.10em;
          white-space: nowrap;
        }

        .sh-svc-index-line {
          width: 24px;
          height: 1px;

          background: linear-gradient(
            90deg,
            var(--svc-blue),
            var(--svc-cyan)
          );
        }

        .sh-svc-title {
          margin: 0;

          color: var(--svc-ink);
          font-size: clamp(24px, 2.6vw, 33px);
          font-weight: 750;
          line-height: 1.13;
          letter-spacing: -0.05em;
          text-wrap: balance;
        }

        .sh-svc-summary {
          margin: 14px 0 0;

          color: var(--svc-text);
          font-size: 13px;
          line-height: 1.9;

          overflow-wrap: anywhere;
        }

        /* Capability label */

        .sh-svc-capabilities-heading {
          display: flex;
          align-items: center;
          gap: 9px;

          margin-top: 25px;
          margin-bottom: 13px;

          color: var(--svc-ink);
          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.10em;
          text-transform: uppercase;
        }

        .sh-svc-capabilities-heading svg {
          color: var(--svc-blue);
        }

        .sh-svc-capabilities {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px 14px;

          width: 100%;
          margin: 0;
          padding: 0;

          list-style: none;
        }

        .sh-svc-capability {
          display: flex;
          align-items: flex-start;
          gap: 8px;

          min-width: 0;

          color: #4e5972;
          font-size: 11px;
          line-height: 1.75;

          overflow-wrap: anywhere;
        }

        .sh-svc-capability-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 17px;
          height: 17px;
          margin-top: 1px;

          border-radius: 50%;

          color: var(--svc-blue);
          background: #eff0ff;
        }

        .sh-svc-capability-icon svg {
          width: 11px;
          height: 11px;
        }

        .sh-svc-card-divider {
          width: 100%;
          height: 1px;

          margin-top: 27px;
          margin-bottom: 20px;

          background: linear-gradient(
            90deg,
            rgba(16, 26, 54, 0.12),
            rgba(16, 26, 54, 0.025),
            transparent
          );
        }

        .sh-svc-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;

          width: 100%;
          margin-top: auto;
        }

        .sh-svc-footer-note {
          max-width: 155px;

          color: var(--svc-muted);
          font-size: 10px;
          line-height: 1.75;
        }

        .sh-svc-view-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          min-height: 44px;
          padding: 12px 16px;

          flex: 0 0 auto;

          border-radius: 999px;

          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;

          transition:
            transform 220ms ease,
            box-shadow 220ms ease;
        }

        .sh-svc-view-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 20px rgba(36, 62, 200, 0.14);
        }

        .sh-svc-view-link svg {
          transition: transform 200ms ease;
        }

        .sh-svc-view-link:hover svg {
          transform: translateX(3px);
        }

        /* ==================================================
           EMPTY STATE
        ================================================== */

        .sh-svc-empty {
          display: flex;
          align-items: center;
          flex-direction: column;

          padding: 48px 26px;

          border: 1px dashed rgba(16, 26, 54, 0.17);
          border-radius: 23px;

          text-align: center;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(119, 117, 255, 0.07),
              transparent 65%
            ),
            #fbfcff;
        }

        .sh-svc-empty-icon {
          display: grid;
          place-items: center;

          width: 54px;
          height: 54px;
          margin-bottom: 17px;

          border: 1px solid rgba(119, 117, 255, 0.15);
          border-radius: 16px;

          color: var(--svc-blue);
          background: #eff0ff;
        }

        .sh-svc-empty h2 {
          margin: 0;

          color: var(--svc-ink);
          font-size: 22px;
          font-weight: 750;
          letter-spacing: -0.04em;
        }

        .sh-svc-empty p {
          max-width: 480px;
          margin: 10px 0 0;

          color: var(--svc-text);
          font-size: 13px;
          line-height: 1.8;
        }

        /* ==================================================
           NEW SECTION — CONNECTED WORKFLOW
        ================================================== */

        .sh-svc-workflow {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          padding: clamp(76px, 9vw, 116px) 0;

          color: #ffffff;

          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(119, 117, 255, 0.17),
              transparent 39%
            ),
            radial-gradient(
              ellipse at 100% 100%,
              rgba(66, 213, 232, 0.10),
              transparent 38%
            ),
            #101a36;
        }

        .sh-svc-workflow::before {
          content: "";

          position: absolute;
          z-index: -1;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.022) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.022) 1px,
              transparent 1px
            );

          background-size: 46px 46px;

          mask-image: linear-gradient(
            to bottom,
            transparent,
            #000 15%,
            #000 82%,
            transparent
          );

          pointer-events: none;
        }

        .sh-svc-workflow-glow {
          position: absolute;
          z-index: -1;

          width: 330px;
          height: 330px;

          border-radius: 50%;

          background: rgba(119, 117, 255, 0.10);
          filter: blur(75px);

          pointer-events: none;
        }

        .sh-svc-workflow-glow.one {
          top: -200px;
          right: 15%;
        }

        .sh-svc-workflow-glow.two {
          bottom: -220px;
          left: 10%;
          background: rgba(66, 213, 232, 0.07);
        }

        .sh-svc-workflow-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(250px, 400px);
          align-items: end;
          gap: 38px;

          margin-bottom: 44px;
        }

        .sh-svc-workflow .sh-svc-eyebrow {
          color: var(--svc-cyan);
        }

        .sh-svc-workflow .sh-svc-eyebrow::before {
          background: linear-gradient(
            90deg,
            var(--svc-cyan),
            var(--svc-violet)
          );
        }

        .sh-svc-workflow-title {
          max-width: 720px;
          margin: 0;

          color: #ffffff;
          font-size: clamp(32px, 4.5vw, 53px);
          font-weight: 750;
          line-height: 1.08;
          letter-spacing: -0.06em;
          text-wrap: balance;
        }

        .sh-svc-workflow-title span {
          color: var(--svc-cyan);
        }

        .sh-svc-workflow-description {
          max-width: 390px;
          margin: 0 0 5px;

          color: #b7c3df;
          font-size: 13px;
          line-height: 1.9;
        }

        .sh-svc-workflow-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .sh-svc-workflow-step {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          min-width: 0;
          min-height: 295px;
          padding: 22px 20px;

          border: 1px solid rgba(190, 204, 255, 0.14);
          border-radius: 19px;

          background: rgba(255, 255, 255, 0.035);

          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);

          transition:
            transform 260ms ease,
            border-color 260ms ease,
            background 260ms ease,
            box-shadow 260ms ease;
        }

        .sh-svc-workflow-step:hover {
          transform: translateY(-6px);

          border-color: rgba(83, 222, 236, 0.34);
          background: rgba(255, 255, 255, 0.065);

          box-shadow: 0 22px 45px rgba(0, 0, 0, 0.15);
        }

        .sh-svc-step-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;

          width: 100%;
          margin-bottom: 25px;
        }

        .sh-svc-step-number {
          color: #9ba8c8;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
          font-variant-numeric: tabular-nums;
        }

        .sh-svc-step-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 46px;
          height: 46px;

          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 14px;

          transition:
            transform 250ms ease,
            border-color 250ms ease;
        }

        .sh-svc-workflow-step:hover .sh-svc-step-icon {
          transform: rotate(-4deg) scale(1.04);
          border-color: rgba(83, 222, 236, 0.38);
        }

        .sh-svc-workflow-step[data-accent="violet"] .sh-svc-step-icon {
          color: #aaa5ff;
          background: rgba(119, 117, 255, 0.13);
        }

        .sh-svc-workflow-step[data-accent="cyan"] .sh-svc-step-icon {
          color: #75e6f2;
          background: rgba(66, 213, 232, 0.10);
        }

        .sh-svc-workflow-step[data-accent="blue"] .sh-svc-step-icon {
          color: #99b8ff;
          background: rgba(91, 132, 255, 0.12);
        }

        .sh-svc-workflow-step[data-accent="mint"] .sh-svc-step-icon {
          color: var(--svc-mint);
          background: rgba(128, 240, 209, 0.10);
        }

        .sh-svc-workflow-step h3 {
          margin: 0;

          color: #ffffff;
          font-size: 22px;
          font-weight: 750;
          letter-spacing: -0.045em;
          line-height: 1.2;
        }

        .sh-svc-step-subtitle {
          display: block;
          margin-top: 8px;

          color: var(--svc-cyan);
          font-size: 11px;
          font-weight: 650;
          line-height: 1.6;
        }

        .sh-svc-step-description {
          margin: 14px 0 0;

          color: #aebbd7;
          font-size: 11px;
          line-height: 1.9;
        }

        .sh-svc-workflow-bottom {
          display: flex;
          align-items: center;
          gap: 12px;

          margin-top: 30px;
          padding-top: 24px;

          border-top: 1px solid rgba(190, 204, 255, 0.13);

          color: #b1bdd9;
          font-size: 11px;
          line-height: 1.8;
        }

        .sh-svc-workflow-bottom svg {
          flex: 0 0 auto;
          color: var(--svc-cyan);
        }

        .sh-svc-workflow-bottom span {
          flex: 1;
        }

        /* ==================================================
           RESPONSIVE — LAPTOP
        ================================================== */

        @media (max-width: 1100px) {
          .sh-svc-container {
            width: calc(100% - 48px);
          }

          .sh-svc-directory::before {
            width: calc(100% - 48px);
          }

          .sh-svc-card {
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          }

          .sh-svc-visual {
            min-height: 350px;
          }

          .sh-svc-content {
            padding: 28px;
          }

          .sh-svc-title {
            font-size: 27px;
          }

          .sh-svc-capabilities {
            gap: 8px 10px;
          }

          .sh-svc-workflow-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .sh-svc-workflow-step {
            min-height: 250px;
          }
        }

        /* ==================================================
           RESPONSIVE — TABLET
        ================================================== */

        @media (max-width: 760px) {
          .sh-svc-container {
            width: calc(100% - 40px);
          }

          .sh-svc-directory {
            padding: 56px 0 70px;
          }

          .sh-svc-directory::before {
            width: calc(100% - 40px);
          }

          .sh-svc-section-intro {
            align-items: flex-start;
            flex-direction: column;
            gap: 23px;

            margin-bottom: 30px;
          }

          .sh-svc-intro-title {
            font-size: clamp(31px, 6.5vw, 44px);
          }

          .sh-svc-intro-description {
            margin-top: 13px;
            font-size: 13px;
          }

          .sh-svc-overview-card {
            padding: 12px 14px;
          }

          .sh-svc-list {
            gap: 21px;
          }

          .sh-svc-card {
            grid-template-columns: minmax(0, 1fr);
            border-radius: 21px;
          }

          .sh-svc-card.is-reversed .sh-svc-visual,
          .sh-svc-card.is-reversed .sh-svc-content {
            order: initial;
          }

          .sh-svc-visual {
            min-height: clamp(245px, 48vw, 350px);
          }

          .sh-svc-content {
            padding: 27px;
          }

          .sh-svc-card-top {
            margin-bottom: 20px;
          }

          .sh-svc-title {
            font-size: clamp(25px, 4vw, 31px);
          }

          .sh-svc-summary {
            margin-top: 11px;
            font-size: 13px;
          }

          .sh-svc-capabilities-heading {
            margin-top: 22px;
          }

          .sh-svc-card-divider {
            margin-top: 23px;
          }

          .sh-svc-workflow {
            padding: 74px 0;
          }

          .sh-svc-workflow-header {
            grid-template-columns: minmax(0, 1fr);
            gap: 17px;

            margin-bottom: 33px;
          }

          .sh-svc-workflow-description {
            max-width: 590px;
          }

          .sh-svc-workflow-step {
            min-height: 245px;
          }
        }

        /* ==================================================
           RESPONSIVE — MOBILE
        ================================================== */

        @media (max-width: 540px) {
          .sh-svc-container {
            width: calc(100% - 32px);
          }

          .sh-svc-directory {
            padding: 47px 0 58px;
          }

          .sh-svc-directory::before {
            width: calc(100% - 32px);
          }

          .sh-svc-eyebrow {
            margin-bottom: 12px;
            font-size: 9px;
            letter-spacing: 0.13em;
          }

          .sh-svc-intro-title {
            font-size: clamp(29px, 8vw, 38px);
            line-height: 1.12;
          }

          .sh-svc-intro-description {
            font-size: 12px;
            line-height: 1.85;
          }

          .sh-svc-overview-card {
            gap: 10px;
            padding: 11px 13px;
          }

          .sh-svc-overview-icon {
            width: 37px;
            height: 37px;
            border-radius: 11px;
          }

          .sh-svc-overview-number {
            font-size: 19px;
          }

          .sh-svc-list {
            gap: 17px;
          }

          .sh-svc-card {
            border-radius: 17px;
          }

          .sh-svc-visual {
            min-height: 250px;
          }

          .sh-svc-visual-top {
            top: 15px;
            left: 15px;
            right: 15px;
          }

          .sh-svc-image-tag {
            padding: 8px 10px;
            font-size: 8px;
          }

          .sh-svc-visual-bottom {
            left: 17px;
            right: 17px;
            bottom: 17px;
            gap: 12px;
          }

          .sh-svc-visual-caption {
            font-size: 21px;
          }

          .sh-svc-visual-arrow {
            width: 38px;
            height: 38px;
            border-radius: 12px;
          }

          .sh-svc-content {
            padding: 20px;
          }

          .sh-svc-card-top {
            margin-bottom: 19px;
          }

          .sh-svc-icon-wrap {
            width: 51px;
            height: 51px;
            border-radius: 15px;
          }

          .sh-svc-index {
            font-size: 9px;
          }

          .sh-svc-index-line {
            width: 16px;
          }

          .sh-svc-title {
            font-size: 25px;
            line-height: 1.15;
          }

          .sh-svc-summary {
            font-size: 12px;
            line-height: 1.85;
          }

          .sh-svc-capabilities-heading {
            margin-top: 21px;
            margin-bottom: 12px;
            font-size: 9px;
          }

          .sh-svc-capabilities {
            gap: 10px 8px;
          }

          .sh-svc-capability {
            gap: 6px;
            font-size: 10px;
            line-height: 1.7;
          }

          .sh-svc-capability-icon {
            width: 16px;
            height: 16px;
          }

          .sh-svc-card-divider {
            margin-top: 22px;
            margin-bottom: 16px;
          }

          .sh-svc-card-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 14px;
          }

          .sh-svc-footer-note {
            max-width: none;
            font-size: 10px;
          }

          .sh-svc-view-link {
            min-height: 42px;
            padding: 11px 15px;
          }

          .sh-svc-workflow {
            padding: 58px 0;
          }

          .sh-svc-workflow-title {
            font-size: clamp(30px, 8vw, 38px);
            line-height: 1.12;
          }

          .sh-svc-workflow-description {
            font-size: 12px;
            line-height: 1.85;
          }

          .sh-svc-workflow-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
          }

          .sh-svc-workflow-step {
            min-height: auto;
            padding: 20px;
          }

          .sh-svc-step-top {
            margin-bottom: 18px;
          }

          .sh-svc-workflow-step h3 {
            font-size: 21px;
          }

          .sh-svc-step-description {
            margin-top: 11px;
            font-size: 11px;
          }

          .sh-svc-workflow-bottom {
            align-items: flex-start;
            margin-top: 23px;
            padding-top: 19px;
            font-size: 10px;
          }

          .sh-svc-workflow-glow {
            width: 230px;
            height: 230px;
            filter: blur(55px);
          }
        }

        @media (max-width: 360px) {
          .sh-svc-container {
            width: calc(100% - 26px);
          }

          .sh-svc-intro-title,
          .sh-svc-workflow-title {
            font-size: 29px;
          }

          .sh-svc-content {
            padding: 17px;
          }

          .sh-svc-title {
            font-size: 23px;
          }

          .sh-svc-capabilities {
            grid-template-columns: minmax(0, 1fr);
          }

          .sh-svc-visual {
            min-height: 225px;
          }
        }

        /* ==================================================
           REDUCED MOTION ACCESSIBILITY
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .sh-services-page *,
          .sh-services-page *::before,
          .sh-services-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ==================================================
          1. HERO
      ================================================== */}

      <PageHero
        eyebrow="Services"
        title="Connected capabilities for modern organisations."
        lead="Choose a single practice or combine capabilities into a coordinated roadmap. Every service is designed to fit into the bigger picture."
        image={cloud}
      />

      {/* ==================================================
          2. SERVICE DIRECTORY
      ================================================== */}

      <section
        className="sh-svc-directory"
        aria-labelledby="sh-svc-directory-title"
      >
        <div className="sh-svc-container">
          <Reveal>
            <div className="sh-svc-section-intro">
              <div className="sh-svc-intro-copy">
                <span className="sh-svc-eyebrow">
                  What we do
                </span>

                <h2
                  id="sh-svc-directory-title"
                  className="sh-svc-intro-title"
                >
                  One ecosystem.
                  <br />
                  <span>Connected expertise.</span>
                </h2>

                <p className="sh-svc-intro-description">
                  Explore our technology practices, understand
                  their individual capabilities and find the
                  services most relevant to your organisation.
                </p>
              </div>

              <motion.div
                className="sh-svc-overview-card"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 14 }
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
                  duration: reduceMotion ? 0 : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="sh-svc-overview-icon">
                  <Layers3
                    size={21}
                    aria-hidden="true"
                  />
                </span>

                <span className="sh-svc-overview-copy">
                  <span className="sh-svc-overview-number">
                    {serviceCountLabel}
                  </span>
                  <span className="sh-svc-overview-label">
                    Technology practices
                  </span>
                </span>
              </motion.div>
            </div>
          </Reveal>

          {/* SERVICE CARDS */}

          {hasServices ? (
            <div className="sh-svc-list">
              {SERVICE_LIST.map((service, index) => {
                const capabilities = Array.isArray(
                  service.capabilities,
                )
                  ? service.capabilities.filter(
                      (capability) =>
                        typeof capability === "string" &&
                        capability.trim().length > 0,
                    )
                  : [];

                const isReversed = index % 2 === 1;

                const displayCapabilities =
                  capabilities.slice(0, 4);

                return (
                  <Reveal
                    key={service.slug}
                    delay={
                      reduceMotion
                        ? 0
                        : Math.min(index * 0.045, 0.18)
                    }
                  >
                    <article
                      className={cn(
                        "sh-svc-card",
                        isReversed && "is-reversed",
                      )}
                    >
                      {/* VISUAL PANEL */}

                      <div className="sh-svc-visual">
                        <img
                          src={service.image || cloud}
                          alt={`${service.title} service`}
                          loading={index === 0 ? "eager" : "lazy"}
                          width={1280}
                          height={960}
                          className="sh-svc-image"
                        />

                        <div
                          className="sh-svc-image-glow"
                          aria-hidden="true"
                        />

                        <div className="sh-svc-visual-top">
                          <span className="sh-svc-image-tag">
                            <span
                              className="sh-svc-tag-dot"
                              aria-hidden="true"
                            />
                            Smart H / Services
                          </span>

                          <span className="sh-svc-image-index">
                            {String(index + 1).padStart(2, "0")} /{" "}
                            {serviceCountLabel}
                          </span>
                        </div>

                        <div className="sh-svc-visual-bottom">
                          <div className="sh-svc-visual-bottom-copy">
                            <span className="sh-svc-visual-kicker">
                              Technology practice
                            </span>

                            <h3 className="sh-svc-visual-caption">
                              {service.title}
                            </h3>
                          </div>

                          <span className="sh-svc-visual-arrow">
                            <ArrowUpRight
                              size={20}
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>

                      {/* SERVICE INFORMATION */}

                      <div className="sh-svc-content">
                        <div className="sh-svc-card-top">
                          <span className="sh-svc-icon-wrap">
                            <ThreeDIcon
                              type={service.icon}
                              size={46}
                            />
                          </span>

                          <span className="sh-svc-index">
                            <span className="sh-svc-index-line" />
                            PRACTICE{" "}
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h2 className="sh-svc-title">
                          {service.title}
                        </h2>

                        <p className="sh-svc-summary">
                          {service.summary ||
                            `Explore how Smart H approaches ${service.title.toLowerCase()} as part of a connected technology strategy.`}
                        </p>

                        {displayCapabilities.length > 0 && (
                          <>
                            <h3 className="sh-svc-capabilities-heading">
                              <Sparkles
                                size={15}
                                aria-hidden="true"
                              />
                              Key capabilities
                            </h3>

                            <ul className="sh-svc-capabilities">
                              {displayCapabilities.map(
                                (capability) => (
                                  <li
                                    key={capability}
                                    className="sh-svc-capability"
                                  >
                                    <span className="sh-svc-capability-icon">
                                      <Check
                                        aria-hidden="true"
                                      />
                                    </span>

                                    <span>{capability}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </>
                        )}

                        <div className="sh-svc-card-divider" />

                        <div className="sh-svc-card-footer">
                          <span className="sh-svc-footer-note">
                            Explore the practice, capabilities
                            and relevant solutions.
                          </span>

                          <Link
                            to="/services/$slug"
                            params={{
                              slug: service.slug,
                            }}
                            className={cn(
                              buttonStyles({
                                variant: "primary",
                              }),
                              "sh-svc-view-link",
                            )}
                          >
                            <span>Explore service</span>

                            <ArrowRight
                              size={16}
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="sh-svc-empty">
              <span className="sh-svc-empty-icon">
                <Layers3
                  size={24}
                  aria-hidden="true"
                />
              </span>

              <h2>Services are being prepared.</h2>

              <p>
                Service information is not available right now.
                Please check back later or contact Smart H to
                discuss your technology requirements.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          3. NEW SECTION — HOW SERVICES WORK TOGETHER
      ================================================== */}

      <section
        className="sh-svc-workflow"
        aria-labelledby="sh-svc-workflow-title"
      >
        <div
          className="sh-svc-workflow-glow one"
          aria-hidden="true"
        />

        <div
          className="sh-svc-workflow-glow two"
          aria-hidden="true"
        />

        <div className="sh-svc-container">
          <Reveal>
            <div className="sh-svc-workflow-header">
              <div>
                <span className="sh-svc-eyebrow">
                  A connected way of working
                </span>

                <h2
                  id="sh-svc-workflow-title"
                  className="sh-svc-workflow-title"
                >
                  From complex challenges
                  <br />
                  to <span>clear next steps.</span>
                </h2>
              </div>

              <p className="sh-svc-workflow-description">
                Technology works best when the strategy, systems
                and implementation support the same objective.
                Our approach connects the important stages of
                a technology engagement.
              </p>
            </div>
          </Reveal>

          <div className="sh-svc-workflow-grid">
            {WORKFLOW_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  className="sh-svc-workflow-step"
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
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion
                      ? 0
                      : index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="sh-svc-step-top">
                    <span className="sh-svc-step-number">
                      STEP / {step.number}
                    </span>

                    <span className="sh-svc-step-icon">
                      <Icon
                        size={22}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <h3>{step.title}</h3>

                  <span className="sh-svc-step-subtitle">
                    {step.subtitle}
                  </span>

                  <p className="sh-svc-step-description">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <Reveal delay={0.08}>
            <div className="sh-svc-workflow-bottom">
              <ShieldCheck
                size={19}
                aria-hidden="true"
              />

              <span>
                The right combination of services depends on
                your goals, current environment and priorities.
              </span>

              <ArrowUpRight
                size={18}
                aria-hidden="true"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          4. EXISTING CONTACT CTA
      ================================================== */}

      <CtaBand />
    </main>
  );
}