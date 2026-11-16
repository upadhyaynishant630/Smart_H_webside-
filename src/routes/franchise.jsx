import { createFileRoute, Link } from "@tanstack/react-router";
import { franchiseSteps } from "@/data/franchise";
import { PageHero, CtaBand } from "@/components/ui/brand";
import franchiseHero from "@/assets/hero/solar-commercial.jpg";

export const Route = createFileRoute("/franchise")({
  head: () => ({ meta: [
    { title: "Franchise Opportunities | SmartEDGE Solar" },
    { name: "description", content: "Explore franchise enquiry steps and business opportunities with SmartEDGE in the solar industry." },
  ] }),
  component: Franchise,
});

function Franchise() {
  return (
    <main>
      <PageHero eyebrow="Franchise Opportunities" title="Build Your Business in the Solar Industry." lead="Explore business opportunities with SmartEDGE and become part of our solar business network. Connect with our team to understand the franchise model, business requirements and next steps." image={franchiseHero}>
        <Link to="/contact" className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Start a franchise enquiry</Link>
      </PageHero>
      <section className="section-y" aria-labelledby="franchise-journey-title">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">The journey</span>
          <h2 id="franchise-journey-title" className="text-h2 mt-4">A clear path to explore the opportunity.</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
          {franchiseSteps.map((step) => (
            <article key={step.number} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <img src={step.image} alt={step.title} width="1280" height="800" loading="lazy" className="h-52 w-full object-cover" />
              <div className="p-6"><span className="text-sm font-bold text-primary">{step.number}</span><h3 className="mt-2 text-xl font-bold">{step.title}</h3><p className="mt-2 text-muted-foreground">{step.description}</p></div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Ready to explore a partnership?" body="Share your interest and our team will review the information you provide." />
    </main>
  );
}
