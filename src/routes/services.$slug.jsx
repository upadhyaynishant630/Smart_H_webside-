import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleAlert,
  Compass,
  Layers3,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

import {
  ButtonLink,
  CtaBand,
  PageHero,
  Reveal,
} from "@/components/ui/brand";

import { ServiceCard } from "@/components/ui/cards";
import {
  deliveryProcess,
  getService,
  services,
} from "@/data/services";

/* ======================================================
   ROUTE CONFIGURATION + SEO
====================================================== */

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);

    if (!service) {
      throw notFound();
    }

    return { service };
  },

  head: ({ loaderData }) => {
    const service = loaderData?.service;

    const title = service
      ? `${service.title} — SmartEDGE`
      : "Service — SmartEDGE";

    const description =
      service?.summary ||
      "Explore SmartEDGE's technology services, capabilities and delivery approach.";

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
          content: "website",
        },
      ],
    };
  },

  component: ServiceDetail,
});

/* ======================================================
   HELPERS
====================================================== */

const safeArray = (value) =>
  Array.isArray(value) ? value.filter(Boolean) : [];

const safeString = (value) =>
  typeof value === "string" ? value.trim() : "";

const APPROACH_ICONS = [
  Compass,
  Target,
  Workflow,
  ShieldCheck,
];

/* ======================================================
   SERVICE DETAIL PAGE
====================================================== */

function ServiceDetail() {
  const { service } = Route.useLoaderData();

  const reduceMotion = useReducedMotion();

  const challenges = safeArray(service.challenges);
  const capabilities = safeArray(service.capabilities);
  const outcomes = safeArray(service.outcomes);

  const processSteps = safeArray(deliveryProcess).filter(
    (step) => step && step.title,
  );

  const related = useMemo(() => {
    if (!Array.isArray(services)) return [];

    const available = services.filter(
      (item) =>
        item &&
        item.slug &&
        item.title &&
        item.slug !== service.slug,
    );

    const cleanEnergySlugs = [
      "solar-energy-solutions",
      "ev-charging-infrastructure",
    ];

    // Keep the two sustainability-oriented offerings connected to each other.
    if (cleanEnergySlugs.includes(service.slug)) {
      return available
        .slice()
        .sort((a, b) => {
          const aPreferred = cleanEnergySlugs.includes(a.slug) ? 0 : 1;
          const bPreferred = cleanEnergySlugs.includes(b.slug) ? 0 : 1;
          return aPreferred - bPreferred;
        })
        .slice(0, 3);
    }

    return available.slice(0, 3);
  }, [service.slug]);

  const overview =
    safeString(service.overview) ||
    safeString(service.summary);

  return (
    <main className="sh-service-detail">
      <style>{`
        /* ==================================================
           SmartEDGE SERVICE DETAIL — CORE DESIGN
        ================================================== */

        .sh-service-detail {
          --sd-ink: #101a36;
          --sd-ink-light: #1b294d;
          --sd-blue: #243ec8;
          --sd-violet: #7775ff;
          --sd-cyan: #42d5e8;
          --sd-mint: #80f0d1;
          --sd-text: #505b74;
          --sd-muted: #7b849b;
          --sd-line: rgba(16, 26, 54, 0.10);
          --sd-surface: #f5f7fc;
          --sd-white: #ffffff;

          width: 100%;
          min-width: 0;
          position: relative;
          isolation: isolate;
          overflow: clip;

          color: var(--sd-ink);
          background: #ffffff;
        }

        .sh-service-detail *,
        .sh-service-detail *::before,
        .sh-service-detail *::after {
          box-sizing: border-box;
        }

        .sh-service-detail a {
          text-decoration: none;
        }

        .sh-service-detail img {
          display: block;
          max-width: 100%;
        }

        .sh-service-detail button {
          font: inherit;
        }

        .sh-service-detail a:focus-visible,
        .sh-service-detail button:focus-visible {
          outline: 3px solid var(--sd-cyan);
          outline-offset: 4px;
        }

        .sh-sd-container {
          width: min(1220px, calc(100% - 64px));
          margin-inline: auto;
        }

        /* ==================================================
           OVERVIEW SECTION
        ================================================== */

        .sh-sd-overview {
          position: relative;

          padding: clamp(62px, 7.5vw, 96px) 0
            clamp(76px, 8vw, 104px);

          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(119, 117, 255, 0.055),
              transparent 35%
            ),
            #ffffff;
        }

        .sh-sd-overview::before {
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

        .sh-sd-section-heading {
          max-width: 800px;
          margin-bottom: 37px;
        }

        .sh-sd-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          margin-bottom: 16px;

          color: var(--sd-blue);
          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .sh-sd-eyebrow::before {
          content: "";

          width: 22px;
          height: 2px;

          border-radius: 99px;

          background: linear-gradient(
            90deg,
            var(--sd-blue),
            var(--sd-cyan)
          );
        }

        .sh-sd-section-title {
          margin: 0;

          color: var(--sd-ink);
          font-size: clamp(30px, 4.1vw, 46px);
          font-weight: 750;
          line-height: 1.1;
          letter-spacing: -0.055em;
          text-wrap: balance;
        }

        .sh-sd-section-title span {
          color: var(--sd-blue);
        }

        .sh-sd-section-description {
          max-width: 670px;
          margin: 15px 0 0;

          color: var(--sd-text);
          font-size: 14px;
          line-height: 1.9;
        }

        .sh-sd-overview-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          align-items: stretch;
          gap: 23px;
        }

        /* Overview card */

        .sh-sd-overview-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          min-width: 0;
          padding: clamp(28px, 3.4vw, 43px);

          border: 1px solid rgba(119, 117, 255, 0.16);
          border-radius: 24px;

          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(119, 117, 255, 0.105),
              transparent 43%
            ),
            linear-gradient(
              145deg,
              #ffffff 0%,
              #fafbff 100%
            );

          box-shadow:
            0 12px 36px rgba(16, 26, 54, 0.035),
            inset 0 1px 0 #ffffff;
        }

        .sh-sd-overview-card::after {
          content: "";

          position: absolute;
          z-index: -1;
          right: -65px;
          bottom: -75px;

          width: 185px;
          height: 185px;

          border: 1px solid rgba(119, 117, 255, 0.09);
          border-radius: 50%;

          box-shadow:
            0 0 0 24px rgba(119, 117, 255, 0.025),
            0 0 0 48px rgba(119, 117, 255, 0.018);

          pointer-events: none;
        }

        .sh-sd-overview-icon {
          display: grid;
          place-items: center;

          width: 52px;
          height: 52px;
          margin-bottom: 25px;

          border: 1px solid rgba(119, 117, 255, 0.16);
          border-radius: 16px;

          color: var(--sd-blue);

          background: linear-gradient(
            135deg,
            rgba(119, 117, 255, 0.12),
            rgba(66, 213, 232, 0.08)
          );
        }

        .sh-sd-overview-card h2 {
          max-width: 540px;
          margin: 0;

          color: var(--sd-ink);
          font-size: clamp(23px, 2.7vw, 32px);
          font-weight: 750;
          line-height: 1.2;
          letter-spacing: -0.05em;
          overflow-wrap: anywhere;
        }

        .sh-sd-overview-card p {
          position: relative;
          z-index: 1;

          margin: 16px 0 0;

          color: var(--sd-text);
          font-size: 14px;
          line-height: 1.95;

          overflow-wrap: anywhere;
          white-space: pre-line;
        }

        .sh-sd-overview-bottom {
          display: flex;
          align-items: center;
          gap: 10px;

          margin-top: 26px;
          padding-top: 19px;

          border-top: 1px solid rgba(16, 26, 54, 0.09);

          color: #59647d;
          font-size: 11px;
          font-weight: 600;
          line-height: 1.75;
        }

        .sh-sd-overview-bottom svg {
          flex: 0 0 auto;
          color: var(--sd-blue);
        }

        /* Challenges card */

        .sh-sd-challenges-card {
          min-width: 0;
          padding: clamp(26px, 3.1vw, 37px);

          border: 1px solid rgba(16, 26, 54, 0.09);
          border-radius: 24px;

          background: #ffffff;

          box-shadow:
            0 12px 36px rgba(16, 26, 54, 0.035),
            inset 0 1px 0 #ffffff;
        }

        .sh-sd-card-heading {
          display: flex;
          align-items: flex-start;
          gap: 14px;

          margin-bottom: 24px;
        }

        .sh-sd-card-heading-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 47px;
          height: 47px;

          border: 1px solid rgba(249, 146, 88, 0.16);
          border-radius: 14px;

          color: #c77a32;
          background: #fff5eb;
        }

        .sh-sd-card-heading h2 {
          margin: 2px 0 0;

          color: var(--sd-ink);
          font-size: 22px;
          font-weight: 750;
          line-height: 1.2;
          letter-spacing: -0.04em;
        }

        .sh-sd-card-heading p {
          margin: 7px 0 0;

          color: var(--sd-muted);
          font-size: 11px;
          line-height: 1.75;
        }

        .sh-sd-challenge-list {
          display: flex;
          flex-direction: column;
          gap: 10px;

          margin: 0;
          padding: 0;

          list-style: none;
        }

        .sh-sd-challenge-item {
          display: grid;
          grid-template-columns: 35px minmax(0, 1fr);
          align-items: start;
          gap: 12px;

          min-width: 0;
          padding: 13px 12px;

          border: 1px solid rgba(16, 26, 54, 0.065);
          border-radius: 13px;

          background: #fafbfe;

          transition:
            transform 200ms ease,
            border-color 200ms ease,
            background 200ms ease;
        }

        .sh-sd-challenge-item:hover {
          transform: translateX(3px);

          border-color: rgba(249, 146, 88, 0.25);
          background: #fffaf6;
        }

        .sh-sd-challenge-index {
          display: grid;
          place-items: center;

          width: 35px;
          height: 35px;

          border: 1px solid rgba(249, 146, 88, 0.17);
          border-radius: 11px;

          color: #b56c2c;
          background: #fff4e9;

          font-size: 10px;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
        }

        .sh-sd-challenge-text {
          min-width: 0;
          padding-top: 2px;

          color: #536079;
          font-size: 12px;
          line-height: 1.8;

          overflow-wrap: anywhere;
          white-space: pre-line;
        }

        .sh-sd-no-content {
          padding: 16px;

          border: 1px dashed rgba(16, 26, 54, 0.13);
          border-radius: 13px;

          color: var(--sd-muted);
          background: #fafbfe;

          font-size: 12px;
          line-height: 1.8;
        }

        /* ==================================================
           DARK CAPABILITIES + DELIVERABLES SECTION
        ================================================== */

        .sh-sd-included {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          padding: clamp(74px, 8.5vw, 106px) 0;

          color: #ffffff;

          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(119, 117, 255, 0.17),
              transparent 38%
            ),
            radial-gradient(
              ellipse at 100% 100%,
              rgba(66, 213, 232, 0.09),
              transparent 38%
            ),
            #101a36;
        }

        .sh-sd-included::before {
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

          background-size: 46px 46px;

          mask-image: linear-gradient(
            to bottom,
            transparent,
            #000 15%,
            #000 85%,
            transparent
          );

          pointer-events: none;
        }

        .sh-sd-included-orb {
          position: absolute;
          z-index: -1;

          width: 320px;
          height: 320px;

          border-radius: 50%;

          background: rgba(119, 117, 255, 0.09);
          filter: blur(75px);

          pointer-events: none;
        }

        .sh-sd-included-orb.one {
          top: -220px;
          right: 10%;
        }

        .sh-sd-included-orb.two {
          bottom: -230px;
          left: 8%;
          background: rgba(66, 213, 232, 0.07);
        }

        .sh-sd-included-header {
          max-width: 770px;
          margin-bottom: 42px;
        }

        .sh-sd-included .sh-sd-eyebrow {
          color: var(--sd-cyan);
        }

        .sh-sd-included .sh-sd-eyebrow::before {
          background: linear-gradient(
            90deg,
            var(--sd-cyan),
            var(--sd-violet)
          );
        }

        .sh-sd-included-title {
          margin: 0;

          color: #ffffff;
          font-size: clamp(31px, 4.4vw, 49px);
          font-weight: 750;
          line-height: 1.1;
          letter-spacing: -0.055em;
          text-wrap: balance;
        }

        .sh-sd-included-title span {
          color: var(--sd-cyan);
        }

        .sh-sd-included-description {
          max-width: 650px;
          margin: 16px 0 0;

          color: #b6c1dd;
          font-size: 13px;
          line-height: 1.9;
        }

        .sh-sd-included-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: stretch;
          gap: 22px;
        }

        .sh-sd-included-card {
          display: flex;
          flex-direction: column;

          min-width: 0;
          padding: clamp(24px, 3vw, 34px);

          border: 1px solid rgba(190, 204, 255, 0.14);
          border-radius: 22px;

          background: rgba(255, 255, 255, 0.045);

          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045);

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .sh-sd-included-card-heading {
          display: flex;
          align-items: center;
          gap: 14px;

          margin-bottom: 27px;
        }

        .sh-sd-included-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 49px;
          height: 49px;

          border: 1px solid rgba(83, 222, 236, 0.20);
          border-radius: 15px;

          color: var(--sd-cyan);
          background: rgba(66, 213, 232, 0.085);
        }

        .sh-sd-included-card-heading h3 {
          margin: 0;

          color: #ffffff;
          font-size: 21px;
          font-weight: 750;
          line-height: 1.2;
          letter-spacing: -0.04em;
        }

        .sh-sd-included-card-heading p {
          margin: 6px 0 0;

          color: #a9b7d5;
          font-size: 11px;
          line-height: 1.7;
        }

        .sh-sd-capability-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-content: start;
          gap: 10px;
        }

        .sh-sd-capability {
          display: flex;
          align-items: flex-start;
          gap: 10px;

          min-width: 0;
          padding: 13px 12px;

          border: 1px solid rgba(190, 204, 255, 0.11);
          border-radius: 13px;

          color: #c4cee5;
          background: rgba(255, 255, 255, 0.025);

          font-size: 11px;
          line-height: 1.75;

          overflow-wrap: anywhere;

          transition:
            background 200ms ease,
            border-color 200ms ease,
            transform 200ms ease;
        }

        .sh-sd-capability:hover {
          transform: translateY(-2px);

          border-color: rgba(83, 222, 236, 0.22);
          background: rgba(255, 255, 255, 0.06);
        }

        .sh-sd-capability-check {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 18px;
          height: 18px;
          margin-top: 1px;

          border: 1px solid rgba(83, 222, 236, 0.20);
          border-radius: 50%;

          color: var(--sd-cyan);
          background: rgba(66, 213, 232, 0.08);
        }

        .sh-sd-capability-check svg {
          width: 11px;
          height: 11px;
        }

        /* Deliverables */

        .sh-sd-outcome-list {
          display: flex;
          flex-direction: column;
          gap: 11px;

          margin: 0;
          padding: 0;

          list-style: none;
        }

        .sh-sd-outcome-item {
          display: grid;
          grid-template-columns: 38px minmax(0, 1fr);
          align-items: center;
          gap: 14px;

          min-width: 0;
          padding: 15px;

          border: 1px solid rgba(190, 204, 255, 0.12);
          border-radius: 14px;

          color: #d2daf0;
          background: rgba(255, 255, 255, 0.03);

          font-size: 12px;
          line-height: 1.8;

          overflow-wrap: anywhere;

          transition:
            border-color 200ms ease,
            background 200ms ease,
            transform 200ms ease;
        }

        .sh-sd-outcome-item:hover {
          transform: translateX(3px);

          border-color: rgba(119, 117, 255, 0.35);
          background: rgba(255, 255, 255, 0.065);
        }

        .sh-sd-outcome-number {
          display: grid;
          place-items: center;

          width: 38px;
          height: 38px;

          border: 1px solid rgba(119, 117, 255, 0.23);
          border-radius: 12px;

          color: #a8a4ff;
          background: rgba(119, 117, 255, 0.095);

          font-size: 11px;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
        }

        .sh-sd-included-empty {
          grid-column: 1 / -1;

          padding: 20px;

          border: 1px dashed rgba(190, 204, 255, 0.16);
          border-radius: 14px;

          color: #aebbd7;
          background: rgba(255, 255, 255, 0.025);

          font-size: 12px;
          line-height: 1.8;
        }

        /* ==================================================
           DELIVERY PROCESS
        ================================================== */

        .sh-sd-process {
          position: relative;
          padding: clamp(76px, 8.5vw, 108px) 0;

          background:
            radial-gradient(
              ellipse at 100% 0%,
              rgba(119, 117, 255, 0.055),
              transparent 34%
            ),
            #ffffff;
        }

        .sh-sd-process-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;

          margin-bottom: 43px;
        }

        .sh-sd-process-heading {
          max-width: 720px;
        }

        .sh-sd-process-description {
          max-width: 350px;
          margin: 0 0 3px;

          color: var(--sd-text);
          font-size: 12px;
          line-height: 1.9;
        }

        .sh-sd-process-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .sh-sd-process-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          display: flex;
          flex-direction: column;

          min-width: 0;
          min-height: 264px;
          padding: 23px 20px;

          border: 1px solid rgba(16, 26, 54, 0.09);
          border-radius: 18px;

          background: #ffffff;

          box-shadow:
            0 8px 26px rgba(16, 26, 54, 0.03),
            inset 0 1px 0 #ffffff;

          transition:
            transform 250ms ease,
            border-color 250ms ease,
            box-shadow 250ms ease;
        }

        .sh-sd-process-card::after {
          content: "";

          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          right: 0;

          height: 3px;

          background: linear-gradient(
            90deg,
            var(--sd-violet),
            var(--sd-cyan)
          );

          transform: scaleX(0);
          transform-origin: left center;

          transition: transform 260ms ease;
        }

        .sh-sd-process-card:hover {
          transform: translateY(-5px);

          border-color: rgba(119, 117, 255, 0.2);

          box-shadow: 0 19px 43px rgba(16, 26, 54, 0.065);
        }

        .sh-sd-process-card:hover::after {
          transform: scaleX(1);
        }

        .sh-sd-process-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;

          margin-bottom: 27px;
        }

        .sh-sd-process-number {
          color: var(--sd-muted);

          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.12em;
          font-variant-numeric: tabular-nums;
        }

        .sh-sd-process-icon {
          display: grid;
          place-items: center;

          width: 43px;
          height: 43px;

          border: 1px solid rgba(119, 117, 255, 0.13);
          border-radius: 13px;

          color: var(--sd-blue);
          background: #eff0ff;

          transition:
            transform 250ms ease,
            background 250ms ease;
        }

        .sh-sd-process-card:hover .sh-sd-process-icon {
          transform: rotate(-4deg) scale(1.04);
          background: #e8ebff;
        }

        .sh-sd-process-card h3 {
          margin: 0;

          color: var(--sd-ink);
          font-size: 20px;
          font-weight: 750;
          line-height: 1.25;
          letter-spacing: -0.04em;

          overflow-wrap: anywhere;
        }

        .sh-sd-process-card p {
          margin: 12px 0 0;

          color: var(--sd-text);
          font-size: 11px;
          line-height: 1.9;

          overflow-wrap: anywhere;
        }

        .sh-sd-process-bottom {
          display: flex;
          align-items: center;
          gap: 12px;

          margin-top: 30px;
          padding-top: 22px;

          border-top: 1px solid var(--sd-line);

          color: var(--sd-muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .sh-sd-process-bottom svg {
          flex: 0 0 auto;
          color: var(--sd-blue);
        }

        /* ==================================================
           RELATED SERVICES
        ================================================== */

        .sh-sd-related {
          padding: clamp(66px, 8vw, 98px) 0;

          border-top: 1px solid rgba(16, 26, 54, 0.055);

          background:
            radial-gradient(
              ellipse at 100% 0%,
              rgba(119, 117, 255, 0.055),
              transparent 36%
            ),
            #f5f7fc;
        }

        .sh-sd-related-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 26px;

          margin-bottom: 34px;
        }

        .sh-sd-related-intro {
          max-width: 700px;
        }

        .sh-sd-related-title {
          margin: 0;

          color: var(--sd-ink);
          font-size: clamp(29px, 3.8vw, 43px);
          font-weight: 750;
          line-height: 1.1;
          letter-spacing: -0.055em;
          text-wrap: balance;
        }

        .sh-sd-related-title span {
          color: var(--sd-blue);
        }

        .sh-sd-related-description {
          margin: 12px 0 0;

          color: var(--sd-text);
          font-size: 13px;
          line-height: 1.85;
        }

        .sh-sd-all-services {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          min-height: 44px;
          padding: 11px 15px;

          flex: 0 0 auto;

          border: 1px solid rgba(16, 26, 54, 0.12);
          border-radius: 100px;

          color: var(--sd-ink);
          background: rgba(255, 255, 255, 0.83);

          font-size: 11px;
          font-weight: 750;
          white-space: nowrap;

          transition:
            transform 180ms ease,
            border-color 180ms ease,
            color 180ms ease,
            background 180ms ease;
        }

        .sh-sd-all-services:hover {
          transform: translateY(-2px);

          color: var(--sd-blue);
          border-color: rgba(36, 62, 200, 0.25);
          background: #ffffff;
        }

        .sh-sd-all-services svg {
          transition: transform 180ms ease;
        }

        .sh-sd-all-services:hover svg {
          transform: translate(2px, -2px);
        }

        .sh-sd-related-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
          gap: 21px;
        }

        .sh-sd-related-card {
          display: flex;
          min-width: 0;

          transition: transform 230ms ease;
        }

        .sh-sd-related-card > * {
          width: 100%;
          min-width: 0;
        }

        .sh-sd-related-card:hover {
          transform: translateY(-4px);
        }

        .sh-sd-related-empty {
          display: flex;
          align-items: flex-start;
          gap: 15px;

          padding: 24px;

          border: 1px dashed rgba(16, 26, 54, 0.15);
          border-radius: 18px;

          background: rgba(255, 255, 255, 0.75);
        }

        .sh-sd-related-empty-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 44px;
          height: 44px;

          border: 1px solid rgba(119, 117, 255, 0.14);
          border-radius: 13px;

          color: var(--sd-blue);
          background: #eff0ff;
        }

        .sh-sd-related-empty h3 {
          margin: 0;

          color: var(--sd-ink);
          font-size: 16px;
          font-weight: 750;
        }

        .sh-sd-related-empty p {
          margin: 7px 0 0;

          color: var(--sd-text);
          font-size: 12px;
          line-height: 1.8;
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1050px) {
          .sh-sd-container {
            width: calc(100% - 48px);
          }

          .sh-sd-overview::before {
            width: calc(100% - 48px);
          }

          .sh-sd-overview-grid {
            gap: 18px;
          }

          .sh-sd-process-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .sh-sd-process-card {
            min-height: 230px;
          }

          .sh-sd-related-grid {
            gap: 16px;
          }

          .sh-sd-included-card {
            padding: 24px;
          }
        }

        /* ==================================================
           SMALL TABLET
        ================================================== */

        @media (max-width: 760px) {
          .sh-sd-container {
            width: calc(100% - 40px);
          }

          .sh-sd-overview {
            padding: 55px 0 72px;
          }

          .sh-sd-overview::before {
            width: calc(100% - 40px);
          }

          .sh-sd-section-heading {
            margin-bottom: 28px;
          }

          .sh-sd-section-title {
            font-size: clamp(30px, 6vw, 40px);
          }

          .sh-sd-section-description {
            font-size: 13px;
          }

          .sh-sd-overview-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }

          .sh-sd-overview-card,
          .sh-sd-challenges-card {
            padding: 25px;
            border-radius: 20px;
          }

          .sh-sd-overview-card p {
            font-size: 13px;
          }

          .sh-sd-included {
            padding: 72px 0;
          }

          .sh-sd-included-header {
            margin-bottom: 30px;
          }

          .sh-sd-included-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }

          .sh-sd-included-card {
            padding: 25px;
            border-radius: 19px;
          }

          .sh-sd-process {
            padding: 70px 0;
          }

          .sh-sd-process-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 17px;

            margin-bottom: 29px;
          }

          .sh-sd-process-description {
            max-width: 600px;
          }

          .sh-sd-related {
            padding: 66px 0;
          }

          .sh-sd-related-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 18px;

            margin-bottom: 26px;
          }

          .sh-sd-related-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 540px) {
          .sh-sd-container {
            width: calc(100% - 32px);
          }

          .sh-sd-overview {
            padding: 46px 0 58px;
          }

          .sh-sd-overview::before {
            width: calc(100% - 32px);
          }

          .sh-sd-eyebrow {
            margin-bottom: 12px;
            font-size: 9px;
            letter-spacing: 0.13em;
          }

          .sh-sd-section-title {
            font-size: clamp(28px, 7.8vw, 36px);
            line-height: 1.12;
          }

          .sh-sd-section-description {
            margin-top: 12px;
            font-size: 12px;
            line-height: 1.85;
          }

          .sh-sd-overview-card,
          .sh-sd-challenges-card {
            padding: 20px;
            border-radius: 17px;
          }

          .sh-sd-overview-icon {
            width: 45px;
            height: 45px;
            margin-bottom: 20px;
            border-radius: 13px;
          }

          .sh-sd-overview-card h2 {
            font-size: 23px;
          }

          .sh-sd-overview-card p {
            margin-top: 13px;
            font-size: 12px;
            line-height: 1.85;
          }

          .sh-sd-overview-bottom {
            align-items: flex-start;
            margin-top: 20px;
            padding-top: 15px;
            font-size: 10px;
          }

          .sh-sd-card-heading {
            gap: 11px;
            margin-bottom: 18px;
          }

          .sh-sd-card-heading-icon {
            width: 41px;
            height: 41px;
            border-radius: 12px;
          }

          .sh-sd-card-heading h2 {
            font-size: 20px;
          }

          .sh-sd-card-heading p {
            font-size: 10px;
          }

          .sh-sd-challenge-list {
            gap: 8px;
          }

          .sh-sd-challenge-item {
            grid-template-columns: 31px minmax(0, 1fr);
            gap: 10px;
            padding: 11px 10px;
          }

          .sh-sd-challenge-index {
            width: 31px;
            height: 31px;
            border-radius: 9px;
            font-size: 9px;
          }

          .sh-sd-challenge-text {
            font-size: 11px;
            line-height: 1.75;
          }

          .sh-sd-included {
            padding: 58px 0;
          }

          .sh-sd-included-title {
            font-size: clamp(29px, 7.8vw, 37px);
            line-height: 1.12;
          }

          .sh-sd-included-description {
            margin-top: 13px;
            font-size: 12px;
          }

          .sh-sd-included-card {
            padding: 19px;
            border-radius: 16px;
          }

          .sh-sd-included-card-heading {
            gap: 11px;
            margin-bottom: 19px;
          }

          .sh-sd-included-icon {
            width: 42px;
            height: 42px;
            border-radius: 13px;
          }

          .sh-sd-included-card-heading h3 {
            font-size: 19px;
          }

          .sh-sd-included-card-heading p {
            font-size: 10px;
          }

          .sh-sd-capability-grid {
            gap: 8px;
          }

          .sh-sd-capability {
            gap: 7px;
            padding: 11px 9px;

            font-size: 10px;
            line-height: 1.7;
          }

          .sh-sd-capability-check {
            width: 16px;
            height: 16px;
          }

          .sh-sd-outcome-list {
            gap: 8px;
          }

          .sh-sd-outcome-item {
            grid-template-columns: 33px minmax(0, 1fr);
            gap: 11px;
            padding: 12px;

            font-size: 11px;
          }

          .sh-sd-outcome-number {
            width: 33px;
            height: 33px;
            border-radius: 10px;
            font-size: 10px;
          }

          .sh-sd-process {
            padding: 57px 0;
          }

          .sh-sd-process-header {
            margin-bottom: 24px;
          }

          .sh-sd-process-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 11px;
          }

          .sh-sd-process-card {
            min-height: 0;
            padding: 19px;
            border-radius: 15px;
          }

          .sh-sd-process-top {
            margin-bottom: 18px;
          }

          .sh-sd-process-icon {
            width: 39px;
            height: 39px;
            border-radius: 12px;
          }

          .sh-sd-process-card h3 {
            font-size: 19px;
          }

          .sh-sd-process-card p {
            margin-top: 9px;
            font-size: 11px;
          }

          .sh-sd-process-bottom {
            align-items: flex-start;
            margin-top: 23px;
            padding-top: 18px;
            font-size: 10px;
          }

          .sh-sd-related {
            padding: 52px 0;
          }

          .sh-sd-related-title {
            font-size: clamp(27px, 7.2vw, 34px);
            line-height: 1.12;
          }

          .sh-sd-related-description {
            font-size: 12px;
          }

          .sh-sd-related-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }

          .sh-sd-related-card:hover {
            transform: translateY(-2px);
          }

          .sh-sd-related-empty {
            gap: 11px;
            padding: 17px;
          }

          .sh-sd-related-empty-icon {
            width: 38px;
            height: 38px;
            border-radius: 11px;
          }

          .sh-sd-related-empty h3 {
            font-size: 14px;
          }

          .sh-sd-related-empty p {
            font-size: 11px;
          }

          .sh-sd-included-orb {
            width: 230px;
            height: 230px;
            filter: blur(55px);
          }
        }

        @media (max-width: 360px) {
          .sh-sd-container {
            width: calc(100% - 26px);
          }

          .sh-sd-section-title,
          .sh-sd-included-title {
            font-size: 28px;
          }

          .sh-sd-overview-card,
          .sh-sd-challenges-card,
          .sh-sd-included-card {
            padding: 16px;
          }

          .sh-sd-capability-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        /* ==================================================
           REDUCED MOTION ACCESSIBILITY
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .sh-service-detail *,
          .sh-service-detail *::before,
          .sh-service-detail *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ==================================================
          1. SERVICE HERO
      ================================================== */}

      <PageHero
        eyebrow="Service"
        title={service.title}
        lead={service.summary}
        image={service.image}
      >
        <ButtonLink to="/contact" variant="signal">
          Discuss this service
        </ButtonLink>

        <ButtonLink to="/services" variant="ghostLight">
          All services
        </ButtonLink>
      </PageHero>

      {/* ==================================================
          2. OVERVIEW + CHALLENGES
      ================================================== */}

      <section className="sh-sd-overview">
        <div className="sh-sd-container">
          <Reveal>
            <header className="sh-sd-section-heading">
              <span className="sh-sd-eyebrow">
                Understanding the need
              </span>

              <h2 className="sh-sd-section-title">
                A clearer view of
                <br />
                <span>the challenge.</span>
              </h2>

              <p className="sh-sd-section-description">
                Understand the purpose behind this service, the
                challenges it addresses and how it can fit into
                your wider technology environment.
              </p>
            </header>
          </Reveal>

          <div className="sh-sd-overview-grid">
            {/* OVERVIEW */}

            <Reveal>
              <motion.article
                className="sh-sd-overview-card"
                initial={false}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -3 }
                }
                transition={{ duration: 0.25 }}
              >
                <span className="sh-sd-overview-icon">
                  <Lightbulb
                    size={24}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </span>

                <span className="sh-sd-eyebrow">
                  Service overview
                </span>

                <h2>
                  Designed around your
                  organisation's needs.
                </h2>

                <p>{overview}</p>

                <div className="sh-sd-overview-bottom">
                  <CheckCircle2
                    size={17}
                    aria-hidden="true"
                  />

                  <span>
                    Explore the service scope and its
                    capabilities below.
                  </span>
                </div>
              </motion.article>
            </Reveal>

            {/* CHALLENGES */}

            <Reveal delay={0.08}>
              <article className="sh-sd-challenges-card">
                <div className="sh-sd-card-heading">
                  <span className="sh-sd-card-heading-icon">
                    <CircleAlert
                      size={22}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <h2>Challenges we address</h2>

                    <p>
                      Common areas this service can help examine.
                    </p>
                  </div>
                </div>

                {challenges.length > 0 ? (
                  <ul className="sh-sd-challenge-list">
                    {challenges.map((challenge, index) => (
                      <motion.li
                        key={`${index}-${String(challenge)}`}
                        className="sh-sd-challenge-item"
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 10,
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
                          duration: reduceMotion ? 0 : 0.3,
                          delay: reduceMotion
                            ? 0
                            : Math.min(index * 0.055, 0.22),
                        }}
                      >
                        <span className="sh-sd-challenge-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="sh-sd-challenge-text">
                          {challenge}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="sh-sd-no-content">
                    Specific challenges for this service have
                    not been listed yet. Contact SmartEDGE to
                    discuss your requirements.
                  </div>
                )}
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. CAPABILITIES + DELIVERABLES
      ================================================== */}

      <section className="sh-sd-included">
        <div
          className="sh-sd-included-orb one"
          aria-hidden="true"
        />

        <div
          className="sh-sd-included-orb two"
          aria-hidden="true"
        />

        <div className="sh-sd-container">
          <Reveal>
            <header className="sh-sd-included-header">
              <span className="sh-sd-eyebrow">
                Inside the service
              </span>

              <h2 className="sh-sd-included-title">
                The capabilities.
                <br />
                <span>The deliverables.</span>
              </h2>

              <p className="sh-sd-included-description">
                See the areas this practice covers and the
                outputs that can form part of a project, subject
                to its agreed scope.
              </p>
            </header>
          </Reveal>

          <div className="sh-sd-included-grid">
            {/* CAPABILITIES */}

            <Reveal>
              <article className="sh-sd-included-card">
                <div className="sh-sd-included-card-heading">
                  <span className="sh-sd-included-icon">
                    <Layers3
                      size={23}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <h3>What's included</h3>

                    <p>
                      Capabilities within this service.
                    </p>
                  </div>
                </div>

                {capabilities.length > 0 ? (
                  <ul className="sh-sd-capability-grid">
                    {capabilities.map((capability, index) => (
                      <motion.li
                        key={`${index}-${String(capability)}`}
                        className="sh-sd-capability"
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 10,
                              }
                        }
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                        }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.28,
                          delay: reduceMotion
                            ? 0
                            : Math.min(index * 0.035, 0.2),
                        }}
                      >
                        <span className="sh-sd-capability-check">
                          <Check aria-hidden="true" />
                        </span>

                        <span>{capability}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="sh-sd-included-empty">
                    Capabilities are not available for this
                    service at the moment.
                  </div>
                )}
              </article>
            </Reveal>

            {/* DELIVERABLES */}

            <Reveal delay={0.08}>
              <article className="sh-sd-included-card">
                <div className="sh-sd-included-card-heading">
                  <span className="sh-sd-included-icon">
                    <CheckCircle2
                      size={23}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <h3>What you'll walk away with</h3>

                    <p>
                      Potential project deliverables.
                    </p>
                  </div>
                </div>

                {outcomes.length > 0 ? (
                  <ol className="sh-sd-outcome-list">
                    {outcomes.map((outcome, index) => (
                      <motion.li
                        key={`${index}-${String(outcome)}`}
                        className="sh-sd-outcome-item"
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 12,
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
                          duration: reduceMotion ? 0 : 0.3,
                          delay: reduceMotion
                            ? 0
                            : Math.min(index * 0.055, 0.2),
                        }}
                      >
                        <span className="sh-sd-outcome-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span>{outcome}</span>
                      </motion.li>
                    ))}
                  </ol>
                ) : (
                  <div className="sh-sd-included-empty">
                    Deliverables depend on the project scope and
                    will be discussed during planning.
                  </div>
                )}
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. DELIVERY PROCESS
      ================================================== */}

      <section className="sh-sd-process">
        <div className="sh-sd-container">
          <Reveal>
            <header className="sh-sd-process-header">
              <div className="sh-sd-process-heading">
                <span className="sh-sd-eyebrow">
                  From planning to delivery
                </span>

                <h2 className="sh-sd-section-title">
                  A structured path
                  <br />
                  <span>from idea to execution.</span>
                </h2>
              </div>

              <p className="sh-sd-process-description">
                A clear delivery process helps align objectives,
                decisions and implementation around the project.
              </p>
            </header>
          </Reveal>

          {processSteps.length > 0 ? (
            <>
              <div className="sh-sd-process-grid">
                {processSteps.map((process, index) => {
                  const Icon =
                    APPROACH_ICONS[index % APPROACH_ICONS.length];

                  return (
                    <motion.article
                      key={
                        process.step ||
                        `${process.title}-${index}`
                      }
                      className="sh-sd-process-card"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 20,
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
                        duration: reduceMotion ? 0 : 0.4,
                        delay: reduceMotion
                          ? 0
                          : Math.min(index * 0.07, 0.21),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="sh-sd-process-top">
                        <span className="sh-sd-process-number">
                          STEP /{" "}
                          {String(
                            process.step ?? index + 1,
                          ).padStart(2, "0")}
                        </span>

                        <span className="sh-sd-process-icon">
                          <Icon
                            size={21}
                            strokeWidth={1.7}
                            aria-hidden="true"
                          />
                        </span>
                      </div>

                      <h3>{process.title}</h3>

                      <p>
                        {safeString(process.body) ||
                          "Details for this delivery stage are discussed as part of project planning."}
                      </p>
                    </motion.article>
                  );
                })}
              </div>

              <Reveal delay={0.08}>
                <div className="sh-sd-process-bottom">
                  <ShieldCheck
                    size={18}
                    aria-hidden="true"
                  />

                  <span>
                    The specific activities and deliverables
                    depend on the agreed project scope.
                  </span>
                </div>
              </Reveal>
            </>
          ) : (
            <div className="sh-sd-no-content">
              The delivery process is being prepared. Contact
              SmartEDGE to discuss how this service can support
              your requirements.
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          5. RELATED SERVICES
      ================================================== */}

      <section className="sh-sd-related">
        <div className="sh-sd-container">
          <Reveal>
            <header className="sh-sd-related-header">
              <div className="sh-sd-related-intro">
                <span className="sh-sd-eyebrow">
                  Explore the ecosystem
                </span>

                <h2 className="sh-sd-related-title">
                  Connect this with
                  <br />
                  <span>other capabilities.</span>
                </h2>

                <p className="sh-sd-related-description">
                  Explore other SmartEDGE services that may be
                  relevant to your wider technology requirements.
                </p>
              </div>

              <ButtonLink to="/services" variant="primary">
                All services
              </ButtonLink>
            </header>
          </Reveal>

          {related.length > 0 ? (
            <div className="sh-sd-related-grid">
              {related.map((item) => {
                const originalIndex = services.findIndex(
                  (entry) => entry?.slug === item.slug,
                );

                return (
                  <motion.div
                    key={item.slug}
                    className="sh-sd-related-card"
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 20,
                          }
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
                        : Math.max(originalIndex, 0) * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ServiceCard
                      service={item}
                      index={Math.max(originalIndex, 0)}
                    />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="sh-sd-related-empty">
              <span className="sh-sd-related-empty-icon">
                <Layers3
                  size={21}
                  aria-hidden="true"
                />
              </span>

              <div>
                <h3>Explore all SmartEDGE services.</h3>

                <p>
                  Visit the service directory to explore
                  available capabilities.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          6. CONTACT CTA
      ================================================== */}

      <CtaBand
        title={`Ready to talk about ${service.title.toLowerCase()}?`}
      />
    </main>
  );
}