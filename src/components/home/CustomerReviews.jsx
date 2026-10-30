
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  MapPin,
  MessageSquareQuote,
  Pause,
  Play,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";

/* =========================================================
   SMARTEDGE — CUSTOMER REVIEW MARQUEE

   These are fictional demo reviews for UI preview only.
   Replace them with genuine customer-approved testimonials
   before publishing the website.
========================================================= */

const customerReviews = [
  {
    id: "demo-01",
    name: "Sample Customer 01",
    role: "Demo Homeowner",
    location: "Demo Location",
    service: "Residential Solar",
    rating: 5,
    text:
      "The solar planning experience was explained in a simple and structured way. Understanding roof suitability, energy requirements and system options made the process much easier.",
    initials: "SC",
    date: "Demo Review",
  },
  {
    id: "demo-02",
    name: "Sample Customer 02",
    role: "Demo Business Owner",
    location: "Demo Location",
    service: "Commercial Solar",
    rating: 5,
    text:
      "A clear approach to understanding commercial energy requirements. The different stages of planning, equipment selection and installation were presented in an easy-to-understand manner.",
    initials: "SC",
    date: "Demo Review",
  },
  {
    id: "demo-03",
    name: "Sample Customer 03",
    role: "Demo Property Owner",
    location: "Demo Location",
    service: "Solar Consultation",
    rating: 5,
    text:
      "The consultation helped demonstrate how property conditions, electricity usage and available rooftop space can influence the choice of a suitable solar solution.",
    initials: "SC",
    date: "Demo Review",
  },
  {
    id: "demo-04",
    name: "Sample Customer 04",
    role: "Demo Facility Manager",
    location: "Demo Location",
    service: "Industrial Solar",
    rating: 5,
    text:
      "A well-structured example of how solar requirements can be evaluated for larger properties, with attention to capacity planning, electrical safety and long-term system care.",
    initials: "SC",
    date: "Demo Review",
  },
  {
    id: "demo-05",
    name: "Sample Customer 05",
    role: "Demo Homeowner",
    location: "Demo Location",
    service: "Rooftop Solar",
    rating: 5,
    text:
      "The process highlights the importance of understanding roof conditions and daily electricity requirements before deciding on a rooftop solar installation.",
    initials: "SC",
    date: "Demo Review",
  },
  {
    id: "demo-06",
    name: "Sample Customer 06",
    role: "Demo Society Representative",
    location: "Demo Location",
    service: "Housing Society Solar",
    rating: 5,
    text:
      "A useful demonstration of how residential societies can consider common-area electricity needs, rooftop feasibility and suitable solar system configurations.",
    initials: "SC",
    date: "Demo Review",
  },
];

/* =========================================================
   STAR RATING
========================================================= */

function ReviewStars({ rating }) {
  return (
    <div
      className="smartedge-review-stars"
      aria-label={`Illustrative rating: ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={
            index < rating
              ? "smartedge-review-star active"
              : "smartedge-review-star"
          }
        />
      ))}

      <span className="smartedge-review-rating">
        {rating.toFixed(1)}
      </span>

      <span className="smartedge-review-rating-note">
        Sample
      </span>
    </div>
  );
}

/* =========================================================
   CUSTOMER AVATAR
========================================================= */

function CustomerAvatar({ initials }) {
  return (
    <div className="smartedge-review-avatar">
      <span>{initials || "SC"}</span>
    </div>
  );
}

/* =========================================================
   REVIEW CARD
========================================================= */

function ReviewCard({ review }) {
  return (
    <article className="smartedge-review-card">
      <div className="smartedge-review-card-glow" />

      {/* Card Top */}
      <div className="smartedge-review-card-header">
        <div className="smartedge-review-quote">
          <Quote aria-hidden="true" />
        </div>

        <span className="smartedge-review-demo-badge">
          SAMPLE REVIEW
        </span>
      </div>

      {/* Service */}
      <div className="smartedge-review-service-row">
        <span className="smartedge-review-service-dot" />
        {review.service}
      </div>

      {/* Rating */}
      <ReviewStars rating={review.rating} />

      {/* Feedback */}
      <p className="smartedge-review-text">
        "{review.text}"
      </p>

      {/* Divider */}
      <div className="smartedge-review-divider" />

      {/* Customer Information */}
      <div className="smartedge-review-customer">
        <CustomerAvatar initials={review.initials} />

        <div className="smartedge-review-customer-info">
          <div className="smartedge-review-name-row">
            <h3>{review.name}</h3>

            <BadgeCheck
              className="smartedge-review-verified"
              aria-label="Demo verification icon"
              title="Illustrative demo icon"
            />
          </div>

          <span className="smartedge-review-role">
            {review.role}
          </span>

          <span className="smartedge-review-location">
            <MapPin aria-hidden="true" />
            {review.location}
          </span>
        </div>

        <div className="smartedge-review-date">
          {review.date}
        </div>
      </div>

      {/* Demo Label */}
      <div className="smartedge-review-card-footer">
        <span>Illustrative content — not a real testimonial</span>

        <ArrowUpRight aria-hidden="true" />
      </div>
    </article>
  );
}

/* =========================================================
   MAIN CUSTOMER REVIEW COMPONENT
========================================================= */

export function CustomerReviews({
  reviews = customerReviews,
}) {
  const reduceMotion = useReducedMotion();

  const [isPaused, setIsPaused] = useState(false);

  const validReviews = Array.isArray(reviews)
    ? reviews.filter(
        (review) =>
          review &&
          typeof review.text === "string" &&
          review.text.trim().length > 0
      )
    : [];

  return (
    <section
      className="smartedge-reviews"
      aria-labelledby="smartedge-reviews-title"
    >
      <style>{`

        /* ==========================================
           MAIN SECTION
        ========================================== */

        .smartedge-reviews,
        .smartedge-reviews * {
          box-sizing: border-box;
        }

        .smartedge-reviews {
          --sr-navy: #071126;
          --sr-blue: #2f5bff;
          --sr-blue-dark: #193bce;
          --sr-muted: #68748c;
          --sr-gold: #f3ae35;

          position: relative;
          isolation: isolate;
          width: 100%;
          overflow: hidden;
          padding: clamp(65px, 8vw, 105px) 0;
          color: var(--sr-navy);

          background:
            radial-gradient(
              circle at 8% 15%,
              rgba(47, 91, 255, 0.10),
              transparent 32%
            ),
            radial-gradient(
              circle at 92% 85%,
              rgba(243, 174, 53, 0.11),
              transparent 30%
            ),
            linear-gradient(
              140deg,
              #f8faff 0%,
              #eff3ff 50%,
              #ffffff 100%
            );
        }

        /* Decorative circles */

        .smartedge-reviews::before {
          position: absolute;
          z-index: -1;
          top: -180px;
          left: -160px;
          width: 420px;
          height: 420px;
          border: 1px solid rgba(47, 91, 255, 0.09);
          border-radius: 50%;
          content: "";
          pointer-events: none;
        }

        .smartedge-reviews::after {
          position: absolute;
          z-index: -1;
          right: -180px;
          bottom: -210px;
          width: 480px;
          height: 480px;
          border: 1px solid rgba(47, 91, 255, 0.08);
          border-radius: 50%;
          content: "";
          pointer-events: none;
        }

        .smartedge-reviews-container {
          width: min(92%, 1220px);
          margin-inline: auto;
        }

        /* ==========================================
           SECTION HEADING
        ========================================== */

        .smartedge-reviews-heading {
          position: relative;
          margin: 0 auto clamp(36px, 4.5vw, 55px);
          text-align: center;
        }

        .smartedge-reviews-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-bottom: 19px;
          padding: 10px 16px;

          border: 1px solid rgba(47, 91, 255, 0.16);
          border-radius: 50px;

          background: rgba(255, 255, 255, 0.88);

          box-shadow:
            0 6px 22px rgba(35, 52, 105, 0.06);

          color: var(--sr-blue);
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .smartedge-reviews-kicker svg {
          width: 16px;
          height: 16px;
          color: var(--sr-gold);
        }

        .smartedge-reviews-title {
          max-width: 850px;
          margin: 0 auto;

          color: var(--sr-navy);

          font-size: clamp(35px, 5.2vw, 63px);
          font-weight: 850;
          line-height: 1.09;
          letter-spacing: -0.055em;
        }

        .smartedge-reviews-title span {
          display: inline-block;

          background: linear-gradient(
            100deg,
            #2852ee 5%,
            #6684ff 58%,
            #bd8627 100%
          );

          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .smartedge-reviews-description {
          max-width: 650px;
          margin: 18px auto 0;

          color: var(--sr-muted);

          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.85;
        }

        /* Visible transparency notice for demo reviews */

        .smartedge-reviews-notice {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 17px;
          padding: 8px 13px;

          border: 1px solid rgba(184, 127, 34, 0.22);
          border-radius: 50px;

          background: rgba(255, 248, 231, 0.85);
          color: #895d16;

          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.035em;
        }

        .smartedge-reviews-notice svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .smartedge-reviews-heading-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 22px;
        }

        .smartedge-reviews-heading-line span {
          width: 34px;
          height: 3px;
          border-radius: 20px;

          background: linear-gradient(
            90deg,
            var(--sr-blue),
            #829aff
          );
        }

        .smartedge-reviews-heading-line span:nth-child(2) {
          width: 10px;
          background: var(--sr-gold);
        }

        /* ==========================================
           MARQUEE
        ========================================== */

        .smartedge-review-marquee {
          width: 100%;
          overflow: hidden;
          padding: 15px 0 27px;

          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 4%,
            #000 96%,
            transparent 100%
          );

          mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 4%,
            #000 96%,
            transparent 100%
          );
        }

        .smartedge-review-track {
          display: flex;
          align-items: stretch;
          width: max-content;
          gap: 0;
        }

        .smartedge-review-group {
          display: flex;
          flex: 0 0 auto;
          align-items: stretch;
          gap: 21px;
          padding-right: 21px;
        }

        .smartedge-review-track.is-moving {
          animation: smartedge-review-scroll 48s linear infinite;
          will-change: transform;
        }

        .smartedge-review-track.is-paused {
          animation-play-state: paused;
        }

        .smartedge-review-marquee:hover .smartedge-review-track {
          animation-play-state: paused;
        }

        @keyframes smartedge-review-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* ==========================================
           REVIEW CARDS
        ========================================== */

        .smartedge-review-card {
          position: relative;

          display: flex;
          flex: 0 0 auto;
          flex-direction: column;

          width: clamp(300px, 30vw, 370px);
          min-height: 345px;

          padding: clamp(23px, 2.4vw, 31px);

          overflow: hidden;

          border: 1px solid rgba(94, 112, 162, 0.16);
          border-radius: 25px;

          background: rgba(255, 255, 255, 0.96);

          box-shadow:
            0 13px 38px rgba(29, 46, 99, 0.065),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);

          transition:
            transform 380ms cubic-bezier(.2,.8,.2,1),
            box-shadow 380ms ease,
            border-color 380ms ease;
        }

        .smartedge-review-card::before {
          position: absolute;
          top: 0;
          left: 0;

          width: 100%;
          height: 3px;

          background: linear-gradient(
            90deg,
            var(--sr-blue),
            #849cff,
            var(--sr-gold)
          );

          content: "";
        }

        .smartedge-review-card-glow {
          position: absolute;
          top: -115px;
          right: -100px;

          width: 230px;
          height: 230px;

          border-radius: 50%;
          background: rgba(47, 91, 255, 0.045);

          transition:
            transform 450ms ease,
            background 450ms ease;

          pointer-events: none;
        }

        .smartedge-review-card:hover {
          transform: translateY(-8px);

          border-color: rgba(47, 91, 255, 0.3);

          box-shadow:
            0 25px 55px rgba(29, 46, 99, 0.13);
        }

        .smartedge-review-card:hover .smartedge-review-card-glow {
          transform: scale(1.3);
          background: rgba(47, 91, 255, 0.09);
        }

        .smartedge-review-card-header {
          position: relative;
          z-index: 1;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;

          margin-bottom: 21px;
        }

        .smartedge-review-quote {
          display: grid;
          width: 49px;
          height: 49px;
          flex: 0 0 49px;
          place-items: center;

          border: 1px solid rgba(47, 91, 255, 0.12);
          border-radius: 16px;

          background: linear-gradient(
            145deg,
            rgba(47, 91, 255, 0.11),
            rgba(243, 174, 53, 0.13)
          );

          color: var(--sr-blue);
        }

        .smartedge-review-quote svg {
          width: 23px;
          height: 23px;
        }

        .smartedge-review-demo-badge {
          padding: 8px 12px;

          border: 1px solid rgba(193, 137, 34, 0.2);
          border-radius: 50px;

          background: #fff8e9;
          color: #90641b;

          font-size: 9px;
          font-weight: 850;
          letter-spacing: 0.09em;
          white-space: nowrap;
        }

        /* Service label */

        .smartedge-review-service-row {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 14px;

          color: var(--sr-blue);

          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.095em;
          text-transform: uppercase;
        }

        .smartedge-review-service-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;

          background: #35a989;
          box-shadow: 0 0 0 4px rgba(53, 169, 137, 0.10);
        }

        /* Star ratings */

        .smartedge-review-stars {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 17px;
        }

        .smartedge-review-star {
          width: 16px;
          height: 16px;
          color: #d4dbea;
          fill: none;
        }

        .smartedge-review-star.active {
          color: var(--sr-gold);
          fill: var(--sr-gold);
        }

        .smartedge-review-rating {
          margin-left: 5px;
          color: var(--sr-navy);
          font-size: 12px;
          font-weight: 850;
        }

        .smartedge-review-rating-note {
          padding: 3px 7px;
          border-radius: 20px;
          background: #f0f3fa;
          color: #77839b;
          font-size: 9px;
          font-weight: 700;
        }

        /* Review text */

        .smartedge-review-text {
          position: relative;
          z-index: 1;

          flex: 1;
          margin: 0 0 22px;

          color: #515f79;
          font-size: 14px;
          font-weight: 450;
          line-height: 1.9;
          overflow-wrap: anywhere;
        }

        .smartedge-review-divider {
          width: 100%;
          height: 1px;
          flex: 0 0 auto;

          margin-bottom: 19px;

          background: linear-gradient(
            90deg,
            rgba(47, 91, 255, 0.22),
            rgba(99, 112, 167, 0.08),
            transparent
          );
        }

        /* Customer information */

        .smartedge-review-customer {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .smartedge-review-avatar {
          display: grid;

          width: 49px;
          height: 49px;
          flex: 0 0 49px;

          place-items: center;

          border: 2px solid rgba(47, 91, 255, 0.15);
          border-radius: 50%;

          background: linear-gradient(
            145deg,
            #e8edff,
            #ccd8ff
          );

          color: var(--sr-blue);

          font-size: 13px;
          font-weight: 900;
        }

        .smartedge-review-customer-info {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
          gap: 4px;
        }

        .smartedge-review-name-row {
          display: flex;
          align-items: center;
          gap: 5px;
          min-width: 0;
        }

        .smartedge-review-name-row h3 {
          margin: 0;
          color: var(--sr-navy);

          font-size: 13px;
          font-weight: 850;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }

        .smartedge-review-verified {
          width: 15px;
          height: 15px;
          flex: 0 0 15px;
          color: #25866c;
        }

        .smartedge-review-role {
          color: var(--sr-muted);
          font-size: 10px;
          line-height: 1.4;
        }

        .smartedge-review-location {
          display: inline-flex;
          align-items: center;
          gap: 4px;

          color: #8994a9;
          font-size: 10px;
        }

        .smartedge-review-location svg {
          width: 12px;
          height: 12px;
          flex: 0 0 12px;
        }

        .smartedge-review-date {
          align-self: flex-end;
          flex: 0 0 auto;

          color: #8b96aa;
          font-size: 9px;
          text-align: right;
        }

        /* Card bottom */

        .smartedge-review-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 9px;

          margin-top: 17px;
          padding-top: 12px;

          border-top: 1px solid rgba(94, 112, 162, 0.09);

          color: #9a7180;
          font-size: 9px;
          line-height: 1.5;
        }

        .smartedge-review-card-footer svg {
          width: 15px;
          height: 15px;
          flex: 0 0 auto;
          color: var(--sr-blue);

          transition: transform 300ms ease;
        }

        .smartedge-review-card:hover
        .smartedge-review-card-footer svg {
          transform: translate(3px, -3px);
        }

        /* ==========================================
           MARQUEE CONTROLS
        ========================================== */

        .smartedge-review-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;

          width: min(92%, 1220px);
          margin: 17px auto 0;
        }

        .smartedge-review-controls-text {
          color: var(--sr-muted);
          font-size: 12px;
          line-height: 1.6;
        }

        .smartedge-review-pause {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          padding: 10px 16px;

          border: 1px solid rgba(47, 91, 255, 0.16);
          border-radius: 50px;

          background: #ffffff;
          color: var(--sr-blue);

          font-size: 11px;
          font-weight: 800;

          cursor: pointer;

          transition:
            background 250ms ease,
            color 250ms ease,
            transform 250ms ease,
            border-color 250ms ease;
        }

        .smartedge-review-pause:hover {
          transform: translateY(-2px);
          border-color: var(--sr-blue);
          background: var(--sr-blue);
          color: #ffffff;
        }

        .smartedge-review-pause:focus-visible {
          outline: 3px solid rgba(47, 91, 255, 0.3);
          outline-offset: 3px;
        }

        .smartedge-review-pause svg {
          width: 14px;
          height: 14px;
        }

        /* Empty state */

        .smartedge-review-empty {
          width: min(92%, 650px);
          margin: 0 auto;
          padding: 45px 25px;

          border: 1px dashed rgba(47, 91, 255, 0.25);
          border-radius: 24px;

          background: rgba(255, 255, 255, 0.85);
          text-align: center;
        }

        .smartedge-review-empty h3 {
          margin: 0 0 9px;
          color: var(--sr-navy);
          font-size: 21px;
        }

        .smartedge-review-empty p {
          margin: 0;
          color: var(--sr-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        /* ==========================================
           TABLET
        ========================================== */

        @media (max-width: 768px) {
          .smartedge-reviews {
            padding: 65px 0;
          }

          .smartedge-review-card {
            width: clamp(300px, 42vw, 350px);
            min-height: 355px;
          }

          .smartedge-review-track.is-moving {
            animation-duration: 43s;
          }
        }

        /* ==========================================
           MOBILE
        ========================================== */

        @media (max-width: 600px) {
          .smartedge-reviews {
            padding: 58px 0 62px;
          }

          .smartedge-reviews-title {
            font-size: clamp(32px, 9vw, 44px);
            line-height: 1.13;
          }

          .smartedge-reviews-description {
            max-width: 470px;
            margin-top: 14px;
            font-size: 13px;
            line-height: 1.8;
          }

          .smartedge-review-marquee {
            padding-top: 12px;
          }

          .smartedge-review-group {
            gap: 15px;
            padding-right: 15px;
          }

          .smartedge-review-card {
            width: min(84vw, 345px);
            min-height: 355px;
            padding: 23px;
            border-radius: 22px;
          }

          .smartedge-review-track.is-moving {
            animation-duration: 39s;
          }

          .smartedge-review-controls {
            flex-direction: column;
            justify-content: center;
            gap: 12px;
            text-align: center;
          }
        }

        @media (max-width: 380px) {
          .smartedge-reviews-container {
            width: calc(100% - 25px);
          }

          .smartedge-review-card {
            width: 82vw;
            padding: 20px;
          }

          .smartedge-review-date {
            display: none;
          }

          .smartedge-review-name-row h3 {
            font-size: 12px;
          }

          .smartedge-review-demo-badge {
            font-size: 8px;
            padding: 7px 9px;
          }
        }

        /* ==========================================
           REDUCED MOTION ACCESSIBILITY
        ========================================== */

        @media (prefers-reduced-motion: reduce) {
          .smartedge-review-track.is-moving {
            animation: none !important;
            transform: none !important;
            will-change: auto;
          }

          .smartedge-review-marquee {
            overflow-x: auto;
            -webkit-mask-image: none;
            mask-image: none;
            scrollbar-width: thin;
          }

          .smartedge-review-card,
          .smartedge-review-card *,
          .smartedge-review-pause {
            transition: none !important;
          }
        }

      `}</style>

      {/* ==========================================
          HEADING
      ========================================== */}

      <motion.div
        className="smartedge-reviews-heading smartedge-reviews-container"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 26 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="smartedge-reviews-kicker">
          <Sparkles aria-hidden="true" />
          Customer Experiences
        </div>

        <h2
          className="smartedge-reviews-title"
          id="smartedge-reviews-title"
        >
          Every Experience
          <br />
          <span>Deserves to Be Heard.</span>
        </h2>

        <p className="smartedge-reviews-description">
          Explore our customer review section preview,
          designed to highlight solar planning,
          installation experiences and customer feedback.
        </p>

        <div className="smartedge-reviews-notice">
          <MessageSquareQuote aria-hidden="true" />
          DEMO PREVIEW — SAMPLE CONTENT, NOT REAL TESTIMONIALS
        </div>

        <div
          className="smartedge-reviews-heading-line"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>
      </motion.div>

      {/* ==========================================
          INFINITE REVIEW MARQUEE
      ========================================== */}

      {validReviews.length > 0 ? (
        <>
          <div
            className="smartedge-review-marquee"
            role="region"
            aria-label="Sample customer review cards"
          >
            <div
              className={[
                "smartedge-review-track",
                !reduceMotion ? "is-moving" : "is-static",
                isPaused ? "is-paused" : "",
              ].join(" ")}
            >
              {/* Original cards */}

              <div className="smartedge-review-group">
                {validReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                  />
                ))}
              </div>

              {/* Duplicate cards create a seamless CSS marquee.
                  Hidden from assistive technology. */}

              {!reduceMotion && (
                <div
                  className="smartedge-review-group"
                  aria-hidden="true"
                >
                  {validReviews.map((review) => (
                    <ReviewCard
                      key={`duplicate-${review.id}`}
                      review={review}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Marquee controls */}

          <div className="smartedge-review-controls">
            <p className="smartedge-review-controls-text">
              Sample review cards for SmartEDGE website design.
            </p>

            {!reduceMotion && (
              <button
                type="button"
                className="smartedge-review-pause"
                onClick={() =>
                  setIsPaused((current) => !current)
                }
                aria-pressed={isPaused}
              >
                {isPaused ? (
                  <>
                    <Play aria-hidden="true" />
                    Resume Marquee
                  </>
                ) : (
                  <>
                    <Pause aria-hidden="true" />
                    Pause Marquee
                  </>
                )}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="smartedge-review-empty">
          <h3>Customer feedback will appear here.</h3>
          <p>
            Add approved customer reviews to display them
            in this section.
          </p>
        </div>
      )}
    </section>
  );
}

export default CustomerReviews;
