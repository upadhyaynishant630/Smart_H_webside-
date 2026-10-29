import manufacturingImg from "@/assets/industries/manufacturing.jpg";
import cloudImg from "@/assets/services/cloud.jpg";
import dataImg from "@/assets/services/data.jpg";
import solarImg from "@/assets/services/solar-energy.png";
import evChargingImg from "@/assets/services/ev-charging.jpg";

/** Industries SmartEDGE's services are designed to support. */
export const industries = [
  {
    slug: "manufacturing",
    title: "Manufacturing",
    icon: "automation",
    body: "Connected plants, shop-floor data and automation that keep production visible and resilient.",
    focus: [
      "Plant connectivity",
      "Operational data",
      "Process automation",
    ],
  },
  {
    slug: "financial-services",
    title: "Financial Services",
    icon: "shield",
    body: "Secure, compliant platforms for organisations where trust and availability are non-negotiable.",
    focus: [
      "Security controls",
      "Resilient infrastructure",
      "Reporting",
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    icon: "data",
    body: "Reliable systems and protected data flows that support clinical and administrative teams.",
    focus: [
      "Data protection",
      "Integration",
      "Availability",
    ],
  },
  {
    slug: "retail",
    title: "Retail & Distribution",
    icon: "network",
    body: "Multi-site networks, inventory data and customer platforms that scale with seasonal demand.",
    focus: [
      "Multi-site networks",
      "Cloud platforms",
      "Analytics",
    ],
  },
  {
    slug: "education",
    title: "Education",
    icon: "cloud",
    body: "Campus connectivity and cloud collaboration for students, staff and administration.",
    focus: [
      "Campus Wi-Fi",
      "Cloud collaboration",
      "Identity",
    ],
  },
  {
    slug: "public-sector",
    title: "Public Sector",
    icon: "infrastructure",
    body: "Modernised, secure services designed for accountability and long-term value.",
    focus: [
      "Modernisation",
      "Security",
      "Governance",
    ],
  },
];

export const industryFeatureImage = manufacturingImg;

/**
 * Case studies are ordered by display priority.
 * Solar appears first, followed by EV Charging and existing case studies.
 */
export const caseStudies = [
  // 1. SOLAR ENERGY — FIRST CASE STUDY
  {
    slug: "rooftop-solar-feasibility",
    title: "Rooftop Solar Feasibility & Delivery Planning",
    category: "Solar & Renewable Energy",
    summary:
      "An illustrative scenario showing how site assessment, energy analysis and structured planning can support a rooftop solar project.",
    image: solarImg,
    isSample: true,

    context:
      "An organisation wanted to explore rooftop solar to reduce its dependence on grid electricity and better understand the feasibility of a renewable energy installation.",

    challenge:
      "The organisation needed better visibility into roof suitability, energy consumption, installation constraints and the factors that could affect project feasibility.",

    approach: [
      "Review of available site information and electricity consumption patterns",
      "Initial assessment of roof suitability, usable area and potential installation constraints",
      "Evaluation of solar system options and indicative generation potential",
      "Development of an implementation roadmap with proposed next steps",
    ],

    solution:
      "A structured feasibility and planning approach covering site requirements, indicative system sizing, installation considerations and the information needed for a detailed technical assessment.",

    outcome:
      "Potential outcomes would be evaluated using verified site data, estimated energy generation, installation costs and the organisation's agreed project objectives.",
  },

  // 2. EV CHARGING — SECOND CASE STUDY
  {
    slug: "ev-charging-rollout-planning",
    title: "EV Charging Infrastructure & Rollout Planning",
    category: "EV Charging & Mobility",
    summary:
      "An illustrative scenario exploring how charging requirements, site readiness and phased deployment can inform an EV charging rollout.",

    image: evChargingImg,
    isSample: true,

    context:
      "An organisation was exploring EV charging facilities across one or more locations and needed a structured approach to assess its infrastructure requirements.",

    challenge:
      "The organisation needed to evaluate charging demand, available electrical capacity, installation constraints and the operational requirements of a multi-location rollout.",

    approach: [
      "Assessment of site requirements and expected charging demand",
      "Review of electrical infrastructure and preliminary site readiness",
      "Evaluation of charger locations and potential deployment options",
      "Phased rollout planning with proposed operational and maintenance considerations",
    ],

    solution:
      "A structured EV charging deployment plan covering initial site assessment, infrastructure considerations, charger selection factors and a phased implementation roadmap.",

    outcome:
      "Project success would be measured against agreed deployment targets, verified site capacity, charger utilisation, operational reliability and the organisation's budget.",
  },

  // 3. EXISTING CLOUD CASE STUDY
  {
    slug: "multi-site-cloud-migration",
    title: "Staged Cloud Migration for a Multi-Site Organisation",
    category: "Cloud & Infrastructure",
    summary:
      "How a phased approach can move core workloads to the cloud without disrupting daily operations.",
    image: cloudImg,
    isSample: true,

    context:
      "An organisation with several regional offices running core applications on ageing local servers.",

    challenge:
      "Hardware was approaching end of life, recovery procedures were untested, and each site had been configured differently.",

    approach: [
      "Inventory and dependency mapping of every workload",
      "Target landing zone with standard network and identity design",
      "Migration waves ordered by risk, each with a rollback plan",
    ],

    solution:
      "A governed cloud environment with infrastructure as code, automated backups and centralised monitoring, plus runbooks for the internal team.",

    outcome:
      "Outcomes would be measured against baselines agreed during discovery, such as recovery time, operating effort and cost visibility.",
  },

  // 4. EXISTING DATA & AI CASE STUDY
  {
    slug: "factory-data-visibility",
    title: "Real-Time Production Visibility for a Manufacturer",
    category: "Data & AI",
    summary:
      "An illustrative scenario connecting machine data to dashboards production leaders can trust.",
    image: manufacturingImg,
    isSample: true,

    context:
      "A manufacturer relying on spreadsheets compiled at the end of each shift.",

    challenge:
      "Production issues were spotted hours late and different teams reported conflicting figures.",

    approach: [
      "Secure connectivity from production lines to a central data platform",
      "Agreed definitions for key production measures",
      "Dashboards co-designed with shift supervisors",
    ],

    solution:
      "A governed data pipeline feeding near-real-time dashboards, with alerts for exceptions defined by the operations team.",

    outcome:
      "Success criteria would be defined with the client, for example data freshness and adoption by shift leaders.",
  },

  // 5. EXISTING CYBERSECURITY CASE STUDY
  {
    slug: "security-posture-programme",
    title: "Building a Prioritised Security Programme",
    category: "Cybersecurity",
    summary:
      "A sample engagement showing how assessment turns into a practical, phased remediation plan.",
    image: dataImg,
    isSample: true,

    context:
      "A growing business with security tools added over time but no overall programme.",

    challenge:
      "Leadership lacked a clear picture of risk and the team could not tell which gaps to close first.",

    approach: [
      "Assessment across identity, endpoints, network and data",
      "Risk register ranked by likelihood and impact",
      "Ninety-day plan for highest-priority controls",
    ],

    solution:
      "Hardened identity and access, consolidated endpoint protection and a documented incident response plan.",

    outcome:
      "Progress would be tracked through the risk register and agreed control-coverage measures.",
  },
];

/**
 * Find a case study by its URL slug.
 * Used by the dynamic case-study detail route.
 */
export const getCaseStudy = (slug) =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug);

/** Frequently asked questions. */
export const faqs = [
  {
    q: "What size of organisation do you work with?",
    a: "Our approach suits mid-sized organisations and enterprise teams that need structured delivery. We'll tell you honestly in the first conversation whether we're the right fit.",
  },
  {
    q: "Can you work alongside our internal IT team?",
    a: "Yes. Most engagements are collaborative — we add specialist capability and leave your team with documentation and runbooks they can own.",
  },
  {
    q: "How does a project usually start?",
    a: "With a short discovery conversation, followed by a scoped assessment or workshop that defines goals, constraints and next steps before any build work begins.",
  },
  {
    q: "Do you provide ongoing support after delivery?",
    a: "Support and continuous improvement options can be agreed as part of the engagement, depending on your needs.",
  },
];