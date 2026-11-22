import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { navigation, siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { ThreeDIcon } from "@/components/ui/ThreeDIcon";
import { Wordmark, buttonStyles } from "@/components/ui/brand";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];
const DESKTOP_BREAKPOINT = 1120;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const megaRef = useRef(null);
  const mobileButtonRef = useRef(null);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const reduceMotion = useReducedMotion();

  const navItems = Array.isArray(navigation)
    ? navigation.filter(
        (item) =>
          item &&
          typeof item.to === "string" &&
          typeof item.label === "string",
      )
    : [];

  const serviceItems = Array.isArray(services)
    ? services.filter(
        (service) =>
          service &&
          typeof service.slug === "string" &&
          service.slug.length > 0 &&
          typeof service.title === "string" &&
          service.title.length > 0,
      )
    : [];

  const siteName = siteConfig?.name || "SmartEDGE";
  const ctaLabel = siteConfig?.ctaLabel || "Let's talk";

  const isActive = (to) =>
    to === "/"
      ? pathname === "/"
      : pathname === to || pathname.startsWith(`${to}/`);

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus after route navigation */
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  /* Prevent page scrolling while the mobile drawer is open */
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* Close the mobile drawer when switching to desktop width */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setMobileOpen(false);
        setMobileServicesOpen(false);
      } else {
        setMegaOpen(false);
      }
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Escape key and outside-click handling for the desktop mega menu */
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;

      const wasMobileOpen = mobileOpen;
      setMegaOpen(false);
      setMobileOpen(false);
      setMobileServicesOpen(false);

      if (wasMobileOpen) {
        mobileButtonRef.current?.focus();
      }
    };

    const onPointerDown = (event) => {
      const target = event.target;
      if (
        megaRef.current &&
        target instanceof Node &&
        !megaRef.current.contains(target)
      ) {
        setMegaOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileOpen((open) => !open);
    setMegaOpen(false);
  };

  const openMegaMenu = () => setMegaOpen(true);
  const closeMegaMenu = () => setMegaOpen(false);

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}
      data-scrolled={scrolled ? "true" : "false"}
      data-mobile-open={mobileOpen ? "true" : "false"}
      className="sh-navbar"
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");

        /* =====================================
           SMARTEDGE — WHITE & GREEN NAVBAR
        ===================================== */
        .sh-navbar {
          --sh-nav-height: 70px;
          --sh-nav-ink: #111827;
          --sh-nav-muted: #64748b;
          --sh-nav-green: #15803d;
          --sh-nav-green-bright: #16a34a;
          --sh-nav-border: #e5e7eb;
          --sh-nav-soft: #f0fdf4;
          --sh-nav-font: "Plus Jakarta Sans", Manrope, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

          position: sticky;
          top: 0;
          z-index: 10000;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          color: var(--sh-nav-ink);
          background: #fff;
          border-bottom: 1px solid rgb(17 24 39 / 0.08);
          box-shadow: 0 4px 18px rgb(17 24 39 / 0.06);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          font-family: var(--sh-nav-font);
          -webkit-font-smoothing: antialiased;
          transition: background 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
        }

        .sh-navbar *,
        .sh-navbar *::before,
        .sh-navbar *::after {
          box-sizing: border-box;
        }

        .sh-navbar[data-scrolled="true"] {
          background: rgb(255 255 255 / 0.97);
          border-bottom-color: rgb(17 24 39 / 0.08);
          box-shadow: 0 8px 28px rgb(17 24 39 / 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* Keep the header in place behind the drawer. The overlay and drawer
           are layered above it, so the uncovered 40% remains visibly blurred. */
        .sh-navbar[data-mobile-open="true"] {
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .sh-navbar a,
        .sh-navbar button {
          -webkit-tap-highlight-color: transparent;
        }

        .sh-navbar a:focus-visible,
        .sh-navbar button:focus-visible {
          outline: 2px solid var(--sh-nav-green);
          outline-offset: 4px;
        }

        /* Navbar shell */
        .sh-navbar-shell {
          position: relative;
          display: flex;
          width: calc(100% - clamp(28px, 5vw, 80px));
          max-width: 1440px;
          height: var(--sh-nav-height);
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-inline: auto;
        }

        /* Brand */
        .sh-navbar-brand {
          display: inline-flex;
          min-width: 0;
          flex: 0 0 auto;
          align-items: center;
          border-radius: 8px;
          text-decoration: none;
          transition: opacity 220ms ease;
        }

        .sh-navbar-brand:hover {
          opacity: 0.86;
        }

        .sh-navbar-brand > * {
          max-width: 100%;
        }

        .sh-navbar .sh-navbar-brand .smartedge-logo-wrap {
          display: flex;
          width: 11rem;
          max-width: 100%;
          height: calc(var(--sh-nav-height) - 8px);
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          padding: 3px 6px;
          box-sizing: border-box;
        }

        .sh-navbar .sh-navbar-brand .smartedge-logo {
          display: block;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: left center;
          transform: none;
        }

        /* Desktop navigation */
        .sh-navbar-desktop {
          display: none;
          min-width: 0;
          flex: 1 1 auto;
          align-items: center;
          justify-content: center;
        }

        .sh-navbar-list {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .sh-navbar-item {
          position: relative;
          min-width: 0;
        }

        .sh-navbar-services-trigger {
          display: inline-flex;
          align-items: center;
          gap: 0;
        }

        .sh-navbar-services-home {
          position: relative;
        }

        .sh-navbar .sh-navbar-services-dropdown {
          display: none;
        }

        .sh-navbar .sh-navbar-link {
          position: relative;
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 13px;
          border: 0;
          border-radius: 10px;
          background: transparent;
          color: var(--sh-nav-ink);
          font-family: var(--sh-nav-font);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.012em;
          line-height: 1.4;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition: color 220ms ease, background 220ms ease;
        }

        .sh-navbar .sh-navbar-link:not(.sh-navbar-services-dropdown):not([data-active="true"])::after {
          content: "";
          position: absolute;
          right: 13px;
          bottom: 3px;
          left: 13px;
          height: 2px;
          border-radius: 999px;
          background: var(--sh-nav-green-bright);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 240ms ease;
        }

        .sh-navbar .sh-navbar-link:not(.sh-navbar-services-dropdown):not([data-active="true"]):hover::after,
        .sh-navbar .sh-navbar-link:not(.sh-navbar-services-dropdown):not([data-active="true"]):focus-visible::after {
          transform: scaleX(1);
        }

        .sh-navbar .sh-navbar-link:hover,
        .sh-navbar .sh-navbar-link[data-active="true"],
        .sh-navbar .sh-navbar-link[aria-expanded="true"] {
          color: var(--sh-nav-green);
          background: transparent;
        }

        .sh-navbar .sh-navbar-link[data-active="true"] {
          font-weight: 800;
        }

        .sh-navbar-link-chevron {
          width: 14px;
          height: 14px;
          flex: 0 0 auto;
          transition: transform 250ms ease;
        }

        .sh-navbar-link[aria-expanded="true"] .sh-navbar-link-chevron {
          transform: rotate(180deg);
        }

        .sh-navbar-indicator {
          position: absolute;
          right: 13px;
          bottom: 3px;
          left: 13px;
          height: 2px;
          border-radius: 99px;
          background: var(--sh-nav-green-bright);
          box-shadow: 0 0 10px rgb(22 163 74 / 0.25);
        }

        /* Desktop services mega menu */
        .sh-navbar-mega-positioner {
          position: absolute;
          top: 100%;
          left: 50%;
          z-index: 110;
          width: min(700px, calc(100vw - 36px));
          padding-top: 11px;
          transform: translateX(-50%);
        }

        .sh-navbar-mega {
          position: relative;
          overflow: hidden;
          border: 1px solid #d9eafb;
          border-radius: 21px;
          background: linear-gradient(145deg, #fff 0%, #f4f9ff 100%);
          box-shadow: 0 22px 55px rgb(16 42 76 / 0.16), inset 0 1px 0 rgb(255 255 255 / 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .sh-navbar-mega-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 19px 21px 16px;
          border-bottom: 1px solid #e4eef8;
        }

        .sh-navbar-mega-eyebrow {
          display: block;
          margin-bottom: 5px;
          color: var(--sh-nav-green);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .sh-navbar-mega-heading {
          margin: 0;
          color: var(--sh-nav-ink);
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.025em;
        }

        .sh-navbar-mega-caption {
          display: inline-flex;
          min-height: 30px;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 6px 11px;
          border: 1px solid #dcfce7;
          border-radius: 999px;
          background: #f0fdf4;
          color: #35577d;
          font-size: 11px;
          font-weight: 650;
          line-height: 1.3;
          white-space: nowrap;
        }

        .sh-navbar-mega-count {
          color: var(--sh-nav-green-bright);
          font-size: 13px;
          font-weight: 850;
          font-variant-numeric: tabular-nums;
        }

        .sh-navbar-mega-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
          padding: 12px;
        }

        .sh-navbar-service-link {
          display: flex;
          min-width: 0;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          border: 1px solid transparent;
          border-radius: 13px;
          color: var(--sh-nav-ink);
          text-decoration: none;
          transition: transform 220ms ease, background 220ms ease, border-color 220ms ease;
        }

        .sh-navbar-service-link:hover {
          transform: translateY(-2px);
          border-color: #bbf7d0;
          background: #f0fdf4;
        }

        .sh-navbar-service-icon {
          display: grid;
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          place-items: center;
          overflow: hidden;
          border: 1px solid #d8eafa;
          border-radius: 13px;
          background: linear-gradient(145deg, rgb(76 159 232 / 0.13), rgb(130 200 245 / 0.12));
          transition: border-color 220ms ease, background 220ms ease;
        }

        .sh-navbar-service-link:hover .sh-navbar-service-icon {
          border-color: #86efac;
          background: #f0fdf4;
        }

        .sh-navbar-service-copy {
          display: block;
          min-width: 0;
          flex: 1 1 auto;
          padding-top: 2px;
        }

        .sh-navbar-service-title {
          display: block;
          color: var(--sh-nav-ink);
          font-size: 14px;
          font-weight: 750;
          line-height: 1.5;
          overflow-wrap: anywhere;
          transition: color 200ms ease;
        }

        .sh-navbar-service-link:hover .sh-navbar-service-title {
          color: var(--sh-nav-green);
        }

        .sh-navbar-service-summary {
          display: -webkit-box;
          margin-top: 4px;
          overflow: hidden;
          color: #617a96;
          font-size: 12px;
          font-weight: 450;
          line-height: 1.65;
          letter-spacing: 0.005em;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow-wrap: anywhere;
        }

        .sh-navbar-mega-footer {
          padding: 0 12px 12px;
        }

        .sh-navbar-view-all {
          display: flex;
          min-height: 42px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 14px;
          border: 1px solid #d8eafa;
          border-radius: 999px;
          background: #f0fdf4;
          color: #166534;
          font-size: 12px;
          font-weight: 750;
          text-decoration: none;
          transition: color 200ms ease, border-color 200ms ease, background 200ms ease;
        }

        .sh-navbar-view-all:hover {
          border-color: #a9d4f6;
          background: #dcfce7;
          color: #166534;
        }

        .sh-navbar-view-all svg {
          width: 15px;
          height: 15px;
          transition: transform 200ms ease;
        }

        .sh-navbar-view-all:hover svg {
          transform: translateX(3px);
        }

        /* Header actions */
        .sh-navbar-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 10px;
        }

        .sh-navbar .sh-navbar-cta {
          display: none;
          min-height: 39px;
          justify-content: center;
          border-radius: 10px;
          font-size: 12px;
          transition: transform 220ms ease, box-shadow 220ms ease, filter 220ms ease;
        }

        .sh-navbar .sh-navbar-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.06);
        }

        .sh-navbar a.sh-navbar-cta,
        .sh-navbar a.sh-navbar-mobile-cta {
          border-color: var(--sh-nav-green) !important;
          background: var(--sh-nav-green) !important;
          background-color: var(--sh-nav-green) !important;
          color: #fff !important;
          box-shadow: 0 5px 15px rgb(21 128 61 / 0.18);
          transition: background 250ms ease, border-color 250ms ease, box-shadow 250ms ease, transform 250ms ease;
        }

        .sh-navbar a.sh-navbar-cta:hover,
        .sh-navbar a.sh-navbar-mobile-cta:hover {
          border-color: #166534 !important;
          background: #166534 !important;
          background-color: #166534 !important;
          color: #fff !important;
          box-shadow: 0 8px 20px rgb(21 128 61 / 0.25);
          transform: translateY(-2px);
        }

        .sh-navbar a.sh-navbar-cta svg,
        .sh-navbar a.sh-navbar-mobile-cta svg {
          color: #fff !important;
          stroke: #fff;
        }

        /* Mobile menu toggle */
        .sh-navbar-mobile-toggle {
          display: grid;
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          place-items: center;
          border: 1px solid var(--sh-nav-border);
          border-radius: 13px;
          background: #fff;
          color: var(--sh-nav-ink);
          cursor: pointer;
          transition: background 200ms ease, border-color 200ms ease, transform 200ms ease;
        }

        .sh-navbar-mobile-toggle:hover {
          border-color: #bbf7d0;
          background: #f0fdf4;
        }

        .sh-navbar-mobile-toggle:active {
          transform: scale(0.96);
        }

        .sh-navbar-mobile-toggle svg {
          width: 20px;
          height: 20px;
        }

        /* =====================================
           MOBILE / TABLET DRAWER
        ===================================== */

        /* This covers the viewport. Its backdrop-filter blurs the page and
           navbar underneath; the drawer itself is rendered above the blur. */
        .sh-navbar-mobile-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: block;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          background: rgb(17 24 39 / 0.18);
          backdrop-filter: blur(11px) saturate(1.08);
          -webkit-backdrop-filter: blur(11px) saturate(1.08);
          cursor: pointer;
        }

        .sh-navbar-mobile-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 1001;
          display: flex;
          width: 60vw;
          min-width: 0;
          max-width: 640px;
          height: 100vh;
          height: 100dvh;
          flex-direction: column;
          overflow: hidden;
          border-left: 1px solid #e1edf8;
          background: linear-gradient(160deg, #fff 0%, #f4f9ff 100%);
          box-shadow: -18px 0 40px rgb(16 42 76 / 0.16);
          isolation: isolate;
        }

        .sh-navbar-mobile-sheet-head {
          display: flex;
          min-height: 70px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 0 14px;
          border-bottom: 1px solid #e2edf7;
          background: linear-gradient(135deg, #fff 0%, #f4f9ff 100%);
        }

        .sh-navbar-mobile-brand {
          display: inline-flex;
          min-width: 0;
          align-items: center;
        }

        .sh-navbar .sh-navbar-mobile-brand .smartedge-logo-wrap {
          display: flex;
          width: 6.5rem;
          max-width: 100%;
          height: 2.3rem;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          padding: 3px 5px;
          box-sizing: border-box;
        }

        .sh-navbar .sh-navbar-mobile-brand .smartedge-logo {
          display: block;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: left center;
          transform: none;
        }

        .sh-navbar-mobile-close {
          display: grid;
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          place-items: center;
          border: 0;
          border-radius: 12px;
          background: #f0fdf4;
          color: var(--sh-nav-ink);
          cursor: pointer;
          transition: background 200ms ease, color 200ms ease, transform 200ms ease;
        }

        .sh-navbar-mobile-close:hover {
          background: #dcfce7;
          color: var(--sh-nav-green);
          transform: rotate(4deg);
        }

        /* Only the menu body scrolls; the mobile menu header stays visible. */
        .sh-navbar-mobile-inner {
          width: calc(100% - 28px);
          max-width: 640px;
          min-height: 0;
          flex: 1 1 auto;
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
          margin-inline: auto;
          padding-block: 16px 25px;
          scrollbar-width: thin;
          scrollbar-color: #86c99c transparent;
        }

        .sh-navbar-mobile-caption {
          margin: 0 0 12px;
          color: #5f7d9d;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .sh-navbar-mobile-list {
          display: grid;
          gap: 5px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .sh-navbar-mobile-row {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 4px;
        }

        .sh-navbar-mobile-link {
          display: flex;
          min-width: 0;
          min-height: 44px;
          flex: 1 1 auto;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 9px 10px;
          border: 1px solid transparent;
          border-radius: 11px;
          color: var(--sh-nav-ink);
          font-family: var(--sh-nav-font);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.005em;
          line-height: 1.4;
          text-decoration: none;
          white-space: normal;
          overflow-wrap: anywhere;
          transition: background 200ms ease, border-color 200ms ease, color 200ms ease;
        }

        .sh-navbar-mobile-link:hover,
        .sh-navbar-mobile-link[data-active="true"] {
          border-color: #dcfce7;
          background: #f0fdf4;
          color: var(--sh-nav-green);
        }

        .sh-navbar-mobile-link-label {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 8px;
        }

        .sh-navbar-mobile-active-dot {
          width: 6px;
          height: 6px;
          flex: 0 0 6px;
          border-radius: 50%;
          background: var(--sh-nav-green-bright);
          box-shadow: 0 0 9px rgb(22 163 74 / 0.25);
        }

        /* IMPORTANT: This control must remain visible so users can expand
           the individual service links instead of only visiting /services. */
        .sh-navbar-mobile-expand {
          display: grid;
          width: 38px;
          height: 38px;
          flex: 0 0 38px;
          place-items: center;
          border: 1px solid #dceee2;
          border-radius: 10px;
          background: #f0fdf4;
          color: var(--sh-nav-green);
          cursor: pointer;
          transition: border-color 200ms ease, background 200ms ease;
        }

        .sh-navbar-mobile-expand:hover {
          border-color: #86efac;
          background: #dcfce7;
        }

        .sh-navbar-mobile-expand svg {
          display: block;
          width: 17px;
          height: 17px;
          transition: transform 220ms ease;
        }

        .sh-navbar-mobile-expand[aria-expanded="true"] svg {
          transform: rotate(180deg);
        }

        .sh-navbar-mobile-services {
          display: grid;
          gap: 4px;
          margin: 7px 0 10px 11px;
          padding: 2px 0 2px 10px;
          border-left: 1px solid #bbf7d0;
        }

        .sh-navbar-mobile-service {
          display: flex;
          min-width: 0;
          min-height: 42px;
          align-items: center;
          gap: 8px;
          padding: 6px 7px;
          border: 1px solid transparent;
          border-radius: 10px;
          color: #35577d;
          font-size: 11.5px;
          font-weight: 650;
          line-height: 1.4;
          text-decoration: none;
          transition: color 200ms ease, border-color 200ms ease, background 200ms ease;
        }

        .sh-navbar-mobile-service:hover {
          border-color: #dcfce7;
          background: #f0fdf4;
          color: var(--sh-nav-green);
        }

        .sh-navbar-mobile-service-icon {
          display: grid;
          width: 30px;
          height: 30px;
          flex: 0 0 30px;
          place-items: center;
          overflow: hidden;
          border: 1px solid var(--sh-nav-border);
          border-radius: 9px;
          background: #eff7ff;
        }

        .sh-navbar-mobile-service-icon > * {
          max-width: 100%;
        }

        .sh-navbar-mobile-service-label {
          min-width: 0;
          flex: 1 1 auto;
          overflow-wrap: anywhere;
        }

        .sh-navbar-mobile-service > svg {
          width: 13px;
          height: 13px;
          flex: 0 0 13px;
        }

        .sh-navbar-mobile-all-services {
          display: flex;
          min-height: 38px;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-top: 3px;
          padding: 8px 9px;
          border: 1px solid #dcfce7;
          border-radius: 10px;
          background: #f0fdf4;
          color: #166534;
          font-size: 11px;
          font-weight: 750;
          text-decoration: none;
        }

        .sh-navbar-mobile-all-services svg {
          width: 14px;
          height: 14px;
          flex: 0 0 14px;
        }

        .sh-navbar-mobile-cta-wrap {
          padding-top: 15px;
          margin-top: 14px;
          border-top: 1px solid #e1edf8;
        }

        .sh-navbar-mobile-cta {
          display: flex;
          width: 100%;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 12px;
          border-radius: 999px;
          font-size: 12px;
          text-align: center;
        }

        .sh-navbar-mobile-cta svg {
          width: 15px;
          height: 15px;
          flex: 0 0 15px;
        }

        .sh-navbar-mobile-note {
          margin: 11px 0 0;
          color: #617a96;
          font-size: 10px;
          line-height: 1.65;
          text-align: center;
        }

        /* Desktop breakpoint */
        @media (min-width: 1120px) {
          .sh-navbar-desktop {
            display: flex;
          }

          .sh-navbar-mobile-toggle {
            display: none;
          }

          .sh-navbar .sh-navbar-cta {
            display: inline-flex;
          }

          .sh-navbar-mobile-backdrop,
          .sh-navbar-mobile-panel {
            display: none !important;
          }
        }

        /* Compact desktop navigation */
        @media (min-width: 1120px) and (max-width: 1279px) {
          .sh-navbar-shell {
            width: calc(100% - 32px);
            gap: 10px;
          }

          .sh-navbar-list {
            gap: 2px;
          }

          .sh-navbar .sh-navbar-link {
            gap: 4px;
            padding-inline: 8px;
            font-size: 14px;
          }

          .sh-navbar-indicator {
            right: 8px;
            left: 8px;
          }

          .sh-navbar .sh-navbar-cta {
            padding-inline: 12px;
            font-size: 11px;
          }
        }

        @media (min-width: 1280px) {
          .sh-navbar {
            --sh-nav-height: 74px;
          }

          .sh-navbar-shell {
            gap: 28px;
          }

          .sh-navbar .sh-navbar-link {
            padding-inline: 13px;
            font-size: 15px;
          }
        }

        @media (max-width: 1119px) {
          .sh-navbar {
            --sh-nav-height: 66px;
          }

          .sh-navbar-mobile-panel {
            /* Keep the drawer at exactly 60% of the viewport. */
            width: 60vw;
          }
        }

        @media (max-width: 560px) {
          .sh-navbar {
            --sh-nav-height: 64px;
          }

          .sh-navbar-shell {
            width: calc(100% - 28px);
            gap: 10px;
          }

          .sh-navbar-actions {
            gap: 8px;
          }

          .sh-navbar-mobile-toggle {
            width: 40px;
            height: 40px;
            flex-basis: 40px;
          }

          .sh-navbar-mobile-sheet-head {
            min-height: 64px;
            padding-inline: 11px;
          }

          .sh-navbar-mobile-inner {
            width: calc(100% - 22px);
            padding-top: 13px;
          }

          .sh-navbar-mobile-link {
            min-height: 42px;
            padding-inline: 8px;
            font-size: 12.5px;
          }

          .sh-navbar-mobile-services {
            margin-left: 8px;
            padding-left: 8px;
          }
        }

        @media (max-width: 360px) {
          .sh-navbar-mobile-panel {
            min-width: 0;
          }

          .sh-navbar-mobile-service {
            gap: 6px;
            padding-inline: 5px;
            font-size: 10.75px;
          }
        }

        /* Keep motion comfortable for people who request reduced motion. */
        @media (prefers-reduced-motion: reduce) {
          .sh-navbar *,
          .sh-navbar *::before,
          .sh-navbar *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Preserve the desktop spacing adjustment from the existing navbar. */
        @media (min-width: 1120px) {
          .sh-navbar-list > .sh-navbar-item:has(.sh-navbar-services-home) + .sh-navbar-item {
            margin-left: -22px;
          }
        }
          
        /* =====================================
   REMOVE GREEN SCROLLBAR FROM MOBILE MENU
   Keep scrolling fully functional
===================================== */

.sh-navbar-mobile-panel,
.sh-navbar-mobile-panel * {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

/* Chrome, Edge, Safari */
.sh-navbar-mobile-panel::-webkit-scrollbar,
.sh-navbar-mobile-panel *::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}

.sh-navbar-mobile-panel::-webkit-scrollbar-thumb,
.sh-navbar-mobile-panel *::-webkit-scrollbar-thumb {
  background: transparent !important;
  border: none !important;
}

/* Override previous green scrollbar color */
.sh-navbar-mobile-panel {
  scrollbar-color: transparent transparent !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}
        
      `}</style>

      {/* Header navigation */}
      <nav className="sh-navbar-shell" aria-label="Primary navigation">
        <Link
          to="/"
          aria-label={`${siteName} home`}
          className="sh-navbar-brand"
        >
          <Wordmark />
        </Link>

        {/* Desktop menu */}
        <div className="sh-navbar-desktop">
          <ul className="sh-navbar-list">
            {navItems.map((item) =>
              item.to === "/services" ? (
                <li
                  key={item.to}
                  ref={megaRef}
                  className="sh-navbar-item"
                  onMouseEnter={openMegaMenu}
                  onMouseLeave={closeMegaMenu}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setMegaOpen(false);
                    }
                  }}
                >
                  <div className="sh-navbar-services-trigger">
                    <Link
                      to="/services"
                      className="sh-navbar-link sh-navbar-services-home"
                      aria-current={isActive(item.to) ? "page" : undefined}
                      data-active={isActive(item.to) ? "true" : "false"}
                      onClick={closeMegaMenu}
                    >
                      {item.label}
                      {isActive(item.to) && (
                        <motion.span
                          layoutId="sh-navbar-indicator"
                          className="sh-navbar-indicator"
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>

                    <button
                      type="button"
                      aria-label={megaOpen ? "Hide individual service links" : "Show individual service links"}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      aria-controls="sh-services-menu"
                      onClick={() => setMegaOpen((open) => !open)}
                      className="sh-navbar-link sh-navbar-services-dropdown"
                    >
                      <ChevronDown className="sh-navbar-link-chevron" aria-hidden="true" />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {megaOpen && (
                      <motion.div
                        className="sh-navbar-mega-positioner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.16, ease: EASE }}
                      >
                        <motion.div
                          id="sh-services-menu"
                          className="sh-navbar-mega"
                          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 9, scale: 0.985 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
                        >
                          <div className="sh-navbar-mega-head">
                            <div>
                              <span className="sh-navbar-mega-eyebrow">What we do</span>
                              <h2 className="sh-navbar-mega-heading">Explore our services</h2>
                            </div>
                            <span
                              className="sh-navbar-mega-caption"
                              aria-label={`${serviceItems.length} connected services`}
                            >
                              <span className="sh-navbar-mega-count">{serviceItems.length}</span>
                              <span>connected services</span>
                            </span>
                          </div>

                          <div className="sh-navbar-mega-grid">
                            {serviceItems.map((service) => (
                              <Link
                                key={service.slug}
                                to="/services/$slug"
                                params={{ slug: service.slug }}
                                onClick={closeMegaMenu}
                                className="sh-navbar-service-link"
                              >
                                <span className="sh-navbar-service-icon">
                                  <ThreeDIcon type={service.icon} size={40} />
                                </span>
                                <span className="sh-navbar-service-copy">
                                  <span className="sh-navbar-service-title">{service.title}</span>
                                  {service.summary && (
                                    <span className="sh-navbar-service-summary">{service.summary}</span>
                                  )}
                                </span>
                              </Link>
                            ))}
                          </div>

                          <div className="sh-navbar-mega-footer">
                            <Link to="/services" onClick={closeMegaMenu} className="sh-navbar-view-all">
                              <span>View all services</span>
                              <ArrowRight aria-hidden="true" />
                            </Link>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.to} className="sh-navbar-item">
                  <Link
                    to={item.to}
                    className="sh-navbar-link"
                    aria-current={isActive(item.to) ? "page" : undefined}
                    data-active={isActive(item.to) ? "true" : "false"}
                  >
                    {item.label}
                    {isActive(item.to) && (
                      <motion.span
                        layoutId="sh-navbar-indicator"
                        className="sh-navbar-indicator"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Header actions */}
        <div className="sh-navbar-actions">
          <Link
            to="/contact"
            className={cn(buttonStyles({ variant: "primary" }), "sh-navbar-cta")}
          >
            {ctaLabel}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>

          <button
            ref={mobileButtonRef}
            type="button"
            className="sh-navbar-mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="sh-mobile-menu"
            onClick={toggleMobileMenu}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={reduceMotion ? false : { opacity: 0, rotate: -35, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 35, scale: 0.8 }}
                transition={{ duration: reduceMotion ? 0 : 0.15 }}
                style={{ display: "grid", placeItems: "center" }}
              >
                {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile / tablet drawer and blurred backdrop */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <>
            <motion.button
              key="sh-mobile-backdrop"
              type="button"
              className="sh-navbar-mobile-backdrop"
              aria-label="Close mobile menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={closeMobileMenu}
            />

            <motion.aside
              key="sh-mobile-drawer"
              id="sh-mobile-menu"
              className="sh-navbar-mobile-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100%", opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
            >
              <div className="sh-navbar-mobile-sheet-head">
                <Wordmark className="sh-navbar-mobile-brand" />
                <button
                  type="button"
                  className="sh-navbar-mobile-close"
                  aria-label="Close mobile menu"
                  onClick={closeMobileMenu}
                >
                  <X aria-hidden="true" />
                </button>
              </div>

              <div className="sh-navbar-mobile-inner">
                <p className="sh-navbar-mobile-caption">Explore SmartEDGE</p>

                <ul className="sh-navbar-mobile-list">
                  {navItems.map((item, index) => {
                    const isServices = item.to === "/services";

                    return (
                      <motion.li
                        key={item.to}
                        initial={reduceMotion ? false : { opacity: 0, x: -9 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.25,
                          delay: reduceMotion ? 0 : index * 0.035,
                          ease: EASE,
                        }}
                      >
                        <div className="sh-navbar-mobile-row">
                          <Link
                            to={item.to}
                            className="sh-navbar-mobile-link"
                            aria-current={isActive(item.to) ? "page" : undefined}
                            data-active={isActive(item.to) ? "true" : "false"}
                            onClick={closeMobileMenu}
                          >
                            <span className="sh-navbar-mobile-link-label">
                              {isActive(item.to) && (
                                <span className="sh-navbar-mobile-active-dot" aria-hidden="true" />
                              )}
                              {item.label}
                            </span>
                            {isServices && <ArrowUpRight size={15} aria-hidden="true" />}
                          </Link>

                          {isServices && (
                            <button
                              type="button"
                              className="sh-navbar-mobile-expand"
                              aria-label={mobileServicesOpen ? "Collapse services" : "Expand services"}
                              aria-expanded={mobileServicesOpen}
                              aria-controls="sh-mobile-services"
                              onClick={() => setMobileServicesOpen((open) => !open)}
                            >
                              <ChevronDown aria-hidden="true" />
                            </button>
                          )}
                        </div>

                        {isServices && (
                          <AnimatePresence initial={false}>
                            {mobileServicesOpen && (
                              <motion.div
                                id="sh-mobile-services"
                                className="sh-navbar-mobile-services"
                                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: reduceMotion ? 0 : 0.23, ease: EASE }}
                                style={{ overflow: "hidden" }}
                              >
                                {serviceItems.map((service) => (
                                  <Link
                                    key={service.slug}
                                    to="/services/$slug"
                                    params={{ slug: service.slug }}
                                    className="sh-navbar-mobile-service"
                                    onClick={closeMobileMenu}
                                  >
                                    <span className="sh-navbar-mobile-service-icon">
                                      <ThreeDIcon type={service.icon} size={28} />
                                    </span>
                                    <span className="sh-navbar-mobile-service-label">{service.title}</span>
                                    <ArrowUpRight aria-hidden="true" />
                                  </Link>
                                ))}

                                <Link
                                  to="/services"
                                  className="sh-navbar-mobile-all-services"
                                  onClick={closeMobileMenu}
                                >
                                  <span>View all services</span>
                                  <ArrowRight aria-hidden="true" />
                                </Link>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="sh-navbar-mobile-cta-wrap">
                  <Link
                    to="/contact"
                    className={cn(buttonStyles({ variant: "signal" }), "sh-navbar-mobile-cta")}
                    onClick={closeMobileMenu}
                  >
                    {ctaLabel}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>

                  <p className="sh-navbar-mobile-note">
                    Clear products. Thoughtful solar support. Meaningful progress.
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
