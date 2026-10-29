import {
  Building2,
  ClipboardCheck,
  Factory,
  Gauge,
  House,
  PanelsTopLeft,
  ShieldCheck,
  Sun,
  Wrench,
} from "lucide-react";

import residentialImage from "@/assets/hero/solar-residential.jpg";
import commercialImage from "@/assets/hero/solar-commercial.jpg";
import assessmentImage from "@/assets/hero/solar-site-assessment.jpg";
import longTermImage from "@/assets/hero/solar-long-term.jpg";

export const solarHomeCopy = {
  seo: {
    title: "SmartEDGE Solar | Rooftop Solar for Homes & Businesses",
    description:
      "Explore rooftop solar assessment, system planning, installation coordination and ongoing care for residential, commercial and industrial properties.",
    socialTitle: "SmartEDGE Solar — Rooftop Solar Planning",
    socialDescription:
      "A practical solar plan starts with your roof, electricity use, property needs and local utility requirements.",
  },

  intro: {
    eyebrow: "A smarter place to start",
    titleLead: "Solar starts with",
    titleHighlight: "your roof",
    titleTail: ", your energy use and your goals.",
    body: "A useful solar proposal is more than a panel count. It connects roof suitability, electricity consumption, daytime demand, electrical infrastructure and the practical requirements of your property.",
    checklist: [
      "Roof area, condition and shading",
      "Recent electricity bills and usage patterns",
      "System capacity and component choices",
      "Utility approvals and long-term upkeep",
    ],
    primaryCta: "Request a site assessment",
    secondaryCta: "Explore solar solutions",
    imageAlt: "Photovoltaic solar panels on a modern residential rooftop",
    imageBadge: "Plan around the site, not a guess",
    imageHeadline:
      "A well-planned layout balances generation, access, safety and the way you use power.",
    imageNoteTitle: "Built around your needs",
    imageNoteBody: "No one-size-fits-all system sizing",
  },

  marquee: {
    badge: "Solar planning capabilities",
    titleFirst: "Solar work",
    titleHighlight: "done thoughtfully",
    quote:
      "Site assessment, careful system sizing, safe installation and practical long-term care belong in one plan.",
    ariaLabel: "Solar planning and delivery capabilities",
  },

  solutionsSection: {
    eyebrow: "Solar solutions",
    title: "One solar approach. Different kinds of properties.",
    lead: "Start with your property type, then shape the technical and operational plan around the roof, the load and your goals.",
    button: "Explore solar solutions",
    cardLink: "Discuss this option",
  },

  principlesSection: {
    eyebrow: "A considered solar plan",
    title: "Good solar is engineered before it is installed.",
    lead: "The details behind a dependable system matter just as much as the panels themselves.",
  },

  applicationsSection: {
    eyebrow: "Where solar can fit",
    title: "Different properties need different solar plans.",
    body: "Roof ownership, operating hours, common-area needs and local approvals can change the best way forward. Start with an assessment to understand what is feasible for your site.",
    noteTitle: "Not sure where to begin?",
    noteBody:
      "Keep a recent electricity bill handy and note when your property uses the most power.",
    noteLink: "Start a conversation",
  },

  processSection: {
    eyebrow: "From survey to switch-on",
    title: "A clear path from first assessment to ongoing care.",
    lead: "Every stage should have a clear purpose, with site and utility requirements addressed early.",
  },

  preparationSection: {
    eyebrow: "Prepare for a useful first discussion",
    title: "A few details help make the solar assessment more useful.",
    lead: "You do not need every answer before contacting us. These details simply help the initial discussion start in the right place.",
    items: [
      {
        title: "A recent electricity bill",
        body: "Helps frame typical consumption and relevant connection details.",
      },
      {
        title: "Roof and property details",
        body: "Approximate roof area, roof type, age, shading and access constraints.",
      },
      {
        title: "Your usage pattern",
        body: "When power is used most, along with any important backup or future-load requirements.",
      },
    ],
  },

  subsidySection: {
    eyebrow: "Government scheme guidance",
    title: "Check the rules before you count on a solar subsidy.",
    body: "Eligible residential grid-connected rooftop systems may qualify under the PM Surya Ghar: Muft Bijli Yojana, subject to current scheme rules and application requirements. Commercial and industrial projects have different financial considerations. Confirm eligibility on the official portal before making a financial decision.",
    button: "Check official scheme details",
    href: "https://pmsuryaghar.gov.in/",
  },

  faqSection: {
    eyebrow: "Solar FAQs",
    title: "Useful answers before you install.",
    lead: "Every property is different. Final system design, generation and potential savings should be based on a site and electricity-use assessment.",
    note: "Subsidy and utility rules can change. Confirm the latest requirements with your electricity distribution company and the official scheme portal.",
    noteLink: "PM Surya Ghar portal",
  },

  cta: {
    eyebrow: "Your next step",
    title: "Ready to explore solar for your property?",
    body: "Tell us a little about your roof, property and electricity use. Start with a practical conversation about suitability, system size and next steps.",
    button: "Plan a solar project",
  },
};

export const solarSolutions = [
  {
    title: "Residential Rooftop Solar",
    summary:
      "A roof-fit solar plan built around household electricity use, roof layout and daytime needs.",
    icon: House,
    image: residentialImage,
    imageAlt: "Residential rooftop solar panels on a modern home",
    label: "For homes",
  },
  {
    title: "Commercial Solar",
    summary:
      "Evaluate rooftop potential and usage patterns for offices, shops, warehouses and business sites.",
    icon: Building2,
    image: commercialImage,
    imageAlt: "Solar panels covering a commercial warehouse rooftop",
    label: "For businesses",
  },
  {
    title: "Industrial Rooftop Solar",
    summary:
      "Plan around roof area, electrical infrastructure, operating schedules and maintenance access.",
    icon: Factory,
    image: commercialImage,
    imageAlt: "Large industrial rooftop with rows of photovoltaic panels",
    label: "For industry",
  },
  {
    title: "Housing Societies",
    summary:
      "Explore solar for common-area loads, subject to roof rights and applicable local rules.",
    icon: PanelsTopLeft,
    image: residentialImage,
    imageAlt: "Residential rooftop photovoltaic installation",
    label: "For communities",
  },
  {
    title: "Solar Feasibility & Design",
    summary:
      "Review roof suitability, shade, energy consumption, equipment options and practical system capacity.",
    icon: ClipboardCheck,
    image: assessmentImage,
    imageAlt: "Solar assessor checking a rooftop solar layout",
    label: "Plan first",
  },
  {
    title: "Monitoring & Maintenance",
    summary: "Plan cleaning, inspections and system checks to support safe long-term operation.",
    icon: Wrench,
    image: longTermImage,
    imageAlt: "Solar technician monitoring rooftop solar panels",
    label: "Long-term care",
  },
];

export const solarPrinciples = [
  {
    title: "Designed for your roof",
    body: "Roof structure, usable area, shade, access and cable routes inform the layout before equipment is selected.",
  },
  {
    title: "Sized around real usage",
    body: "Electricity bills, daytime load and future demand help guide system capacity and generation estimates.",
  },
  {
    title: "Safety at every stage",
    body: "Mounting, electrical protection, safe access and commissioning checks belong in the plan from day one.",
  },
];

export const solarUseCases = [
  {
    title: "Independent homes & bungalows",
    body: "Assess roof orientation, available space and household load to plan a suitable rooftop installation.",
    icon: House,
  },
  {
    title: "Apartments & housing societies",
    body: "Explore common-area loads and shared roof potential, clarifying approvals and ownership responsibilities early.",
    icon: PanelsTopLeft,
  },
  {
    title: "Offices, retail & warehouses",
    body: "Match daytime electricity demand with usable roof area and operational access requirements.",
    icon: Building2,
  },
  {
    title: "Factories & industrial facilities",
    body: "Consider load profiles, electrical infrastructure, roof condition and maintenance needs before sizing a plant.",
    icon: Factory,
  },
];

export const solarProcess = [
  {
    step: "01",
    title: "Assess the site",
    body: "Review the roof, shading, electricity bills, usage patterns and site constraints.",
  },
  {
    step: "02",
    title: "Design the system",
    body: "Plan capacity, layout, components, safety provisions and utility requirements.",
  },
  {
    step: "03",
    title: "Coordinate installation",
    body: "Align installation work, electrical integration, documentation and commissioning checks.",
  },
  {
    step: "04",
    title: "Monitor & maintain",
    body: "Review operation and establish a practical inspection and maintenance routine.",
  },
];

export const solarCapabilities = [
  { name: "Roof Suitability" },
  { name: "System Sizing" },
  { name: "Solar Installation" },
  { name: "Electrical Safety" },
  { name: "Net Metering Guidance" },
  { name: "Monitoring & Care" },
  { name: "Subsidy Guidance" },
];

export const solarPreparationItems = solarHomeCopy.preparationSection.items;

export const solarFaqs = [
  {
    q: "How do I know what size solar system my property needs?",
    a: "System size depends on electricity consumption, daytime usage, usable roof area, shading, electrical connection and local utility rules. Recent bills and a site assessment are a useful starting point.",
  },
  {
    q: "Will rooftop solar work on cloudy days or at night?",
    a: "Panels can generate electricity in diffuse daylight, but output is generally lower with reduced sunlight. Panels do not generate electricity at night. After sunset, supply depends on your grid connection and whether a suitable battery system is installed.",
  },
  {
    q: "Do I need a battery with a rooftop solar system?",
    a: "Not always. A grid-connected system without batteries can suit sites focused on offsetting grid electricity use. Batteries can help with backup needs, but add cost and should be sized around the loads you need to support.",
  },
  {
    q: "Can my roof support solar panels?",
    a: "Suitability depends on structure, waterproofing, shade, orientation, safe access and usable area. A qualified site review should confirm what is practical before installation.",
  },
  {
    q: "Can I receive a government subsidy for rooftop solar?",
    a: "Eligible residential grid-connected systems may qualify under the PM Surya Ghar: Muft Bijli Yojana, subject to current scheme and application rules. Commercial and industrial systems are not covered by the same household subsidy. Confirm current terms on the official portal.",
  },
  {
    q: "What is net metering?",
    a: "Where available and approved by the local electricity distribution company, net metering records electricity imported from and exported to the grid. Requirements and settlement rules vary by state and utility.",
  },
  {
    q: "How much maintenance do solar panels need?",
    a: "Solar systems generally need periodic inspections, suitable panel cleaning and checks of mounting hardware, wiring and inverter status. Follow manufacturer instructions and use qualified personnel for electrical work.",
  },
  {
    q: "Can solar work for apartments, shops and factories?",
    a: "Solar can be assessed for homes, apartment common areas, commercial buildings and industrial sites. The arrangement depends on roof rights, energy demand, electrical capacity, structure and approvals.",
  },
];

export const solarTrustNotes = [
  { icon: Sun, label: "Solar generation planning" },
  { icon: Gauge, label: "System sizing" },
  { icon: ShieldCheck, label: "Electrical safety" },
];
