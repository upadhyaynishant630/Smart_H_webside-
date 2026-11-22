import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

/* ======================================================
   SAFE WHATSAPP URL HELPERS
====================================================== */

const ENV = import.meta.env || {};

const getText = (value) =>
  typeof value === "string" || typeof value === "number"
    ? String(value).trim()
    : "";

function getSafeWhatsAppUrl(value) {
  const input = getText(value);
  if (!input) return "";

  try {
    const parsed = new URL(input);

    const allowedHosts = new Set([
      "wa.me",
      "api.whatsapp.com",
      "web.whatsapp.com",
      "whatsapp.com",
      "www.whatsapp.com",
    ]);

    if (
      (parsed.protocol !== "https:" &&
        parsed.protocol !== "http:") ||
      !allowedHosts.has(parsed.hostname.toLowerCase())
    ) {
      return "";
    }

    return parsed.href;
  } catch {
    return "";
  }
}

function buildWhatsAppUrl() {
  const socialItems = Array.isArray(siteConfig?.social)
    ? siteConfig.social
    : [];

  const whatsappSocialLink = socialItems.find((item) => {
    const label = getText(item?.label).toLowerCase();
    const href = getText(item?.href).toLowerCase();

    return (
      label.includes("whatsapp") ||
      href.includes("whatsapp") ||
      href.includes("wa.me")
    );
  });

  // Prefer configured WhatsApp URL.
  const configuredUrl =
    getSafeWhatsAppUrl(ENV.VITE_WHATSAPP_URL) ||
    getSafeWhatsAppUrl(whatsappSocialLink?.href);

  if (configuredUrl) return configuredUrl;

  // Read configured WhatsApp phone number.
  const configuredPhone =
    getText(siteConfig?.whatsappPhone) ||
    getText(siteConfig?.contactPhone) ||
    getText(ENV.VITE_WHATSAPP_PHONE) ||
    getText(ENV.VITE_CONTACT_PHONE);

  const phoneDigits = configuredPhone.replace(/\D/g, "");

  const message = encodeURIComponent(
    "Hello SmartEDGE, I would like to enquire about your solar products and services."
  );

  const validInternationalNumber =
    phoneDigits.length >= 8 &&
    phoneDigits.length <= 15;

  const baseUrl = validInternationalNumber
    ? `https://wa.me/${phoneDigits}`
    : "https://wa.me/";

  return `${baseUrl}?text=${message}`;
}

const WHATSAPP_URL = buildWhatsAppUrl();

/* ======================================================
   WHATSAPP BRAND ICON
====================================================== */

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="27"
      height="27"
      fill="currentColor"
      role="img"
      aria-label="WhatsApp"
    >
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.3Zm-8.4 18.1h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.9 1 1-3.8-.2-.4a9.8 9.8 0 1 1 8.6 4.8Zm5.4-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.5.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.1 3.3 5.1 4.6 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3Z" />
    </svg>
  );
}

/* ======================================================
   SINGLE FLOATING WHATSAPP ACTION
====================================================== */

export function FloatingActions() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <style>{`

        .sh-fab-whatsapp,
        .sh-fab-whatsapp * {
          box-sizing: border-box;
        }

        /* MAIN FLOATING WHATSAPP BUTTON */

        .sh-fab-whatsapp {
          position: fixed;
          right: 20px;
          bottom: calc(20px + env(safe-area-inset-bottom));
          z-index: 1000;

          display: grid;
          width: 58px;
          height: 58px;

          place-items: center;
          overflow: visible;

          border: 1px solid rgba(255,255,255,.42);
          border-radius: 50%;

          color: #ffffff;

          background: linear-gradient(
            145deg,
            #25d366 0%,
            #18b957 100%
          );

          box-shadow:
            0 10px 26px rgba(37,211,102,.32),
            inset 0 1px 0 rgba(255,255,255,.34);

          text-decoration: none;

          -webkit-tap-highlight-color: transparent;

          isolation: isolate;

          transition:
            box-shadow 220ms ease,
            filter 220ms ease;
        }

        .sh-fab-whatsapp:hover {
          filter: brightness(1.045);

          box-shadow:
            0 14px 30px rgba(37,211,102,.40),
            inset 0 1px 0 rgba(255,255,255,.38);
        }

        .sh-fab-whatsapp:focus-visible {
          outline: 3px solid #128c4a;
          outline-offset: 5px;
        }

        /* WHATSAPP ICON */

        .sh-fab-whatsapp-icon {
          position: relative;
          z-index: 2;

          display: grid;

          width: 100%;
          height: 100%;

          place-items: center;

          color: #ffffff;
        }

        .sh-fab-whatsapp-icon svg {
          display: block;

          width: 29px;
          height: 29px;
        }

        /* PULSE ANIMATION */

        .sh-fab-whatsapp-ring {
          position: absolute;
          z-index: -1;

          inset: -2px;

          border: 1px solid rgba(37,211,102,.55);

          border-radius: 50%;

          pointer-events: none;

          animation:
            sh-fab-whatsapp-pulse
            2.6s cubic-bezier(.22,1,.36,1) infinite;
        }

        .sh-fab-whatsapp-ring--delayed {
          animation-delay: 1.3s;
        }

        /* HOVER TOOLTIP */

        .sh-fab-whatsapp-tooltip {
          position: absolute;

          top: 50%;
          right: calc(100% + 12px);

          padding: 9px 13px;

          transform: translateY(-50%);

          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;

          color: #ffffff;

          background: rgba(17,24,39,.94);

          box-shadow:
            0 8px 22px rgba(0,0,0,.17);

          font-family:
            Inter,
            Manrope,
            ui-sans-serif,
            system-ui,
            sans-serif;

          font-size: 12px;
          font-weight: 700;
          line-height: 1;

          white-space: nowrap;

          opacity: 0;
          visibility: hidden;

          pointer-events: none;

          transition:
            opacity 180ms ease,
            visibility 180ms ease;
        }

        .sh-fab-whatsapp:hover
        .sh-fab-whatsapp-tooltip,
        .sh-fab-whatsapp:focus-visible
        .sh-fab-whatsapp-tooltip {
          opacity: 1;
          visibility: visible;
        }

        /* KEYFRAMES */

        @keyframes sh-fab-whatsapp-pulse {
          0% {
            transform: scale(1);
            opacity: .48;
          }

          80%, 100% {
            transform: scale(1.75);
            opacity: 0;
          }
        }

        /* MOBILE RESPONSIVE */

        @media (max-width: 560px) {

          .sh-fab-whatsapp {
            right: 13px;

            bottom: calc(
              13px + env(safe-area-inset-bottom)
            );

            width: 52px;
            height: 52px;
          }

          .sh-fab-whatsapp-icon svg {
            width: 26px;
            height: 26px;
          }

          .sh-fab-whatsapp-tooltip {
            font-size: 11px;
            padding: 8px 11px;
          }
        }

        /* SMALL MOBILE */

        @media (max-width: 350px) {

          .sh-fab-whatsapp {
            right: 10px;

            bottom: calc(
              10px + env(safe-area-inset-bottom)
            );

            width: 48px;
            height: 48px;
          }

          .sh-fab-whatsapp-icon svg {
            width: 24px;
            height: 24px;
          }
        }

        /* ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {

          .sh-fab-whatsapp-ring {
            animation: none !important;
            display: none;
          }

          .sh-fab-whatsapp,
          .sh-fab-whatsapp-tooltip {
            transition-duration: .01ms !important;
          }
        }

      `}</style>

      <motion.a
        href={WHATSAPP_URL}
        className="sh-fab-whatsapp"
        aria-label="Chat with SmartEDGE on WhatsApp"
        title="Chat with SmartEDGE on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"

        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 12,
                scale: 0.9,
              }
        }

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -3,
                scale: 1.045,
              }
        }

        whileTap={
          reduceMotion
            ? undefined
            : {
                scale: 0.95,
              }
        }

        transition={{
          duration: reduceMotion ? 0 : 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span
          className="sh-fab-whatsapp-ring"
          aria-hidden="true"
        />

        <span
          className="
            sh-fab-whatsapp-ring
            sh-fab-whatsapp-ring--delayed
          "
          aria-hidden="true"
        />

        <span className="sh-fab-whatsapp-icon">
          <WhatsAppIcon />
        </span>

        <span
          className="sh-fab-whatsapp-tooltip"
          aria-hidden="true"
        >
          Chat on WhatsApp
        </span>

      </motion.a>
    </>
  );
}

export default FloatingActions;