import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Info,
  LockKeyhole,
  Mail,
  MessagesSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { PageHero, Reveal } from "@/components/ui/brand";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/data/site";
import connected from "@/assets/hero/hero-connected.jpg";

/* ======================================================
   ROUTE CONFIGURATION + SEO
====================================================== */

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact SmartEDGE — Book a Consultation",
      },
      {
        name: "description",
        content:
          "Tell SmartEDGE about your technology project, discuss your requirements and explore practical next steps.",
      },
      {
        property: "og:title",
        content: "Contact SmartEDGE",
      },
      {
        property: "og:description",
        content:
          "Start a conversation about your technology project with SmartEDGE.",
      },
    ],
  }),
  component: Contact,
});

/* ======================================================
   CONTENT
====================================================== */

const CONTACT_STEPS = [
  {
    number: "01",
    icon: MessagesSquare,
    title: "Share your goals",
    body:
      "Tell us about your project, current challenges and the outcome you're working towards.",
    accent: "violet",
  },
  {
    number: "02",
    icon: Clock,
    title: "We review and reply",
    body:
      "Your inquiry gives us the context to respond with relevant questions and potential next steps.",
    accent: "cyan",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Plan the conversation",
    body:
      "We can discuss priorities, project scope and suitable next steps based on your requirements.",
    accent: "mint",
  },
];

/* ======================================================
   MAIN PAGE
====================================================== */

function Contact() {
  const reduceMotion = useReducedMotion();
  const [showSecurityNote, setShowSecurityNote] = useState(true);

  const contactEmail =
    typeof siteConfig?.contactEmail === "string"
      ? siteConfig.contactEmail.trim()
      : "";

  const contactPhone =
    typeof siteConfig?.contactPhone === "string"
      ? siteConfig.contactPhone.trim()
      : "";

  const hasDirectContact = Boolean(contactEmail || contactPhone);

  return (
    <main className="sh-contact-page">
      <style>{`
        /* ==================================================
           SmartEDGE CONTACT — DESIGN SYSTEM
        ================================================== */

        .sh-contact-page {
          --sc-ink: #101a36;
          --sc-ink-soft: #1a2748;
          --sc-blue: #243ec8;
          --sc-violet: #7775ff;
          --sc-cyan: #42d5e8;
          --sc-mint: #80f0d1;
          --sc-text: #505b74;
          --sc-muted: #7b849b;
          --sc-line: rgba(16, 26, 54, 0.10);
          --sc-surface: #f5f7fc;
          --sc-white: #ffffff;

          position: relative;
          isolation: isolate;

          width: 100%;
          min-width: 0;
          overflow-x: clip;

          color: var(--sc-ink);
          background: #ffffff;
        }

        .sh-contact-page *,
        .sh-contact-page *::before,
        .sh-contact-page *::after {
          box-sizing: border-box;
        }

        .sh-contact-page img {
          display: block;
          max-width: 100%;
        }

        .sh-contact-page a {
          text-decoration: none;
        }

        .sh-contact-page button {
          font: inherit;
        }

        .sh-contact-page a:focus-visible,
        .sh-contact-page button:focus-visible {
          outline: 3px solid var(--sc-cyan);
          outline-offset: 4px;
        }

        .sh-contact-container {
          width: min(1200px, calc(100% - 64px));
          margin-inline: auto;
        }

        /* ==================================================
           MAIN CONTACT SECTION
        ================================================== */

        .sh-contact-main {
          position: relative;

          padding: clamp(52px, 6.5vw, 84px) 0
            clamp(72px, 8vw, 104px);

          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(119, 117, 255, 0.065),
              transparent 34%
            ),
            radial-gradient(
              ellipse at 100% 65%,
              rgba(66, 213, 232, 0.045),
              transparent 35%
            ),
            #ffffff;
        }

        .sh-contact-main::before {
          content: "";

          position: absolute;
          top: 0;
          left: 50%;

          width: min(1200px, calc(100% - 64px));
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

        /* ==================================================
           INTRODUCTION
        ================================================== */

        .sh-contact-intro {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;

          margin-bottom: 39px;
        }

        .sh-contact-intro-copy {
          max-width: 750px;
          min-width: 0;
        }

        .sh-contact-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          margin-bottom: 15px;

          color: var(--sc-blue);
          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .sh-contact-eyebrow::before {
          content: "";

          width: 22px;
          height: 2px;

          border-radius: 99px;

          background: linear-gradient(
            90deg,
            var(--sc-blue),
            var(--sc-cyan)
          );
        }

        .sh-contact-title {
          margin: 0;

          color: var(--sc-ink);
          font-size: clamp(30px, 4.3vw, 46px);
          font-weight: 750;
          line-height: 1.1;
          letter-spacing: -0.055em;
          text-wrap: balance;
        }

        .sh-contact-title span {
          color: var(--sc-blue);
        }

        .sh-contact-description {
          max-width: 650px;
          margin: 14px 0 0;

          color: var(--sc-text);
          font-size: 13px;
          line-height: 1.9;
        }

        .sh-contact-intro-mark {
          display: flex;
          align-items: center;
          gap: 11px;

          flex: 0 0 auto;

          padding: 13px 16px;

          border: 1px solid rgba(16, 26, 54, 0.09);
          border-radius: 16px;

          background: rgba(255, 255, 255, 0.82);

          box-shadow:
            0 8px 24px rgba(16, 26, 54, 0.035),
            inset 0 1px 0 #ffffff;
        }

        .sh-contact-intro-mark-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 39px;
          height: 39px;

          border: 1px solid rgba(119, 117, 255, 0.15);
          border-radius: 12px;

          color: var(--sc-blue);
          background: #eff0ff;
        }

        .sh-contact-intro-mark-copy {
          display: grid;
          gap: 4px;
        }

        .sh-contact-intro-mark-copy strong {
          color: var(--sc-ink);
          font-size: 11px;
          font-weight: 750;
        }

        .sh-contact-intro-mark-copy span {
          color: var(--sc-muted);
          font-size: 10px;
          line-height: 1.6;
        }

        /* ==================================================
           MAIN TWO-COLUMN LAYOUT
        ================================================== */

        .sh-contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
          align-items: start;
          gap: clamp(24px, 3.6vw, 46px);
        }

        .sh-contact-sidebar {
          display: flex;
          flex-direction: column;
          gap: 23px;

          min-width: 0;
        }

        /* ==================================================
           PROCESS CARD
        ================================================== */

        .sh-contact-process {
          min-width: 0;
          padding: 27px;

          border: 1px solid rgba(16, 26, 54, 0.09);
          border-radius: 22px;

          background: rgba(255, 255, 255, 0.88);

          box-shadow:
            0 12px 36px rgba(16, 26, 54, 0.035),
            inset 0 1px 0 #ffffff;
        }

        .sh-contact-card-heading {
          display: flex;
          align-items: flex-start;
          gap: 13px;

          margin-bottom: 28px;
        }

        .sh-contact-heading-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 46px;
          height: 46px;

          border: 1px solid rgba(119, 117, 255, 0.14);
          border-radius: 14px;

          color: var(--sc-blue);
          background: #eff0ff;
        }

        .sh-contact-card-heading h2 {
          margin: 2px 0 0;

          color: var(--sc-ink);
          font-size: 21px;
          font-weight: 750;
          line-height: 1.25;
          letter-spacing: -0.04em;
        }

        .sh-contact-card-heading p {
          margin: 7px 0 0;

          color: var(--sc-muted);
          font-size: 11px;
          line-height: 1.8;
        }

        /* Timeline */

        .sh-contact-steps {
          position: relative;

          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sh-contact-steps::before {
          content: "";

          position: absolute;
          top: 25px;
          bottom: 26px;
          left: 22px;

          width: 1px;

          background: linear-gradient(
            to bottom,
            rgba(119, 117, 255, 0.34),
            rgba(66, 213, 232, 0.44),
            rgba(128, 240, 209, 0.3)
          );

          pointer-events: none;
        }

        .sh-contact-step {
          position: relative;
          z-index: 1;

          display: grid;
          grid-template-columns: 45px minmax(0, 1fr);
          align-items: start;
          gap: 14px;

          min-width: 0;
          padding: 12px 8px 12px 0;

          border: 1px solid transparent;
          border-radius: 13px;

          transition:
            background 200ms ease,
            border-color 200ms ease,
            transform 200ms ease;
        }

        .sh-contact-step:hover {
          transform: translateX(3px);

          border-color: rgba(119, 117, 255, 0.10);
          background: #fafbff;
        }

        .sh-contact-step-icon {
          display: grid;
          place-items: center;

          width: 45px;
          height: 45px;

          border: 1px solid rgba(119, 117, 255, 0.16);
          border-radius: 14px;

          color: var(--sc-blue);
          background: #f0f1ff;

          transition:
            transform 200ms ease,
            background 200ms ease,
            border-color 200ms ease;
        }

        .sh-contact-step[data-accent="cyan"] .sh-contact-step-icon {
          color: #167b91;
          background: #e9fbfd;
          border-color: rgba(66, 213, 232, 0.22);
        }

        .sh-contact-step[data-accent="mint"] .sh-contact-step-icon {
          color: #187d66;
          background: #e8f8f1;
          border-color: rgba(128, 240, 209, 0.3);
        }

        .sh-contact-step:hover .sh-contact-step-icon {
          transform: scale(1.045) rotate(-3deg);
        }

        .sh-contact-step-copy {
          min-width: 0;
          padding-top: 3px;
        }

        .sh-contact-step-number {
          display: block;
          margin-bottom: 5px;

          color: var(--sc-blue);
          font-size: 9px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.12em;
        }

        .sh-contact-step-copy h3 {
          margin: 0;

          color: var(--sc-ink);
          font-size: 13px;
          font-weight: 750;
          line-height: 1.5;
        }

        .sh-contact-step-copy p {
          margin: 5px 0 0;

          color: var(--sc-text);
          font-size: 11px;
          line-height: 1.8;
        }

        /* ==================================================
           DIRECT CONTACT PANEL
        ================================================== */

        .sh-contact-direct {
          min-width: 0;
          padding: 24px;

          border: 1px solid rgba(16, 26, 54, 0.09);
          border-radius: 20px;

          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(119, 117, 255, 0.07),
              transparent 46%
            ),
            #fafbff;
        }

        .sh-contact-direct-heading {
          display: flex;
          align-items: center;
          gap: 11px;

          margin-bottom: 17px;
        }

        .sh-contact-direct-heading-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 39px;
          height: 39px;

          border: 1px solid rgba(119, 117, 255, 0.14);
          border-radius: 12px;

          color: var(--sc-blue);
          background: #eff0ff;
        }

        .sh-contact-direct-heading h2 {
          margin: 0;

          color: var(--sc-ink);
          font-size: 15px;
          font-weight: 750;
          line-height: 1.4;
        }

        .sh-contact-direct-heading p {
          margin: 4px 0 0;

          color: var(--sc-muted);
          font-size: 10px;
          line-height: 1.7;
        }

        .sh-contact-direct-links {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .sh-contact-direct-link {
          display: flex;
          align-items: center;
          gap: 12px;

          min-width: 0;
          padding: 12px;

          border: 1px solid rgba(16, 26, 54, 0.075);
          border-radius: 12px;

          background: rgba(255, 255, 255, 0.87);

          transition:
            transform 200ms ease,
            border-color 200ms ease,
            background 200ms ease;
        }

        .sh-contact-direct-link:hover {
          transform: translateY(-2px);

          border-color: rgba(119, 117, 255, 0.24);
          background: #ffffff;
        }

        .sh-contact-direct-link-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 35px;
          height: 35px;

          border-radius: 10px;

          color: var(--sc-blue);
          background: #eff0ff;
        }

        .sh-contact-direct-link-copy {
          display: grid;
          gap: 4px;

          min-width: 0;
          flex: 1;
        }

        .sh-contact-direct-link-copy small {
          color: var(--sc-muted);
          font-size: 9px;
          font-weight: 700;
          line-height: 1.5;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        .sh-contact-direct-link-copy strong {
          color: var(--sc-ink);
          font-size: 11px;
          font-weight: 650;
          line-height: 1.65;

          overflow-wrap: anywhere;
        }

        .sh-contact-direct-link > svg {
          flex: 0 0 auto;

          color: var(--sc-muted);

          transition:
            transform 180ms ease,
            color 180ms ease;
        }

        .sh-contact-direct-link:hover > svg {
          transform: translate(2px, -2px);
          color: var(--sc-blue);
        }

        .sh-contact-no-direct {
          margin: 0;

          color: var(--sc-text);
          font-size: 11px;
          line-height: 1.8;
        }

        /* ==================================================
           SECURITY INFORMATION PANEL
        ================================================== */

        .sh-contact-privacy {
          display: flex;
          align-items: flex-start;
          gap: 12px;

          padding: 17px;

          border: 1px solid rgba(16, 26, 54, 0.08);
          border-radius: 16px;

          background: rgba(245, 247, 252, 0.82);
        }

        .sh-contact-privacy-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 34px;
          height: 34px;

          border: 1px solid rgba(36, 62, 200, 0.12);
          border-radius: 11px;

          color: var(--sc-blue);
          background: #e9edff;
        }

        .sh-contact-privacy-copy {
          min-width: 0;
        }

        .sh-contact-privacy-copy strong {
          display: block;
          margin-bottom: 5px;

          color: var(--sc-ink);
          font-size: 11px;
          font-weight: 750;
        }

        .sh-contact-privacy-copy p {
          margin: 0;

          color: var(--sc-muted);
          font-size: 10px;
          line-height: 1.8;
        }

        /* ==================================================
           FORM PANEL
        ================================================== */

        .sh-contact-form-panel {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          min-width: 0;
          padding: clamp(25px, 3.6vw, 43px);

          border: 1px solid rgba(16, 26, 54, 0.10);
          border-radius: 25px;

          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(119, 117, 255, 0.07),
              transparent 37%
            ),
            #ffffff;

          box-shadow:
            0 18px 52px rgba(16, 26, 54, 0.055),
            inset 0 1px 0 #ffffff;
        }

        .sh-contact-form-panel::before {
          content: "";

          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          right: 0;

          height: 3px;

          background: linear-gradient(
            90deg,
            var(--sc-blue),
            var(--sc-violet),
            var(--sc-cyan)
          );

          background-size: 180% 100%;

          animation: sh-contact-gradient 7s ease-in-out infinite alternate;

          pointer-events: none;
        }

        @keyframes sh-contact-gradient {
          from {
            background-position: 0% 50%;
          }

          to {
            background-position: 100% 50%;
          }
        }

        .sh-contact-form-header {
          margin-bottom: 27px;
        }

        .sh-contact-form-heading-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;

          margin-bottom: 11px;
        }

        .sh-contact-form-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 10px;

          color: var(--sc-blue);
          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .sh-contact-form-kicker svg {
          color: var(--sc-violet);
        }

        .sh-contact-form-heading {
          margin: 0;

          color: var(--sc-ink);
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 750;
          line-height: 1.15;
          letter-spacing: -0.05em;
          text-wrap: balance;
        }

        .sh-contact-form-description {
          max-width: 550px;
          margin: 11px 0 0;

          color: var(--sc-text);
          font-size: 12px;
          line-height: 1.9;
        }

        .sh-contact-form-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          flex: 0 0 auto;

          padding: 9px 11px;

          border: 1px solid rgba(128, 240, 209, 0.48);
          border-radius: 100px;

          color: #187d66;
          background: #eefbf6;

          font-size: 9px;
          font-weight: 750;
          white-space: nowrap;
        }

        .sh-contact-form-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #26a880;
        }

        /* ==================================================
           DISMISSIBLE ALERT BOX
        ================================================== */

        .sh-contact-alert {
          position: relative;

          display: flex;
          align-items: flex-start;
          gap: 13px;

          margin: 0 0 25px;
          padding: 17px 48px 17px 17px;

          border: 1px solid rgba(66, 151, 200, 0.24);
          border-radius: 16px;

          background:
            radial-gradient(
              circle at 0% 0%,
              rgba(66, 213, 232, 0.10),
              transparent 55%
            ),
            #f5fbff;

          box-shadow:
            0 7px 21px rgba(36, 62, 200, 0.035),
            inset 0 1px 0 #ffffff;
        }

        .sh-contact-alert::before {
          content: "";

          position: absolute;
          top: 13px;
          bottom: 13px;
          left: 0;

          width: 3px;

          border-radius: 0 5px 5px 0;

          background: linear-gradient(
            to bottom,
            var(--sc-blue),
            var(--sc-cyan)
          );
        }

        .sh-contact-alert-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;

          width: 39px;
          height: 39px;

          border: 1px solid rgba(66, 151, 200, 0.16);
          border-radius: 12px;

          color: #167b91;
          background: #e7f8fc;
        }

        .sh-contact-alert-copy {
          min-width: 0;
          flex: 1;
        }

        .sh-contact-alert-heading {
          margin: 1px 0 5px;

          color: var(--sc-ink);
          font-size: 12px;
          font-weight: 800;
          line-height: 1.5;
        }

        .sh-contact-alert-message {
          margin: 0;

          color: #52637b;
          font-size: 11px;
          line-height: 1.85;

          overflow-wrap: anywhere;
        }

        .sh-contact-alert-message strong {
          color: #25385a;
          font-weight: 750;
        }

        .sh-contact-alert-dismiss {
          position: absolute;
          top: 11px;
          right: 11px;

          display: grid;
          place-items: center;

          width: 30px;
          height: 30px;

          border: 1px solid rgba(16, 26, 54, 0.09);
          border-radius: 10px;

          color: #65718a;
          background: rgba(255, 255, 255, 0.82);

          cursor: pointer;

          transition:
            color 180ms ease,
            background 180ms ease,
            border-color 180ms ease,
            transform 180ms ease;
        }

        .sh-contact-alert-dismiss:hover {
          transform: rotate(5deg);

          color: var(--sc-blue);
          border-color: rgba(36, 62, 200, 0.2);
          background: #ffffff;
        }

        /* ==================================================
           FORM BOTTOM NOTE
        ================================================== */

        .sh-contact-form-footnote {
          display: flex;
          align-items: flex-start;
          gap: 9px;

          margin-top: 22px;
          padding-top: 16px;

          border-top: 1px solid rgba(16, 26, 54, 0.08);

          color: var(--sc-muted);
          font-size: 10px;
          line-height: 1.8;
        }

        .sh-contact-form-footnote svg {
          flex: 0 0 auto;
          margin-top: 1px;

          color: var(--sc-blue);
        }

        .sh-contact-form-footnote span {
          min-width: 0;
        }

        /* Keep the existing form and its controls inside the panel. */
        .sh-contact-form-content,
        .sh-contact-form-content > * {
          min-width: 0;
          max-width: 100%;
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1050px) {
          .sh-contact-container {
            width: calc(100% - 48px);
          }

          .sh-contact-main::before {
            width: calc(100% - 48px);
          }

          .sh-contact-grid {
            grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
            gap: 24px;
          }

          .sh-contact-process {
            padding: 22px;
          }

          .sh-contact-form-panel {
            padding: 28px;
          }

          .sh-contact-form-heading {
            font-size: 28px;
          }

          .sh-contact-intro-mark {
            padding: 11px 12px;
          }
        }

        /* ==================================================
           SMALL TABLET
        ================================================== */

        @media (max-width: 760px) {
          .sh-contact-container {
            width: calc(100% - 40px);
          }

          .sh-contact-main {
            padding: 49px 0 72px;
          }

          .sh-contact-main::before {
            width: calc(100% - 40px);
          }

          .sh-contact-intro {
            align-items: flex-start;
            flex-direction: column;
            gap: 20px;

            margin-bottom: 29px;
          }

          .sh-contact-title {
            font-size: clamp(31px, 6.3vw, 43px);
          }

          .sh-contact-description {
            font-size: 12px;
          }

          .sh-contact-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 23px;
          }

          .sh-contact-sidebar {
            gap: 16px;
          }

          .sh-contact-process {
            padding: 24px;
          }

          .sh-contact-steps {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
          }

          .sh-contact-steps::before {
            display: none;
          }

          .sh-contact-step {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;

            padding: 14px 12px;

            border-color: rgba(16, 26, 54, 0.07);
            background: #fbfcff;
          }

          .sh-contact-step:hover {
            transform: translateY(-2px);
          }

          .sh-contact-step-copy {
            padding-top: 0;
          }

          .sh-contact-step-copy h3 {
            font-size: 12px;
          }

          .sh-contact-step-copy p {
            font-size: 10px;
          }

          .sh-contact-direct {
            padding: 21px;
          }

          .sh-contact-privacy {
            padding: 15px;
          }

          .sh-contact-form-panel {
            padding: 28px;
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 540px) {
          .sh-contact-container {
            width: calc(100% - 32px);
          }

          .sh-contact-main {
            padding: 41px 0 57px;
          }

          .sh-contact-main::before {
            width: calc(100% - 32px);
          }

          .sh-contact-intro {
            gap: 16px;
            margin-bottom: 24px;
          }

          .sh-contact-eyebrow {
            margin-bottom: 11px;
            font-size: 9px;
            letter-spacing: 0.13em;
          }

          .sh-contact-title {
            font-size: clamp(29px, 8vw, 37px);
            line-height: 1.12;
          }

          .sh-contact-description {
            margin-top: 11px;
            font-size: 11px;
            line-height: 1.85;
          }

          .sh-contact-intro-mark {
            gap: 10px;
            padding: 10px 12px;
            border-radius: 13px;
          }

          .sh-contact-intro-mark-icon {
            width: 35px;
            height: 35px;
            border-radius: 10px;
          }

          .sh-contact-intro-mark-copy strong {
            font-size: 10px;
          }

          .sh-contact-intro-mark-copy span {
            font-size: 9px;
          }

          .sh-contact-grid {
            gap: 18px;
          }

          .sh-contact-sidebar {
            gap: 13px;
          }

          .sh-contact-process {
            padding: 18px;
            border-radius: 17px;
          }

          .sh-contact-card-heading {
            gap: 11px;
            margin-bottom: 18px;
          }

          .sh-contact-heading-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
          }

          .sh-contact-card-heading h2 {
            font-size: 19px;
          }

          .sh-contact-card-heading p {
            font-size: 10px;
          }

          .sh-contact-steps {
            grid-template-columns: minmax(0, 1fr);
            gap: 7px;
          }

          .sh-contact-step {
            display: grid;
            grid-template-columns: 39px minmax(0, 1fr);
            align-items: start;
            gap: 11px;

            padding: 11px 8px 11px 0;

            border-color: transparent;
            background: transparent;
          }

          .sh-contact-step:hover {
            transform: translateX(2px);
            background: #fafbff;
          }

          .sh-contact-step-icon {
            width: 39px;
            height: 39px;
            border-radius: 12px;
          }

          .sh-contact-step-icon svg {
            width: 18px;
            height: 18px;
          }

          .sh-contact-step-number {
            margin-bottom: 3px;
            font-size: 8px;
          }

          .sh-contact-step-copy h3 {
            font-size: 12px;
          }

          .sh-contact-step-copy p {
            margin-top: 4px;
            font-size: 10px;
            line-height: 1.75;
          }

          .sh-contact-direct {
            padding: 17px;
            border-radius: 16px;
          }

          .sh-contact-direct-heading {
            gap: 10px;
            margin-bottom: 13px;
          }

          .sh-contact-direct-heading-icon {
            width: 35px;
            height: 35px;
            border-radius: 10px;
          }

          .sh-contact-direct-heading h2 {
            font-size: 14px;
          }

          .sh-contact-direct-link {
            gap: 10px;
            padding: 10px;
          }

          .sh-contact-direct-link-icon {
            width: 32px;
            height: 32px;
          }

          .sh-contact-direct-link-copy strong {
            font-size: 10px;
          }

          .sh-contact-privacy {
            gap: 10px;
            padding: 13px;
            border-radius: 13px;
          }

          .sh-contact-privacy-icon {
            width: 30px;
            height: 30px;
            border-radius: 9px;
          }

          .sh-contact-privacy-copy strong {
            font-size: 10px;
          }

          .sh-contact-privacy-copy p {
            font-size: 9px;
          }

          .sh-contact-form-panel {
            padding: 20px;
            border-radius: 18px;
          }

          .sh-contact-form-header {
            margin-bottom: 21px;
          }

          .sh-contact-form-heading-row {
            flex-direction: column;
            gap: 12px;
            margin-bottom: 8px;
          }

          .sh-contact-form-kicker {
            margin-bottom: 8px;
            font-size: 9px;
          }

          .sh-contact-form-heading {
            font-size: clamp(24px, 6.6vw, 30px);
            line-height: 1.14;
          }

          .sh-contact-form-description {
            margin-top: 10px;
            font-size: 11px;
            line-height: 1.85;
          }

          .sh-contact-form-badge {
            padding: 8px 10px;
            font-size: 8px;
          }

          .sh-contact-alert {
            gap: 10px;

            margin-bottom: 20px;
            padding: 14px 39px 14px 13px;

            border-radius: 13px;
          }

          .sh-contact-alert::before {
            top: 11px;
            bottom: 11px;
          }

          .sh-contact-alert-icon {
            width: 32px;
            height: 32px;
            border-radius: 10px;
          }

          .sh-contact-alert-icon svg {
            width: 17px;
            height: 17px;
          }

          .sh-contact-alert-heading {
            font-size: 11px;
          }

          .sh-contact-alert-message {
            font-size: 10px;
            line-height: 1.8;
          }

          .sh-contact-alert-dismiss {
            top: 8px;
            right: 8px;

            width: 27px;
            height: 27px;
            border-radius: 8px;
          }

          .sh-contact-form-footnote {
            margin-top: 18px;
            padding-top: 14px;
            font-size: 9px;
          }
        }

        @media (max-width: 360px) {
          .sh-contact-container {
            width: calc(100% - 26px);
          }

          .sh-contact-title {
            font-size: 28px;
          }

          .sh-contact-process,
          .sh-contact-form-panel {
            padding: 16px;
          }

          .sh-contact-form-heading {
            font-size: 24px;
          }

          .sh-contact-alert {
            gap: 8px;
            padding-left: 11px;
          }
        }

        /* ==================================================
           ACCESSIBILITY
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .sh-contact-page *,
          .sh-contact-page *::before,
          .sh-contact-page *::after {
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
        eyebrow="Contact"
        title="Let's talk about what's next."
        lead="Tell us where you are today and where you want to be. We'll come back with practical next steps."
        image={connected}
      />

      {/* ==================================================
          2. CONTACT SECTION
      ================================================== */}

      <section className="sh-contact-main">
        <div className="sh-contact-container">
          {/* INTRO */}

          <Reveal>
            <header className="sh-contact-intro">
              <div className="sh-contact-intro-copy">
                <span className="sh-contact-eyebrow">
                  Start a conversation
                </span>

                <h2 className="sh-contact-title">
                  A clear next step
                  <br />
                  <span>starts with a conversation.</span>
                </h2>

                <p className="sh-contact-description">
                  Share a little about your challenge, goals or
                  project. The details you provide will help us
                  understand the context of your inquiry.
                </p>
              </div>

              <motion.div
                className="sh-contact-intro-mark"
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
                  duration: reduceMotion ? 0 : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="sh-contact-intro-mark-icon">
                  <Sparkles
                    size={19}
                    aria-hidden="true"
                  />
                </span>

                <span className="sh-contact-intro-mark-copy">
                  <strong>Practical next steps</strong>
                  <span>Start with your requirements</span>
                </span>
              </motion.div>
            </header>
          </Reveal>

          <div className="sh-contact-grid">
            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <aside className="sh-contact-sidebar">
              {/* PROCESS */}

              <Reveal>
                <section className="sh-contact-process">
                  <div className="sh-contact-card-heading">
                    <span className="sh-contact-heading-icon">
                      <MessagesSquare
                        size={21}
                        aria-hidden="true"
                      />
                    </span>

                    <div>
                      <h2>What happens next</h2>
                      <p>
                        A straightforward path from inquiry to
                        conversation.
                      </p>
                    </div>
                  </div>

                  <div className="sh-contact-steps">
                    {CONTACT_STEPS.map((step, index) => {
                      const Icon = step.icon;

                      return (
                        <motion.article
                          key={step.number}
                          className="sh-contact-step"
                          data-accent={step.accent}
                          initial={
                            reduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  x: -10,
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
                              : index * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <span className="sh-contact-step-icon">
                            <Icon
                              size={20}
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                          </span>

                          <div className="sh-contact-step-copy">
                            <span className="sh-contact-step-number">
                              STEP / {step.number}
                            </span>

                            <h3>{step.title}</h3>

                            <p>{step.body}</p>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </section>
              </Reveal>

              {/* DIRECT CONTACT */}

              <Reveal delay={0.06}>
                <section className="sh-contact-direct">
                  <div className="sh-contact-direct-heading">
                    <span className="sh-contact-direct-heading-icon">
                      <Mail
                        size={19}
                        aria-hidden="true"
                      />
                    </span>

                    <div>
                      <h2>Prefer direct contact?</h2>
                      <p>Use the available contact details.</p>
                    </div>
                  </div>

                  {hasDirectContact ? (
                    <div className="sh-contact-direct-links">
                      {contactEmail && (
                        <a
                          className="sh-contact-direct-link"
                          href={`mailto:${contactEmail}`}
                        >
                          <span className="sh-contact-direct-link-icon">
                            <Mail
                              size={17}
                              aria-hidden="true"
                            />
                          </span>

                          <span className="sh-contact-direct-link-copy">
                            <small>Email us</small>
                            <strong>{contactEmail}</strong>
                          </span>

                          <ArrowUpRight
                            size={15}
                            aria-hidden="true"
                          />
                        </a>
                      )}

                      {contactPhone && (
                        <a
                          className="sh-contact-direct-link"
                          href={`tel:${contactPhone}`}
                        >
                          <span className="sh-contact-direct-link-icon">
                            <Phone
                              size={17}
                              aria-hidden="true"
                            />
                          </span>

                          <span className="sh-contact-direct-link-copy">
                            <small>Call us</small>
                            <strong>{contactPhone}</strong>
                          </span>

                          <ArrowUpRight
                            size={15}
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  ) : (
                    <p className="sh-contact-no-direct">
                      Please use the contact form to share your
                      project requirements.
                    </p>
                  )}
                </section>
              </Reveal>

              {/* PRIVACY NOTE */}

              <Reveal delay={0.1}>
                <aside className="sh-contact-privacy">
                  <span className="sh-contact-privacy-icon">
                    <LockKeyhole
                      size={17}
                      aria-hidden="true"
                    />
                  </span>

                  <div className="sh-contact-privacy-copy">
                    <strong>Your information matters</strong>

                    <p>
                      Share only details relevant to your inquiry.
                      Avoid including credentials or confidential
                      production information in your message.
                    </p>
                  </div>
                </aside>
              </Reveal>
            </aside>

            {/* =================================================
                RIGHT COLUMN — CONTACT FORM
            ================================================= */}

            <Reveal delay={0.08}>
              <motion.div
                className="sh-contact-form-panel"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 18,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.08,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.48,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <header className="sh-contact-form-header">
                  <div className="sh-contact-form-heading-row">
                    <div>
                      <span className="sh-contact-form-kicker">
                        <Sparkles
                          size={15}
                          aria-hidden="true"
                        />
                        Your project starts here
                      </span>

                      <h2 className="sh-contact-form-heading">
                        Tell us what you're working on.
                      </h2>
                    </div>

                    <span className="sh-contact-form-badge">
                      <span
                        className="sh-contact-form-badge-dot"
                        aria-hidden="true"
                      />
                      Get in touch
                    </span>
                  </div>

                  <p className="sh-contact-form-description">
                    Fill in the details below and tell us what
                    you need help with. A clear starting point
                    is all you need.
                  </p>
                </header>

                {/* DISMISSIBLE ALERT BOX */}

                <AnimatePresence initial={false}>
                  {showSecurityNote && (
                    <motion.aside
                      key="security-note"
                      className="sh-contact-alert"
                      role="note"
                      aria-labelledby="sh-contact-alert-title"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              height: 0,
                              y: -8,
                            }
                      }
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: reduceMotion ? 0 : -5,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.23,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="sh-contact-alert-icon">
                        <Info
                          size={20}
                          aria-hidden="true"
                        />
                      </span>

                      <div className="sh-contact-alert-copy">
                        <h3
                          id="sh-contact-alert-title"
                          className="sh-contact-alert-heading"
                        >
                          A quick security note
                        </h3>

                        <p className="sh-contact-alert-message">
                          Please don't include{" "}
                          <strong>passwords, API keys, access
                          tokens or confidential credentials</strong>{" "}
                          in this form. You can discuss sensitive
                          technical details through an appropriate
                          channel later.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="sh-contact-alert-dismiss"
                        aria-label="Dismiss security note"
                        onClick={() => setShowSecurityNote(false)}
                      >
                        <X
                          size={16}
                          aria-hidden="true"
                        />
                      </button>
                    </motion.aside>
                  )}
                </AnimatePresence>

                {/* KEEP THE EXISTING FORM FUNCTIONALITY */}

                <div className="sh-contact-form-content">
                  <ContactForm />
                </div>

                <div className="sh-contact-form-footnote">
                  <ShieldCheck
                    size={15}
                    aria-hidden="true"
                  />

                  <span>
                    Please provide information relevant to your
                    inquiry. Your form's submission and data
                    handling continue to follow your existing
                    ContactForm implementation.
                  </span>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}