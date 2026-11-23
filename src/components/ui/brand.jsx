import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import smartedgeLogo from "@/assets/smartedge-logo.png";

export function Wordmark({ className }) {
  return (
    <span className={cn("smartedge-logo-wrap", className)}>
      <img
        src={smartedgeLogo}
        alt="SmartEdge Global Technologies"
        decoding="async"
        className="smartedge-logo"
      />
    </span>
  );
}

export const buttonStyles = cva(
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-300 ease-brand active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-cobalt hover:-translate-y-0.5 hover:brightness-110",
        signal: "bg-signal text-signal-foreground hover:-translate-y-0.5 hover:brightness-110",
        outline: "border border-current/25 text-foreground hover:border-primary hover:text-primary",
        ghostLight:
          "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export function ButtonLink({ to, children, variant, className, params }) {
  return (
    <Link to={to} params={params} className={cn(buttonStyles({ variant }), className)}>
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}

export function Reveal({ children, delay = 0, className, y = 28 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, lead, align = "left", className }) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <span className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</span>
      <h2 className="text-h2 mt-4 text-balance">{title}</h2>
      {lead && <p className="text-lead mt-5 text-muted-foreground">{lead}</p>}
    </Reveal>
  );
}

/** Sub-page hero, shared across inner pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imagePosition = "center",
  children,
  accent = false,
}) {
  return (
    <section className="page-hero-bright relative overflow-hidden">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-[1.4] saturate-[1.12] contrast-[1.06]"
          style={{ objectPosition: imagePosition }}
          width={1280}
          height={960}
          decoding="async"
          fetchPriority="high"
        />
      )}
      <div className="page-hero-bright-scrim absolute inset-0" aria-hidden="true" />
      <div className="container-x relative pb-20 pt-24 md:pb-28 md:pt-32">
        <Reveal className={cn("page-hero-bright-content", accent && "page-hero-bright-content--accent")}>
          <span className="eyebrow page-hero-bright-eyebrow">{eyebrow}</span>
          <h1 className="text-display page-hero-bright-title mt-5 max-w-4xl text-balance">
            {title}
          </h1>
          <p className="text-lead page-hero-bright-lead mt-6 max-w-2xl">{lead}</p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Have a solar requirement worth discussing?",
  body = "Tell us where you are and where you want to be. We'll come back with practical next steps.",
  showEyebrow = true,
}) {
  return (
    <section className="container-x py-16 md:py-24">
      <Reveal>
        <div className="surface-dark relative overflow-hidden rounded-3xl bg-night px-6 py-14 shadow-lift md:px-16 md:py-20">
          <div className="grid-lines absolute inset-0" />
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              {showEyebrow && <span className="eyebrow text-electric">Next step</span>}
              <h2 className="text-h2 mt-4 text-balance">{title}</h2>
              <p className="text-lead mt-4 text-muted-foreground">{body}</p>
            </div>
            <ButtonLink to="/contact" variant="signal">
              Book a consultation
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
