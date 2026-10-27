import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  X,
  Youtube,
} from "lucide-react";
import { siteConfig } from "@/data/site";

/* ======================================================
   ENVIRONMENT + SAFE HELPERS
====================================================== */

const ENV = import.meta.env || {};

const getText = (value) =>
  typeof value === "string" ? value.trim() : "";

function getSafeWebUrl(value) {
  const input = getText(value);
  if (!input) return "";

  try {
    const parsed = new URL(input);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return "";
    }
    return parsed.href;
  } catch {
    return "";
  }
}

const socialItems = Array.isArray(siteConfig?.social)
  ? siteConfig.social.filter(
      (item) =>
        item &&
        typeof item.label === "string" &&
        typeof item.href === "string",
    )
  : [];

function findSocialUrl(pattern, envKey, fallbackUrl) {
  const match = socialItems.find((item) => {
    const label = getText(item.label).toLowerCase();
    const href = getText(item.href).toLowerCase();
    return pattern.test(label) || pattern.test(href);
  });

  return (
    getSafeWebUrl(match?.href) ||
    getSafeWebUrl(ENV[envKey]) ||
    fallbackUrl
  );
}

/* ======================================================
   BUILD CONTACT + SOCIAL ACTIONS
====================================================== */

function buildActions(pathname) {
  const actions = [];
  const phone =
    getText(siteConfig?.contactPhone) ||
    getText(ENV.VITE_CONTACT_PHONE);
  const email =
    getText(siteConfig?.contactEmail) ||
    getText(ENV.VITE_CONTACT_EMAIL);
  const phoneDigits = phone.replace(/\D/g, "");
  const whatsappText = encodeURIComponent(
    "Hello Smart H, I would like to discuss a technology project.",
  );

  const configuredWhatsApp =
    getSafeWebUrl(ENV.VITE_WHATSAPP_URL) ||
    (() => {
      const match = socialItems.find((item) =>
        /whatsapp|wa\.me/i.test(
          `${getText(item.label)} ${getText(item.href)}`,
        ),
      );
      return getSafeWebUrl(match?.href);
    })();

  const whatsappUrl =
    configuredWhatsApp ||
    (phone.startsWith("+") && phoneDigits.length >= 8
      ? `https://wa.me/${phoneDigits}?text=${whatsappText}`
      : `https://api.whatsapp.com/send?text=${whatsappText}`);

  if (pathname !== "/contact") {
    actions.push({
      id: "consult",
      label: "Book a consultation",
      description: "Discuss your project with Smart H",
      icon: <CalendarCheck size={17} strokeWidth={1.9} aria-hidden="true" />,
      tone: "consult",
      to: "/contact",
    });
  }

  actions.push({
    id: "whatsapp",
    label: "WhatsApp",
    description:
      phone.startsWith("+") && phoneDigits.length >= 8
        ? "Message Smart H directly"
        : "Open WhatsApp and choose a contact",
    icon: <MessageCircle size={18} strokeWidth={1.9} aria-hidden="true" />,
    tone: "whatsapp",
    href: whatsappUrl,
    external: true,
  });

  actions.push({
    id: "instagram",
    label: "Instagram",
    description: "Open Instagram",
    icon: <Instagram size={17} strokeWidth={1.9} aria-hidden="true" />,
    tone: "instagram",
    href: findSocialUrl(/instagram/i, "VITE_INSTAGRAM_URL", "https://www.instagram.com/"),
    external: true,
  });

  actions.push({
    id: "facebook",
    label: "Facebook",
    description: "Open Facebook",
    icon: <Facebook size={17} strokeWidth={1.9} aria-hidden="true" />,
    tone: "facebook",
    href: findSocialUrl(/facebook|fb\.com/i, "VITE_FACEBOOK_URL", "https://www.facebook.com/"),
    external: true,
  });

  actions.push({
    id: "linkedin",
    label: "LinkedIn",
    description: "Open LinkedIn",
    icon: <Linkedin size={17} strokeWidth={1.9} aria-hidden="true" />,
    tone: "linkedin",
    href: findSocialUrl(/linkedin/i, "VITE_LINKEDIN_URL", "https://www.linkedin.com/"),
    external: true,
  });

  actions.push({
    id: "youtube",
    label: "YouTube",
    description: "Open YouTube",
    icon: <Youtube size={18} strokeWidth={1.9} aria-hidden="true" />,
    tone: "youtube",
    href: findSocialUrl(/youtube|youtu\.be/i, "VITE_YOUTUBE_URL", "https://www.youtube.com/"),
    external: true,
  });

  if (phone) {
    actions.push({
      id: "call",
      label: "Call us",
      description: phone,
      icon: <Phone size={17} strokeWidth={1.9} aria-hidden="true" />,
      tone: "call",
      href: `tel:${phone.replace(/[^\d+*#,;]/g, "")}`,
    });
  }

  if (email) {
    actions.push({
      id: "email",
      label: "Email us",
      description: email,
      icon: <Mail size={17} strokeWidth={1.9} aria-hidden="true" />,
      tone: "email",
      href: `mailto:${email}`,
    });
  }

  return actions;
}

/* ======================================================
   MENU ACTION ITEM
====================================================== */

function ActionItem({ action, index, reduce, onPick }) {
  const content = (
    <>
      <span className="sh-fab-action-icon" aria-hidden="true">
        <span className={`sh-fab-action-icon-inner sh-fab-tone--${action.tone}`}>
          {action.icon}
        </span>
      </span>

      <span className="sh-fab-action-copy">
        <span className="sh-fab-action-title">{action.label}</span>
        <span className="sh-fab-action-description">{action.description}</span>
      </span>

      <ArrowUpRight className="sh-fab-action-arrow" aria-hidden="true" />
    </>
  );

  const className = "sh-fab-action";

  return (
    <motion.li
      className="sh-fab-action-shell"
      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reduce ? 0 : 6, scale: 0.99 }}
      transition={{
        duration: reduce ? 0 : 0.19,
        delay: reduce ? 0 : Math.min(index * 0.025, 0.16),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {action.to ? (
        <Link to={action.to} className={className} onClick={onPick}>
          {content}
        </Link>
      ) : (
        <a
          href={action.href}
          className={className}
          onClick={onPick}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      )}
    </motion.li>
  );
}

/* ======================================================
   MAIN FLOATING ACTIONS
====================================================== */

export function FloatingActions() {
  const reduce = useReducedMotion();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);

  const actions = buildActions(pathname);
  const showLabel = !open && (hover || focused);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <style>{`
        .sh-fab-root,
        .sh-fab-root * {
          box-sizing: border-box;
        }

        .sh-fab-root {
          position: fixed;
          right: 20px;
          bottom: calc(20px + env(safe-area-inset-bottom));
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          width: max-content;
          max-width: calc(100vw - 20px);
          font-family: Inter, Manrope, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .sh-fab-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          background: rgba(5, 10, 28, 0.32);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          cursor: default;
        }

        .sh-fab-main-wrap {
          position: relative;
          z-index: 2;
        }

        /* Smaller, balanced primary button */
        .sh-fab-main {
          position: relative;
          display: grid;
          place-items: center;
          width: 54px;
          height: 54px;
          padding: 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.29);
          border-radius: 50%;
          color: #fff;
          background:
            radial-gradient(circle at 25% 10%, rgba(255,255,255,.26), transparent 40%),
            linear-gradient(135deg, #7775ff 0%, #484dde 47%, #2639be 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.42),
            inset 0 -6px 12px rgba(12,20,79,.25),
            0 12px 27px -9px rgba(76,85,237,.62);
          cursor: pointer;
          transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
        }

        .sh-fab-main:hover {
          transform: translateY(-2px) scale(1.035);
          border-color: rgba(255,255,255,.5);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.45), 0 16px 30px -8px rgba(76,85,237,.65);
        }

        .sh-fab-main:active { transform: scale(.95); }
        .sh-fab-main:focus-visible { outline: 3px solid #5cdeed; outline-offset: 4px; }

        .sh-fab-main-icon {
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
        }

        .sh-fab-main-icon svg { width: 23px; height: 23px; stroke-width: 1.9; }

        .sh-fab-shine {
          position: absolute;
          inset: -20%;
          background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,.43) 50%, transparent 60%);
          animation: sh-fab-shine 4.5s ease-in-out 1.5s infinite;
          pointer-events: none;
        }

        .sh-fab-ring {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(111,113,255,.45);
          border-radius: 50%;
          pointer-events: none;
          animation: sh-fab-ring 2.7s cubic-bezier(.22,1,.36,1) infinite;
        }

        .sh-fab-ring--late { animation-delay: 1.35s; }
        .sh-fab-bob { animation: sh-fab-bob 4s ease-in-out infinite; }
        .sh-fab-bob:hover, .sh-fab-bob:focus-within { animation-play-state: paused; }

        /* The label appears on hover/focus only */
        .sh-fab-label {
          position: absolute;
          top: 50%;
          right: calc(100% + 11px);
          display: inline-flex;
          align-items: center;
          gap: 7px;
          max-width: calc(100vw - 100px);
          padding: 9px 13px;
          transform: translateY(-50%);
          border: 1px solid rgba(190,204,255,.18);
          border-radius: 999px;
          color: #fff;
          background: rgba(10,17,42,.94);
          box-shadow: 0 8px 23px rgba(0,0,0,.17);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          font-size: 11px;
          font-weight: 750;
          white-space: nowrap;
          pointer-events: none;
        }

        .sh-fab-label-dot {
          width: 6px;
          height: 6px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #5cdeed;
          box-shadow: 0 0 10px rgba(92,222,237,.7);
        }

        /* Compact options panel */
        .sh-fab-menu {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 7px;
          width: min(300px, calc(100vw - 24px));
          max-height: min(65vh, 540px);
          margin: 0;
          padding: 0 2px 3px;
          overflow-y: auto;
          overscroll-behavior: contain;
          list-style: none;
          scrollbar-width: thin;
          scrollbar-color: rgba(133,132,255,.35) transparent;
        }

        .sh-fab-action-shell { width: 100%; min-width: 0; }

        .sh-fab-action {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          min-width: 0;
          min-height: 54px;
          padding: 8px 10px;
          border: 1px solid rgba(190,204,255,.14);
          border-radius: 14px;
          color: #fff;
          background: linear-gradient(135deg, rgba(23,33,69,.97), rgba(9,16,40,.97));
          box-shadow: 0 7px 19px rgba(2,7,24,.18), inset 0 1px 0 rgba(255,255,255,.045);
          backdrop-filter: blur(17px);
          -webkit-backdrop-filter: blur(17px);
          text-align: left;
          text-decoration: none;
          transition: transform 200ms ease, border-color 200ms ease, background 200ms ease, box-shadow 200ms ease;
        }

        .sh-fab-action:hover {
          transform: translateX(-2px);
          border-color: rgba(133,132,255,.48);
          background: linear-gradient(135deg, rgba(31,43,89,.99), rgba(10,18,44,.99));
          box-shadow: 0 10px 23px rgba(2,7,24,.22), inset 0 1px 0 rgba(255,255,255,.06);
        }

        .sh-fab-action:focus-visible { outline: 2px solid #5cdeed; outline-offset: 3px; }

        /* Icon has a fixed tile so all logos align perfectly */
        .sh-fab-action-icon {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          padding: 0;
          border: 1px solid rgba(255,255,255,.13);
          border-radius: 11px;
          background: rgba(255,255,255,.04);
          overflow: hidden;
        }

        .sh-fab-action-icon-inner {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          color: #fff;
          transition: transform 200ms ease;
        }

        .sh-fab-action:hover .sh-fab-action-icon-inner { transform: scale(1.04); }
        .sh-fab-tone--consult { background: linear-gradient(140deg,#7775ff,#4748ce); }
        .sh-fab-tone--whatsapp { background: linear-gradient(140deg,#35dc79,#16884b); }
        .sh-fab-tone--instagram { background: linear-gradient(145deg,#fdc468,#f14470 48%,#a52cc7 78%,#515bd4); }
        .sh-fab-tone--facebook { background: linear-gradient(145deg,#4e9cff,#185abc); }
        .sh-fab-tone--linkedin { background: linear-gradient(145deg,#3299d6,#155a8f); }
        .sh-fab-tone--youtube { background: linear-gradient(145deg,#ff6666,#d21d35); }
        .sh-fab-tone--call { background: linear-gradient(145deg,#3d94ff,#2251cb); }
        .sh-fab-tone--email { background: linear-gradient(145deg,#8584ff,#4c55ed); }

        .sh-fab-action-copy {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .sh-fab-action-title {
          display: block;
          color: #f4f6ff;
          font-size: 11px;
          font-weight: 750;
          line-height: 1.4;
        }

        .sh-fab-action-description {
          display: block;
          color: #a7b3d0;
          font-size: 9px;
          font-weight: 500;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .sh-fab-action-arrow {
          width: 14px;
          height: 14px;
          flex: 0 0 auto;
          color: #7c8bb0;
          transition: transform 180ms ease, color 180ms ease;
        }

        .sh-fab-action:hover .sh-fab-action-arrow { transform: translate(2px,-2px); color: #5cdeed; }

        /* Animations */
        @keyframes sh-fab-ring {
          0% { transform: scale(1); opacity: .5; }
          80%, 100% { transform: scale(1.8); opacity: 0; }
        }

        @keyframes sh-fab-shine {
          0% { transform: translateX(-140%) rotate(20deg); }
          55%, 100% { transform: translateX(140%) rotate(20deg); }
        }

        @keyframes sh-fab-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @media (max-width: 560px) {
          .sh-fab-root {
            right: 13px;
            bottom: calc(13px + env(safe-area-inset-bottom));
            gap: 8px;
            max-width: calc(100vw - 18px);
          }

          .sh-fab-main { width: 48px; height: 48px; }
          .sh-fab-main-icon svg { width: 21px; height: 21px; }
          .sh-fab-menu { width: min(280px, calc(100vw - 18px)); max-height: min(62vh, 490px); gap: 6px; }
          .sh-fab-action { min-height: 49px; gap: 9px; padding: 7px 9px; border-radius: 12px; }
          .sh-fab-action-icon { width: 33px; height: 33px; flex-basis: 33px; border-radius: 10px; }
          .sh-fab-action-title { font-size: 10px; }
          .sh-fab-action-description { font-size: 8px; }
          .sh-fab-label { padding: 8px 11px; font-size: 10px; }
        }

        @media (max-width: 350px) {
          .sh-fab-root { right: 10px; bottom: calc(10px + env(safe-area-inset-bottom)); }
          .sh-fab-main { width: 45px; height: 45px; }
          .sh-fab-menu { width: calc(100vw - 20px); }
          .sh-fab-action-description { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sh-fab-bob, .sh-fab-ring, .sh-fab-shine { animation: none !important; }
          .sh-fab-ring { display: none; }
          .sh-fab-action, .sh-fab-main { transition-duration: .01ms !important; }
        }
      `}</style>

      {/* Click outside the panel to close it */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            className="sh-fab-backdrop"
            aria-label="Close contact menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.16 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <div className="sh-fab-root">
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              key="floating-actions-menu"
              id="floating-actions-menu"
              className="sh-fab-menu"
              aria-label="Contact and social options"
              initial={reduce ? false : { opacity: 0, y: 9 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : 6 }}
              transition={{ duration: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {actions.map((action, index) => (
                <ActionItem
                  key={action.id}
                  action={action}
                  index={index}
                  reduce={reduce}
                  onPick={closeMenu}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div
          className="sh-fab-main-wrap"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={() => setFocused(false)}
        >
          <AnimatePresence>
            {showLabel && (
              <motion.span
                key="lets-talk-label"
                className="sh-fab-label"
                initial={reduce ? false : { opacity: 0, x: 7, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 5, scale: 0.98 }}
                transition={{ duration: reduce ? 0 : 0.18 }}
              >
                <span className="sh-fab-label-dot" aria-hidden="true" />
                Let's Talk
              </motion.span>
            )}
          </AnimatePresence>

          {!open && (
            <>
              <span className="sh-fab-ring" aria-hidden="true" />
              <span className="sh-fab-ring sh-fab-ring--late" aria-hidden="true" />
            </>
          )}

          <div className={!open ? "sh-fab-bob" : ""}>
            <motion.button
              type="button"
              className="sh-fab-main"
              aria-label={open ? "Close contact and social options" : "Open contact and social options"}
              aria-expanded={open}
              aria-controls="floating-actions-menu"
              onClick={() => setOpen((current) => !current)}
              whileTap={reduce ? undefined : { scale: 0.95 }}
            >
              <span className="sh-fab-shine" aria-hidden="true" />

              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "contact"}
                  className="sh-fab-main-icon"
                  initial={reduce ? false : { rotate: -60, opacity: 0, scale: 0.75 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 55, opacity: 0, scale: 0.75 }}
                  transition={{ duration: reduce ? 0 : 0.17 }}
                >
                  {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FloatingActions;
