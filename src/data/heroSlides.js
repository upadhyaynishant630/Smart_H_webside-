import residential from "@/assets/hero/solar-residential.jpg";
import commercial from "@/assets/hero/solar-commercial.jpg";
import siteAssessment from "@/assets/hero/solar-site-assessment.jpg";
import longTerm from "@/assets/hero/solar-long-term.jpg";

export const heroSlides = [
  {
    id: "residential-rooftop-solar",
    eyebrow: "RESIDENTIAL ROOFTOP SOLAR",
    title: "Make your rooftop work smarter with solar.",
    body: "Explore a rooftop solar solution planned around your roof, shade, electricity use and long-term energy needs.",
    image: residential,
    alt: "Residential home with photovoltaic solar panels",
    focal: "center 48%",
    primary: {
      label: "Request a Solar Assessment",
      to: "/contact",
    },
    secondary: {
      label: "Explore Solar Solutions",
      to: "/#solar-solutions",
    },
  },
  {
    id: "commercial-rooftop-solar",
    eyebrow: "SOLAR FOR BUSINESSES",
    title: "Turn available roof space into an energy asset.",
    body: "Plan a commercial rooftop solar project around site conditions, daytime demand, electrical infrastructure and maintenance access.",
    image: commercial,
    alt: "Commercial warehouse rooftop covered with photovoltaic solar panels",
    focal: "center 52%",
    primary: {
      label: "Discuss a Commercial Site",
      to: "/contact",
    },
    secondary: {
      label: "View Solar Solutions",
      to: "/#solar-solutions",
    },
  },
  {
    id: "site-specific-solar-planning",
    eyebrow: "SITE ASSESSMENT & SYSTEM DESIGN",
    title: "The right solar plan starts with the right questions.",
    body: "Roof condition, shading, electricity consumption, electrical capacity and local utility rules all matter. Begin with a site assessment before choosing a system.",
    image: siteAssessment,
    alt: "Solar assessor inspecting rooftop photovoltaic panels",
    focal: "center 48%",
    primary: {
      label: "Plan My Solar Project",
      to: "/contact",
    },
    secondary: {
      label: "How Solar Planning Works",
      to: "/#solar-process",
    },
  },
  {
    id: "solar-performance-and-care",
    eyebrow: "LONG-TERM SOLAR CARE",
    title: "Plan for dependable performance beyond installation.",
    body: "Understand monitoring, electrical safety, inspections and maintenance so your solar project has a practical long-term plan.",
    image: longTerm,
    alt: "Solar technician reviewing a rooftop photovoltaic installation",
    focal: "center 50%",
    primary: {
      label: "Talk to Our Solar Team",
      to: "/contact",
    },
    secondary: {
      label: "Explore Our Process",
      to: "/#solar-process",
    },
  },
];

export default heroSlides;
