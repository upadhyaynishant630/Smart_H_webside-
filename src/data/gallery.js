import rooftopArrayImg from "@/assets/Gallery/rooftop-solar-array.jpeg";
import elevatedRooftopImg from "@/assets/Gallery/elevated-rooftop-solar.jpeg";
import installationTeamImg from "@/assets/Gallery/solar-panel-installation-team.jpeg";
import compactRooftopImg from "@/assets/Gallery/compact-rooftop-solar.jpeg";
import commercialInstallationImg from "@/assets/Gallery/commercial-solar-installation.jpeg";
import urbanRooftopImg from "@/assets/Gallery/urban-rooftop-solar.jpeg";

export const galleryItems = [
  {
    id: "rooftop-array-01",
    title: "Rooftop solar panel array",
    category: "Rooftop Systems",
    description: "A broad rooftop array using available terrace space for solar generation.",
    image: rooftopArrayImg,
  },
  {
    id: "elevated-rooftop-01",
    title: "Elevated rooftop solar structure",
    category: "Residential",
    description: "An elevated panel structure that keeps the rooftop usable around the installation.",
    image: elevatedRooftopImg,
  },
  {
    id: "installation-team-01",
    title: "Solar panel installation in progress",
    category: "Installation",
    description: "Installation work focused on panel positioning, alignment and rooftop setup.",
    image: installationTeamImg,
  },
  {
    id: "compact-rooftop-01",
    title: "Compact rooftop solar layout",
    category: "Rooftop Systems",
    description: "A compact panel layout arranged around rooftop access and existing structures.",
    image: compactRooftopImg,
  },
  {
    id: "commercial-installation-01",
    title: "Commercial rooftop installation",
    category: "Commercial",
    description: "A commercial rooftop project showing panel placement and on-site installation work.",
    image: commercialInstallationImg,
  },
  {
    id: "urban-rooftop-01",
    title: "Urban rooftop solar system",
    category: "Commercial",
    description: "A rooftop solar system integrated into a built-up urban environment.",
    image: urbanRooftopImg,
  },
];

export const galleryCategories = ["All", "Residential", "Commercial", "Rooftop Systems", "Installation"];
