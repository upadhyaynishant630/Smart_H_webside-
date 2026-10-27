
import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import {
  CtaBand,
  PageHero,
  Reveal,
  ButtonLink,
} from "@/components/ui/brand";

import { ThreeDIcon } from "@/components/ui/ThreeDIcon";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { services } from "@/data/services";

import studio from "@/assets/about/studio.jpg";
import transformation from "@/assets/hero/hero-transformation.jpg";

/* =========================================
   PAGE DATA
========================================= */

const principles = [
  {
    icon: "consult",
    number: "01",
    title: "Clarity and understanding",
    body: "We understand the business problem before recommending a technology solution.",
  },
  {
    icon: "shield",
    number: "02",
    title: "Security and trust",
    body: "We consider risk, resilience and security throughout the technology lifecycle.",
  },
  {
    icon: "automation",
    number: "03",
    title: "Transparency and accountability",
    body: "Clear milestones and communication help keep delivery understandable and measurable.",
  },
  {
    icon: "data",
    number: "04",
    title: "Knowledge and ownership",
    body: "Documentation, training and knowledge sharing help teams understand the systems they use.",
  },
];

const approachItems = [
  {
    icon: Compass,
    title: "Start with clarity",
    text: "Understand the problem before choosing the solution.",
  },
  {
    icon: ShieldCheck,
    title: "Build with care",
    text: "Consider security, resilience and long-term needs.",
  },
  {
    icon: BookOpen,
    title: "Share knowledge",
    text: "Make systems easier for your team to understand and manage.",
  },
];

const workSteps = [
  {
    number: "01",
    icon: Compass,
    title: "Discover",
    description:
      "Understand your business goals, existing systems and the problems that need solving.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Plan",
    description:
      "Identify priorities, build a practical roadmap and clarify project requirements.",
  },
  {
    number: "03",
    icon: Workflow,
    title: "Build & Validate",
    description:
      "Deliver in manageable stages, review progress and validate against agreed requirements.",
  },
  {
    number: "04",
    icon: BookOpen,
    title: "Handover & Improve",
    description:
      "Share documentation, transfer knowledge and identify future improvements.",
  },
];

const capabilities = [
  ...new Set(
    (Array.isArray(services) ? services : []).flatMap((service) =>
      Array.isArray(service?.capabilities)
        ? service.capabilities
            .filter((capability) => typeof capability === "string")
            .slice(0, 3)
        : []
    )
  ),
];

/* =========================================
   ROUTE
========================================= */

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Smart H | Our Approach and Principles",
      },
      {
        name: "description",
        content:
          "Discover Smart H's approach to technology, our core values, expertise and structured way of working.",
      },
      {
        property: "og:title",
        content: "About Smart H",
      },
      {
        property: "og:description",
        content:
          "Explore Smart H's approach, core values, technology expertise and delivery process.",
      },
    ],
  }),
  component: About,
});

/* =========================================
   ABOUT PAGE
========================================= */

function About() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="sh-about-page">
      <style>{`
        .sh-about-page {
          --sh-about-ink: #111a35;
          --sh-about-muted: #64708a;
          --sh-about-blue: #4c55ed;
          --sh-about-purple: #855bf6;
          --sh-about-cyan: #47d4e8;
          --sh-about-border: rgba(85, 103, 158, 0.16);

          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          overflow-x: clip;
          background: #fff;
          color: var(--sh-about-ink);
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

        .sh-about-page *,
        .sh-about-page *::before,
        .sh-about-page *::after {
          box-sizing: border-box;
        }

        .sh-about-page img {
          display: block;
          max-width: 100%;
        }

        .sh-about-page a,
        .sh-about-page button {
          -webkit-tap-highlight-color: transparent;
        }

        .sh-about-page section {
          scroll-margin-top: 80px;
        }

        .sh-about-story-inner,
        .sh-about-principles-inner,
        .sh-about-capabilities-inner,
        .sh-about-work-inner {
          width: calc(100% - clamp(32px, 6vw, 88px));
          max-width: 1240px;
          margin-inline: auto;
        }

        /* =================================
           SHARED TYPOGRAPHY
        ================================= */

        .sh-about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--sh-about-blue);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          line-height: 1.6;
          text-transform: uppercase;
        }

        .sh-about-eyebrow::before {
          width: 23px;
          height: 2px;
          flex: 0 0 auto;
          border-radius: 99px;
          background: linear-gradient(
            90deg,
            var(--sh-about-blue),
            var(--sh-about-cyan)
          );
          content: "";
        }

        .sh-about-gradient-text {
          background: linear-gradient(
            105deg,
            var(--sh-about-blue),
            var(--sh-about-purple) 58%,
            #159fc4
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: var(--sh-about-blue);
        }

        .sh-about-centered-heading {
          width: 100%;
          max-width: 740px;
          margin-inline: auto;
          text-align: center;
        }

        .sh-about-heading-title {
          margin: 14px 0 0;
          color: var(--sh-about-ink);
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 800;
          letter-spacing: -0.055em;
          line-height: 1.14;
          overflow-wrap: anywhere;
        }

        .sh-about-heading-description {
          max-width: 550px;
          margin: 12px auto 0;
          color: var(--sh-about-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        /* =================================
           1. MISSION & VISION
        ================================= */

        .sh-about-story {
          padding-block: clamp(42px, 4.5vw, 64px);
          background:
            radial-gradient(
              ellipse at 0% 10%,
              rgba(76, 85, 237, 0.045),
              transparent 33%
            ),
            #fff;
        }

        .sh-about-story-inner {
          display: grid;
          grid-template-columns:
            minmax(0, 0.96fr)
            minmax(0, 1.04fr);
          align-items: center;
          gap: clamp(32px, 5vw, 70px);
        }

        .sh-about-visual-wrap,
        .sh-about-story-copy {
          min-width: 0;
        }

        .sh-about-visual {
          position: relative;
          isolation: isolate;
          padding: 0 12px 12px 0;
        }

        .sh-about-visual::before {
          position: absolute;
          z-index: -1;
          right: 0;
          bottom: 0;
          width: 75%;
          height: 76%;
          border-radius: 28px;
          background: linear-gradient(
            145deg,
            rgba(76, 85, 237, 0.2),
            rgba(71, 212, 232, 0.27)
          );
          content: "";
          transform: translate(9px, 9px);
        }

        .sh-about-visual::after {
          position: absolute;
          z-index: 2;
          top: 14px;
          left: 14px;
          width: 64px;
          height: 64px;
          border-top: 2px solid rgba(255, 255, 255, 0.8);
          border-left: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 16px 0 0;
          content: "";
          pointer-events: none;
        }

        .sh-about-image-frame {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          aspect-ratio: 4 / 4.1;
          border: 1px solid rgba(106, 123, 182, 0.18);
          border-radius: 25px;
          background: #e8ebf7;
          box-shadow: 0 18px 48px rgba(19, 30, 76, 0.1);
        }

        .sh-about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 750ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .sh-about-visual:hover .sh-about-image {
          transform: scale(1.035);
        }

        .sh-about-image-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(8, 16, 42, 0.02) 24%,
            rgba(8, 16, 42, 0.23) 58%,
            rgba(8, 16, 42, 0.86) 100%
          );
          pointer-events: none;
        }

        .sh-about-image-caption {
          position: absolute;
          z-index: 2;
          right: 20px;
          bottom: 21px;
          left: 20px;
          color: #fff;
        }

        .sh-about-image-caption-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 9px;
          color: #c9f8ff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .sh-about-image-caption-label svg {
          width: 14px;
          height: 14px;
        }

        .sh-about-image-caption h3 {
          max-width: 330px;
          margin: 0;
          font-size: clamp(21px, 2.4vw, 30px);
          font-weight: 750;
          letter-spacing: -0.04em;
          line-height: 1.2;
        }

        .sh-about-floating-card {
          position: absolute;
          z-index: 3;
          top: 34px;
          right: -12px;
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: calc(100% - 12px);
          padding: 11px 13px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 12px 32px rgba(21, 33, 82, 0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: sh-about-float 5.5s ease-in-out infinite;
        }

        .sh-about-floating-icon {
          display: grid;
          width: 37px;
          height: 37px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(76, 85, 237, 0.11);
          border-radius: 12px;
          background: linear-gradient(
            140deg,
            rgba(76, 85, 237, 0.12),
            rgba(71, 212, 232, 0.16)
          );
          color: var(--sh-about-blue);
        }

        .sh-about-floating-icon svg {
          width: 20px;
          height: 20px;
        }

        .sh-about-floating-copy {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 3px;
        }

        .sh-about-floating-copy strong {
          color: var(--sh-about-ink);
          font-size: 12px;
          font-weight: 800;
          line-height: 1.4;
        }

        .sh-about-floating-copy span {
          color: var(--sh-about-muted);
          font-size: 10px;
          line-height: 1.5;
        }

        .sh-about-story-title {
          max-width: 620px;
          margin: 15px 0 0;
          color: var(--sh-about-ink);
          font-size: clamp(32px, 4vw, 49px);
          font-weight: 800;
          letter-spacing: -0.06em;
          line-height: 1.13;
          overflow-wrap: anywhere;
        }

        .sh-about-story-description {
          max-width: 590px;
          margin: 17px 0 0;
          color: var(--sh-about-muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .sh-about-draft-note {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          max-width: 590px;
          margin-top: 16px;
          padding: 11px 13px;
          border: 1px solid rgba(76, 85, 237, 0.11);
          border-radius: 12px;
          background: rgba(76, 85, 237, 0.045);
          color: #68718c;
          font-size: 11px;
          line-height: 1.75;
        }

        .sh-about-draft-note svg {
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
          margin-top: 1px;
          color: var(--sh-about-blue);
        }

        .sh-about-approach-list {
          display: grid;
          gap: 15px;
          margin-top: 21px;
        }

        .sh-about-approach-item {
          display: grid;
          grid-template-columns: 40px minmax(0, 1fr);
          align-items: start;
          gap: 12px;
        }

        .sh-about-approach-icon {
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border: 1px solid rgba(76, 85, 237, 0.11);
          border-radius: 12px;
          background: linear-gradient(145deg, #f0f1ff, #f0fbff);
          color: var(--sh-about-blue);
          transition:
            transform 220ms ease,
            background 220ms ease;
        }

        .sh-about-approach-icon svg {
          width: 19px;
          height: 19px;
        }

        .sh-about-approach-item:hover .sh-about-approach-icon {
          transform: translateY(-2px);
          background: #e9eaff;
        }

        .sh-about-approach-item h3 {
          margin: 1px 0 4px;
          color: var(--sh-about-ink);
          font-size: 13px;
          font-weight: 800;
          line-height: 1.5;
        }

        .sh-about-approach-item p {
          margin: 0;
          color: var(--sh-about-muted);
          font-size: 12px;
          line-height: 1.75;
        }

        /* =================================
           2. OUR CORE VALUES
        ================================= */

        .sh-about-principles {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding-block: clamp(44px, 5vw, 66px);
          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(93, 91, 255, 0.18),
              transparent 37%
            ),
            radial-gradient(
              ellipse at 100% 100%,
              rgba(42, 183, 220, 0.1),
              transparent 34%
            ),
            linear-gradient(135deg, #0b1229, #111b3c 52%, #0a1530);
          color: #fff;
        }

        .sh-about-principles::before {
          position: absolute;
          z-index: -1;
          top: -130px;
          right: -100px;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(167, 182, 255, 0.12);
          border-radius: 50%;
          box-shadow:
            0 0 0 30px rgba(167, 182, 255, 0.025),
            0 0 0 60px rgba(167, 182, 255, 0.018);
          content: "";
          pointer-events: none;
        }

        .sh-about-principles::after {
          position: absolute;
          z-index: -1;
          bottom: -100px;
          left: -100px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: rgba(70, 92, 245, 0.12);
          filter: blur(70px);
          content: "";
          pointer-events: none;
        }

        .sh-about-principles .sh-about-eyebrow {
          color: #aeb8ff;
        }

        .sh-about-principles .sh-about-eyebrow::before {
          background: linear-gradient(90deg, #8988ff, #5be0ed);
        }

        .sh-about-principles .sh-about-heading-title {
          color: #fff;
        }

        .sh-about-title-highlight {
          background: linear-gradient(100deg, #b7b5ff, #74e9f4);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #b7b5ff;
        }

        .sh-about-principles .sh-about-heading-description {
          color: #b3bdd5;
        }

        .sh-about-principles-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
          margin-top: 30px;
        }

        .sh-about-principle-reveal {
          min-width: 0;
        }

        .sh-about-principle-card {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          height: 100%;
          min-height: 166px;
          padding: clamp(20px, 2.5vw, 27px);
          overflow: hidden;
          border: 1px solid rgba(174, 190, 255, 0.15);
          border-radius: 19px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.075),
            rgba(255, 255, 255, 0.025)
          );
          transition:
            transform 280ms ease,
            border-color 280ms ease,
            background 280ms ease,
            box-shadow 280ms ease;
        }

        .sh-about-principle-card::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #8583ff, #55dcea, transparent);
          opacity: 0;
          transform: scaleX(0.3);
          transform-origin: left;
          transition:
            opacity 280ms ease,
            transform 280ms ease;
          content: "";
        }

        .sh-about-principle-card:hover {
          transform: translateY(-4px);
          border-color: rgba(133, 131, 255, 0.42);
          background: linear-gradient(
            135deg,
            rgba(104, 105, 245, 0.14),
            rgba(255, 255, 255, 0.045)
          );
          box-shadow: 0 14px 38px rgba(0, 0, 0, 0.12);
        }

        .sh-about-principle-card:hover::after {
          opacity: 1;
          transform: scaleX(1);
        }

        .sh-about-principle-icon {
          display: grid;
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          place-items: center;
          border: 1px solid rgba(185, 192, 255, 0.18);
          border-radius: 16px;
          background: linear-gradient(
            145deg,
            rgba(123, 118, 255, 0.17),
            rgba(66, 205, 231, 0.1)
          );
          transition:
            transform 280ms ease,
            border-color 280ms ease;
        }

        .sh-about-principle-card:hover .sh-about-principle-icon {
          transform: translateY(-2px) rotate(-3deg);
          border-color: rgba(156, 183, 255, 0.42);
        }

        .sh-about-principle-copy {
          min-width: 0;
          flex: 1 1 auto;
        }

        .sh-about-principle-number {
          display: inline-block;
          margin-bottom: 9px;
          color: #9f9cff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.15em;
        }

        .sh-about-principle-copy h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(15px, 1.5vw, 18px);
          font-weight: 750;
          letter-spacing: -0.02em;
          line-height: 1.45;
          overflow-wrap: anywhere;
        }

        .sh-about-principle-copy p {
          margin: 7px 0 0;
          color: #b4bed5;
          font-size: 12px;
          line-height: 1.8;
        }

        /* =================================
           BRAND MARQUEE
           Reduce wrapper spacing
        ================================= */

        .sh-about-brand-marquee {
          width: 100%;
          max-width: 100%;
          margin: 0;
          padding-block: 7px;
          overflow: hidden;
        }

        .sh-about-brand-marquee > * {
          margin-block: 0 !important;
          padding-block: clamp(7px, 1.25vw, 14px) !important;
        }

        /* =================================
           3. OUR EXPERTISE
        ================================= */

        .sh-about-capabilities {
          position: relative;
          padding-block: clamp(44px, 5vw, 66px);
          background:
            radial-gradient(
              ellipse at 100% 0%,
              rgba(88, 105, 255, 0.065),
              transparent 35%
            ),
            #fff;
        }

        .sh-about-capabilities-layout {
          display: grid;
          grid-template-columns:
            minmax(0, 0.85fr)
            minmax(0, 1.15fr);
          align-items: center;
          gap: clamp(30px, 5vw, 66px);
        }

        .sh-about-capabilities-title {
          margin: 14px 0 0;
          color: var(--sh-about-ink);
          font-size: clamp(31px, 3.7vw, 46px);
          font-weight: 800;
          letter-spacing: -0.055em;
          line-height: 1.15;
          overflow-wrap: anywhere;
        }

        .sh-about-capabilities-description {
          max-width: 450px;
          margin: 13px 0 0;
          color: var(--sh-about-muted);
          font-size: 13px;
          line-height: 1.85;
        }

        .sh-about-service-link {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 21px;
        }

        .sh-about-service-caption {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #707b96;
          font-size: 11px;
          font-weight: 600;
        }

        .sh-about-capabilities-panel {
          min-width: 0;
          padding: clamp(20px, 2.7vw, 30px);
          border: 1px solid rgba(94, 110, 169, 0.14);
          border-radius: 23px;
          background: linear-gradient(145deg, #fff, #f6f8ff);
          box-shadow: 0 15px 42px rgba(25, 38, 89, 0.055);
        }

        .sh-about-capabilities-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--sh-about-border);
        }

        .sh-about-capabilities-panel-head h3 {
          margin: 0;
          color: var(--sh-about-ink);
          font-size: 14px;
          font-weight: 800;
        }

        .sh-about-capabilities-panel-head span {
          flex: 0 0 auto;
          color: #858da5;
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .sh-about-capabilities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }

        .sh-about-capability {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          max-width: 100%;
          padding: 9px 11px;
          border: 1px solid rgba(94, 110, 169, 0.13);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.9);
          color: #35415f;
          font-size: 11px;
          font-weight: 650;
          line-height: 1.5;
          overflow-wrap: anywhere;
          transition:
            color 200ms ease,
            background 200ms ease,
            border-color 200ms ease,
            transform 200ms ease,
            box-shadow 200ms ease;
        }

        .sh-about-capability svg {
          width: 14px;
          height: 14px;
          flex: 0 0 auto;
          color: var(--sh-about-blue);
        }

        .sh-about-capability:hover {
          transform: translateY(-2px);
          border-color: rgba(76, 85, 237, 0.25);
          color: var(--sh-about-blue);
          box-shadow: 0 5px 14px rgba(25, 38, 89, 0.055);
        }

        .sh-about-capabilities-foot {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 17px;
          color: var(--sh-about-muted);
          font-size: 10px;
          line-height: 1.75;
        }

        .sh-about-capabilities-foot svg {
          width: 15px;
          height: 15px;
          flex: 0 0 auto;
          margin-top: 2px;
          color: var(--sh-about-blue);
        }

        .sh-about-capabilities-empty {
          margin: 18px 0 0;
          color: var(--sh-about-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        /* =================================
           4. HOW WE WORK
        ================================= */

        .sh-about-work {
          position: relative;
          isolation: isolate;
          width: 100%;
          overflow: hidden;
          padding-block: clamp(44px, 5vw, 66px);
          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(76, 85, 237, 0.075),
              transparent 38%
            ),
            radial-gradient(
              ellipse at 100% 100%,
              rgba(71, 212, 232, 0.085),
              transparent 35%
            ),
            #f7f8ff;
        }

        .sh-about-work-title {
          margin: 14px 0 0;
          color: var(--sh-about-ink);
          font-size: clamp(31px, 4vw, 48px);
          font-weight: 800;
          letter-spacing: -0.055em;
          line-height: 1.14;
          overflow-wrap: anywhere;
        }

        .sh-about-work-title span {
          background: linear-gradient(
            100deg,
            var(--sh-about-blue),
            var(--sh-about-purple),
            #159fc4
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: var(--sh-about-blue);
        }

        .sh-about-work-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: stretch;
          gap: 14px;
          margin-top: 30px;
        }

        .sh-about-work-card {
          position: relative;
          display: flex;
          min-width: 0;
          min-height: 240px;
          flex-direction: column;
          align-items: flex-start;
          padding: 20px 18px;
          overflow: hidden;
          border: 1px solid rgba(94, 110, 169, 0.15);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 9px 27px rgba(25, 38, 89, 0.04);
          transition:
            transform 260ms ease,
            border-color 260ms ease,
            box-shadow 260ms ease,
            background 260ms ease;
        }

        .sh-about-work-card::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--sh-about-blue),
            var(--sh-about-purple),
            var(--sh-about-cyan)
          );
          opacity: 0;
          transform: scaleX(0.3);
          transform-origin: left;
          transition:
            opacity 260ms ease,
            transform 260ms ease;
          content: "";
        }

        .sh-about-work-card:hover {
          transform: translateY(-5px);
          border-color: rgba(76, 85, 237, 0.25);
          background: #fff;
          box-shadow: 0 16px 36px rgba(25, 38, 89, 0.085);
        }

        .sh-about-work-card:hover::before {
          opacity: 1;
          transform: scaleX(1);
        }

        .sh-about-work-step-top {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .sh-about-work-step-number {
          color: var(--sh-about-blue);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .sh-about-work-step-arrow {
          width: 17px;
          height: 17px;
          flex: 0 0 auto;
          color: #9ba4be;
          transition:
            color 220ms ease,
            transform 220ms ease;
        }

        .sh-about-work-card:hover .sh-about-work-step-arrow {
          color: var(--sh-about-blue);
          transform: translate(2px, -2px);
        }

        .sh-about-work-step-icon {
          display: grid;
          width: 48px;
          height: 48px;
          flex: 0 0 auto;
          place-items: center;
          margin-top: 22px;
          border: 1px solid rgba(76, 85, 237, 0.13);
          border-radius: 15px;
          background: linear-gradient(
            145deg,
            rgba(76, 85, 237, 0.1),
            rgba(71, 212, 232, 0.15)
          );
          color: var(--sh-about-blue);
          transition:
            transform 260ms ease,
            border-color 260ms ease,
            background 260ms ease;
        }

        .sh-about-work-step-icon svg {
          width: 22px;
          height: 22px;
        }

        .sh-about-work-card:hover .sh-about-work-step-icon {
          transform: translateY(-2px) rotate(-3deg);
          border-color: rgba(76, 85, 237, 0.25);
          background: linear-gradient(
            145deg,
            rgba(76, 85, 237, 0.15),
            rgba(71, 212, 232, 0.22)
          );
        }

        .sh-about-work-card h3 {
          margin: 18px 0 0;
          color: var(--sh-about-ink);
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.45;
          overflow-wrap: anywhere;
        }

        .sh-about-work-card p {
          margin: 8px 0 0;
          color: var(--sh-about-muted);
          font-size: 11px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .sh-about-work-foot {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 9px;
          max-width: 740px;
          margin: 20px auto 0;
          padding: 11px 14px;
          border: 1px solid rgba(76, 85, 237, 0.1);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.72);
          color: var(--sh-about-muted);
          font-size: 11px;
          line-height: 1.75;
        }

        .sh-about-work-foot svg {
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
          margin-top: 2px;
          color: var(--sh-about-blue);
        }

        /* =================================
           RESPONSIVE: TABLET
        ================================= */

        @media (max-width: 1000px) {
          .sh-about-story-inner {
            gap: 32px;
          }

          .sh-about-floating-card {
            right: -7px;
            padding: 10px;
          }

          .sh-about-principle-card {
            gap: 14px;
          }

          .sh-about-principle-icon {
            width: 48px;
            height: 48px;
            flex-basis: 48px;
          }

          .sh-about-work-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .sh-about-work-card {
            min-height: 215px;
          }
        }

        @media (max-width: 800px) {
          .sh-about-story-inner {
            grid-template-columns: minmax(0, 1fr);
            gap: 34px;
          }

          .sh-about-visual-wrap {
            width: min(100%, 580px);
            margin-inline: auto;
          }

          .sh-about-image-frame {
            aspect-ratio: 5 / 4;
          }

          .sh-about-story-copy {
            max-width: 680px;
            margin-inline: auto;
          }

          .sh-about-story-title {
            max-width: 650px;
            font-size: clamp(34px, 5.5vw, 46px);
          }

          .sh-about-capabilities-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 25px;
          }

          .sh-about-capabilities-description {
            max-width: 600px;
          }
        }

        /* =================================
           RESPONSIVE: MOBILE
        ================================= */

        @media (max-width: 540px) {
          .sh-about-story-inner,
          .sh-about-principles-inner,
          .sh-about-capabilities-inner,
          .sh-about-work-inner {
            width: calc(100% - 32px);
          }

          .sh-about-story {
            padding-block: 38px 42px;
          }

          .sh-about-story-inner {
            gap: 30px;
          }

          .sh-about-visual {
            padding-right: 7px;
            padding-bottom: 7px;
          }

          .sh-about-visual::before {
            border-radius: 22px;
            transform: translate(7px, 7px);
          }

          .sh-about-visual::after {
            top: 11px;
            left: 11px;
            width: 52px;
            height: 52px;
          }

          .sh-about-image-frame {
            aspect-ratio: 4 / 4.1;
            border-radius: 21px;
          }

          .sh-about-image-caption {
            right: 15px;
            bottom: 16px;
            left: 15px;
          }

          .sh-about-image-caption h3 {
            max-width: 260px;
            font-size: 22px;
          }

          .sh-about-image-caption-label {
            font-size: 8px;
          }

          .sh-about-floating-card {
            top: 19px;
            right: -3px;
            gap: 8px;
            padding: 9px 10px;
            border-radius: 13px;
          }

          .sh-about-floating-icon {
            width: 32px;
            height: 32px;
            border-radius: 10px;
          }

          .sh-about-floating-icon svg {
            width: 17px;
            height: 17px;
          }

          .sh-about-floating-copy strong {
            font-size: 10px;
          }

          .sh-about-floating-copy span {
            font-size: 9px;
          }

          .sh-about-story-title {
            margin-top: 12px;
            font-size: clamp(30px, 8.2vw, 39px);
            line-height: 1.14;
          }

          .sh-about-story-description {
            margin-top: 14px;
            font-size: 13px;
            line-height: 1.8;
          }

          .sh-about-draft-note {
            margin-top: 13px;
            padding: 10px 11px;
            font-size: 10px;
          }

          .sh-about-approach-list {
            gap: 13px;
            margin-top: 18px;
          }

          .sh-about-approach-item {
            grid-template-columns: 37px minmax(0, 1fr);
            gap: 10px;
          }

          .sh-about-approach-icon {
            width: 37px;
            height: 37px;
            border-radius: 11px;
          }

          .sh-about-approach-icon svg {
            width: 17px;
            height: 17px;
          }

          .sh-about-principles {
            padding-block: 40px 44px;
          }

          .sh-about-heading-title {
            margin-top: 12px;
            font-size: clamp(29px, 7.8vw, 37px);
          }

          .sh-about-heading-description {
            margin-top: 10px;
            font-size: 12px;
            line-height: 1.75;
          }

          .sh-about-principles-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 11px;
            margin-top: 23px;
          }

          .sh-about-principle-card {
            display: grid;
            grid-template-columns: 43px minmax(0, 1fr);
            gap: 12px;
            min-height: 0;
            padding: 16px 14px;
            border-radius: 16px;
          }

          .sh-about-principle-icon {
            width: 43px;
            height: 43px;
            flex-basis: 43px;
            border-radius: 13px;
          }

          .sh-about-principle-number {
            margin-bottom: 6px;
            font-size: 8px;
          }

          .sh-about-principle-copy h3 {
            font-size: 14px;
          }

          .sh-about-principle-copy p {
            margin-top: 5px;
            font-size: 11px;
            line-height: 1.75;
          }

          .sh-about-brand-marquee {
            padding-block: 3px;
          }

          .sh-about-brand-marquee > * {
            padding-block: 5px !important;
          }

          .sh-about-capabilities {
            padding-block: 40px 44px;
          }

          .sh-about-capabilities-title {
            margin-top: 12px;
            font-size: clamp(30px, 7.8vw, 38px);
          }

          .sh-about-capabilities-description {
            margin-top: 11px;
            font-size: 12px;
            line-height: 1.8;
          }

          .sh-about-service-link {
            gap: 10px;
            margin-top: 17px;
          }

          .sh-about-capabilities-panel {
            padding: 16px;
            border-radius: 18px;
          }

          .sh-about-capabilities-panel-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
            padding-bottom: 12px;
          }

          .sh-about-capabilities-panel-head h3 {
            font-size: 13px;
          }

          .sh-about-capabilities-list {
            gap: 7px;
            margin-top: 14px;
          }

          .sh-about-capability {
            padding: 8px 9px;
            font-size: 10px;
          }

          .sh-about-capabilities-foot {
            margin-top: 13px;
            font-size: 10px;
          }

          .sh-about-work {
            padding-block: 40px 44px;
          }

          .sh-about-work-title {
            margin-top: 12px;
            font-size: clamp(29px, 7.8vw, 37px);
          }

          .sh-about-work-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 10px;
            margin-top: 23px;
          }

          .sh-about-work-card {
            display: grid;
            grid-template-columns: 43px minmax(0, 1fr);
            column-gap: 12px;
            min-height: 0;
            padding: 15px 14px;
            border-radius: 16px;
          }

          .sh-about-work-step-top {
            grid-column: 1 / -1;
          }

          .sh-about-work-step-icon {
            grid-column: 1;
            grid-row: 2 / span 2;
            width: 41px;
            height: 41px;
            margin-top: 13px;
            border-radius: 12px;
          }

          .sh-about-work-step-icon svg {
            width: 19px;
            height: 19px;
          }

          .sh-about-work-card h3 {
            grid-column: 2;
            align-self: end;
            margin-top: 13px;
            font-size: 14px;
          }

          .sh-about-work-card p {
            grid-column: 2;
            margin-top: 5px;
            font-size: 11px;
            line-height: 1.75;
          }

          .sh-about-work-foot {
            margin-top: 14px;
            padding: 10px;
            font-size: 10px;
          }
        }

        @media (max-width: 360px) {
          .sh-about-story-inner,
          .sh-about-principles-inner,
          .sh-about-capabilities-inner,
          .sh-about-work-inner {
            width: calc(100% - 28px);
          }

          .sh-about-story-title {
            font-size: 29px;
          }

          .sh-about-floating-card {
            right: -2px;
            padding: 8px;
          }

          .sh-about-principle-card {
            grid-template-columns: 39px minmax(0, 1fr);
            gap: 10px;
            padding: 14px 11px;
          }

          .sh-about-principle-icon {
            width: 39px;
            height: 39px;
          }

          .sh-about-capabilities-panel {
            padding: 13px;
          }

          .sh-about-work-card {
            grid-template-columns: 39px minmax(0, 1fr);
            column-gap: 10px;
            padding: 13px 11px;
          }

          .sh-about-work-step-icon {
            width: 37px;
            height: 37px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sh-about-page *,
          .sh-about-page *::before,
          .sh-about-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @keyframes sh-about-float {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>

      {/* =================================
          1. ABOUT HERO
      ================================= */}

      <PageHero
        eyebrow="About Smart H"
        title="Technology partnership, built on clarity."
        lead="Smart H exists to make complex technology decisions simpler — and to deliver them with care."
        image={transformation}
      />

      {/* =================================
          2. MISSION & VISION
      ================================= */}

      <section
        className="sh-about-story"
        aria-labelledby="sh-about-story-title"
      >
        <div className="sh-about-story-inner">
          <Reveal className="sh-about-visual-wrap">
            <div className="sh-about-visual">
              <div className="sh-about-image-frame">
                <img
                  src={studio}
                  alt="Modern workspace overlooking a city at dusk"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="sh-about-image"
                />

                <div
                  className="sh-about-image-shade"
                  aria-hidden="true"
                />

                <div className="sh-about-image-caption">
                  <div className="sh-about-image-caption-label">
                    <Sparkles aria-hidden="true" />
                    Our approach
                  </div>

                  <h3>
                    Thoughtful technology.
                    <br />
                    Meaningful progress.
                  </h3>
                </div>
              </div>

              <div className="sh-about-floating-card">
                <div className="sh-about-floating-icon">
                  <ShieldCheck aria-hidden="true" />
                </div>

                <div className="sh-about-floating-copy">
                  <strong>Clarity by design</strong>
                  <span>Strategy, security & ownership</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="sh-about-story-copy"
          >
            <span className="sh-about-eyebrow">
              Mission & Vision
            </span>

            <h2
              className="sh-about-story-title"
              id="sh-about-story-title"
            >
              Helping organisations run on technology they{" "}
              <span className="sh-about-gradient-text">
                understand and trust.
              </span>
            </h2>

            <p className="sh-about-story-description">
              Our proposed mission is to give every client a clear
              technology direction and the dependable systems to
              follow it. Our vision is a future where infrastructure,
              data and security quietly enable growth.
            </p>

            <div className="sh-about-draft-note">
              <Sparkles aria-hidden="true" />
              <span>
                Mission and vision statements are draft copy and
                can be refined by the Smart H leadership team.
              </span>
            </div>

            <div className="sh-about-approach-list">
              {approachItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    className="sh-about-approach-item"
                    initial={
                      reduceMotion ? false : { opacity: 0, x: 16 }
                    }
                    whileInView={
                      reduceMotion ? undefined : { opacity: 1, x: 0 }
                    }
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="sh-about-approach-icon">
                      <Icon aria-hidden="true" />
                    </span>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =================================
          3. OUR CORE VALUES
      ================================= */}

      <section
        className="sh-about-principles"
        aria-labelledby="sh-about-core-values-title"
      >
        <div className="sh-about-principles-inner">
          <Reveal className="sh-about-centered-heading">
            <span className="sh-about-eyebrow">
              Our Core Values
            </span>

            <h2
              className="sh-about-heading-title"
              id="sh-about-core-values-title"
            >
              The values behind{" "}
              <span className="sh-about-title-highlight">
                every decision.
              </span>
            </h2>

            <p className="sh-about-heading-description">
              Understanding, trust, transparency and knowledge
              sharing guide how we think, work and deliver.
            </p>
          </Reveal>

          <div className="sh-about-principles-grid">
            {principles.map((principle, index) => (
              <Reveal
                key={principle.title}
                delay={(index % 2) * 0.07}
                className="sh-about-principle-reveal"
              >
                <article className="sh-about-principle-card">
                  <div className="sh-about-principle-icon">
                    <ThreeDIcon
                      type={principle.icon}
                      variant="night"
                      size={56}
                    />
                  </div>

                  <div className="sh-about-principle-copy">
                    <span className="sh-about-principle-number">
                      VALUE {principle.number}
                    </span>

                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =================================
          BRAND MARQUEE
      ================================= */}

      <div className="sh-about-brand-marquee">
        <BrandMarquee />
      </div>

      {/* =================================
          4. OUR EXPERTISE
      ================================= */}

      <section
        className="sh-about-capabilities"
        aria-labelledby="sh-about-expertise-title"
      >
        <div className="sh-about-capabilities-inner">
          <div className="sh-about-capabilities-layout">
            <Reveal>
              <span className="sh-about-eyebrow">
                Our Expertise
              </span>

              <h2
                className="sh-about-capabilities-title"
                id="sh-about-expertise-title"
              >
                Expertise across the{" "}
                <span className="sh-about-gradient-text">
                  technology stack.
                </span>
              </h2>

              <p className="sh-about-capabilities-description">
                Explore the capabilities available across our
                services. The right combination depends on your
                goals, existing systems and project requirements.
              </p>

              <div className="sh-about-service-link">
                <ButtonLink to="/services">
                  Explore services
                </ButtonLink>

                <span className="sh-about-service-caption">
                  Discover our approach
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="sh-about-capabilities-panel">
                <div className="sh-about-capabilities-panel-head">
                  <h3>Explore our capabilities</h3>
                  <span>Service overview</span>
                </div>

                {capabilities.length > 0 ? (
                  <div className="sh-about-capabilities-list">
                    {capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="sh-about-capability"
                      >
                        <CheckCircle2 aria-hidden="true" />
                        {capability}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="sh-about-capabilities-empty">
                    Explore our services to learn more about
                    available technology capabilities.
                  </p>
                )}

                <div className="sh-about-capabilities-foot">
                  <Workflow aria-hidden="true" />
                  <span>
                    Explore the capabilities connected to your
                    existing Smart H service catalogue.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =================================
          5. HOW WE WORK
      ================================= */}

      <section
        className="sh-about-work"
        aria-labelledby="sh-about-work-title"
      >
        <div className="sh-about-work-inner">
          <Reveal className="sh-about-centered-heading">
            <span className="sh-about-eyebrow">
              How We Work
            </span>

            <h2
              className="sh-about-work-title"
              id="sh-about-work-title"
            >
              A clear path from{" "}
              <span>idea to impact.</span>
            </h2>

            <p className="sh-about-heading-description">
              A structured approach that keeps business goals,
              project priorities and long-term needs at the centre.
            </p>
          </Reveal>

          <div className="sh-about-work-grid">
            {workSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  className="sh-about-work-card"
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 20 }
                  }
                  whileInView={
                    reduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="sh-about-work-step-top">
                    <span className="sh-about-work-step-number">
                      STEP {step.number}
                    </span>

                    <ArrowUpRight
                      className="sh-about-work-step-arrow"
                      aria-hidden="true"
                    />
                  </div>

                  <span className="sh-about-work-step-icon">
                    <Icon aria-hidden="true" />
                  </span>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.article>
              );
            })}
          </div>

          <div className="sh-about-work-foot">
            <Workflow aria-hidden="true" />
            <span>
              Each engagement can be adapted to the project scope,
              current systems and specific business requirements.
            </span>
          </div>
        </div>
      </section>

      {/* =================================
          6. FINAL CTA
      ================================= */}

      <CtaBand title="Let's talk about what you're building." />
    </main>
  );
}

export default About;
