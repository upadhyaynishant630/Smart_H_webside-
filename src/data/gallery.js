import residentialImg from "@/assets/hero/solar-residential.jpg";
import commercialImg from "@/assets/hero/solar-commercial.jpg";
import panelsImg from "@/assets/hero/solar-rooftop.jpg";
import installationImg from "@/assets/hero/solar-site-assessment.jpg";
import maintenanceImg from "@/assets/hero/solar-long-term.jpg";
import productImg from "@/assets/services/solar-energy.png";

export const galleryItems = [
  { id: "residential-01", title: "Representative residential rooftop solar", category: "Residential", image: residentialImg },
  { id: "commercial-01", title: "Representative commercial rooftop solar", category: "Commercial", image: commercialImg },
  { id: "products-01", title: "Solar panel product imagery", category: "Solar Products", image: panelsImg },
  { id: "products-02", title: "Solar system component imagery", category: "Solar Products", image: productImg },
  { id: "installation-01", title: "Representative solar site assessment", category: "Installation", image: installationImg },
  { id: "maintenance-01", title: "Representative solar maintenance support", category: "Maintenance", image: maintenanceImg },
];

export const galleryCategories = ["All", "Residential", "Commercial", "Solar Products", "Installation", "Maintenance"];
