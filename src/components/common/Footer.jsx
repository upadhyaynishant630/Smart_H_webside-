
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react";

import { navigation, siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { Reveal, Wordmark } from "@/components/ui/brand";
import virtumediaLogo from "@/assets/virtumedia-logo.png";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.3Zm-8.4 18.1h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.9 1 1-3.8-.2-.4a9.8 9.8 0 1 1 8.6 4.8Zm5.4-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.5.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.1 3.3 5.1 4.6 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3Z" />
    </svg>
  );
}

const linkClass = "sh-footer-link";

function LinkDash() {
  return <span aria-hidden="true" className="sh-footer-link-dash" />;
}

function ColumnTitle({ children }) {
  return (
    <h3 className="sh-footer-column-title">
      <span className="sh-footer-column-mark" aria-hidden="true" />
      {children}
    </h3>
  );
}

function ContactRow({ href, icon, label }) {
  return (
    <a href={href} className="sh-footer-contact">
      <span className="sh-footer-contact-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="sh-footer-contact-label">{label}</span>
      <ArrowUpRight
        className="sh-footer-contact-arrow"
        aria-hidden="true"
      />
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  const siteName = siteConfig.name || "SmartEDGE";
  const description = siteConfig.description || "";
  const tagline = siteConfig.tagline || "";

  const contactPhone = siteConfig.contactPhone || "";
  const whatsappPhone = siteConfig.whatsappPhone || "";
  const address = siteConfig.address || "";

  const navItems = Array.isArray(navigation) ? navigation : [];
  const serviceItems = Array.isArray(services) ? services : [];

  const socialItems = Array.isArray(siteConfig.social)
    ? siteConfig.social.filter(
        (item) => item && item.href && item.label
      )
    : [];

  return (
    <footer className="sh-footer surface-dark bg-night">
      <style>{`
        .sh-footer {
          --primary-900: #0C1C4A;
          --primary-700: #0C1C4A;
          --primary-600: #0769E7;
          --primary-400: #2C7236;
          --primary-100: #F1F5F1;
          --sf-bg: #0C1C4A;
          --sf-card: transparent;
          --sf-line: rgb(241 245 241 / 0.22);
          --sf-text: var(--white);
          --sf-muted: #F1F5F1;
          --sf-blue: #0769E7;
          --sf-cyan: #53D132;
          --sf-green: #53D132;
          --sf-forest: #2C7236;

          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          background:
            radial-gradient(
              ellipse at 8% 4%,
              rgb(7 105 231 / 0.22),
              transparent 34%
            ),
            radial-gradient(
              ellipse at 92% 88%,
              rgb(44 114 54 / 0.15),
              transparent 30%
            ),
            linear-gradient(140deg, #0C1C4A 0%, #0C1C4A 58%, #2C7236 100%);
          color: var(--sf-text);
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

        .sh-footer *,
        .sh-footer *::before,
        .sh-footer *::after {
          box-sizing: border-box;
        }

        .sh-footer a,
        .sh-footer button {
          -webkit-tap-highlight-color: transparent;
        }

        .sh-footer-grid-lines {
          position: absolute;
          z-index: -2;
          inset: 0;
          background-image:
            linear-gradient(
              rgba(241, 245, 241, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(241, 245, 241, 0.035) 1px,
              transparent 1px
            );
          background-size: 44px 44px;
          pointer-events: none;
          mask-image: linear-gradient(
            to bottom,
            #000 0%,
            rgba(0, 0, 0, 0.35) 65%,
            transparent 100%
          );
        }

        .sh-footer-glow {
          position: absolute;
          z-index: -1;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          filter: blur(75px);
          pointer-events: none;
          animation: sh-footer-glow-drift 12s ease-in-out infinite alternate;
        }

        .sh-footer-glow--left {
          top: 30px;
          left: -150px;
          background: rgb(7 105 231 / 0.18);
        }

        .sh-footer-glow--right {
          right: -155px;
          bottom: 90px;
          background: rgb(83 209 50 / 0.12);
          animation-delay: -5s;
        }

        .sh-footer-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          overflow: hidden;
          background: linear-gradient(
            90deg,
            transparent,
            rgb(7 105 231 / 0.85),
            rgb(83 209 50 / 0.85),
            transparent
          );
        }

        .sh-footer-accent::after {
          position: absolute;
          top: 0;
          left: -25%;
          width: 22%;
          height: 1px;
          background: #fff;
          box-shadow: 0 0 12px rgba(44, 114, 54, 0.7);
          animation: sh-footer-light-sweep 8s ease-in-out infinite;
          content: "";
        }

        /* Main layout: compact vertical rhythm */

        .sh-footer-inner {
          position: relative;
          z-index: 2;
          width: calc(100% - clamp(32px, 7vw, 96px));
          max-width: 1240px;
          margin-inline: auto;
          padding-block: clamp(31px, 4vw, 48px) 24px;
        }

        .sh-footer-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 5fr)
            minmax(125px, 2fr)
            minmax(0, 5fr);
          align-items: start;
          gap: 32px clamp(24px, 3.5vw, 46px);
        }

        /* Brand */

        .sh-footer-brand {
          min-width: 0;
        }

        .sh-footer-logo-link {
          display: inline-flex;
          align-items: center;
          max-width: 100%;
          border-radius: 7px;
          text-decoration: none;
          transition: opacity 220ms ease;
        }

     .sh-footer-logo-link .smartedge-logo-wrap {
  width: clamp(200px, 15vw, 250px);
  height: clamp(112px, 8.5vw, 140px);
  overflow: hidden;
  border-radius: 8px;
  transform: none;
}

.sh-footer-logo-link .smartedge-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transform: none;
}

        .sh-footer-logo-link:hover {
          opacity: 0.86;
        }

        .sh-footer-logo-link:focus-visible {
          outline: 2px solid var(--sf-cyan);
          outline-offset: 5px;
        }

        .sh-footer-description {
          max-width: 420px;
          margin: 11px 0 0;
          color: #F1F5F1;
          font-size: 12px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        /* Contact links */

        .sh-footer-contacts {
          display: grid;
          max-width: 440px;
          gap: 7px;
          margin-top: 17px;
        }

        .sh-footer-contact {
          position: relative;
          display: flex;
          min-width: 0;
          min-height: 40px;
          align-items: center;
          gap: 10px;
          padding: 5px 0;
          overflow: visible;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: var(--sf-text);
          text-decoration: none;
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            background 220ms ease,
            box-shadow 220ms ease;
        }

        .sh-footer-contact::before {
          content: none;
          display: none;
        }

        .sh-footer-contact:hover {
          transform: translateX(2px);
          border-color: transparent;
          background: transparent;
          box-shadow: none;
        }

        .sh-footer-contact:hover::before {
          display: none;
        }

        .sh-footer-contact:focus-visible {
          outline: 2px solid var(--sf-cyan);
          outline-offset: 3px;
        }

        .sh-footer-contact-icon {
          position: relative;
          z-index: 1;
          display: grid;
          width: 29px;
          height: 29px;
          flex: 0 0 29px;
          place-items: center;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: #53D132;
          transition:
            background 220ms ease,
            color 220ms ease,
            transform 220ms ease;
        }

        .sh-footer-contact-icon svg {
          width: 15px;
          height: 15px;
        }

        .sh-footer-contact:hover .sh-footer-contact-icon {
          transform: translateY(-1px);
          background: transparent;
          color: #53D132;
        }

        .sh-footer-contact-label {
          position: relative;
          z-index: 1;
          min-width: 0;
          flex: 1 1 auto;
          color: #F1F5F1;
          font-size: 12px;
          line-height: 1.55;
          overflow-wrap: anywhere;
          transition: color 220ms ease;
        }

        .sh-footer-contact:hover .sh-footer-contact-label {
          color: #fff;
        }

        .sh-footer-contact-arrow {
          position: relative;
          z-index: 1;
          width: 14px;
          height: 14px;
          flex: 0 0 auto;
          color: var(--primary-400);
          opacity: 0;
          transform: translate(-3px, 3px);
          transition:
            opacity 220ms ease,
            transform 220ms ease,
            color 220ms ease;
        }

        .sh-footer-contact:hover .sh-footer-contact-arrow {
          color: var(--sf-cyan);
          opacity: 1;
          transform: translate(0, 0);
        }

        /* Contact CTA */

        .sh-footer-cta {
          position: relative;
          display: flex;
          min-height: 42px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 9px;
          padding: 10px 13px;
          overflow: hidden;
          border: 1px solid rgba(83, 209, 50, 0.32);
          border-radius: 12px;
          background: linear-gradient(
            110deg,
            #0769E7 0%,
            #0769E7 55%,
            #2C7236 100%
          );
          box-shadow: 0 5px 19px rgba(7, 105, 231, 0.16);
          color: #fff;
          font-size: 12px;
          font-weight: 750;
          text-decoration: none;
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            filter 220ms ease;
        }

        .sh-footer-cta::before {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 18%,
            rgba(255, 255, 255, 0.18) 48%,
            transparent 78%
          );
          transform: translateX(-110%);
          transition: transform 550ms ease;
          content: "";
          pointer-events: none;
        }

        .sh-footer-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.06) saturate(1.05);
          box-shadow: 0 9px 24px rgba(44, 114, 54, 0.24);
        }

        .sh-footer-cta:hover::before {
          transform: translateX(110%);
        }

        .sh-footer-cta:active {
          transform: scale(0.99);
        }

        .sh-footer-cta:focus-visible {
          outline: 2px solid var(--sf-cyan);
          outline-offset: 3px;
        }

        .sh-footer-cta-label {
          position: relative;
          z-index: 1;
          display: inline-flex;
          min-width: 0;
          align-items: center;
          gap: 9px;
        }

        .sh-footer-cta-label svg {
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
        }

        .sh-footer-cta-arrow {
          position: relative;
          z-index: 1;
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
          transition: transform 220ms ease;
        }

        .sh-footer-cta:hover .sh-footer-cta-arrow {
          transform: translate(2px, -2px);
        }

        /* Social links */

        .sh-footer-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: 15px 0 0;
          padding: 0;
          list-style: none;
        }

        .sh-footer-social-link {
          display: inline-flex;
          min-height: 30px;
          align-items: center;
          justify-content: center;
          padding: 5px 11px;
          border: 1px solid var(--sf-line);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.025);
          color: #F1F5F1;
          font-size: 10px;
          font-weight: 700;
          text-decoration: none;
          transition:
            color 200ms ease,
            background 200ms ease,
            border-color 200ms ease,
            transform 200ms ease;
        }

        .sh-footer-social-link:hover {
          transform: translateY(-2px);
          border-color: rgba(83, 209, 50, 0.45);
          background: rgba(83, 209, 50, 0.1);
          color: #fff;
        }

        /* Navigation columns */

        .sh-footer-column {
          min-width: 0;
        }

        .sh-footer-column-title {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 3px 0 14px;
          color: var(--sf-text);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          line-height: 1.6;
          text-transform: uppercase;
        }

        .sh-footer-column-mark {
          width: 15px;
          height: 2px;
          flex: 0 0 auto;
          border-radius: 99px;
          background: linear-gradient(
            90deg,
            var(--sf-blue),
            var(--sf-cyan)
          );
          box-shadow: 0 0 8px rgba(83, 209, 50, 0.2);
        }

        .sh-footer-link-list {
          display: grid;
          gap: 6px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .sh-footer-link-list--services {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 16px;
          row-gap: 6px;
        }

        .sh-footer-link-list li {
          min-width: 0;
        }

        .sh-footer-link {
          display: inline-flex;
          max-width: 100%;
          min-width: 0;
          align-items: baseline;
          gap: 7px;
          padding-block: 2px;
          color: #F1F5F1;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.65;
          text-decoration: none;
          overflow-wrap: anywhere;
          transition:
            color 200ms ease,
            transform 200ms ease;
        }

        .sh-footer-link:hover,
        .sh-footer-link:focus-visible {
          color: #fff;
        }

        .sh-footer-link:hover {
          transform: translateX(2px);
        }

        .sh-footer-link:focus-visible {
          outline: 1px solid var(--sf-cyan);
          outline-offset: 3px;
          border-radius: 3px;
        }

        .sh-footer-link-dash {
          position: relative;
          top: -3px;
          display: inline-block;
          width: 0;
          height: 1px;
          flex: 0 0 auto;
          border-radius: 99px;
          background: var(--sf-cyan);
          transition: width 200ms ease;
        }

        .sh-footer-link:hover .sh-footer-link-dash,
        .sh-footer-link:focus-visible .sh-footer-link-dash {
          width: 10px;
        }

        /* Oversized decorative wordmark: does not add height */

        .sh-footer-wordmark {
          position: absolute;
          z-index: 0;
          right: 0;
          bottom: 56px;
          left: 0;
          max-width: 100%;
          overflow: hidden;
          color: rgba(255, 255, 255, 0.035);
          font-family:
            Manrope,
            Inter,
            ui-sans-serif,
            system-ui,
            sans-serif;
          font-size: clamp(4rem, 14vw, 12rem);
          font-weight: 850;
          letter-spacing: -0.085em;
          line-height: 0.84;
          text-align: center;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }

        /* Bottom bar */

        .sh-footer-bottom {
          position: relative;
          z-index: 3;
          border-top: 1px solid var(--sf-line);
          background: rgba(12, 28, 74, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .sh-footer-bottom-inner {
          display: flex;
          width: calc(100% - clamp(32px, 7vw, 96px));
          max-width: 1240px;
          min-height: 55px;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-inline: auto;
          padding-block: 12px;
        }

        .sh-footer-copyright,
        .sh-footer-tagline {
          margin: 0;
          color: #F1F5F1;
          font-size: 10px;
          line-height: 1.7;
        }

        .sh-footer-copyright {
          text-align: left;
        }

        .sh-footer-tagline {
          max-width: 38%;
          overflow-wrap: anywhere;
          text-align: center;
        }

        .sh-footer-credit {
          display: inline-flex;
          min-width: 0;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          color: #F1F5F1;
          font-size: 10px;
          font-weight: 650;
          line-height: 1.4;
          text-align: right;
        }

        .sh-footer-credit img {
          width: 28px;
          height: 28px;
          flex: 0 0 28px;
          object-fit: contain;
          border-radius: 6px;
        }

        /* Animations */

        @keyframes sh-footer-glow-drift {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(18px, -12px, 0);
          }
        }

        @keyframes sh-footer-light-sweep {
          0%, 15% {
            transform: translateX(0);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          60%, 100% {
            transform: translateX(600%);
            opacity: 0;
          }
        }

        /* =================================
           TABLET
        ================================= */

        @media (max-width: 900px) {
          .sh-footer-inner {
            padding-top: 34px;
            padding-bottom: 21px;
          }

          .sh-footer-grid {
            grid-template-columns:
              minmax(0, 0.8fr)
              minmax(0, 1.2fr);
            gap: 26px 34px;
          }

          .sh-footer-brand {
            grid-column: 1 / -1;
          }

          .sh-footer-logo-link .smartedge-logo-wrap {
            width: min(260px, 70vw);
            height: clamp(146px, 39vw, 260px);
          }

          .sh-footer-description {
            max-width: 520px;
          }

          .sh-footer-contacts {
            max-width: 480px;
          }

          .sh-footer-wordmark {
            bottom: 54px;
            font-size: clamp(4rem, 15vw, 9rem);
          }
        }

        /* =================================
           MOBILE
        ================================= */

        @media (max-width: 560px) {
          .sh-footer-inner {
            width: calc(100% - 36px);
            padding-top: 29px;
            padding-bottom: 20px;
          }

          .sh-footer-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 23px;
          }

          .sh-footer-brand {
            grid-column: auto;
          }

          .sh-footer-description {
            margin-top: 9px;
            font-size: 12px;
            line-height: 1.75;
          }

          .sh-footer-contacts {
            gap: 6px;
            margin-top: 13px;
          }

          .sh-footer-contact {
            min-height: 38px;
            padding: 5px 9px;
          }

          .sh-footer-cta {
            min-height: 40px;
            margin-top: 7px;
          }

          .sh-footer-socials {
            gap: 6px;
            margin-top: 11px;
          }

          .sh-footer-social-link {
            min-height: 28px;
            padding-inline: 10px;
            font-size: 10px;
          }

          .sh-footer-column-title {
            margin-top: 0;
            margin-bottom: 11px;
          }

          .sh-footer-link-list {
            gap: 5px;
          }

          .sh-footer-link-list--services {
            column-gap: 13px;
            row-gap: 5px;
          }

          .sh-footer-link {
            gap: 6px;
            font-size: 11px;
            line-height: 1.6;
          }

          .sh-footer-wordmark {
            bottom: 60px;
            font-size: clamp(3.5rem, 16vw, 6rem);
          }

          .sh-footer-bottom-inner {
            width: calc(100% - 32px);
            min-height: 52px;
            flex-wrap: wrap;
            gap: 9px 12px;
            padding-block: 10px;
          }

          .sh-footer-copyright {
            flex: 1 1 170px;
            font-size: 9px;
          }

          .sh-footer-tagline {
            display: none;
          }

        }

        @media (max-width: 360px) {
          .sh-footer-inner {
            width: calc(100% - 28px);
          }

          .sh-footer-grid {
            gap: 21px;
          }

          .sh-footer-contact-label {
            font-size: 11px;
          }

          .sh-footer-link-list--services {
            column-gap: 9px;
          }

          .sh-footer-link {
            font-size: 10px;
          }

          .sh-footer-bottom-inner {
            width: calc(100% - 28px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sh-footer *,
          .sh-footer *::before,
          .sh-footer *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Decorative background */}
      <div className="sh-footer-grid-lines" aria-hidden="true" />
      <div
        className="sh-footer-glow sh-footer-glow--left"
        aria-hidden="true"
      />
      <div
        className="sh-footer-glow sh-footer-glow--right"
        aria-hidden="true"
      />
      <div className="sh-footer-accent" aria-hidden="true" />

      {/* Footer content */}
      <Reveal className="sh-footer-inner">
        <div className="sh-footer-grid">
          {/* Brand and contact */}
          <div className="sh-footer-brand">
            <Link
              to="/"
              aria-label={`${siteName} home`}
              className="sh-footer-logo-link"
            >
              <Wordmark />
            </Link>

            {description && (
              <p className="sh-footer-description">
                {description}
              </p>
            )}

            <div className="sh-footer-contacts">
              {contactPhone && (
                <ContactRow
                  href={`tel:${contactPhone}`}
                  icon={<Phone strokeWidth={1.8} />}
                  label={contactPhone}
                />
              )}

              {whatsappPhone && (
                <ContactRow
                  href={`https://wa.me/${whatsappPhone}`}
                  icon={<WhatsAppIcon />}
                  label={`WhatsApp: ${contactPhone}`}
                />
              )}

              {address && (
                <ContactRow
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  icon={<MapPin strokeWidth={1.8} />}
                  label={address}
                />
              )}

            </div>

            {socialItems.length > 0 && (
              <ul
                className="sh-footer-socials"
                aria-label="Social links"
              >
                {socialItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="sh-footer-social-link"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Company */}
          <nav
            aria-label="Company navigation"
            className="sh-footer-column"
          >
            <ColumnTitle>Company</ColumnTitle>

            <ul className="sh-footer-link-list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    <LinkDash />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav
            aria-label="Services navigation"
            className="sh-footer-column"
          >
            <ColumnTitle>Services</ColumnTitle>

            <ul className="sh-footer-link-list sh-footer-link-list--services">
              {serviceItems.map((service) => (
                <li key={service.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className={linkClass}
                  >
                    <LinkDash />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Reveal>

      {/* Background wordmark does not increase footer height */}
      <div className="sh-footer-wordmark" aria-hidden="true">
        {siteName}
      </div>

      {/* Bottom bar */}
      <div className="sh-footer-bottom">
        <div className="sh-footer-bottom-inner">
          <p className="sh-footer-copyright">
            © {year} {siteName}. All rights reserved.
          </p>

          {tagline && (
            <p className="sh-footer-tagline">
              {tagline}
            </p>
          )}

          <div className="sh-footer-credit">
            <img src={virtumediaLogo} alt="VirtuMedia" />
            <span>Developed by VirtuMedia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
