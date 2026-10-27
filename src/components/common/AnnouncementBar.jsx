
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { announcementConfig } from "@/data/site";

const EMPTY_MESSAGES = [];

const easing = [0.22, 1, 0.36, 1];

export function AnnouncementBar() {
  const config = announcementConfig ?? {};

  const messages = Array.isArray(config.messages)
    ? config.messages
    : EMPTY_MESSAGES;

  const intervalMs =
    typeof config.intervalMs === "number" &&
    Number.isFinite(config.intervalMs) &&
    config.intervalMs >= 1500
      ? config.intervalMs
      : 5000;

  const showStatusDot = config.showStatusDot ?? true;
  const animation = config.animation ?? "slide";

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const reduceMotion = useReducedMotion();

  const currentMessage = messages[index] ?? messages[0];

  const shouldSlide = !reduceMotion && animation !== "fade";
  const offset = shouldSlide ? 12 : 0;

  useEffect(() => {
    if (paused || reduceMotion || messages.length < 2) {
      return undefined;
    }

    let timerId;

    const startTimer = () => {
      window.clearInterval(timerId);

      if (document.hidden) return;

      timerId = window.setInterval(() => {
        setIndex((currentIndex) => (currentIndex + 1) % messages.length);
      }, intervalMs);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.clearInterval(timerId);
      } else {
        startTimer();
      }
    };

    startTimer();

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.clearInterval(timerId);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [paused, reduceMotion, intervalMs, messages]);

  if (
    !currentMessage ||
    typeof currentMessage.text !== "string"
  ) {
    return null;
  }

  const messageKey =
    currentMessage.id ?? `${currentMessage.text}-${index}`;

  const hasLink =
    typeof currentMessage.to === "string" &&
    currentMessage.to.length > 0 &&
    typeof currentMessage.linkLabel === "string" &&
    currentMessage.linkLabel.length > 0;

  return (
    <div
      className="sh-announcement"
      role="region"
      aria-label="Site announcements"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style>{`
        .sh-announcement,
        .sh-announcement * {
          box-sizing: border-box;
         
        }

        .sh-announcement {
          --sh-ab-blue: #7775ff;
          --sh-ab-cyan: #54e5f0;
          --sh-ab-text: #f6f7ff;
          --sh-ab-muted: #c5cce1;

          position: relative;
          z-index: 50;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          color: var(--sh-ab-text);
          background:
            radial-gradient(
              ellipse at 18% 50%,
              rgba(83, 92, 255, 0.18),
              transparent 40%
            ),
            radial-gradient(
              ellipse at 86% 50%,
              rgba(48, 194, 226, 0.11),
              transparent 34%
            ),
            linear-gradient(
              105deg,
              #080f25 0%,
              #101a3b 48%,
              #09152d 100%
            );
          border-bottom: 1px solid rgba(151, 169, 255, 0.15);
          font-family:
            Inter,
            Manrope,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          font-size: 13px;
          font-weight: 450;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        .sh-announcement::before {
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(119, 117, 255, 0.8),
            var(--sh-ab-cyan),
            rgba(119, 117, 255, 0.8),
            transparent
          );
          content: "";
          pointer-events: none;
        }

        .sh-announcement::after {
          position: absolute;
          z-index: -1;
          top: 0;
          left: -35%;
          width: 32%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #fff,
            transparent
          );
          box-shadow: 0 0 14px rgba(84, 229, 240, 0.65);
          animation: sh-ab-light-sweep 7s ease-in-out infinite;
          content: "";
          pointer-events: none;
        }

        .sh-ab-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 1600px;
          min-height: 45px;
          margin: 0 auto;
          padding: 7px clamp(14px, 3vw, 38px);
        }

        .sh-ab-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 1.2vw, 14px);
          width: 100%;
          min-width: 0;
          max-width: 100%;
          margin: 0 auto;
        }

        .sh-ab-status {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 8px;
          height: 8px;
          flex: 0 0 8px;
          border-radius: 50%;
          background: var(--sh-ab-cyan);
          box-shadow:
            0 0 8px rgba(84, 229, 240, 0.65),
            0 0 18px rgba(84, 229, 240, 0.22);
        }

        .sh-ab-status::after {
          position: absolute;
          inset: -4px;
          border: 1px solid rgba(84, 229, 240, 0.5);
          border-radius: 50%;
          animation: sh-ab-status-pulse 2.2s ease-out infinite;
          content: "";
        }

        .sh-ab-message {
          display: block;
          flex: 0 1 auto;
          min-width: 0;
          max-width: min(70vw, 900px);
          overflow: hidden;
          color: var(--sh-ab-muted);
          font-size: clamp(11px, 0.85vw, 12.5px);
          font-weight: 500;
          letter-spacing: 0.015em;
          line-height: 1.6;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .sh-ab-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex: 0 0 auto;
          padding: 5px 10px;
          overflow: hidden;
          border: 1px solid rgba(119, 117, 255, 0.25);
          border-radius: 999px;
          background: rgba(119, 117, 255, 0.11);
          color: #dcdcff;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.015em;
          line-height: 1.3;
          text-decoration: none;
          transition:
            background 220ms ease,
            border-color 220ms ease,
            color 220ms ease,
            box-shadow 220ms ease,
            transform 220ms ease;
        }

        .sh-ab-link::before {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 15%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 85%
          );
          opacity: 0;
          transform: translateX(-100%);
          transition:
            transform 450ms ease,
            opacity 250ms ease;
          content: "";
          pointer-events: none;
        }

        .sh-ab-link:hover {
          transform: translateY(-1px);
          border-color: rgba(84, 229, 240, 0.4);
          background: rgba(84, 229, 240, 0.12);
          color: #fff;
          box-shadow: 0 3px 16px rgba(84, 229, 240, 0.08);
        }

        .sh-ab-link:hover::before {
          opacity: 1;
          transform: translateX(100%);
        }

        .sh-ab-link:focus-visible {
          outline: 2px solid var(--sh-ab-cyan);
          outline-offset: 3px;
        }

        .sh-ab-link-icon {
          display: block;
          width: 13px;
          height: 13px;
          flex: 0 0 auto;
          transition: transform 220ms ease;
        }

        .sh-ab-link:hover .sh-ab-link-icon {
          transform: translateX(3px);
        }

        .sh-ab-link-label {
          position: relative;
          z-index: 1;
        }

        .sh-ab-sparkle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          color: #a9a6ff;
        }

        .sh-ab-sparkle svg {
          display: block;
          width: 14px;
          height: 14px;
          animation: sh-ab-sparkle 3.5s ease-in-out infinite;
        }

        @keyframes sh-ab-light-sweep {
          0%, 12% {
            transform: translateX(0);
            opacity: 0;
          }

          25% {
            opacity: 1;
          }

          58%, 100% {
            transform: translateX(430%);
            opacity: 0;
          }
        }

        @keyframes sh-ab-status-pulse {
          0% {
            transform: scale(0.75);
            opacity: 0.8;
          }

          100% {
            transform: scale(1.7);
            opacity: 0;
          }
        }

        @keyframes sh-ab-sparkle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }

          50% {
            transform: rotate(12deg) scale(1.12);
          }
        }

        @media (min-width: 1600px) {
          .sh-ab-inner {
            min-height: 47px;
          }

          .sh-ab-message {
            font-size: 13px;
          }
        }

        @media (max-width: 640px) {
          .sh-announcement {
            font-size: 12px;
          }

          .sh-ab-inner {
            min-height: 43px;
            padding: 7px 12px;
          }

          .sh-ab-content {
            gap: 8px;
          }

          .sh-ab-message {
            max-width: 68vw;
            font-size: 11px;
            letter-spacing: 0;
          }

          .sh-ab-link {
            gap: 4px;
            padding: 5px 8px;
            font-size: 10px;
          }

          .sh-ab-link-icon {
            width: 12px;
            height: 12px;
          }

          .sh-ab-sparkle svg {
            width: 13px;
            height: 13px;
          }
        }

        @media (max-width: 420px) {
          .sh-ab-inner {
            padding-right: 9px;
            padding-left: 9px;
          }

          .sh-ab-content {
            gap: 7px;
          }

          .sh-ab-message {
            max-width: 62vw;
            font-size: 10.5px;
          }

          .sh-ab-link {
            padding: 5px 7px;
          }

          .sh-ab-link-label {
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sh-announcement::after,
          .sh-ab-status::after,
          .sh-ab-sparkle svg {
            animation: none !important;
          }

          .sh-ab-link,
          .sh-ab-link::before,
          .sh-ab-link-icon {
            transition: none !important;
          }
        }
      `}</style>

      <div className="sh-ab-inner">
        <div className="sh-ab-content" aria-live="polite" aria-atomic="true">
         
          <span className="sh-ab-sparkle" aria-hidden="true">
            <Sparkles />
          </span>

          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={messageKey}
              className="sh-ab-message"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: offset,
                      filter: "blur(3px)",
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -offset,
                filter: "blur(2px)",
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: easing,
              }}
            >
              {currentMessage.text}
            </motion.span>
          </AnimatePresence>

          {hasLink && (
            <Link
              to={currentMessage.to}
              className="sh-ab-link"
              aria-label={currentMessage.linkLabel}
              title={currentMessage.linkLabel}
            >
              <span className="sh-ab-link-label">
                {currentMessage.linkLabel}
              </span>

              <ArrowRight
                className="sh-ab-link-icon"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;
