import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { galleryCategories, galleryItems } from "@/data/gallery";
import { PageHero } from "@/components/ui/brand";
import galleryHero from "@/assets/hero/solar-rooftop.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Our Solar Gallery | SmartEDGE" },
      {
        name: "description",
        content:
          "Explore representative solar products, installations and solar-industry imagery from SmartEDGE.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [category, setCategory] = useState("All");
  const visible = useMemo(
    () =>
      category === "All" ? galleryItems : galleryItems.filter((item) => item.category === category),
    [category],
  );
  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="Our Solar Gallery"
        lead="Explore solar products, installations and solar-industry activities through our collection of representative images."
        image={galleryHero}
        accent
      />
      <section className="section-y container-x" aria-labelledby="gallery-title">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="eyebrow">Solar imagery</span>
            <h2 id="gallery-title" className="text-h2 mt-4">
              Products, projects and support.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Gallery filters">
            {galleryCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${category === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((item) => (
            <figure
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1 [content-visibility:auto] [contain-intrinsic-size:300px]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  width="1280"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {item.category}
                </span>
                <p className="mt-1 font-semibold">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
