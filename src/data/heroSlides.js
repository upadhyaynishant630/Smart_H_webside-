import transformation from "@/assets/hero/hero-transformation.jpg";
import connected from "@/assets/hero/hero-connected.jpg";
import secure from "@/assets/hero/hero-secure.jpg";
import scale from "@/assets/hero/hero-scale.jpg";

export const heroSlides = [
  {
    id: "transformation",
    eyebrow: "Business transformation",
    title: "Turn ambitious plans into systems that work.",
    body: "We translate strategy into architecture, roadmaps and delivery — so technology moves the business forward instead of holding it back.",
    image: transformation,
    alt: "Sculpted blue glass monoliths lit from within on a dark plaza",
    focal: "70% center",
    primary: { label: "Book a consultation", to: "/contact" },
    secondary: { label: "How we work", to: "/about" },
  },
  {
    id: "connected",
    eyebrow: "Connected technology",
    title: "Every site, system and team — connected.",
    body: "Networks, integrations and platforms designed to share data reliably across locations, partners and the cloud.",
    image: connected,
    alt: "Night-time city seen from above with glowing network connections",
    focal: "65% center",
    primary: { label: "Explore services", to: "/services" },
    secondary: { label: "Industries", to: "/industries" },
  },
  {
    id: "secure",
    eyebrow: "Secure infrastructure",
    title: "Infrastructure you can trust under pressure.",
    body: "Resilient foundations with security, monitoring and recovery built in from the first design decision.",
    image: secure,
    alt: "Data center corridor lined with blue-lit server racks",
    focal: "center",
    primary: { label: "Security services", to: "/services" },
    secondary: { label: "Talk to an expert", to: "/contact" },
  },
  {
    id: "scale",
    eyebrow: "Scalable innovation",
    title: "Build once. Grow without rebuilding.",
    body: "Modular cloud, data and automation platforms that scale with demand — and adapt as your priorities change.",
    image: scale,
    alt: "Stacked translucent blue cubes rising like architecture",
    focal: "75% center",
    primary: { label: "Start a project", to: "/contact" },
    secondary: { label: "See capabilities", to: "/services" },
  },
];
