
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
        (item) => item && typeof item.to === "string" && typeof item.label === "string"
      )
    : [];
  const serviceItems = Array.isArray(services)
    ? services.filter((service) => service && typeof service.slug === "string")
    : [];

  const siteName = siteConfig?.name || "SmartEDGE";
  const ctaLabel = siteConfig?.ctaLabel || "Let's talk";

  const isActive = (to) =>
    to === "/"
      ? pathname === "/"
      : pathname === to || pathname.startsWith(`${to}/`);

  /* =========================================
     SCROLL EFFECT
  ========================================= */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* =========================================
     CLOSE MENUS AFTER NAVIGATION
  ========================================= */

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  /* =========================================
     PREVENT BACKGROUND SCROLL ON MOBILE
  ========================================= */

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* =========================================
     RESPONSIVE BREAKPOINT CLEANUP
  ========================================= */

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1120) {
        setMobileOpen(false);
        setMobileServicesOpen(false);
      } else {
        setMegaOpen(false);
      }
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* =========================================
     ESCAPE + OUTSIDE CLICK
  ========================================= */

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        const wasMobileOpen = mobileOpen;

        setMegaOpen(false);
        setMobileOpen(false);
        setMobileServicesOpen(false);

        if (wasMobileOpen) {
          mobileButtonRef.current?.focus();
        }
      }
    };

    const onPointerDown = (event) => {
      if (
        megaRef.current &&
        !megaRef.current.contains(event.target)
      ) {
        setMegaOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener(
        "pointerdown",
        onPointerDown
      );
    };
  }, [mobileOpen]);

  const toggleMobileMenu = () => {
    setMobileOpen((open) => !open);
    setMegaOpen(false);
  };

  const openMegaMenu = () => {
    setMegaOpen(true);
  };

  const closeMegaMenu = () => {
    setMegaOpen(false);
  };

  return (
    <motion.header
      initial={
        reduceMotion
          ? false
          : {
            opacity: 0,
            y: -14,
          }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        ease: EASE,
      }}
      data-scrolled={scrolled ? "true" : "false"}
      className="sh-navbar"
    >
      <style>{`
        /* =====================================
           SmartEDGE — PREMIUM NAVBAR
        ===================================== */

        .sh-navbar {
          --sh-nav-bg: #0b1229;
          --sh-nav-height: 70px;
          --sh-nav-ink: #f6f7ff;
          --sh-nav-muted: #aab4ce;
          --sh-nav-blue: #7775ff;
          --sh-nav-cyan: #53deec;
          --sh-nav-border: rgba(175, 190, 235, 0.14);

          position: sticky;
          top: 0;
          z-index: 100;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          color: var(--sh-nav-ink);
          background: rgba(11, 18, 41, 0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid transparent;
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
          transition:
            background 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease;
        }

        .sh-navbar *,
        .sh-navbar *::before,
        .sh-navbar *::after {
          box-sizing: border-box;
        }

        .sh-navbar[data-scrolled="true"] {
          border-bottom-color: var(--sh-nav-border);
          background: rgba(8, 14, 33, 0.82);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .sh-navbar a,
        .sh-navbar button {
          -webkit-tap-highlight-color: transparent;
        }

        .sh-navbar a:focus-visible,
        .sh-navbar button:focus-visible {
          outline: 2px solid var(--sh-nav-cyan);
          outline-offset: 4px;
        }

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

        /* =====================================
           BRAND LOGO
        ===================================== */

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
          opacity: 0.84;
        }

        .sh-navbar-brand > * {
          max-width: 100%;
        }

        /* =====================================
           DESKTOP NAVIGATION
        ===================================== */

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
          gap: 3px;
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
          min-width: 30px;
          padding-inline: 7px;
        }

        .sh-navbar-link {
          position: relative;
          display: inline-flex;
          min-height: 40px;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 12px;
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: var(--sh-nav-muted);
          font-family: inherit;
          font-size: 12px;
          font-weight: 650;
          line-height: 1.4;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition:
            color 200ms ease,
            background 200ms ease;
        }

        .sh-navbar-link:hover,
        .sh-navbar-link[data-active="true"],
        .sh-navbar-link[aria-expanded="true"] {
          background: rgba(255, 255, 255, 0.045);
          color: #fff;
        }

        .sh-navbar-link-chevron {
          width: 14px;
          height: 14px;
          flex: 0 0 auto;
          transition: transform 250ms ease;
        }

        .sh-navbar-link[aria-expanded="true"]
          .sh-navbar-link-chevron {
          transform: rotate(180deg);
        }

        .sh-navbar-indicator {
          position: absolute;
          right: 12px;
          bottom: 3px;
          left: 12px;
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(
            90deg,
            var(--sh-nav-blue),
            var(--sh-nav-cyan)
          );
          box-shadow: 0 0 10px rgba(83, 222, 236, 0.16);
        }

        /* =====================================
           SERVICES MEGA MENU
        ===================================== */

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
          border: 1px solid rgba(175, 190, 235, 0.17);
          border-radius: 21px;
          background:
            radial-gradient(
              ellipse at 100% 0%,
              rgba(76, 85, 237, 0.11),
              transparent 36%
            ),
            rgba(12, 20, 44, 0.98);
          box-shadow:
            0 24px 65px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .sh-navbar-mega-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 19px 21px 16px;
          border-bottom: 1px solid var(--sh-nav-border);
        }

        .sh-navbar-mega-eyebrow {
          display: block;
          margin-bottom: 5px;
          color: #a7a5ff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .sh-navbar-mega-heading {
          margin: 0;
          color: #fff;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -0.025em;
        }

        .sh-navbar-mega-caption {
          color: var(--sh-nav-muted);
          font-size: 10px;
          line-height: 1.6;
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
          color: #fff;
          text-decoration: none;
          transition:
            transform 220ms ease,
            background 220ms ease,
            border-color 220ms ease;
        }

        .sh-navbar-service-link:hover {
          transform: translateY(-2px);
          border-color: rgba(133, 132, 255, 0.22);
          background: rgba(255, 255, 255, 0.055);
        }

        .sh-navbar-service-icon {
          display: grid;
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          place-items: center;
          overflow: hidden;
          border: 1px solid rgba(133, 132, 255, 0.18);
          border-radius: 13px;
          background: linear-gradient(
            145deg,
            rgba(76, 85, 237, 0.14),
            rgba(83, 222, 236, 0.07)
          );
          transition:
            border-color 220ms ease,
            background 220ms ease;
        }

        .sh-navbar-service-link:hover .sh-navbar-service-icon {
          border-color: rgba(83, 222, 236, 0.34);
          background: rgba(76, 85, 237, 0.2);
        }

        .sh-navbar-service-copy {
          display: block;
          min-width: 0;
          flex: 1 1 auto;
          padding-top: 2px;
        }

        .sh-navbar-service-title {
          display: block;
          color: #f5f6ff;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.5;
          overflow-wrap: anywhere;
          transition: color 200ms ease;
        }

        .sh-navbar-service-link:hover .sh-navbar-service-title {
          color: #bcbaff;
        }

        .sh-navbar-service-summary {
          display: -webkit-box;
          margin-top: 4px;
          overflow: hidden;
          color: #a7b1ca;
          font-size: 10px;
          line-height: 1.7;
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
          border: 1px solid rgba(133, 132, 255, 0.18);
          border-radius: 12px;
          background: rgba(76, 85, 237, 0.085);
          color: #c5c3ff;
          font-size: 11px;
          font-weight: 750;
          text-decoration: none;
          transition:
            color 200ms ease,
            border-color 200ms ease,
            background 200ms ease;
        }

        .sh-navbar-view-all:hover {
          border-color: rgba(83, 222, 236, 0.3);
          background: rgba(83, 222, 236, 0.075);
          color: #fff;
        }

        .sh-navbar-view-all svg {
          width: 15px;
          height: 15px;
          transition: transform 200ms ease;
        }

        .sh-navbar-view-all:hover svg {
          transform: translateX(3px);
        }

        /* =====================================
           CTA AND MOBILE TOGGLE
        ===================================== */

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
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            filter 220ms ease;
        }

        .sh-navbar-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.06);
        }

        .sh-navbar-mobile-toggle {
          display: grid;
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          place-items: center;
          border: 1px solid var(--sh-nav-border);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.035);
          color: #fff;
          cursor: pointer;
          transition:
            background 200ms ease,
            border-color 200ms ease,
            transform 200ms ease;
        }

        .sh-navbar-mobile-toggle:hover {
          border-color: rgba(133, 132, 255, 0.4);
          background: rgba(133, 132, 255, 0.1);
        }

        .sh-navbar-mobile-toggle:active {
          transform: scale(0.96);
        }

        .sh-navbar-mobile-toggle svg {
          width: 20px;
          height: 20px;
        }

        /* =====================================
           MOBILE MENU
        ===================================== */

        .sh-navbar-mobile-panel {
          height: calc(100vh - var(--sh-nav-height));
          height: calc(100dvh - var(--sh-nav-height));
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
          border-top: 1px solid var(--sh-nav-border);
          background:
            radial-gradient(
              ellipse at 0% 0%,
              rgba(76, 85, 237, 0.12),
              transparent 40%
            ),
            #0b1229;
          scrollbar-width: thin;
          scrollbar-color: rgba(133, 132, 255, 0.35) transparent;
        }

        .sh-navbar-mobile-inner {
          width: calc(100% - 36px);
          max-width: 640px;
          margin-inline: auto;
          padding-block: 14px 25px;
        }

        .sh-navbar-mobile-caption {
          margin: 0 0 12px;
          color: #858fb1;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.16em;
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
          gap: 5px;
        }

        .sh-navbar-mobile-link {
          display: flex;
          min-width: 0;
          min-height: 47px;
          flex: 1 1 auto;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 12px;
          border: 1px solid transparent;
          border-radius: 12px;
          color: #c1cadf;
          font-size: 14px;
          font-weight: 650;
          line-height: 1.5;
          text-decoration: none;
          transition:
            background 200ms ease,
            border-color 200ms ease,
            color 200ms ease;
        }

        .sh-navbar-mobile-link:hover,
        .sh-navbar-mobile-link[data-active="true"] {
          border-color: rgba(133, 132, 255, 0.13);
          background: rgba(255, 255, 255, 0.045);
          color: #fff;
        }

        .sh-navbar-mobile-link-label {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 9px;
        }

        .sh-navbar-mobile-active-dot {
          width: 6px;
          height: 6px;
          flex: 0 0 6px;
          border-radius: 50%;
          background: var(--sh-nav-cyan);
          box-shadow: 0 0 9px rgba(83, 222, 236, 0.3);
        }

        .sh-navbar-mobile-expand {
          display: grid;
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          place-items: center;
          border: 1px solid var(--sh-nav-border);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.035);
          color: #c3c9ff;
          cursor: pointer;
          transition:
            transform 200ms ease,
            background 200ms ease,
            border-color 200ms ease;
        }

        .sh-navbar-mobile-expand:hover {
          border-color: rgba(133, 132, 255, 0.35);
          background: rgba(133, 132, 255, 0.1);
        }

        .sh-navbar-mobile-expand[aria-expanded="true"] svg {
          transform: rotate(180deg);
        }

        .sh-navbar-mobile-expand svg {
          width: 17px;
          height: 17px;
          transition: transform 220ms ease;
        }

        .sh-navbar-mobile-services {
          display: grid;
          gap: 4px;
          margin: 7px 0 9px 13px;
          padding-left: 13px;
          border-left: 1px solid rgba(133, 132, 255, 0.25);
        }

        .sh-navbar-mobile-service {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 10px;
          padding: 9px;
          border: 1px solid transparent;
          border-radius: 10px;
          color: #b5bfd7;
          font-size: 12px;
          font-weight: 550;
          line-height: 1.5;
          text-decoration: none;
          transition:
            color 200ms ease,
            border-color 200ms ease,
            background 200ms ease;
        }

        .sh-navbar-mobile-service:hover {
          border-color: rgba(133, 132, 255, 0.16);
          background: rgba(255, 255, 255, 0.045);
          color: #fff;
        }

        .sh-navbar-mobile-service-icon {
          display: grid;
          width: 32px;
          height: 32px;
          flex: 0 0 32px;
          place-items: center;
          overflow: hidden;
          border: 1px solid var(--sh-nav-border);
          border-radius: 10px;
          background: rgba(133, 132, 255, 0.075);
        }

        .sh-navbar-mobile-service-icon > * {
          max-width: 100%;
        }

        .sh-navbar-mobile-service-label {
          min-width: 0;
          flex: 1 1 auto;
          overflow-wrap: anywhere;
        }

        .sh-navbar-mobile-all-services {
          display: flex;
          min-height: 39px;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 4px;
          padding: 9px 10px;
          border-radius: 10px;
          background: rgba(76, 85, 237, 0.12);
          color: #c6c4ff;
          font-size: 11px;
          font-weight: 750;
          text-decoration: none;
        }

        .sh-navbar-mobile-all-services svg {
          width: 14px;
          height: 14px;
        }

        .sh-navbar-mobile-cta-wrap {
          padding-top: 18px;
          margin-top: 15px;
          border-top: 1px solid var(--sh-nav-border);
        }

        .sh-navbar-mobile-cta {
          display: flex;
          width: 100%;
          min-height: 46px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 12px;
          font-size: 13px;
        }

        .sh-navbar-mobile-cta svg {
          width: 16px;
          height: 16px;
        }

        .sh-navbar-mobile-note {
          margin: 12px 0 0;
          color: #7f8baa;
          font-size: 10px;
          line-height: 1.7;
          text-align: center;
        }

        /* =====================================
           DESKTOP BREAKPOINT
        ===================================== */

        /* Desktop navigation appears only when the full menu has enough room. */
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

          .sh-navbar-mobile-panel {
            display: none !important;
          }
        }

        @media (min-width: 1120px) and (max-width: 1279px) {
          .sh-navbar-shell {
            width: calc(100% - 32px);
            gap: 10px;
          }

          .sh-navbar-link {
            gap: 4px;
            padding-inline: 8px;
            font-size: 11px;
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

          .sh-navbar-link {
            padding-inline: 14px;
            font-size: 13px;
          }
        }

        /* Tablet and mobile */
        @media (max-width: 1119px) {
          .sh-navbar {
            --sh-nav-height: 66px;
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

          .sh-navbar-mobile-inner {
            width: calc(100% - 28px);
            padding-top: 12px;
          }

          .sh-navbar-mobile-link {
            min-height: 44px;
            font-size: 13px;
          }

          .sh-navbar-mobile-services {
            margin-left: 10px;
            padding-left: 10px;
          }
        }

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
      `}</style>

      {/* =====================================
          HEADER BAR
      ===================================== */}

      <nav
        className="sh-navbar-shell"
        aria-label="Primary navigation"
      >
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
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget
                      )
                    ) {
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
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>

                    <button
                      type="button"
                      aria-label="Show individual service links"
                      aria-expanded={megaOpen}
                      aria-controls="sh-services-menu"
                      onClick={openMegaMenu}
                      className="sh-navbar-link sh-navbar-services-dropdown"
                    >
                      <ChevronDown
                        className="sh-navbar-link-chevron"
                        aria-hidden="true"
                      />
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
                          initial={
                            reduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 9, scale: 0.985 }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.22,
                            ease: EASE,
                          }}
                        >
                          <div className="sh-navbar-mega-head">
                            <div>
                              <span className="sh-navbar-mega-eyebrow">
                                What we do
                              </span>

                              <h2 className="sh-navbar-mega-heading">
                                Explore our services
                              </h2>
                            </div>

                            <span className="sh-navbar-mega-caption">
                              {serviceItems.length} connected services
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
                                  <ThreeDIcon
                                    type={service.icon}
                                    size={40}
                                  />
                                </span>

                                <span className="sh-navbar-service-copy">
                                  <span className="sh-navbar-service-title">
                                    {service.title}
                                  </span>

                                  {service.summary && (
                                    <span className="sh-navbar-service-summary">
                                      {service.summary}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            ))}
                          </div>

                          <div className="sh-navbar-mega-footer">
                            <Link
                              to="/services"
                              onClick={closeMegaMenu}
                              className="sh-navbar-view-all"
                            >
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
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="sh-navbar-actions">
          <Link
            to="/contact"
            className={cn(
              buttonStyles({ variant: "primary" }),
              "sh-navbar-cta"
            )}
          >
            {ctaLabel}
            <ArrowUpRight
              size={15}
              aria-hidden="true"
            />
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
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, rotate: -35, scale: 0.8 }
                }
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 35,
                  scale: 0.8,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.15,
                }}
                style={{
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {mobileOpen ? (
                  <X aria-hidden="true" />
                ) : (
                  <Menu aria-hidden="true" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* =====================================
          MOBILE MENU
      ===================================== */}

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="sh-mobile-menu"
            className="sh-navbar-mobile-panel"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0 }
            }
            animate={{
              opacity: 1,
              height: "calc(100dvh - var(--sh-nav-height, 70px))",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: EASE,
            }}
          >
            <div className="sh-navbar-mobile-inner">
              <p className="sh-navbar-mobile-caption">
                Explore SmartEDGE
              </p>

              <ul className="sh-navbar-mobile-list">
                {navItems.map((item, index) => {
                  const isServices = item.to === "/services";

                  return (
                    <motion.li
                      key={item.to}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, x: -9 }
                      }
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
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
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileServicesOpen(false);
                          }}
                        >
                          <span className="sh-navbar-mobile-link-label">
                            {isActive(item.to) && (
                              <span
                                className="sh-navbar-mobile-active-dot"
                                aria-hidden="true"
                              />
                            )}

                            {item.label}
                          </span>

                          {isServices && (
                            <ArrowUpRight
                              size={16}
                              aria-hidden="true"
                            />
                          )}
                        </Link>

                        {isServices && (
                          <button
                            type="button"
                            className="sh-navbar-mobile-expand"
                            aria-label={
                              mobileServicesOpen
                                ? "Collapse services"
                                : "Expand services"
                            }
                            aria-expanded={mobileServicesOpen}
                            aria-controls="sh-mobile-services"
                            onClick={() =>
                              setMobileServicesOpen((open) => !open)
                            }
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
                              initial={
                                reduceMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, height: 0 }
                              }
                              animate={{
                                opacity: 1,
                                height: "auto",
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                              }}
                              transition={{
                                duration: reduceMotion ? 0 : 0.23,
                                ease: EASE,
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              {serviceItems.map((service) => (
                                <Link
                                  key={service.slug}
                                  to="/services/$slug"
                                  params={{ slug: service.slug }}
                                  className="sh-navbar-mobile-service"
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobileServicesOpen(false);
                                  }}
                                >
                                  <span className="sh-navbar-mobile-service-icon">
                                    <ThreeDIcon
                                      type={service.icon}
                                      size={31}
                                    />
                                  </span>

                                  <span className="sh-navbar-mobile-service-label">
                                    {service.title}
                                  </span>

                                  <ArrowUpRight
                                    size={14}
                                    aria-hidden="true"
                                  />
                                </Link>
                              ))}

                              <Link
                                to="/services"
                                className="sh-navbar-mobile-all-services"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileServicesOpen(false);
                                }}
                              >
                                View all services
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
                  className={cn(
                    buttonStyles({ variant: "signal" }),
                    "sh-navbar-mobile-cta"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {ctaLabel}
                  <ArrowUpRight aria-hidden="true" />
                </Link>

                <p className="sh-navbar-mobile-note">
                  Clear strategy. Thoughtful technology. Meaningful progress.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
