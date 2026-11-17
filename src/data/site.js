/**
 * Central brand configuration. Edit names, contact details and CTA labels here.
 * Environment variables can override the published contact details below.
 * See .env.example for deployment-specific overrides.
 */
export const siteConfig = {
  name: "SmartEDGE",
  tagline: "Solar products and services, delivered with care.",
  description:
  "Explore professional solar site surveys, solar product kits, components, installation, AMC and partnership opportunities with SmartEDGE.",
  ctaLabel: "Become a partner",
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
  { label: "Industries", to: "/industries" },
  { label: "Our Services", to: "/services" },
  { label: "Franchise", to: "/franchise" },
  { label: "Gallery", to: "/gallery" },
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
      text: "Solar products, installation and maintenance support for homes and businesses.",
      linkLabel: "Explore services",
      to: "/services",
    },
    {
      id: "consult",
      text: "Looking for a solar product or project partner?",
      linkLabel: "Become a partner",
      to: "/contact",
    },
    {
      id: "security",
      text: "Residential and commercial solar enquiries welcome.",
      linkLabel: "Contact us",
      to: "/contact",
    },
  ],
};
