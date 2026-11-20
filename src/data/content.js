import residentialImg from "@/assets/hero/solar-residential.jpg";
import commercialImg from "@/assets/hero/solar-commercials.jpg";
import industriesImg from "@/assets/hero/industries.png";

export const industries = [
  {
    slug: "residential-solar",
    title: "B2C — Residential Solar",
    icon: "solar-panel",
    body: "Solar product and installation support for homeowners and individual customers exploring a suitable residential system.",
    focus: ["Home solar products", "Installation enquiries", "Maintenance support"],
    image: residentialImg,
  },
  {
    slug: "commercial-solar",
    title: "B2B — Commercial Solar",
    icon: "solar-structure",
    body: "Solar products and project services for businesses, commercial buyers, EPC companies and other professional customers.",
    focus: ["Commercial product supply", "Project coordination", "AMC and service support"],
    image: commercialImg,
  },
];

export const industryFeatureImage = industriesImg;

export const industryImages = {
  residential: residentialImg,
  commercial: commercialImg,
};

export const caseStudies = [];
