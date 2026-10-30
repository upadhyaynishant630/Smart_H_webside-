
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  CheckCircle2,
  Gauge,
  Leaf,
  PanelsTopLeft,
  ShieldCheck,
  Sun,
  Zap,
} from "lucide-react";

import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SolarCapabilityMarquee } from "@/components/home/SolarCapabilityMarquee";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import {
  ButtonLink,
  CtaBand,
  Reveal,
  SectionHeading,
} from "@/components/ui/brand";
import { FAQAccordion } from "@/components/ui/cards";
import { ThreeDIcon } from "@/components/ui/ThreeDIcon";

import residentialImage from "@/assets/hero/solar-residential.jpg";

import {
  solarCapabilities,
  solarFaqs,
  solarHomeCopy as copy,
  solarPrinciples,
  solarProcess,
  solarSolutions,
} from "@/data/solarHome";

/*
  These two content groups replace the repetitive property-use-case
  and project-essentials sections. Copy is intentionally educational:
  actual equipment, availability and final system suitability must be
  confirmed during a site assessment.
*/

const solarSystemTypes = [
  {
    id: "on-grid",
    icon: Sun,
    label: "GRID-CONNECTED",
    title: "On-Grid Solar",
    body: "A solar configuration connected to the utility grid. It can help offset grid electricity use; export and net-metering arrangements depend on local utility rules.",
    fit: "For properties with an available grid connection.",
  },
  {
    id: "off-grid",
    icon: BatteryCharging,
    label: "BATTERY-SUPPORTED",
    title: "Off-Grid Solar",
    body: "A standalone configuration that uses battery storage to supply power when solar generation is unavailable. Capacity should be planned around essential loads and backup duration.",
    fit: "For sites where grid access is unavailable or unreliable.",
  },
  {
    id: "hybrid",
    icon: Zap,
    label: "GRID + STORAGE",
    title: "Hybrid Solar",
    body: "A configuration that combines solar, a grid connection and battery storage. Backup capability depends on the inverter, battery capacity and selected backup circuits.",
    fit: "For properties that need grid connection with backup capability.",
  },
];

const solarComponents = [
  {
    id: "solar-panels",
    icon: PanelsTopLeft,
    number: "01",
    title: "Solar Panels",
    body: "Convert sunlight into DC electricity. Selection depends on available roof space, orientation, shading and module specifications.",
  },
  {
    id: "solar-inverter",
    icon: Zap,
    number: "02",
    title: "Solar Inverter",
    body: "Converts the panels’ DC output into usable AC electricity. Its type and capacity must match the system design.",
  },
  {
    id: "mounting-structure",
    icon: Gauge,
    number: "03",
    title: "Mounting Structure",
    body: "Supports and secures the panels. The structure should suit the roof type and be designed for relevant site and wind conditions.",
  },
  {
    id: "electrical-protection",
    icon: ShieldCheck,
    number: "04",
    title: "Electrical Protection",
    body: "Protective devices, earthing, isolators and correctly specified wiring help support safe system operation.",
  },
  {
    id: "system-monitoring",
    icon: Activity,
    number: "05",
    title: "Monitoring System",
    body: "Helps track system performance and identify changes in generation. Features depend on the selected equipment and connectivity.",
  },
  {
    id: "battery-storage",
    icon: BatteryCharging,
    number: "06",
    title: "Battery Storage",
    body: "Stores energy for later use where backup or off-grid operation is required. Battery sizing depends on load and backup needs.",
  },
];

const solarHomeStyles = `
  .solar-home-page,
  .solar-home-page *,
  .solar-home-page *::before,
  .solar-home-page *::after {
    box-sizing: border-box;
  }

  .solar-home-page {
    --sh-midnight: #071426;
    --sh-navy: #0b1730;
    --sh-cobalt: #2457ed;
    --sh-cobalt-dark: #193db2;
    --sh-red: #ff304b;
    --sh-red-dark: #df1839;
    --sh-ink: #101b34;
    --sh-muted: #65718a;
    --sh-line: rgba(21, 43, 80, .12);
    --sh-surface: #f5f7fc;

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow-x: clip;
    color: var(--sh-ink);
    background: #fff;
    -webkit-font-smoothing: antialiased;
  }

  .solar-home-page img {
    max-width: 100%;
  }

  .solar-home-page h1,
  .solar-home-page h2,
  .solar-home-page h3,
  .solar-home-page h4 {
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .solar-home-page p {
    overflow-wrap: break-word;
  }

  .solar-home-page a {
    -webkit-tap-highlight-color: transparent;
  }

  /* Scoped colour overrides for existing Tailwind utilities. */

  .solar-home-page .text-primary {
    color: var(--sh-cobalt) !important;
  }

  .solar-home-page .bg-primary {
    background-color: var(--sh-cobalt) !important;
  }

  .solar-home-page .border-primary {
    border-color: var(--sh-cobalt) !important;
  }

  .solar-home-page .text-primary-foreground {
    color: #fff !important;
  }

  .solar-home-page .text-signal {
    color: var(--sh-red) !important;
  }

  .solar-home-page .bg-night {
    background-color: var(--sh-midnight) !important;
  }

  .solar-home-page [class~="bg-primary/10"] {
    background-color: rgba(36, 87, 237, .10) !important;
  }

  .solar-home-page [class~="border-primary/40"] {
    border-color: rgba(36, 87, 237, .40) !important;
  }

  .solar-home-page [class~="border-primary/25"] {
    border-color: rgba(36, 87, 237, .25) !important;
  }

  .solar-home-page [class~="bg-amber-400/15"] {
    background-color: rgba(255, 48, 75, .09) !important;
  }

  .solar-home-page [class~="text-amber-300"],
  .solar-home-page [class~="text-amber-600"],
  .solar-home-page [class~="text-amber-700"] {
    color: var(--sh-red) !important;
  }

  .solar-home-page [class~="border-amber-400/25"],
  .solar-home-page [class~="border-amber-500/25"] {
    border-color: rgba(255, 48, 75, .24) !important;
  }

  /* Consistent vertical rhythm. */

  .solar-home-page .section-y {
    padding-block: clamp(2.65rem, 4.6vw, 4.3rem) !important;
  }

  .solar-home-page section[id] {
    scroll-margin-top: 6rem;
  }

  .solar-home-page .solar-intro-section {
    position: relative;
    isolation: isolate;
    background:
      radial-gradient(
        ellipse at 2% 25%,
        rgba(36, 87, 237, .055),
        transparent 40%
      ),
      linear-gradient(180deg, #fff 0%, #fbfcff 100%);
  }

  .solar-home-page .solar-intro-grid {
    align-items: center;
  }

  .solar-home-page .solar-intro-copy {
    min-width: 0;
  }

  .solar-home-page .solar-intro-copy .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: .55rem;
  }

  .solar-home-page .solar-intro-copy h2 {
    max-width: 690px;
    line-height: 1.12;
    letter-spacing: -.045em;
  }

  .solar-home-page .solar-intro-copy > p {
    max-width: 620px;
    line-height: 1.8;
  }

  .solar-home-page .solar-intro-checklist {
    gap: .85rem 1.15rem;
  }

  .solar-home-page .solar-intro-checklist li {
    min-width: 0;
    line-height: 1.65;
  }

  .solar-home-page .solar-intro-checklist svg {
    color: var(--sh-cobalt) !important;
  }

  .solar-home-page .solar-intro-actions {
    align-items: center;
    gap: .75rem;
  }

  .solar-home-page .solar-intro-actions a {
    transition:
      transform 220ms ease,
      box-shadow 220ms ease;
  }

  .solar-home-page .solar-intro-actions a:hover {
    transform: translateY(-2px);
  }

  /* Main residential image. */

  .solar-home-page .solar-image-stack {
    position: relative;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .solar-home-page .solar-image-frame {
    position: relative;
    isolation: isolate;
    width: 100%;
    overflow: hidden;
    border: 1px solid rgba(25, 61, 135, .16);
    border-radius: 1.5rem;
    background: #e9eef8;
    box-shadow:
      0 20px 52px rgba(7, 20, 38, .10),
      0 3px 10px rgba(7, 20, 38, .035);
  }

  .solar-home-page .solar-image-frame::after {
    position: absolute;
    z-index: 3;
    inset: 0;
    border: 1px solid rgba(255, 255, 255, .14);
    border-radius: inherit;
    pointer-events: none;
    content: "";
  }

  .solar-home-page .solar-image-main {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1.32 / 1;
    max-height: 530px;
    object-fit: cover;
    object-position: center;
    transition: transform 900ms cubic-bezier(.22, 1, .36, 1);
    will-change: transform;
  }

  .solar-home-page .solar-image-stack:hover .solar-image-main {
    transform: scale(1.035);
  }

  .solar-home-page .solar-image-overlay {
    position: absolute;
    z-index: 1;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(
        0deg,
        rgba(7, 20, 38, .96) 0%,
        rgba(7, 20, 38, .62) 30%,
        rgba(7, 20, 38, .12) 68%,
        rgba(7, 20, 38, .03) 100%
      );
  }

  .solar-home-page .solar-image-caption {
    position: absolute;
    z-index: 2;
    inset-inline: 0;
    bottom: 0;
    padding: clamp(1.1rem, 2.7vw, 2rem);
    color: white;
  }

  .solar-home-page .solar-image-badge {
    display: inline-flex;
    max-width: 100%;
    align-items: center;
    gap: .5rem;
    padding: .5rem .85rem;
    border: 1px solid rgba(255, 255, 255, .28);
    border-radius: 999px;
    color: white;
    background: rgba(7, 20, 38, .58);
    font-size: .72rem;
    font-weight: 700;
    line-height: 1.45;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .solar-home-page .solar-image-badge svg {
    color: var(--sh-red) !important;
  }

  .solar-home-page .solar-image-caption p {
    max-width: 470px;
    margin-top: .85rem;
    font-size: clamp(1.15rem, 2vw, 1.65rem);
    font-weight: 750;
    line-height: 1.28;
    letter-spacing: -.025em;
  }

  .solar-home-page .solar-image-note {
    position: absolute;
    z-index: 5;
    top: 8%;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: clamp(180px, 22vw, 250px);
    max-width: calc(100% - 24px);
    min-width: 0;
    margin: 0;
    padding: 12px;
    border: 1px solid rgba(36, 87, 237, .16);
    border-radius: 14px;
    background: rgba(255, 255, 255, .96);
    box-shadow: 0 12px 32px rgba(7, 20, 38, .16);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transform: translateY(-50%);
    animation: solar-note-fade 650ms ease-out both;
    transition: box-shadow 250ms ease, border-color 250ms ease;
  }

  .solar-home-page .solar-image-note:hover {
    border-color: rgba(36, 87, 237, .35);
    box-shadow: 0 16px 36px rgba(7, 20, 38, .2);
  }

  .solar-home-page .solar-image-note-icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    border: 1px solid rgba(255, 48, 75, .18);
    border-radius: 10px;
    color: #ff304b;
    background: rgba(255, 48, 75, .08);
  }

  .solar-home-page .solar-image-note-icon svg {
    width: 17px;
    height: 17px;
  }

  .solar-home-page .solar-image-note-copy {
    flex: 1;
    min-width: 0;
  }

  .solar-home-page .solar-image-note-copy h3 {
    margin: 0;
    color: #071426;
    font-size: .78rem;
    font-weight: 750;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  .solar-home-page .solar-image-note-copy p {
    margin: 4px 0 0;
    color: #65718a;
    font-size: .69rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  @keyframes solar-note-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 767px) {
    .solar-home-page .solar-image-note {
      top: 12px;
      right: 10px;
      width: min(170px, 47%);
      max-width: calc(100% - 20px);
      gap: 7px;
      padding: 9px;
      border-radius: 12px;
      transform: none;
    }

    .solar-home-page .solar-image-note-icon {
      width: 29px;
      height: 29px;
      flex-basis: 29px;
      border-radius: 8px;
    }

    .solar-home-page .solar-image-note-icon svg {
      width: 15px;
      height: 15px;
    }

    .solar-home-page .solar-image-note-copy h3 {
      font-size: .72rem;
      line-height: 1.35;
    }

    .solar-home-page .solar-image-note-copy p {
      margin-top: 3px;
      font-size: .64rem;
      line-height: 1.4;
    }
  }

  @media (max-width: 380px) {
    .solar-home-page .solar-image-note {
      top: 8px;
      right: 8px;
      width: min(148px, 47%);
      gap: 6px;
      padding: 7px;
    }

    .solar-home-page .solar-image-note-icon {
      width: 26px;
      height: 26px;
      flex-basis: 26px;
    }

    .solar-home-page .solar-image-note-copy h3 {
      font-size: .68rem;
    }

    .solar-home-page .solar-image-note-copy p {
      font-size: .6rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .solar-home-page .solar-image-note {
      animation: none;
      transition: none;
    }
  }

  /* Solar system configuration cards. */

  .solar-home-page .solar-system-section {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 8% 12%, rgba(36, 87, 237, .07), transparent 34%),
      linear-gradient(180deg, #fff 0%, #f7f9ff 100%);
  }

  .solar-home-page .solar-system-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1rem, 2vw, 1.4rem);
    margin-top: clamp(2rem, 3.5vw, 2.8rem);
  }

  .solar-home-page .solar-system-card {
    position: relative;
    display: flex;
    min-width: 0;
    height: 100%;
    flex-direction: column;
    padding: clamp(1.35rem, 2.3vw, 1.85rem);
    overflow: hidden;
    border: 1px solid rgba(21, 43, 80, .12);
    border-radius: 1.35rem;
    background: rgba(255, 255, 255, .96);
    box-shadow: 0 10px 30px rgba(7, 20, 38, .045);
    transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
  }

  .solar-home-page .solar-system-card::before {
    position: absolute;
    top: 0;
    left: 8%;
    right: 8%;
    height: 3px;
    border-radius: 0 0 999px 999px;
    background: linear-gradient(90deg, var(--sh-cobalt), var(--sh-red));
    content: "";
    opacity: .8;
  }

  .solar-home-page .solar-system-card:hover {
    transform: translateY(-5px);
    border-color: rgba(36, 87, 237, .32);
    box-shadow: 0 19px 42px rgba(7, 20, 38, .085);
  }

  .solar-home-page .solar-system-icon {
    display: grid;
    width: 54px;
    height: 54px;
    flex: 0 0 54px;
    place-items: center;
    border: 1px solid rgba(36, 87, 237, .13);
    border-radius: 17px;
    background: linear-gradient(145deg, rgba(36, 87, 237, .10), rgba(255, 48, 75, .08));
    color: var(--sh-cobalt);
    transition: transform 280ms ease, color 280ms ease;
  }

  .solar-home-page .solar-system-icon svg {
    width: 25px;
    height: 25px;
  }

  .solar-home-page .solar-system-card:hover .solar-system-icon {
    transform: translateY(-2px) rotate(-4deg);
    color: var(--sh-red);
  }

  .solar-home-page .solar-system-label {
    display: inline-flex;
    align-self: flex-start;
    max-width: 100%;
    margin-top: 1.2rem;
    padding: .42rem .7rem;
    border: 1px solid rgba(36, 87, 237, .13);
    border-radius: 999px;
    background: rgba(36, 87, 237, .045);
    color: var(--sh-cobalt);
    font-size: .62rem;
    font-weight: 800;
    letter-spacing: .09em;
    line-height: 1.4;
  }

  .solar-home-page .solar-system-card h3 {
    margin: 1rem 0 0;
    color: var(--sh-navy);
    font-size: clamp(1.15rem, 1.6vw, 1.35rem);
    font-weight: 800;
    line-height: 1.3;
  }

  .solar-home-page .solar-system-card > p {
    flex: 1;
    margin: .75rem 0 1.15rem;
    color: var(--sh-muted);
    font-size: .88rem;
    line-height: 1.8;
  }

  .solar-home-page .solar-system-fit {
    display: flex;
    align-items: flex-start;
    gap: .55rem;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(21, 43, 80, .09);
    color: #45536e;
    font-size: .76rem;
    font-weight: 650;
    line-height: 1.65;
  }

  .solar-home-page .solar-system-fit svg {
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
    margin-top: 2px;
    color: #27866d;
  }

  .solar-home-page .solar-system-disclaimer {
    max-width: 850px;
    margin: 1.5rem auto 0;
    color: #748099;
    font-size: .75rem;
    line-height: 1.75;
    text-align: center;
  }

  /* Solar components and technology cards. */

  .solar-home-page .solar-technology-section {
    position: relative;
    isolation: isolate;
    background:
      radial-gradient(ellipse at 95% 5%, rgba(36, 87, 237, .065), transparent 33%),
      linear-gradient(180deg, #f5f7fc 0%, #fff 100%);
  }

  .solar-home-page .solar-technology-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-top: clamp(2rem, 3.5vw, 2.8rem);
  }

  .solar-home-page .solar-technology-card {
    position: relative;
    display: flex;
    min-width: 0;
    height: 100%;
    flex-direction: column;
    padding: 1.4rem;
    border: 1px solid rgba(21, 43, 80, .11);
    border-radius: 1.2rem;
    background: #fff;
    box-shadow: 0 8px 24px rgba(7, 20, 38, .035);
    transition: transform 280ms ease, border-color 280ms ease, box-shadow 280ms ease;
  }

  .solar-home-page .solar-technology-card:hover {
    transform: translateY(-4px);
    border-color: rgba(36, 87, 237, .3);
    box-shadow: 0 16px 34px rgba(7, 20, 38, .075);
  }

  .solar-home-page .solar-technology-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .8rem;
  }

  .solar-home-page .solar-technology-icon {
    display: grid;
    width: 46px;
    height: 46px;
    flex: 0 0 46px;
    place-items: center;
    border-radius: 14px;
    background: rgba(36, 87, 237, .085);
    color: var(--sh-cobalt);
    transition: transform 280ms ease, color 280ms ease, background 280ms ease;
  }

  .solar-home-page .solar-technology-icon svg {
    width: 22px;
    height: 22px;
  }

  .solar-home-page .solar-technology-card:hover .solar-technology-icon {
    transform: scale(1.06) rotate(-3deg);
    background: rgba(255, 48, 75, .085);
    color: var(--sh-red);
  }

  .solar-home-page .solar-technology-number {
    color: rgba(36, 87, 237, .42);
    font-size: .75rem;
    font-weight: 850;
    letter-spacing: .1em;
  }

  .solar-home-page .solar-technology-card h3 {
    margin: 1.1rem 0 0;
    color: var(--sh-navy);
    font-size: 1.05rem;
    font-weight: 800;
    line-height: 1.4;
  }

  .solar-home-page .solar-technology-card p {
    margin: .55rem 0 0;
    color: var(--sh-muted);
    font-size: .83rem;
    line-height: 1.8;
  }

  .solar-home-page .solar-technology-note {
    display: flex;
    align-items: flex-start;
    gap: .7rem;
    max-width: 900px;
    margin: 1.5rem auto 0;
    padding: 1rem 1.15rem;
    border: 1px solid rgba(36, 87, 237, .13);
    border-radius: 1rem;
    background: rgba(255, 255, 255, .8);
    color: #66718a;
    font-size: .76rem;
    line-height: 1.75;
  }

  .solar-home-page .solar-technology-note svg {
    width: 17px;
    height: 17px;
    flex: 0 0 17px;
    margin-top: 2px;
    color: var(--sh-cobalt);
  }

  @media (max-width: 1023px) {
    .solar-home-page .solar-system-grid,
    .solar-home-page .solar-technology-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 639px) {
    .solar-home-page .solar-system-grid,
    .solar-home-page .solar-technology-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .solar-home-page .solar-system-card {
      padding: 1.35rem;
    }

    .solar-home-page .solar-technology-card {
      padding: 1.25rem;
    }

    .solar-home-page .solar-technology-note {
      padding: .9rem;
    }
  }

  /* Marquee theme integration. */

  .solar-home-page .solar-capability-marquee {
    --scm-ink: var(--sh-ink);
    --scm-blue: var(--sh-cobalt);
    --scm-amber: var(--sh-red);
  }

  .solar-home-page .solar-capability-marquee .scm-badge {
    color: var(--sh-cobalt);
    border-color: rgba(36, 87, 237, .2);
  }

  .solar-home-page .solar-capability-marquee .scm-badge::before {
    background: var(--sh-red);
    box-shadow: 0 0 0 4px rgba(255, 48, 75, .12);
  }

  .solar-home-page .solar-capability-marquee .scm-title span {
    color: var(--sh-cobalt);
    text-decoration-color: var(--sh-red);
  }

  .solar-home-page .solar-capability-marquee .scm-pill {
    border-color: rgba(24, 43, 79, .13);
    box-shadow: 0 8px 22px rgba(7, 20, 38, .05);
    transition:
      transform 250ms ease,
      border-color 250ms ease,
      box-shadow 250ms ease;
  }

  .solar-home-page .solar-capability-marquee .scm-pill:hover {
    transform: translateY(-3px);
    border-color: rgba(36, 87, 237, .34);
    box-shadow: 0 13px 28px rgba(7, 20, 38, .09);
  }

  .solar-home-page .solar-capability-marquee .scm-pill svg {
    color: var(--sh-red);
  }

  /* All section heading actions. */

  .solar-home-page .solar-section-heading-row {
    align-items: end;
    gap: 1.5rem;
  }

  .solar-home-page .solar-section-action {
    flex: 0 0 auto;
    max-width: 100%;
  }

  .solar-home-page .solar-section-action a {
    max-width: 100%;
    overflow-wrap: anywhere;
    transition:
      color 220ms ease,
      border-color 220ms ease,
      background 220ms ease,
      transform 220ms ease;
  }

  .solar-home-page .solar-section-action a:hover {
    color: var(--sh-cobalt);
    border-color: var(--sh-cobalt);
    transform: translateY(-2px);
  }

  /* Solution cards. */

  .solar-home-page .solar-solutions-grid {
    gap: clamp(1rem, 1.7vw, 1.4rem);
    margin-top: clamp(2rem, 3.5vw, 2.8rem);
  }

  .solar-home-page .solar-solution-card {
    position: relative;
    isolation: isolate;
    min-width: 0;
    border-radius: 1.25rem;
    transition:
      transform 320ms cubic-bezier(.22, 1, .36, 1),
      border-color 320ms ease,
      box-shadow 320ms ease;
  }

  .solar-home-page .solar-solution-card::before {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 8%;
    right: 8%;
    height: 2px;
    border-radius: 0 0 999px 999px;
    content: "";
    background: linear-gradient(
      90deg,
      transparent,
      var(--sh-cobalt),
      var(--sh-red),
      transparent
    );
    opacity: 0;
    transform: scaleX(.65);
    transition:
      opacity 300ms ease,
      transform 300ms ease;
  }

  .solar-home-page .solar-solution-card:hover {
    transform: translateY(-5px);
    border-color: rgba(36, 87, 237, .36);
    box-shadow: 0 20px 42px rgba(7, 20, 38, .085);
  }

  .solar-home-page .solar-solution-card:hover::before {
    opacity: 1;
    transform: scaleX(1);
  }

  .solar-home-page .solar-solution-image {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    transition: transform 750ms cubic-bezier(.22, 1, .36, 1);
  }

  .solar-home-page .solar-solution-card:hover .solar-solution-image {
    transform: scale(1.045);
  }

  .solar-home-page .solar-solution-icon {
    transition:
      transform 300ms cubic-bezier(.22, 1, .36, 1),
      color 300ms ease,
      background-color 300ms ease;
  }

  .solar-home-page .solar-solution-card:hover .solar-solution-icon {
    transform: translateY(-2px) rotate(-3deg);
    color: var(--sh-red);
    background: rgba(255, 48, 75, .09);
  }

  .solar-home-page .solar-solution-label {
    max-width: 100%;
    overflow-wrap: anywhere;
    line-height: 1.4;
  }

  .solar-home-page .solar-solution-link {
    align-self: flex-start;
    gap: .55rem;
    line-height: 1.5;
    color: var(--sh-cobalt);
    transition: color 220ms ease;
  }

  .solar-home-page .solar-solution-link:hover {
    color: var(--sh-red);
  }

  /* Midnight navy principles section. */

  .solar-home-page .solar-principles-section {
    position: relative;
    isolation: isolate;
    background:
      radial-gradient(
        ellipse at 7% 13%,
        rgba(36, 87, 237, .22),
        transparent 38%
      ),
      radial-gradient(
        ellipse at 95% 90%,
        rgba(255, 48, 75, .10),
        transparent 32%
      ),
      linear-gradient(135deg, #071426 0%, #0a1c38 58%, #071426 100%);
  }

  .solar-home-page .solar-principles-section .grid-lines {
    opacity: .15;
    pointer-events: none;
    mask-image: linear-gradient(90deg, #000, transparent 90%);
    -webkit-mask-image: linear-gradient(90deg, #000, transparent 90%);
  }

  .solar-home-page .solar-principles-grid {
    gap: 1px;
    margin-top: clamp(2rem, 3.5vw, 2.8rem);
    border: 1px solid rgba(217, 231, 255, .13);
    background: rgba(217, 231, 255, .13);
    box-shadow: 0 25px 65px rgba(0, 0, 0, .16);
  }

  .solar-home-page .solar-principle-card {
    position: relative;
    min-width: 0;
    color: #f6f9ff;
    background: rgba(7, 20, 38, .96);
    transition: background 300ms ease;
  }

  .solar-home-page .solar-principle-card:hover {
    background: rgba(15, 37, 75, .98);
  }

  .solar-home-page .solar-principle-card h3 {
    color: #f6f9ff;
    line-height: 1.4;
  }

  .solar-home-page .solar-principle-card p {
    color: rgba(222, 233, 249, .76);
    line-height: 1.8;
  }

  .solar-home-page .solar-principle-card::after {
    position: absolute;
    right: 1.5rem;
    bottom: 0;
    left: 1.5rem;
    height: 2px;
    content: "";
    background: linear-gradient(90deg, var(--sh-cobalt), var(--sh-red));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 300ms ease;
  }

  .solar-home-page .solar-principle-card:hover::after {
    transform: scaleX(1);
  }

  /* Installation process. */

  .solar-home-page .solar-process-list {
    margin-top: clamp(2.1rem, 3.8vw, 3rem);
    gap: clamp(1.6rem, 2.6vw, 2.2rem);
  }

  .solar-home-page .solar-process-step {
    min-width: 0;
    height: 100%;
  }

  .solar-home-page .solar-process-number {
    position: relative;
    z-index: 1;
    background: var(--sh-cobalt) !important;
    box-shadow:
      0 7px 22px rgba(36, 87, 237, .18),
      0 0 0 7px #fff;
    transition:
      transform 280ms ease,
      box-shadow 280ms ease,
      background 280ms ease;
  }

  .solar-home-page .solar-process-step:hover .solar-process-number {
    transform: translateY(-3px);
    background: var(--sh-red) !important;
    box-shadow:
      0 12px 26px rgba(255, 48, 75, .22),
      0 0 0 7px #fff;
  }

  .solar-home-page .solar-process-step h3 {
    line-height: 1.4;
  }

  .solar-home-page .solar-process-step p {
    line-height: 1.75;
  }

  /* Subsidy banner in the matching colour system. */

  .solar-home-page .solar-subsidy-section {
    padding-block: clamp(1.6rem, 3vw, 2.5rem);
  }

  .solar-home-page .solar-subsidy-card {
    position: relative;
    isolation: isolate;
    border-color: rgba(255, 48, 75, .22);
    background:
      radial-gradient(
        circle at 90% 10%,
        rgba(36, 87, 237, .07),
        transparent 35%
      ),
      linear-gradient(120deg, #fff5f6 0%, #fff 55%, #f3f6ff 100%) !important;
    box-shadow: 0 18px 48px rgba(7, 20, 38, .07);
  }

  .solar-home-page .solar-subsidy-card::before {
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    border-radius: 999px;
    content: "";
    background: linear-gradient(
      180deg,
      var(--sh-red),
      var(--sh-cobalt),
      var(--sh-midnight)
    );
  }

  .solar-home-page .solar-subsidy-content {
    min-width: 0;
  }

  .solar-home-page .solar-subsidy-action {
    min-width: 0;
    max-width: 100%;
  }

  .solar-home-page .solar-subsidy-action a {
    max-width: 100%;
    white-space: normal;
    overflow-wrap: anywhere;
    background: var(--sh-midnight);
    transition:
      transform 230ms ease,
      background-color 230ms ease,
      box-shadow 230ms ease;
  }

  .solar-home-page .solar-subsidy-action a:hover {
    background: var(--sh-cobalt);
    box-shadow: 0 10px 25px rgba(36, 87, 237, .18);
    transform: translateY(-2px);
  }

  .solar-home-page .solar-subsidy-card > div > div > span {
    color: var(--sh-red);
  }

  /* FAQ. */

  .solar-home-page .solar-faq-section {
    align-items: start;
    gap: clamp(2rem, 4vw, 3.5rem);
  }

  .solar-home-page .solar-faq-copy {
    min-width: 0;
  }

  .solar-home-page .solar-faq-note {
    border-color: rgba(24, 43, 79, .11);
    background: #fff;
  }

  .solar-home-page .solar-faq-note a {
    transition: color 220ms ease;
  }

  .solar-home-page .solar-faq-note a:hover {
    color: var(--sh-red);
  }

  /* Hero carousel accent integration. */

  .solar-home-page .se-hero {
    --se-accent: #ff304b;
    --se-accent-strong: #2457ed;
  }

  .solar-home-page .se-hero .se-hero__eyebrow {
    color: var(--sh-red);
  }

  .solar-home-page .se-hero .se-hero__progress-fill {
    background: var(--sh-red);
    box-shadow: 0 0 12px rgba(255, 48, 75, .34);
  }

  .solar-home-page .se-hero .se-hero__control:hover {
    color: var(--sh-red);
    border-color: rgba(255, 48, 75, .78);
  }

  .solar-home-page .se-hero .se-hero__action--primary a,
  .solar-home-page .se-hero .se-hero__action--primary button {
    background: linear-gradient(135deg, #355ff2, #2457ed);
    color: #fff;
    box-shadow: 0 10px 28px rgba(36, 87, 237, .25);
  }

  .solar-home-page .se-hero .se-hero__action--primary a:hover,
  .solar-home-page .se-hero .se-hero__action--primary button:hover {
    background: linear-gradient(135deg, #ff4b62, #ff304b);
    color: #fff;
  }

  /* Focus states. */

  .solar-home-page a:focus-visible,
  .solar-home-page button:focus-visible {
    outline: 2px solid var(--sh-red);
    outline-offset: 4px;
  }

  /* Responsive layouts. */

  @media (min-width: 1280px) {
    .solar-home-page .solar-intro-grid {
      gap: 3.5rem;
    }
  }

  @media (max-width: 1024px) {
    .solar-home-page .solar-image-main {
      aspect-ratio: 1.2 / 1;
    }

    .solar-home-page .solar-solution-card {
      border-radius: 1.1rem;
    }
  }

  @media (max-width: 767px) {
    .solar-home-page .section-y {
      padding-block: 2.65rem !important;
    }

    .solar-home-page .solar-intro-copy h2 {
      line-height: 1.13;
    }

    .solar-home-page .solar-intro-copy > p {
      margin-top: 1rem;
      line-height: 1.75;
    }

    .solar-home-page .solar-intro-actions {
      margin-top: 1.4rem;
    }

    .solar-home-page .solar-image-main {
      aspect-ratio: 1.3 / 1;
      max-height: none;
    }

    .solar-home-page .solar-section-heading-row {
      align-items: flex-start;
      gap: 1.15rem;
    }

    .solar-home-page .solar-section-action {
      align-self: flex-start;
    }

    .solar-home-page .solar-solution-card:hover {
      transform: translateY(-2px);
    }

    .solar-home-page .solar-process-list {
      gap: 1.7rem;
    }

    .solar-home-page .solar-process-step {
      padding-bottom: .15rem;
    }

    .solar-home-page .solar-subsidy-section {
      padding-block: 1.4rem;
    }
  }

  @media (max-width: 480px) {
    .solar-home-page .solar-image-frame {
      border-radius: 1.1rem;
    }

    .solar-home-page .solar-image-caption {
      padding: 1rem;
    }

    .solar-home-page .solar-image-caption p {
      margin-top: .6rem;
      font-size: 1.12rem;
      line-height: 1.3;
    }

    .solar-home-page .solar-image-badge {
      gap: .4rem;
      padding: .4rem .65rem;
      font-size: .66rem;
    }

    .solar-home-page .solar-solution-card {
      padding: 1.15rem;
    }

    .solar-home-page .solar-solution-card .-mx-6 {
      margin-inline: -1.15rem;
    }

    .solar-home-page .solar-solution-card .-mt-6 {
      margin-top: -1.15rem;
    }

    .solar-home-page .solar-solution-label {
      font-size: .62rem;
      letter-spacing: .07em;
    }

    .solar-home-page .solar-subsidy-card {
      padding: 1.35rem;
    }

    .solar-home-page .solar-subsidy-card h2 {
      font-size: clamp(1.7rem, 7.4vw, 2.2rem);
      line-height: 1.12;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .solar-home-page *,
    .solar-home-page *::before,
    .solar-home-page *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: .01ms !important;
    }

    .solar-home-page .solar-image-main {
      transform: none !important;
    }
  }
`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: copy.seo.title },
      {
        name: "description",
        content: copy.seo.description,
      },
      {
        property: "og:title",
        content: copy.seo.socialTitle,
      },
      {
        property: "og:description",
        content: copy.seo.socialDescription,
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="solar-home-page">
      <style>{solarHomeStyles}</style>

      {/* Hero */}
      <HeroCarousel />

      {/* Solar suitability */}
      <section
        id="solar-fit"
        className="section-y container-x solar-intro-section scroll-mt-28"
      >
        <div className="solar-intro-grid grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="solar-intro-copy min-w-0 lg:col-span-6">
            <span className="eyebrow">{copy.intro.eyebrow}</span>

            <h2 className="text-h2 mt-4 text-balance">
              {copy.intro.titleLead}{" "}
              <span className="text-primary">
                {copy.intro.titleHighlight}
              </span>
              {copy.intro.titleTail}
            </h2>

            <p className="text-lead mt-5 text-muted-foreground">
              {copy.intro.body}
            </p>

            <ul className="solar-intro-checklist mt-6 grid gap-3 text-sm sm:grid-cols-2">
              {copy.intro.checklist.map((item) => (
                <li
                  key={item}
                  className="flex min-w-0 items-start gap-2.5 text-muted-foreground"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="solar-intro-actions mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/contact" variant="primary">
                {copy.intro.primaryCta}
              </ButtonLink>

              <ButtonLink to="/#solar-solutions" variant="outline">
                {copy.intro.secondaryCta}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="solar-image-stack min-w-0 lg:col-span-6"
          >
            <div className="solar-image-frame">
              <img
                src={residentialImage}
                alt={copy.intro.imageAlt}
                loading="lazy"
                width={1130}
                height={636}
                className="solar-image-main"
              />

              <div
                className="solar-image-overlay"
                aria-hidden="true"
              />

              <div className="solar-image-caption">
                <span className="solar-image-badge">
                  <Sun
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{copy.intro.imageBadge}</span>
                </span>

                <p>{copy.intro.imageHeadline}</p>
              </div>
            </div>

            <div className="solar-image-note">
              <span className="solar-image-note-icon">
                <Leaf className="h-5 w-5" aria-hidden="true" />
              </span>

              <div className="solar-image-note-copy">
                <h3>{copy.intro.imageNoteTitle}</h3>
                <p>{copy.intro.imageNoteBody}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solar capabilities */}
      <SolarCapabilityMarquee
        items={solarCapabilities}
        badge={copy.marquee.badge}
        titleFirst={copy.marquee.titleFirst}
        titleHighlight={copy.marquee.titleHighlight}
        quote={copy.marquee.quote}
        ariaLabel={copy.marquee.ariaLabel}
      />

      {/* Solar solutions */}
      <section
        id="solar-solutions"
        className="section-y container-x scroll-mt-28"
      >
        <div className="solar-section-heading-row flex flex-col justify-between md:flex-row md:items-end">
          <SectionHeading
            eyebrow={copy.solutionsSection.eyebrow}
            title={copy.solutionsSection.title}
            lead={copy.solutionsSection.lead}
          />

          <Reveal className="solar-section-action">
            <a
              href="#solar-solutions"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-current/25 px-5 py-2.5 text-sm font-semibold transition"
            >
              {copy.solutionsSection.button}
              <ArrowUpRight
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>

        <div className="solar-solutions-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {solarSolutions.map((solution, index) => {
            const Icon = solution.icon;

            return (
              <Reveal
                key={solution.title}
                delay={(index % 3) * 0.06}
                className="min-w-0"
              >
                <article className="solar-solution-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-7">
                  {solution.image && (
                    <div className="-mx-5 -mt-5 mb-5 overflow-hidden sm:-mx-7 sm:-mt-7">
                      <img
                        src={solution.image}
                        alt={solution.imageAlt || "Rooftop solar solution"}
                        loading="lazy"
                        width={800}
                        height={450}
                        className="solar-solution-image"
                      />
                    </div>
                  )}

                  <div className="relative flex min-w-0 items-center justify-between gap-3">
                    <span className="solar-solution-icon grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary sm:h-14 sm:w-14">
                      <Icon
                        className="h-6 w-6 sm:h-7 sm:w-7"
                        aria-hidden="true"
                      />
                    </span>

                    <span className="solar-solution-label rounded-full border border-border px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground sm:px-3 sm:text-[0.68rem]">
                      {solution.label}
                    </span>
                  </div>

                  <h3 className="relative mt-5 text-xl font-bold leading-snug">
                    {solution.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {solution.summary}
                  </p>

                  <Link
                    to="/contact"
                    className="solar-solution-link mt-6 inline-flex items-center text-sm font-semibold"
                  >
                    {copy.solutionsSection.cardLink}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Solar principles */}
      <section className="solar-principles-section surface-dark relative overflow-hidden bg-night section-y">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />

        <div className="container-x relative z-10">
          <SectionHeading
            eyebrow={copy.principlesSection.eyebrow}
            title={copy.principlesSection.title}
            lead={copy.principlesSection.lead}
          />

          <div className="solar-principles-grid grid overflow-hidden rounded-3xl md:grid-cols-3">
            {solarPrinciples.map((principle, index) => (
              <Reveal
                key={principle.title}
                delay={index * 0.07}
                className="min-w-0"
              >
                <article className="solar-principle-card group h-full p-6 sm:p-8 lg:p-9">
                  <ThreeDIcon
                    type={
                      index === 0
                        ? "solar"
                        : index === 1
                          ? "data"
                          : "shield"
                    }
                    variant="night"
                    size={58}
                  />

                  <h3 className="mt-5 text-xl font-bold">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm">
                    {principle.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solar system types — replaces the repetitive property-use-case section */}
      <section
        id="solar-system-types"
        className="solar-system-section section-y scroll-mt-28"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="SOLAR SYSTEM CONFIGURATIONS"
            title="Choose a Solar System That Fits Your Energy Needs"
            lead="On-grid, off-grid and hybrid systems serve different needs. The right configuration depends on grid availability, backup expectations, electricity usage and site conditions."
            align="center"
          />

          <div className="solar-system-grid">
            {solarSystemTypes.map((system, index) => {
              const Icon = system.icon;

              return (
                <Reveal
                  key={system.id}
                  delay={index * 0.08}
                  className="min-w-0"
                >
                  <article className="solar-system-card">
                    <span className="solar-system-icon">
                      <Icon aria-hidden="true" />
                    </span>

                    <span className="solar-system-label">
                      {system.label}
                    </span>

                    <h3>{system.title}</h3>
                    <p>{system.body}</p>

                    <div className="solar-system-fit">
                      <CheckCircle2 aria-hidden="true" />
                      <span>{system.fit}</span>
                    </div>

                    <Link
                      to="/contact"
                      className="solar-solution-link mt-5 inline-flex items-center gap-2 text-sm font-semibold"
                    >
                      Discuss this option
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <p className="solar-system-disclaimer">
            System availability, export arrangements, backup performance and final capacity are subject to site assessment, equipment specifications and applicable electricity-distribution rules.
          </p>
        </div>
      </section>

      {/* Installation process */}
      <section
        id="solar-process"
        className="section-y container-x scroll-mt-28"
      >
        <SectionHeading
          eyebrow={copy.processSection.eyebrow}
          title={copy.processSection.title}
          lead={copy.processSection.lead}
          align="center"
        />

        <ol className="solar-process-list relative grid gap-8 md:grid-cols-4 md:gap-6">
          <li
            className="absolute left-0 right-0 top-6 hidden h-px bg-linear-to-r from-transparent via-primary/40 to-transparent md:block"
            aria-hidden="true"
          />

          {solarProcess.map((step, index) => (
            <li key={step.step} className="solar-process-step relative">
              <Reveal delay={index * 0.06}>
                <span className="solar-process-number relative z-10 grid h-12 w-12 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {step.step}
                </span>

                <h3 className="mt-5 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Solar components & technology — replaces the repeated project-essentials checklist */}
      <section
        id="solar-components"
        className="solar-technology-section section-y scroll-mt-28"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="SOLAR COMPONENTS & TECHNOLOGY"
            title="The Key Components Behind a Reliable Solar System"
            lead="A solar installation is a connected system. Each component has a specific role, and its specification should be selected around the property, electrical design and energy requirements."
            align="center"
          />

          <div className="solar-technology-grid">
            {solarComponents.map((component, index) => {
              const Icon = component.icon;

              return (
                <Reveal
                  key={component.id}
                  delay={(index % 3) * 0.07}
                  className="min-w-0"
                >
                  <article className="solar-technology-card">
                    <div className="solar-technology-card-top">
                      <span className="solar-technology-icon">
                        <Icon aria-hidden="true" />
                      </span>

                      <span className="solar-technology-number">
                        {component.number}
                      </span>
                    </div>

                    <h3>{component.title}</h3>
                    <p>{component.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="solar-technology-note">
            <ShieldCheck aria-hidden="true" />
            <p>
              Component selection, protection requirements and equipment specifications should be confirmed by a qualified solar professional after reviewing the site and electrical requirements. Battery storage is optional and is not required for every solar installation.
            </p>
          </div>

          <div className="mt-7 flex justify-center">
            <ButtonLink to="/contact" variant="primary">
              Discuss Your Solar Requirements
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Subsidy guidance */}
      <section className="solar-subsidy-section container-x">
        <Reveal>
          <div className="solar-subsidy-card relative overflow-hidden rounded-3xl border p-5 shadow-soft sm:p-8 lg:p-10">
            <div
              className="pointer-events-none absolute -right-14 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="solar-subsidy-content relative grid min-w-0 gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
              <div className="min-w-0 lg:col-span-8">
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border bg-white/85 px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
                  <Sun className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{copy.subsidySection.eyebrow}</span>
                </span>

                <h2 className="text-h2 mt-5 text-balance">
                  {copy.subsidySection.title}
                </h2>

                <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                  {copy.subsidySection.body}
                </p>
              </div>

              <div className="solar-subsidy-action min-w-0 lg:col-span-4 lg:flex lg:justify-end">
                <a
                  href={copy.subsidySection.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                >
                  <span>{copy.subsidySection.button}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section
        id="solar-faq"
        className="solar-faq-section section-y container-x scroll-mt-28 grid lg:grid-cols-12"
      >
        <div className="solar-faq-copy lg:col-span-4">
          <SectionHeading
            eyebrow={copy.faqSection.eyebrow}
            title={copy.faqSection.title}
            lead={copy.faqSection.lead}
          />

          <div className="solar-faq-note mt-6 rounded-2xl border border-border bg-card p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {copy.faqSection.note}
            </p>

            <a
              href={copy.subsidySection.href}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <span>{copy.faqSection.noteLink}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        <Reveal className="min-w-0 lg:col-span-8">
          <FAQAccordion items={solarFaqs} />
        </Reveal>
      </section>

      {/* Final call to action */}
      <div className="solar-home-cta">
        <CtaBand
          eyebrow={copy.cta.eyebrow}
          title={copy.cta.title}
          body={copy.cta.body}
          buttonLabel={copy.cta.button}
          buttonTo="/contact"
        />
      </div>
    </div>
  );
}

export default Home;
