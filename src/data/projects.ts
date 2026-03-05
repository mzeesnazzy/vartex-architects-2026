export interface Project {
    id: string;
    title: string;
    category: string;
    location: string;
    year: string;
    image: string;
    description: string;
    tags: string[];
}

export const projects: Project[] = [
    {
        id: "nka-na-uzu",
        title: "NKA NA UZU",
        category: "Architectural Design",
        location: "Enugu, NG",
        year: "2026",
        image: "/projects/nkanazu/PROJECT6-2Picture13.webp",
        description: "A sustainable, Afrocentric vocational training center situated in Enugu.",
        tags: ["Clay", "Stone", "Terracotta"]
    },
    {
        id: "clergy-office-house",
        title: "CLERGY OFFICE/ HOUSE",
        category: "Architectural Design",
        location: "Oyo, NG",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-9Picture21.webp",
        description: "Clergy office and residence for the Catholic Archdiocese of Ibadan.",
        tags: ["Office", "Residence", "Construction"]
    },
    {
        id: "the-vartex-hub",
        title: "THE VARTEX HUB",
        category: "Architectural Design",
        location: "Lagos, NG",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-11Picture23.webp",
        description: "A state-of-the-art commercial headquarters that redefines the corporate workspace in Lagos.",
        tags: ["Office", "Modern", "Lagos"]
    },
    {
        id: "the-corinthian",
        title: "THE CORINTHIAN",
        category: "Residential Design",
        location: "Anambra, NG",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-14Picture28.webp",
        description: "A private residence project in Anambra.",
        tags: ["Private", "Residency", "Anambra"]
    },
    {
        id: "house-aries",
        title: "HOUSE ARIES",
        category: "Residential Design",
        location: "Lagos, NG",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-18Picture30.webp",
        description: "A private residence project in Lagos.",
        tags: ["Private", "Lagos", "Aries"]
    },
    {
        id: "portfolio",
        title: "PORTFOLIO",
        category: "Portfolio",
        location: "N/A",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-1Picture12.webp",
        description: "A curated selection of works.",
        tags: ["Selected Works", "Gallery"]
    }
];
