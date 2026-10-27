import manufacturingImg from "@/assets/industries/manufacturing.jpg";
import cloudImg from "@/assets/services/cloud.jpg";
import dataImg from "@/assets/services/data.jpg";

/** Industries Smart H's services are designed to support (editable). */
export const industries = [
  {
    slug: "manufacturing",
    title: "Manufacturing",
    icon: "automation",
    body: "Connected plants, shop-floor data and automation that keep production visible and resilient.",
    focus: ["Plant connectivity", "Operational data", "Process automation"],
  },
  {
    slug: "financial-services",
    title: "Financial Services",
    icon: "shield",
    body: "Secure, compliant platforms for organisations where trust and availability are non-negotiable.",
    focus: ["Security controls", "Resilient infrastructure", "Reporting"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    icon: "data",
    body: "Reliable systems and protected data flows that support clinical and administrative teams.",
    focus: ["Data protection", "Integration", "Availability"],
  },
  {
    slug: "retail",
    title: "Retail & Distribution",
    icon: "network",
    body: "Multi-site networks, inventory data and customer platforms that scale with seasonal demand.",
    focus: ["Multi-site networks", "Cloud platforms", "Analytics"],
  },
  {
    slug: "education",
    title: "Education",
    icon: "cloud",
    body: "Campus connectivity and cloud collaboration for students, staff and administration.",
    focus: ["Campus Wi-Fi", "Cloud collaboration", "Identity"],
  },
  {
    slug: "public-sector",
    title: "Public Sector",
    icon: "infrastructure",
    body: "Modernised, secure services designed for accountability and long-term value.",
    focus: ["Modernisation", "Security", "Governance"],
  },
];

export const industryFeatureImage = manufacturingImg;

export const caseStudies = [
  {
    slug: "multi-site-cloud-migration",
    title: "Staged cloud migration for a multi-site organisation",
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
      "Outcomes would be measured against baselines agreed during discovery — such as recovery time, operating effort and cost visibility.",
  },
  {
    slug: "factory-data-visibility",
    title: "Real-time production visibility for a manufacturer",
    category: "Data & AI",
    summary:
      "An illustrative scenario connecting machine data to dashboards production leaders can trust.",
    image: manufacturingImg,
    isSample: true,
    context: "A manufacturer relying on spreadsheets compiled at the end of each shift.",
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
  {
    slug: "security-posture-programme",
    title: "Building a prioritised security programme",
    category: "Cybersecurity",
    summary:
      "A sample engagement showing how assessment turns into a practical, phased remediation plan.",
    image: dataImg,
    isSample: true,
    context: "A growing business with security tools added over time but no overall programme.",
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

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);

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
