import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { ThreeDIcon } from "./ThreeDIcon";
import { cn } from "@/lib/utils";

export function ServiceCard({ service, index }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift"
    >
      <span className="absolute right-6 top-6 font-display text-sm font-semibold text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>
      <ThreeDIcon type={service.icon} size={64} />
      <h3 className="mt-7 text-xl font-bold">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Explore service{" "}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-cobalt-gradient transition-transform duration-500 group-hover:scale-x-100" />
    </Link>
  );
}

export function CaseStudyCard({ study }) {
  return (
    <Link
      to="/case-studies/$slug"
      params={{ slug: study.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={study.image}
          alt=""
          loading="lazy"
          width={1280}
          height={960}
          className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
        />
        {study.isSample && (
          <span className="absolute left-4 top-4 rounded-full bg-midnight/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur">
            Illustrative sample
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {study.category}
        </span>
        <h3 className="mt-3 text-lg font-bold leading-snug">{study.title}</h3>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{study.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Read scenario <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold"
              >
                {item.q}
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border transition-all duration-300",
                    isOpen && "rotate-45 border-signal bg-signal text-signal-foreground",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              inert={!isOpen}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-brand",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 text-muted-foreground">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
