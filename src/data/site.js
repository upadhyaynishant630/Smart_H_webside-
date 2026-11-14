/**
 * Central brand configuration. Edit names, contact details and CTA labels here.
 * Environment variables can override the published contact details below.
 * See .env.example for deployment-specific overrides.
 */
export const siteConfig = {
  name: "SmartEDGE",
  tagline: "Enterprise technology, engineered with intent.",
  description:
    "SmartEDGE helps organisations plan, build and run secure, connected technology — from cloud and infrastructure to data, AI and automation.",
  ctaLabel: "Let's Talk",
  ctaTo: "/contact",
  contactEmail: import.meta.env["VITE_CONTACT_EMAIL"] || "info@domain.com",
  contactPhone: import.meta.env["VITE_CONTACT_PHONE"] || "9152622242",
  whatsappPhone: "919152622242",
  address:
    "Premises No. 8 & 9, 4th Floor, Sharee Kamdhenu Estate, Near Vibgyor School, Off Link Road, Chincholi Bunder, Malad West, Mumbai 400064",
  contactEndpoint: import.meta.env["VITE_CONTACT_ENDPOINT"] ?? "",
  social: [],
};

export const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Contact", to: "/contact" },
];

/** Rotating announcement bar: messages, timing and look in one place. */
export const announcementConfig = {
  intervalMs: 4500,
  showStatusDot: true,
  /** "rise" (vertical slide) or "fade" */
  animation: "rise",
  messages: [
    {
      id: "practices",
      text: "Six technology practices, one accountable delivery team.",
      linkLabel: "Explore services",
      to: "/services",
    },
    {
      id: "consult",
      text: "Planning a modernisation roadmap? Start with a focused consultation.",
      linkLabel: "Book a call",
      to: "/contact",
    },
    {
      id: "security",
      text: "Security is designed in from day one — not bolted on at the end.",
      linkLabel: "Our approach",
      to: "/about",
    },
  ],
};
