/* Editable portfolio content. Replace placeholders with confirmed details only. */
const websiteProjects = [
  {
    id: "execudesk-global",
    name: "ExecuDesk Global",
    description: "A clean B2B website built for trust, clarity, and better client conversions.",
    link: "https://www.execudeskglobal.com/",
    thumbnail: "https://www.execudeskglobal.com/og-preview.png?v=4",
    embedPreview: false
  },
  {
    id: "aura-coffee-house",
    name: "Aura Coffee House",
    description: "A warm café landing page designed to feel premium, welcoming, and easy to explore.",
    link: "https://aura-coffee-house-cyriusgonzales-dev.netlify.app/"
  },
  {
    id: "velouria-luxury-clothing",
    name: "Velouria Luxury Clothing",
    description: "An upscale storefront concept with a more editorial, premium brand feel.",
    link: "https://velouria-lux-cyriusgonzales-dev.netlify.app/"
  },
  {
    id: "personal-photography-portfolio",
    name: "Personal Photography Portfolio",
    description: "A minimal portfolio crafted to let imagery lead the experience.",
    link: "https://photography-cyriusgonzales-dev.netlify.app/"
  },
  {
    id: "luxury-real-estate",
    name: "Luxury Real Estate",
    description: "A refined property site focused on aspiration, trust, and premium positioning.",
    link: "https://real-estate-cyriusgonzales-dev.netlify.app/"
  },
  {
    id: "precision-auto-detailing",
    name: "Precision Auto Detailing",
    description: "A straightforward service website built to feel polished and conversion-focused.",
    link: "https://precision-cyriusgonzales-dev.netlify.app/"
  },
  {
    id: "dental-clinic",
    name: "Dental Clinic",
    description: "A calm healthcare website centered on trust, clarity, and patient confidence.",
    link: "https://dental-cyriusgonzales-dev.netlify.app/"
  },
  {
    id: "aesthetic-beauty-clinic",
    name: "Aesthetic Beauty Clinic",
    description: "A polished wellness brand site with a clean, elegant customer journey.",
    link: "https://clinic-cyriusgonzales-dev.netlify.app/"
  },
  {
    id: "3d-print-service",
    name: "3D Print Service",
    description: "A practical service page combining technical credibility with a clear sales flow.",
    link: "https://3d-print-cyriusgonzales-dev.netlify.app/"
  }
];

const tools = [
  { name: "HTML", logo: "assets/tools/html.svg", category: "web" },
  { name: "CSS", logo: "assets/tools/css.svg", category: "web" },
  { name: "JavaScript", logo: "assets/tools/javascript.svg", category: "web" },
  { name: "TypeScript", logo: "assets/tools/typescript.svg", category: "web" },
  { name: "React", logo: "assets/tools/react.svg", category: "web" },
  { name: "Next.js", logo: "assets/tools/nextjs.svg", category: "web" },
  { name: "Node.js", logo: "assets/tools/nodejs.svg", category: "development" },
  { name: "Python", logo: "assets/tools/python.svg", category: "development" },
  { name: "GitHub", logo: "assets/tools/github.svg", category: "development" },
  { name: "Vercel", logo: "assets/tools/vercel.svg", category: "development" },
  { name: "Figma", logo: "assets/tools/figma.svg", category: "design" },
  { name: "Canva", logo: "assets/tools/canva.svg", category: "design" },
  { name: "Photoshop", logo: "assets/tools/photoshop.svg", category: "design" }
];

const graphicDesignProjects = [
  {
    id: "optima-equipment-corp-brochure",
    name: "Optima Equipment Corp Brochure",
    description: "A 19-page corporate brochure for Optima Equipment Corp.",
    image: "assets/graphic-design/Optima%20Equipment%20Corp%20Brochure/1.jpg",
    images: Array.from({ length: 19 }, (_, index) => `assets/graphic-design/Optima%20Equipment%20Corp%20Brochure/${index + 1}.jpg`),
    alt: "Optima Equipment Corp brochure, page 1"
  }
];

const photographyProjects = [
  {
    id: "ilocos-sur-norte",
    name: "Ilocos Sur & Norte",
    description: "A photographic collection from Ilocos Sur and Norte.",
    image: "assets/photography/1.%20Ilocos%20Sur%20%26%20Norte/1.jpg",
    images: Array.from({ length: 11 }, (_, index) => `assets/photography/1.%20Ilocos%20Sur%20%26%20Norte/${index + 1}.jpg`),
    alt: "Ilocos Sur and Norte photograph 1"
  },
  {
    id: "aurora-province",
    name: "Aurora Province",
    description: "A photographic collection from Aurora Province.",
    image: "assets/photography/2.%20Aurora%20Province/1.png",
    images: ["1.png", "2.png", "3.jpg", "4.png", "5.png", "6.png", "7.png", "8.jpg", "9.png"]
      .map((filename) => `assets/photography/2.%20Aurora%20Province/${filename}`),
    alt: "Aurora Province photograph 1"
  },
  {
    id: "wide-shot-x5",
    name: "Wide Shot from x5",
    description: "A collection of wide-shot photographs.",
    image: "assets/photography/3.%20Wide%20Shot%20from%20x5/1.jpg",
    images: Array.from({ length: 9 }, (_, index) => `assets/photography/3.%20Wide%20Shot%20from%20x5/${index + 1}.jpg`),
    alt: "Wide-shot photograph 1"
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "A collection of sunset photographs.",
    image: "assets/photography/4.%20Sunset/1.jpg",
    images: Array.from({ length: 7 }, (_, index) => `assets/photography/4.%20Sunset/${index + 1}.jpg`),
    alt: "Sunset photograph 1"
  }
];

const services = [
  { number: "01", name: "Website Design & Development", description: "Plan and build responsive websites that make information easy to navigate and the next step clear." },
  { number: "02", name: "Graphic Design", description: "Create clear visual assets and layouts that help ideas and brands communicate consistently." },
  { number: "03", name: "Photography", description: "Create and select images that bring a subject, product, or story into focus." }
];

const faqs = [
  {
    question: "What creative services are available?",
    answer: "Website Design & Development, Graphic Design, and Photography. Visit the Services page for a short overview of each."
  },
  {
    question: "Where can I see the portfolio work?",
    answer: "Open the Projects page to browse the website projects and the Graphic Design and Photography categories."
  },
  {
    question: "How does the contact form work?",
    answer: "The form prepares an email in your mail application. It does not send or store messages on a server."
  }
];

// Set this to your real address to enable mailto form submission.
const contactEmail = "";
