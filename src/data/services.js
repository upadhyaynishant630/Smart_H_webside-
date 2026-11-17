
import siteSurveyImg from "@/assets/hero/solar-site-assessment.jpg";
import solarProductsKitImg from "@/assets/services/solar-energy.png";
import solarComponentsImg from "@/assets/hero/solar-rooftop.jpg";
import solarInstallationImg from "@/assets/hero/solar-residential.jpg";
import solarAmcImg from "@/assets/hero/solar-long-term.jpg";

export const services = [
  // 01. SITE SURVEY
  {
    slug: "site-survey",
    title: "Site Survey",
    icon: "consult",
    summary:
      "Professional solar site assessment to understand roof suitability, shading, available space and project requirements.",
    image: siteSurveyImg,

    overview:
      "A successful solar project begins with a proper site survey. We review the available roof area, orientation, shading, roof condition, site access and electrical readiness to help establish a practical starting point for your solar project.",

    challenges: [
      "Understanding usable rooftop area and shading",
      "Checking roof condition and site accessibility",
      "Identifying electrical and installation requirements",
    ],

    capabilities: [
      "Rooftop and site assessment coordination",
      "Roof orientation and shading review",
      "Site access and condition observations",
      "Preliminary project requirement documentation",
    ],

    outcomes: [
      "A clearer understanding of site suitability",
      "Documented site observations and constraints",
      "Better information for solar system planning",
    ],
  },

  // 02. SOLAR PRODUCTS KIT
  {
    slug: "solar-products-kit",
    title: "Solar Products Kit",
     icon: "solar-products-kit",
    summary:
      "Coordinated solar product kits and accessories selected around your system requirements and installation needs.",
    image: solarProductsKitImg,

    overview:
      "Get a coordinated selection of solar products and supporting accessories based on the proposed system capacity, site requirements and installation scope. Product specifications, quantities, compatibility and availability should be confirmed before the final quotation.",

    challenges: [
      "Selecting compatible products for the solar system",
      "Identifying the right supporting accessories",
      "Coordinating product requirements across the project",
    ],

    capabilities: [
      "Solar module and inverter requirement coordination",
      "Mounting and balance-of-system accessories",
      "Electrical protection and connection accessories",
      "Product list and supply coordination",
    ],

    outcomes: [
      "A clearer solar product requirement list",
      "Better coordination of compatible products",
      "A defined product and accessory supply scope",
    ],
  },

  // 03. SOLAR COMPONENTS
  {
    slug: "solar-components",
    title: "Solar Components",
   icon: "solar-components",
    summary:
      "Essential electrical, connection and installation components used in solar systems.",
    image: solarComponentsImg,

    overview:
      "Solar systems depend on the right supporting components and connection materials. We help organise component enquiries around the overall system and installation needs.",

    challenges: [
      "Identifying the supporting components required",
      "Coordinating products across a project",
      "Avoiding gaps during installation",
    ],

    capabilities: [
      "Component requirement discussions",
      "Electrical and connection accessories",
      "Supply coordination",
      "Project checklist support",
    ],

    outcomes: [
      "A more complete project checklist",
      "Fewer avoidable supply gaps",
      "Clearer coordination with installation teams",
    ],
  },

  // 04. SOLAR INSTALLATION SERVICE
  {
    slug: "solar-installation",
    title: "Solar Installation Service",
    icon: "solar-installation",
    summary:
      "Solar installation and commissioning services for residential and commercial requirements.",
    image: solarInstallationImg,

    overview:
      "We support residential and commercial solar installation enquiries from initial coordination through installation and commissioning discussions, based on the confirmed project scope.",

    challenges: [
      "Coordinating site access and installation activities",
      "Keeping product, structure and electrical work aligned",
      "Planning commissioning and handover",
    ],

    capabilities: [
      "Residential installation coordination",
      "Commercial project coordination",
      "Installation planning",
      "Commissioning and handover support",
    ],

    outcomes: [
      "A coordinated installation scope",
      "Clear project milestones",
      "A documented handover plan",
    ],
  },

  // 05. AMC & MAINTENANCE SERVICE
  {
    slug: "solar-amc",
    title: "AMC & Maintenance Service",
    icon: "solar-maintenance",
    summary:
      "Annual maintenance and ongoing inspection support for solar installations.",
    image: solarAmcImg,

    overview:
      "Regular inspection and maintenance help solar installations remain easier to monitor and manage. We discuss an appropriate support scope for the site and system.",

    challenges: [
      "Keeping inspection responsibilities clear",
      "Planning routine service access",
      "Responding to maintenance observations",
    ],

    capabilities: [
      "Maintenance requirement discussions",
      "Inspection planning",
      "Service coordination",
      "Ongoing support scope",
    ],

    outcomes: [
      "A clearer maintenance plan",
      "Defined service responsibilities",
      "A practical route to ongoing support",
    ],
  },
];

export const deliveryProcess = [
  {
    number: "01",
    title: "Understand",
    description:
      "We learn about your site, requirements and intended solar use.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We shape a practical product or service scope around the available information.",
  },
  {
    number: "03",
    title: "Coordinate",
    description:
      "We align supply, installation and service activities with the agreed scope.",
  },
  {
    number: "04",
    title: "Support",
    description:
      "We help clarify handover and ongoing maintenance requirements.",
  },
];

export function getService(slug) {
  return services.find((service) => service.slug === slug);
}
