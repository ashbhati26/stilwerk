export type ServiceItem = {
  title: string;
  description: string;
};

export type Service = {
  title: string;
  description: string;
  items: ServiceItem[];
};

export type Framework = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  href: string;
  image: string;
  bgImage: string;
  frameworks: Framework[];
};

export type SocialLink = {
  name: string;
  href: string;
};

// Data
export const servicesData: Service[] = [
  {
    title: "Web Design & Development",
    description:
      "We craft stunning, animated, and fully responsive websites that blend creativity with functionality. From sleek portfolios to powerful business sites, our designs deliver a lasting impression while performing flawlessly on every device.",
    items: [
      {
        title: "Modern UI/UX Design",
        description:
          "(Clean layouts, intuitive navigation, conversion-focused)",
      },
      {
        title: "Responsive Development",
        description: "(Pixel-perfect across mobile, tablet, and desktop)",
      },
      {
        title: "Interactive Experiences",
        description:
          "(Smooth animations, micro-interactions, immersive effects)",
      },
    ],
  },
  {
    title: "Branding & Creative Direction",
    description:
      "Your website is more than code—it’s your digital identity. We design with your brand voice in mind, creating consistent, memorable visuals that connect with your audience.",
    items: [
      {
        title: "Brand Identity",
        description: "(Logos, color palettes, typography systems)",
      },
      {
        title: "Custom Illustrations",
        description: "(Unique graphics, icons, and storytelling visuals)",
      },
      {
        title: "Design Systems",
        description: "(Reusable components, scalable design language)",
      },
    ],
  },
  {
    title: "Performance & Optimization",
    description:
      "A beautiful website means nothing if it’s slow or clunky. We optimize for speed, accessibility, and SEO so your business shines in both looks and performance.",
    items: [
      {
        title: "Lightning Fast Load Times",
        description: "(Optimized assets, caching, lightweight builds)",
      },
      {
        title: "SEO-Ready",
        description: "(On-page SEO, structured data, meta optimization)",
      },
      {
        title: "Accessibility First",
        description: "(WCAG compliance, inclusive design practices)",
      },
    ],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    name: "The Code One",
    description:
      "A developer-focused platform that enables students and professionals to track coding progress, manage DSA sheets, take notes, create public developer profiles, and showcase projects with a clean and modern interface.",
    href: "https://thecodeone.in",
    image: "/assets/projects/thecodeone.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Convex" },
      { id: 4, name: "Clerk" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    name: "Shyam Shoes",
    description:
      "An e-commerce platform for a shoe store, featuring a user-friendly interface, product browsing, and a seamless shopping experience with modern design elements.",
    href: "https://shyamshoes.com",
    image: "/assets/projects/shyam-shoes.png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "JavaScript" },
      { id: 3, name: "Node" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "Layers Marketplace",
    description:
      "A sleek landing page for a SaaS platform concept, focused on Apple products and premium accessories. Features modern UI, category highlights, and clear product showcase.",
    href: "https://layer-seven.vercel.app/",
    image: "/assets/projects/layers.png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "SQL Server" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
];

export const socials: SocialLink[] = [
  { name: "Instagram", href: "https://www.instagram.com/_stilwerk/?hl=en" },
  { name: "LinkedIn", href: "/" },
];
