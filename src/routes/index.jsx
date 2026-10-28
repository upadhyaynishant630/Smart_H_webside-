import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ButtonLink, CtaBand, Reveal, SectionHeading } from "@/components/ui/brand";
import { CaseStudyCard, FAQAccordion, ServiceCard } from "@/components/ui/cards";
import { ThreeDIcon } from "@/components/ui/ThreeDIcon";
import { deliveryProcess, services } from "@/data/services";
import { caseStudies, faqs, industries, industryFeatureImage } from "@/data/content";
import studio from "@/assets/about/studio.jpg";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CustomerReviews } from "@/components/home/CustomerReviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartEDGE — Secure, connected enterprise technology" },
      {
        name: "description",
        content:
          "Cloud, cybersecurity, data & AI, automation and networks — planned, built and run by one accountable SmartEDGE team.",
      },
      { property: "og:title", content: "SmartEDGE — Secure, connected enterprise technology" },
      {
        property: "og:description",
        content:
          "Cloud, cybersecurity, data & AI, automation and networks from one accountable team.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    icon: "consult",
    title: "Strategy first",
    body: "Every engagement starts with goals, constraints and measurable success criteria.",
  },
  {
    icon: "shield",
    title: "Secure by design",
    body: "Security and resilience are part of the architecture, not an afterthought.",
  },
  {
    icon: "infrastructure",
    title: "Built to be owned",
    body: "Documentation, runbooks and handover so your team stays in control.",
  },
];

function Home() {
  return (
    <>
      <HeroCarousel />

      {/* Intro — asymmetric editorial */}
      <section className="section-y container-x">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <span className="eyebrow">Who we are</span>
            <h2 className="text-h2 mt-4 text-balance">
              A technology partner that connects <span className="text-primary">strategy</span>,{" "}
              <span className="text-primary">systems</span> and{" "}
              <span className="text-primary">people</span>.
            </h2>
            <p className="text-lead mt-6 text-muted-foreground">
              SmartEDGE brings infrastructure, security, data and automation expertise together so
              organisations can modernise with confidence — without juggling disconnected vendors.
            </p>
            <div className="mt-8">
              <ButtonLink to="/about" variant="outline">
                About SmartEDGE
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl shadow-lift">
              <img
                src={studio}
                alt="Calm modern workspace overlooking a city at dusk"
                loading="lazy"
                width={1280}
                height={960}
                className="aspect-5/4 w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-4 hidden max-w-65 rounded-2xl border border-border bg-card p-5 shadow-lift sm:block md:-left-10">
              <ThreeDIcon type="network" size={44} />
              <p className="mt-3 text-sm font-semibold">One team across six connected practices.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars on dark */}
      <section className="surface-dark relative overflow-hidden bg-night section-y">
        <div className="grid-lines absolute inset-0" />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Principles"
            title="How SmartEDGE approaches every engagement"
            lead="Three commitments shape the way we plan, build and hand over technology."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="group bg-card p-8 md:p-10">
                <ThreeDIcon type={p.icon} variant="night" size={60} />
                <h3 className="mt-7 text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-y container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Services" title="Six practices. One connected roadmap." />
          <Reveal>
            <ButtonLink to="/services" variant="outline">
              All services
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Industries — split with image */}
      <section className="bg-secondary section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">Industries</span>
            <h2 className="text-h2 mt-4">Designed for sectors where reliability matters.</h2>
            <div className="relative mt-8 overflow-hidden rounded-3xl">
              <img
                src={industryFeatureImage}
                alt="Robotic arms on a blue-lit manufacturing line"
                loading="lazy"
                width={1280}
                height={960}
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 2) * 0.06}>
                <Link
                  to="/industries"
                  hash={ind.slug}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-soft"
                >
                  <ThreeDIcon type={ind.icon} size={46} />
                  <span>
                    <span className="flex items-center gap-1 font-bold">
                      {ind.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{ind.body}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

       {/* BRAND LOGO...... */}
      <BrandMarquee />

      {/* Process — timeline */}
      <section className="section-y container-x">
        <SectionHeading
          eyebrow="Delivery method"
          title="From first conversation to continuous improvement"
          align="center"
        />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <li
            className="absolute left-0 right-0 top-6 hidden h-px bg-linear-to-r from-transparent via-primary/40 to-transparent md:block"
            aria-hidden="true"
          />
          {deliveryProcess.map((p, i) => (
            <li key={p.step} className="relative">
              <Reveal delay={i * 0.1}>
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground shadow-cobalt ring-8 ring-background">
                  {p.step}
                </span>
                <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Case studies */}
      <section className="surface-dark bg-night section-y">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Case studies"
              title="How engagements take shape"
              lead="Illustrative scenarios showing our approach. Verified client stories will be published with permission."
            />
            <Reveal>
              <ButtonLink to="/case-studies" variant="ghostLight">
                View all
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <CaseStudyCard study={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

       {/* Customer reviews  */}
      <CustomerReviews />

      {/* FAQ */}
      <section className="section-y container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="FAQ" title="Questions we often hear" />
        </div>
        <Reveal className="lg:col-span-8">
          <FAQAccordion items={faqs} />
        </Reveal>
      </section>

     

      <CtaBand />
    </>
  );
}