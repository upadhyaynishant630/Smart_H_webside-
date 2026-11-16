import solarPanelsImg from "@/assets/hero/solar-rooftop.jpg";
import solarInverterImg from "@/assets/services/solar-energy.png";
import solarStructureImg from "@/assets/hero/solar-commercial.jpg";
import solarComponentsImg from "@/assets/hero/solar-site-assessment.jpg";
import solarInstallationImg from "@/assets/hero/solar-residential.jpg";
import solarAmcImg from "@/assets/hero/solar-long-term.jpg";

export const services = [
  {
    slug: "solar-panels",
    title: "Solar Panels",
    icon: "solar-panel",
    summary: "Solar panel products for residential and commercial solar applications.",
    image: solarPanelsImg,
    overview: "Explore solar panel options for homes, businesses and other suitable installation sites. We help clarify the product requirements, site considerations and next steps for your enquiry.",
    challenges: ["Understanding the right panel requirements", "Working within available roof or site area", "Coordinating supply with the wider project"],
    capabilities: ["Residential and commercial panel enquiries", "Site-aware product discussions", "Supply coordination", "Installation-ready planning"],
    outcomes: ["A clearer product shortlist", "A practical supply and installation scope", "Defined next steps for the project"],
  },
  {
    slug: "solar-inverters",
    title: "Solar Inverters",
    icon: "solar-inverter",
    summary: "Solar inverter solutions for different residential and commercial solar-system requirements.",
    image: solarInverterImg,
    overview: "We help customers identify inverter requirements that fit the intended solar system, installation context and operating needs without making unverified performance or warranty claims.",
    challenges: ["Matching the inverter to the proposed system", "Understanding installation and connection requirements", "Planning access for future service"],
    capabilities: ["Residential and commercial enquiries", "System compatibility discussions", "Installation coordination", "Maintenance planning"],
    outcomes: ["A documented inverter enquiry", "Clear compatibility questions for the installer", "A practical route to quotation"],
  },
  {
    slug: "solar-structures",
    title: "Solar Structures",
    icon: "solar-structure",
    summary: "Solar mounting structures and supporting systems for rooftop and other suitable solar installations.",
    image: solarStructureImg,
    overview: "Solar structures support safe, practical panel placement across suitable rooftops and other sites. We help scope the mounting requirement around the installation context.",
    challenges: ["Assessing the available mounting area", "Allowing for site-specific installation constraints", "Coordinating structure supply and installation"],
    capabilities: ["Rooftop structure enquiries", "Mounting-layout discussions", "Project coordination", "Installation-ready scope"],
    outcomes: ["A clearer structural requirement", "Better coordination with the solar project", "Defined information needed for assessment"],
  },
  {
    slug: "solar-components",
    title: "Solar Components",
    icon: "solar-components",
    summary: "Essential electrical, connection and installation components used in solar systems.",
    image: solarComponentsImg,
    overview: "Solar systems depend on the right supporting components and connection materials. We help organise component enquiries around the overall system and installation needs.",
    challenges: ["Identifying the supporting components required", "Coordinating products across a project", "Avoiding gaps during installation"],
    capabilities: ["Component requirement discussions", "Electrical and connection accessories", "Supply coordination", "Project checklist support"],
    outcomes: ["A more complete project checklist", "Fewer avoidable supply gaps", "Clearer coordination with installation teams"],
  },
  {
    slug: "solar-installation",
    title: "Solar Installation Service",
    icon: "solar-installation",
    summary: "Solar installation and commissioning services for residential and commercial requirements.",
    image: solarInstallationImg,
    overview: "We support residential and commercial solar installation enquiries from initial coordination through installation and commissioning discussions, based on the confirmed project scope.",
    challenges: ["Coordinating site access and installation activities", "Keeping product, structure and electrical work aligned", "Planning commissioning and handover"],
    capabilities: ["Residential installation coordination", "Commercial project coordination", "Installation planning", "Commissioning and handover support"],
    outcomes: ["A coordinated installation scope", "Clear project milestones", "A documented handover plan"],
  },
  {
    slug: "solar-amc",
    title: "AMC & Maintenance Service",
    icon: "solar-maintenance",
    summary: "Annual maintenance and ongoing inspection support for solar installations.",
    image: solarAmcImg,
    overview: "Regular inspection and maintenance help solar installations remain easier to monitor and manage. We discuss an appropriate support scope for the site and system.",
    challenges: ["Keeping inspection responsibilities clear", "Planning routine service access", "Responding to maintenance observations"],
    capabilities: ["Maintenance requirement discussions", "Inspection planning", "Service coordination", "Ongoing support scope"],
    outcomes: ["A clearer maintenance plan", "Defined service responsibilities", "A practical route to ongoing support"],
  },
];

export const deliveryProcess = [
  { number: "01", title: "Understand", description: "We learn about your site, requirements and intended solar use." },
  { number: "02", title: "Plan", description: "We shape a practical product or service scope around the available information." },
  { number: "03", title: "Coordinate", description: "We align supply, installation and service activities with the agreed scope." },
  { number: "04", title: "Support", description: "We help clarify handover and ongoing maintenance requirements." },
];

export function getService(slug) {
  return services.find((service) => service.slug === slug);
}
