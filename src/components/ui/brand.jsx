import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Text wordmark (no official logo supplied). */
export function Wordmark({ className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight",
        className,
      )}
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-cobalt-gradient text-primary-foreground shadow-cobalt">
        <span className="text-base leading-none">H</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-signal" />
      </span>
      <span>
        Smart<span className="text-primary"> H</span>
      </span>
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
export function PageHero({ eyebrow, title, lead, image, children }) {
  return (
    <section className="surface-dark relative overflow-hidden bg-night">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          width={1280}
          height={960}
        />
      )}
      <div className="absolute inset-0 bg-scrim" />
      <div className="grid-lines absolute inset-0" />
      <div className="container-x relative pb-20 pt-24 md:pb-28 md:pt-32">
        <Reveal>
          <span className="eyebrow text-electric">{eyebrow}</span>
          <h1 className="text-display mt-5 max-w-4xl text-balance">{title}</h1>
          <p className="text-lead mt-6 max-w-2xl text-muted-foreground">{lead}</p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Have a technology challenge worth solving?",
  body = "Tell us where you are and where you want to be. We'll come back with practical next steps.",
}) {
  return (
    <section className="container-x py-16 md:py-24">
      <Reveal>
        <div className="surface-dark relative overflow-hidden rounded-3xl bg-night px-6 py-14 shadow-lift md:px-16 md:py-20">
          <div className="grid-lines absolute inset-0" />
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow text-electric">Next step</span>
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
