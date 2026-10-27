import cloudImg from "@/assets/services/cloud.jpg";
import dataImg from "@/assets/services/data.jpg";
import secureImg from "@/assets/hero/hero-secure.jpg";
import connectedImg from "@/assets/hero/hero-connected.jpg";
import scaleImg from "@/assets/hero/hero-scale.jpg";
import consultImg from "@/assets/about/studio.jpg";

export const services = [
  {
    slug: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    icon: "cloud",
    summary:
      "Design, migrate and operate hybrid and cloud environments built for reliability and cost control.",
    image: cloudImg,
    overview:
      "We assess your current estate, define a target architecture and move workloads in planned, reversible stages — then help you run it with clear operating practices.",
    challenges: [
      "Ageing on-premise hardware and rising maintenance effort",
      "Unpredictable cloud spend",
      "Environments built without consistent standards",
    ],
    capabilities: [
      "Cloud readiness assessment",
      "Landing zone and network design",
      "Workload migration planning",
      "Infrastructure as code",
      "Backup and disaster recovery design",
      "Managed operations handover",
    ],
    outcomes: [
      "A documented target architecture",
      "A staged migration plan with rollback points",
      "Runbooks your team can own",
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    icon: "shield",
    summary:
      "Practical security programmes that reduce risk across identities, endpoints, networks and data.",
    image: secureImg,
    overview:
      "We start from your real exposure, prioritise what matters most and implement controls that people can actually work with.",
    challenges: [
      "Unclear view of security posture",
      "Too many tools, too little coverage",
      "Compliance requirements without a plan",
    ],
    capabilities: [
      "Security posture assessment",
      "Identity and access hardening",
      "Endpoint and network protection",
      "Security monitoring design",
      "Incident response planning",
      "Policy and awareness programmes",
    ],
    outcomes: [
      "A prioritised risk register",
      "A phased remediation roadmap",
      "Clear ownership of security controls",
    ],
  },
  {
    slug: "data-ai",
    title: "Data & AI",
    icon: "ai",
    summary: "Turn scattered data into trusted reporting and responsibly applied AI.",
    image: dataImg,
    overview:
      "We build the data foundations first — quality, governance and access — then apply analytics and AI where they create measurable value.",
    challenges: [
      "Data spread across disconnected systems",
      "Reports nobody fully trusts",
      "AI pilots that never reach production",
    ],
    capabilities: [
      "Data platform architecture",
      "Integration and pipeline engineering",
      "Dashboards and reporting",
      "Data governance frameworks",
      "AI use-case discovery",
      "Model deployment and monitoring",
    ],
    outcomes: [
      "A single, governed source of truth",
      "Reporting aligned to business decisions",
      "AI use cases with defined success criteria",
    ],
  },
  {
    slug: "intelligent-automation",
    title: "Intelligent Automation",
    icon: "automation",
    summary:
      "Remove repetitive work by automating processes end to end, with people kept in control.",
    image: scaleImg,
    overview:
      "We map how work really flows, identify where automation helps and build workflows that are observable, maintainable and safe to change.",
    challenges: [
      "Manual hand-offs between teams and tools",
      "Error-prone repetitive tasks",
      "Automation scripts no one maintains",
    ],
    capabilities: [
      "Process discovery and mapping",
      "Workflow and RPA implementation",
      "System integration and APIs",
      "Approval and exception handling",
      "Automation monitoring",
      "Centre-of-excellence setup",
    ],
    outcomes: [
      "Documented, owned workflows",
      "Fewer manual hand-offs",
      "A backlog of prioritised automation opportunities",
    ],
  },
  {
    slug: "connectivity-networks",
    title: "Connectivity & Networks",
    icon: "network",
    summary: "Secure, high-availability networks connecting offices, sites, devices and cloud.",
    image: connectedImg,
    overview:
      "From campus Wi-Fi to multi-site WAN, we design networks around performance, visibility and security.",
    challenges: [
      "Slow or unreliable connectivity between sites",
      "Limited visibility into network health",
      "Growing numbers of connected devices",
    ],
    capabilities: [
      "Network architecture and design",
      "SD-WAN and multi-site connectivity",
      "Wireless planning",
      "IoT and device connectivity",
      "Network monitoring",
      "Segmentation and zero-trust access",
    ],
    outcomes: [
      "A resilient, documented network design",
      "Monitoring with clear alerting",
      "Segmented access aligned to risk",
    ],
  },
  {
    slug: "technology-consulting",
    title: "Technology Consulting",
    icon: "consult",
    summary:
      "Independent advice, roadmaps and programme leadership for complex technology decisions.",
    image: consultImg,
    overview:
      "We help leadership teams decide what to build, buy or retire — and stay alongside delivery to keep programmes on track.",
    challenges: [
      "Competing priorities and limited budgets",
      "Vendor choices with long-term impact",
      "Programmes drifting from their goals",
    ],
    capabilities: [
      "IT strategy and roadmaps",
      "Architecture reviews",
      "Vendor evaluation and selection",
      "Programme and project leadership",
      "Technology due diligence",
      "Operating model design",
    ],
    outcomes: [
      "A prioritised, costed roadmap",
      "Decision records for major choices",
      "Governance that keeps delivery aligned",
    ],
  },
];

export const deliveryProcess = [
  {
    step: "01",
    title: "Discover",
    body: "Understand goals, constraints and the current landscape through focused workshops.",
  },
  {
    step: "02",
    title: "Design",
    body: "Define the target architecture, roadmap and success measures before building.",
  },
  {
    step: "03",
    title: "Deliver",
    body: "Implement in short, visible increments with testing and security at each stage.",
  },
  {
    step: "04",
    title: "Evolve",
    body: "Hand over, support and continuously improve as needs change.",
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
