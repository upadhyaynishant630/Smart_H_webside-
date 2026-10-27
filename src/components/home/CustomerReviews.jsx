
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, Sparkles, ArrowUpRight } from "lucide-react";

const reviews = [
  {
    name: "Rohit Mehta",
    role: "Founder, Mehta Traders",
    text: "Process bahut smooth tha. Team ne har step pe help ki aur kaam time se pehle ho gaya.",
  },
  {
    name: "Priya Shah",
    role: "Director, Shah Exports",
    text: "Professional service aur transparent communication. Highly recommended for any growing business.",
  },
  {
    name: "Amit Patel",
    role: "Owner, Patel Distributors",
    text: "Quick response, clear terms and zero hidden surprises. Experience shandaar raha.",
  },
  {
    name: "Neha Joshi",
    role: "CEO, Joshi Retail",
    text: "Humari expectations se zyada deliver kiya. Support team hamesha available rehti hai.",
  },
  {
    name: "Karan Desai",
    role: "Partner, Desai & Co.",
    text: "Reliable, fast and trustworthy. Ab hum long-term partner ke roop me kaam karte hain.",
  },
  {
    name: "Sneha Iyer",
    role: "Founder, Iyer Foods",
    text: "Design se lekar delivery tak sab kuch top-notch. Definitely will work again.",
  },
];

const revealTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

function ReviewCard({ review, decorative = false }) {
  return (
    <figure
      className="sh-rev-card"
      aria-hidden={decorative || undefined}
    >
      <div className="sh-rev-card-top">
        <div
          className="sh-rev-rating"
          role="img"
          aria-label="5 out of 5 stars"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className="sh-rev-star"
              fill="currentColor"
              aria-hidden="true"
            />
          ))}
        </div>

        <span className="sh-rev-quote-icon" aria-hidden="true">
          <Quote />
        </span>
      </div>

      <blockquote className="sh-rev-quote">
        “{review.text}”
      </blockquote>

      <div className="sh-rev-card-divider" />

      <figcaption className="sh-rev-author">
        <span className="sh-rev-avatar" aria-hidden="true">
          {review.name.charAt(0).toUpperCase()}
        </span>

        <span className="sh-rev-author-info">
          <span className="sh-rev-author-name">
            {review.name}
          </span>

          <span className="sh-rev-author-role">
            {review.role}
          </span>
        </span>

        <span
          className="sh-rev-author-arrow"
          aria-hidden="true"
        >
          <ArrowUpRight />
        </span>
      </figcaption>
    </figure>
  );
}

function ReviewRow({ items, direction }) {
  const animationClass =
    direction === "left"
      ? "sh-rev-track--left"
      : "sh-rev-track--right";

  return (
    <div
      className="sh-rev-marquee"
      role="group"
      aria-label={`Customer testimonials, moving ${direction}`}
    >
      <div className={`sh-rev-track ${animationClass}`}>
        {items.map((review, index) => (
          <ReviewCard
            key={`${direction}-${review.name}-${index}`}
            review={review}
          />
        ))}

        {/* Duplicate cards create a seamless marquee loop.
            They are hidden from screen readers. */}
        {items.map((review, index) => (
          <ReviewCard
            key={`${direction}-duplicate-${review.name}-${index}`}
            review={review}
            decorative
          />
        ))}
      </div>
    </div>
  );
}

export function CustomerReviews() {
  const reduceMotion = useReducedMotion();
  const reverseReviews = [...reviews].reverse();

  return (
    <section
      className="sh-rev-section"
      aria-labelledby="sh-rev-heading"
    >
      <style>{`
        .sh-rev-section {
          --sh-rev-ink: #111a35;
          --sh-rev-muted: #65708a;
          --sh-rev-blue: #4547f5;
          --sh-rev-purple: #815cf7;
          --sh-rev-cyan: #3acbe5;
          --sh-rev-gold: #ffb547;

          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          padding: clamp(64px, 8vw, 108px) 0;
          color: var(--sh-rev-ink);
          background:
            radial-gradient(
              ellipse at 4% 12%,
              rgba(69, 71, 245, 0.09),
              transparent 34%
            ),
            radial-gradient(
              ellipse at 96% 83%,
              rgba(58, 203, 229, 0.12),
              transparent 32%
            ),
            linear-gradient(145deg, #fbfcff 0%, #f5f7ff 54%, #ffffff 100%);
        }

        .sh-rev-section *,
        .sh-rev-section *::before,
        .sh-rev-section *::after {
          box-sizing: border-box;
        }

        .sh-rev-section::before {
          position: absolute;
          z-index: -1;
          top: 18%;
          left: -145px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(90, 100, 255, 0.08);
          filter: blur(75px);
          content: "";
          pointer-events: none;
        }

        .sh-rev-section::after {
          position: absolute;
          z-index: -1;
          right: -145px;
          bottom: 8%;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: rgba(58, 203, 229, 0.12);
          filter: blur(80px);
          content: "";
          pointer-events: none;
        }

        .sh-rev-heading {
          position: relative;
          width: min(92%, 1120px);
          margin: 0 auto clamp(32px, 4.5vw, 50px);
          text-align: center;
        }

        .sh-rev-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-bottom: 20px;
          padding: 9px 15px;
          border: 1px solid rgba(69, 71, 245, 0.15);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.78);
          box-shadow: 0 5px 22px rgba(40, 52, 110, 0.055);
          color: var(--sh-rev-blue);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
        }

        .sh-rev-kicker-icon {
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
          animation: sh-rev-sparkle 3s ease-in-out infinite;
        }

        .sh-rev-kicker-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--sh-rev-cyan);
          box-shadow: 0 0 0 4px rgba(58, 203, 229, 0.13);
        }

        .sh-rev-title {
          max-width: 900px;
          margin: 0 auto;
          color: var(--sh-rev-ink);
          font-size: clamp(34px, 5.2vw, 64px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.065em;
          overflow-wrap: anywhere;
        }

        .sh-rev-title-highlight {
          display: inline-block;
          padding-bottom: 4px;
          background: linear-gradient(
            100deg,
            var(--sh-rev-blue) 8%,
            var(--sh-rev-purple) 55%,
            #209fcf 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: var(--sh-rev-blue);
        }

        .sh-rev-description {
          max-width: 550px;
          margin: 20px auto 0;
          color: var(--sh-rev-muted);
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.85;
        }

        .sh-rev-heading-accent {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 22px;
        }

        .sh-rev-heading-accent span {
          display: block;
          width: 34px;
          height: 3px;
          border-radius: 99px;
          background: linear-gradient(
            90deg,
            var(--sh-rev-blue),
            var(--sh-rev-cyan)
          );
        }

        .sh-rev-heading-accent span:nth-child(2) {
          width: 10px;
          background: var(--sh-rev-gold);
        }

        .sh-rev-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .sh-rev-marquee {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          padding: 15px 0 21px;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 5%,
            #000 95%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 5%,
            #000 95%,
            transparent 100%
          );
        }

        .sh-rev-track {
          display: flex;
          align-items: stretch;
          gap: 18px;
          width: max-content;
          max-width: none;
        }

        .sh-rev-track--left {
          animation: sh-rev-scroll-left 48s linear infinite;
          will-change: transform;
        }

        .sh-rev-track--right {
          animation: sh-rev-scroll-right 53s linear infinite;
          will-change: transform;
        }

        .sh-rev-marquee:hover .sh-rev-track,
        .sh-rev-marquee:focus-within .sh-rev-track {
          animation-play-state: paused;
        }

        .sh-rev-card {
          position: relative;
          display: flex;
          flex: 0 0 auto;
          flex-direction: column;
          width: clamp(290px, 29vw, 365px);
          min-height: 265px;
          margin: 0;
          padding: clamp(22px, 2.4vw, 30px);
          overflow: hidden;
          border: 1px solid rgba(99, 112, 167, 0.16);
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.84);
          box-shadow:
            0 12px 34px rgba(38, 49, 101, 0.055),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition:
            transform 350ms ease,
            border-color 350ms ease,
            box-shadow 350ms ease,
            background 350ms ease;
        }

        .sh-rev-card::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--sh-rev-blue),
            var(--sh-rev-purple),
            var(--sh-rev-cyan)
          );
          opacity: 0;
          transform: scaleX(0.35);
          transform-origin: left;
          transition:
            opacity 350ms ease,
            transform 350ms ease;
          content: "";
        }

        .sh-rev-card:hover {
          transform: translateY(-7px);
          border-color: rgba(69, 71, 245, 0.3);
          background: rgba(255, 255, 255, 0.98);
          box-shadow:
            0 24px 55px rgba(38, 49, 101, 0.12),
            0 4px 14px rgba(69, 71, 245, 0.055);
        }

        .sh-rev-card:hover::before {
          opacity: 1;
          transform: scaleX(1);
        }

        .sh-rev-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .sh-rev-rating {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--sh-rev-gold);
        }

        .sh-rev-star {
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
          filter: drop-shadow(0 2px 3px rgba(255, 181, 71, 0.16));
        }

        .sh-rev-quote-icon {
          display: grid;
          width: 39px;
          height: 39px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(69, 71, 245, 0.1);
          border-radius: 13px;
          background: linear-gradient(
            145deg,
            rgba(69, 71, 245, 0.09),
            rgba(58, 203, 229, 0.12)
          );
          color: var(--sh-rev-blue);
          transition:
            transform 350ms ease,
            background 350ms ease;
        }

        .sh-rev-quote-icon svg {
          width: 19px;
          height: 19px;
        }

        .sh-rev-card:hover .sh-rev-quote-icon {
          transform: rotate(-8deg) scale(1.07);
          background: rgba(69, 71, 245, 0.12);
        }

        .sh-rev-quote {
          flex: 1 0 auto;
          margin: 22px 0 23px;
          color: #3b4561;
          font-size: clamp(14px, 1.2vw, 15px);
          font-weight: 450;
          line-height: 1.85;
          overflow-wrap: anywhere;
        }

        .sh-rev-card-divider {
          width: 100%;
          height: 1px;
          flex: 0 0 auto;
          margin-bottom: 20px;
          background: linear-gradient(
            90deg,
            rgba(69, 71, 245, 0.15),
            rgba(99, 112, 167, 0.07),
            transparent
          );
        }

        .sh-rev-author {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .sh-rev-avatar {
          display: grid;
          width: 45px;
          height: 45px;
          flex: 0 0 auto;
          place-items: center;
          border: 2px solid rgba(255, 255, 255, 0.9);
          border-radius: 15px;
          background: linear-gradient(
            140deg,
            var(--sh-rev-blue),
            var(--sh-rev-purple) 60%,
            #389bd6
          );
          box-shadow: 0 5px 14px rgba(69, 71, 245, 0.2);
          color: white;
          font-size: 19px;
          font-weight: 750;
        }

        .sh-rev-author-info {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          min-width: 0;
          gap: 5px;
        }

        .sh-rev-author-name {
          color: var(--sh-rev-ink);
          font-size: 14px;
          font-weight: 750;
          line-height: 1.3;
          overflow-wrap: anywhere;
        }

        .sh-rev-author-role {
          color: var(--sh-rev-muted);
          font-size: 11px;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .sh-rev-author-arrow {
          display: grid;
          width: 31px;
          height: 31px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(99, 112, 167, 0.12);
          border-radius: 50%;
          color: #78829a;
          transition:
            color 300ms ease,
            background 300ms ease,
            transform 300ms ease;
        }

        .sh-rev-author-arrow svg {
          width: 15px;
          height: 15px;
        }

        .sh-rev-card:hover .sh-rev-author-arrow {
          transform: translate(2px, -2px);
          border-color: transparent;
          background: var(--sh-rev-blue);
          color: white;
        }

        .sh-rev-static-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          width: min(92%, 1180px);
          margin: 0 auto;
        }

        .sh-rev-static-grid .sh-rev-card {
          width: 100%;
          min-width: 0;
          height: 100%;
        }

        @keyframes sh-rev-scroll-left {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes sh-rev-scroll-right {
          from {
            transform: translate3d(-50%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes sh-rev-sparkle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(14deg) scale(1.13);
          }
        }

        @media (min-width: 1600px) {
          .sh-rev-card {
            width: 370px;
          }
        }

        @media (max-width: 1000px) {
          .sh-rev-static-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .sh-rev-card {
            width: clamp(290px, 38vw, 345px);
          }

          .sh-rev-static-grid .sh-rev-card {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .sh-rev-section {
            padding: 58px 0 62px;
          }

          .sh-rev-heading {
            width: calc(100% - 36px);
            margin-bottom: 28px;
          }

          .sh-rev-kicker {
            margin-bottom: 17px;
            padding: 8px 12px;
            font-size: 10px;
            letter-spacing: 0.14em;
          }

          .sh-rev-title {
            font-size: clamp(32px, 9vw, 44px);
            line-height: 1.12;
            letter-spacing: -0.055em;
          }

          .sh-rev-description {
            max-width: 390px;
            margin-top: 15px;
            font-size: 14px;
            line-height: 1.75;
          }

          .sh-rev-heading-accent {
            margin-top: 18px;
          }

          .sh-rev-rows {
            gap: 7px;
          }

          .sh-rev-marquee {
            padding: 12px 0 17px;
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              #000 3%,
              #000 97%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              #000 3%,
              #000 97%,
              transparent 100%
            );
          }

          .sh-rev-track {
            gap: 14px;
          }

          .sh-rev-card {
            width: min(84vw, 340px);
            min-height: 250px;
            padding: 22px;
            border-radius: 22px;
          }

          .sh-rev-quote {
            margin: 18px 0 20px;
            font-size: 14px;
            line-height: 1.8;
          }

          .sh-rev-avatar {
            width: 41px;
            height: 41px;
            border-radius: 13px;
          }

          .sh-rev-static-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 15px;
            width: calc(100% - 32px);
          }

          .sh-rev-static-grid .sh-rev-card {
            min-height: 0;
            padding: 23px;
          }
        }

        @media (max-width: 360px) {
          .sh-rev-heading {
            width: calc(100% - 28px);
          }

          .sh-rev-title {
            font-size: 30px;
          }

          .sh-rev-card {
            width: 280px;
            padding: 19px;
          }

          .sh-rev-static-grid {
            width: calc(100% - 28px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sh-rev-section *,
          .sh-rev-section *::before,
          .sh-rev-section *::after {
            scroll-behavior: auto !important;
          }

          .sh-rev-track,
          .sh-rev-kicker-icon {
            animation: none !important;
            transform: none !important;
            will-change: auto !important;
          }

          .sh-rev-card,
          .sh-rev-card::before,
          .sh-rev-quote-icon,
          .sh-rev-author-arrow {
            transition: none !important;
          }
        }
      `}</style>

      {/* Animated section heading */}
      <motion.div
        className="sh-rev-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={revealTransition}
      >
        <div className="sh-rev-kicker">
          <Sparkles
            className="sh-rev-kicker-icon"
            aria-hidden="true"
          />
          <span>Testimonials</span>
          <span className="sh-rev-kicker-dot" />
        </div>

        <h2 className="sh-rev-title" id="sh-rev-heading">
          What our{" "}
          <span className="sh-rev-title-highlight">
            customers say
          </span>
        </h2>

        <p className="sh-rev-description">
          Real feedback from businesses who trust us every day.
          We believe great service starts with great relationships.
        </p>

        <div className="sh-rev-heading-accent" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </motion.div>

      {/* Reduced-motion users get a responsive, non-moving grid. */}
      {reduceMotion ? (
        <div className="sh-rev-static-grid">
          {reviews.map((review) => (
            <ReviewCard
              key={review.name}
              review={review}
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="sh-rev-rows"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            ...revealTransition,
            delay: 0.12,
          }}
        >
          <ReviewRow
            items={reviews}
            direction="left"
          />

          <ReviewRow
            items={reverseReviews}
            direction="right"
          />
        </motion.div>
      )}
    </section>
  );
}

export default CustomerReviews;
