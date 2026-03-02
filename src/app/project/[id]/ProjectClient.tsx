"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Spec {
    label: string;
    value: string;
}

interface Project {
    id?: string;
    slug?: string;
    title: string;
    client?: string;
    location?: string;
    year: string;
    area?: string;
    duration?: string;
    materiality?: string;
    sustainability?: string;
    category?: string;
    description: string;
    images: string[];
}

interface ProjectClientProps {
    project: Project;
    prevProject: Project | null;
    nextProject: Project | null;
    relatedWorks: Project[];
}

export default function ProjectClient({ project, prevProject, nextProject, relatedWorks,
}: ProjectClientProps) {
    const mainRef = useRef(null);
    const headerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 3;

    // Pagination logic
    const totalPages = Math.ceil(relatedWorks.length / projectsPerPage);
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentRelatedWorks = relatedWorks.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const section = document.getElementById('related-architecture');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
            });

            gsap.from(".image-scroll-item", {
                scrollTrigger: {
                    trigger: ".images-container",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, mainRef);
        return () => ctx.revert();
    }, [project.id, project.slug]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main ref={mainRef} className="flex-grow architectural-grid bg-[#0a0a0a] text-white">
                {/* Hero Section */}
                <section className="relative min-h-[70vh] flex flex-col px-8 lg:px-24 pt-32 pb-8 bg-[#0a0a0a] overflow-hidden">
                    {/* Background Detail - Removed image background for plain style */}
                    <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[#0a0a0a]">
                        <div className="absolute inset-0"></div>
                    </div>

                    {/* Top Info and Back Button */}
                    <div className="relative z-10 mb-8 flex justify-between items-center w-full">
                        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">PROJECT ARCHIVE // {project.id || project.slug}</span>
                        <Link
                            href="/portfolio"
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                        >
                            <ArrowLeft size={14} />
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Back to Archive</span>
                        </Link>
                    </div>

                    {/* Main Title Area */}
                    <div className="hero-content relative z-10 w-full mb-16">
                        <h1 className="text-7xl md:text-9xl lg:text-[13rem] font-black leading-[0.8] tracking-tighter uppercase flex flex-col">
                            <span className="flex flex-wrap items-center gap-x-8 lg:gap-x-12">
                                <span className="text-white">{project.title?.split(' ')[0]}</span>
                                {project.title?.split(' ')[1] && (
                                    <span
                                        className="text-transparent"
                                        style={{ WebkitTextStroke: '1.5px rgba(255,255,255,1)' }}
                                    >
                                        {project.title.split(' ')[1]}
                                    </span>
                                )}
                            </span>
                            <span className="text-white">
                                {project.title?.split(' ').slice(2).join(' ')}
                            </span>
                        </h1>
                    </div>

                    {/* Technical Mark */}
                    <div className="absolute right-12 bottom-[40%] w-32 h-32 pointer-events-none opacity-20 hidden lg:block">
                        <div className="absolute top-0 right-16 w-[1px] h-full bg-white"></div>
                        <div className="absolute top-16 right-0 w-full h-[1px] bg-white"></div>
                        <div className="absolute top-16 right-16 w-3 h-3 -mt-[6px] -mr-[6px] border border-white rotate-45"></div>
                    </div>

                    {/* Project Metadata Row */}
                    <div className="relative z-10 w-full border-t border-white/10 pt-12 pb-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-12 gap-y-16 max-w-[1700px]">
                            {[
                                { label: "CLIENT", value: project.client || "VARTEX" },
                                { label: "LOCATION", value: project.location || "Enugu, Nigeria" },
                                { label: "YEAR", value: project.year },
                                { label: "AREA", value: project.area || "Architecture" },
                                { label: "DURATION", value: project.duration || "N/A" },
                                { label: "MATERIALITY", value: "Custom Architecture" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <span className="font-mono text-[9px] uppercase text-white/30 tracking-[0.2em]">{item.label}</span>
                                    <span className="font-bold text-lg md:text-xl tracking-tight leading-none text-white whitespace-nowrap">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="px-8 lg:px-24 py-32 flex flex-col gap-24 relative z-10 bg-white dark:bg-[#0a0a0a]">
                    <div className="flex flex-col gap-8 max-w-4xl">
                        <h2 className="text-4xl font-black uppercase tracking-tight text-primary dark:text-white">Design Intelligence.</h2>
                        <div className="text-xl lg:text-3xl font-light leading-relaxed text-primary/80 dark:text-white/80 italic">
                            "{project.description}"
                        </div>
                    </div>

                    {/* Full-Width Image Scroll */}
                    <div className="images-container flex flex-col gap-12 lg:gap-24 w-full">
                        {project.images?.slice(1).map((img, i) => (
                            <div key={i} className="image-scroll-item w-full relative group">
                                <div className="absolute top-8 left-8 z-10 font-mono text-[9px] uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
                                    {String(i + 1).padStart(2, '0')} / {String((project.images?.length || 1) - 1).padStart(2, '0')}
                                </div>
                                <div className="overflow-hidden rounded-sm bg-neutral-50 dark:bg-neutral-900/50">
                                    <Image
                                        src={img}
                                        alt={`${project.title} - Image ${i + 1}`}
                                        width={2400}
                                        height={1350}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Specifications Section */}
                    <div className="w-full pt-20 pb-16 border-t border-neutral-100 dark:border-white/5 specs-container text-primary dark:text-white">
                        <div className="max-w-4xl">
                            <div className="flex flex-col gap-4 mb-12">
                                <h3 className="text-4xl font-black uppercase tracking-tighter">Specification.</h3>
                            </div>

                            <div className="flex flex-col gap-6 md:gap-8 w-full border-t border-neutral-200 dark:border-white/10 pt-8">
                                {[
                                    { label: "Materiality", value: project.materiality },
                                    { label: "Sustainability", value: project.sustainability },
                                    { label: "Duration", value: project.duration }
                                ].map((spec, i) => (
                                    spec.value && (
                                        <div key={i} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-24 w-full pb-6 border-b border-neutral-200 dark:border-white/10">
                                            <span className="font-medium text-sm md:text-base opacity-60 w-32 shrink-0">{spec.label}</span>
                                            <span className="font-semibold text-lg md:text-xl tracking-tight leading-snug">{spec.value}</span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Project Navigation */}
                <section className="bg-white dark:bg-background-dark border-t border-neutral-100 dark:border-white/5 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {prevProject ? (
                            <Link
                                href={`/project/${prevProject.id || prevProject.slug}`}
                                className="group p-8 lg:p-16 border-b md:border-b-0 md:border-r border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors duration-300"
                            >
                                <span className="font-mono text-[9px] tracking-[0.3em] text-primary/40 dark:text-white/40 uppercase mb-4 block">← Previous Architecture</span>
                                <h4 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-primary dark:text-white group-hover:text-primary/70 dark:group-hover:text-white/70 transition-colors">
                                    {prevProject.title}
                                </h4>
                            </Link>
                        ) : (
                            <div className="p-8 lg:p-16 border-b md:border-b-0 md:border-r border-neutral-100 dark:border-white/5" />
                        )}

                        {nextProject ? (
                            <Link
                                href={`/project/${nextProject.id || nextProject.slug}`}
                                className="group p-8 lg:p-16 text-right hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors duration-300"
                            >
                                <span className="font-mono text-[9px] tracking-[0.3em] text-primary/40 dark:text-white/40 uppercase mb-4 block">Next Build →</span>
                                <h4 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-primary dark:text-white group-hover:text-primary/70 dark:group-hover:text-white/70 transition-colors">
                                    {nextProject.title}
                                </h4>
                            </Link>
                        ) : (
                            <div className="p-8 lg:p-16 text-right border-neutral-100 dark:border-white/5" />
                        )}
                    </div>
                </section>

                {/* Related Works */}
                <section id="related-architecture" className="px-8 lg:px-24 py-24 bg-white dark:bg-background-dark border-t border-neutral-100 dark:border-white/5 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                        <h3 className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">Related Architecture</h3>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center gap-4 font-mono text-[9px] tracking-[0.2em] uppercase">
                                <span className="text-primary/30 dark:text-white/30">Page {currentPage} of {totalPages}</span>
                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`w-8 h-8 flex items-center justify-center border transition-all ${currentPage === number
                                                ? 'bg-primary text-white border-primary'
                                                : 'border-neutral-200 dark:border-white/10 text-primary/40 dark:text-white/40 hover:border-primary dark:hover:border-white'
                                                }`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        {currentRelatedWorks.slice(0, 3).map((work, index) => (
                            <Link
                                key={work.id || work.slug}
                                href={`/project/${work.id || work.slug}`}
                                className={`group flex-col ${index === 2 ? 'hidden lg:flex' : 'flex'}`}
                            >
                                <div className="relative aspect-[3/2] overflow-hidden mb-8 rounded-sm">
                                    {work.images?.[0] && (
                                        <Image
                                            src={work.images[0]}
                                            alt={work.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-all duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-mono text-[9px] tracking-[0.3em] text-primary/40 dark:text-white/40 uppercase">
                                        {work.category} // {work.year}
                                    </span>
                                    <h4 className="text-xl font-black uppercase tracking-tight text-primary dark:text-white group-hover:text-primary/70 dark:group-hover:text-white/70 transition-colors">
                                        {work.title}
                                    </h4>
                                    <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase text-primary dark:text-white group-hover:gap-3 transition-all mt-4">
                                        View Project <ArrowUpRight size={11} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    );
}
