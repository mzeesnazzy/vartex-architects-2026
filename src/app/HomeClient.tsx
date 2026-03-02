"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home as HomeIcon, Building2, Sofa, Trees, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id?: string;
    slug?: string;
    title: string;
    category?: string;
    location?: string;
    year: string;
    image: string;
    description?: string;
}

interface HomeClientProps {
    featuredProjects: Project[];
    selectedWorks: Project[];
    allProjects: Project[];
}

export default function HomeClient({ featuredProjects, selectedWorks, allProjects }: HomeClientProps) {
    const mainRef = useRef(null);

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // General Fade In
            gsap.from(".fade-in", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".fade-in",
                    start: "top 90%",
                }
            });

            // Hero Split Animation
            gsap.from(".hero-text", {
                x: -50,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            });
            gsap.from(".hero-image-container", {
                x: 50,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            });

            // Process Steps Animation
            const processTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".process-steps-container",
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1,
                }
            });

            processTl.to(".progress-line", { scaleX: 1, duration: 1, ease: "none" });

            const dots = gsap.utils.toArray(".process-dot");
            const fills = gsap.utils.toArray(".dot-fill");

            dots.forEach((dot: any, i: number) => {
                const stepTime = i / (dots.length - 1);
                processTl.to(fills[i], { scale: 1, duration: 0.1 }, stepTime);
                processTl.to(dot, { borderColor: "currentColor", duration: 0.1 }, stepTime);
            });

            // Mobile Scroll Animations
            if (window.matchMedia("(max-width: 1024px)").matches) {
                gsap.utils.toArray(".service-card").forEach((card: any) => {
                    const icon = card.querySelector(".icon-layer");
                    const title = card.querySelector(".title-layer");
                    const text = card.querySelector(".text-layer");

                    ScrollTrigger.create({
                        trigger: card,
                        start: "top 70%",
                        end: "bottom 30%",
                        onEnter: () => {
                            if (icon) { icon.classList.add("text-primary", "dark:text-white"); icon.classList.remove("text-primary/20", "dark:text-white/20"); }
                            if (title) { title.classList.add("text-primary", "dark:text-white"); }
                            if (text) { text.classList.add("text-primary/100", "dark:text-white/100"); text.classList.remove("text-primary/60", "dark:text-white/60"); }
                        },
                        onLeave: () => {
                            if (icon) { icon.classList.remove("text-primary", "dark:text-white"); icon.classList.add("text-primary/20", "dark:text-white/20"); }
                            if (title) { title.classList.remove("text-primary", "dark:text-white"); }
                            if (text) { text.classList.remove("text-primary/100", "dark:text-white/100"); text.classList.add("text-primary/60", "dark:text-white/60"); }
                        },
                        onEnterBack: () => {
                            if (icon) { icon.classList.add("text-primary", "dark:text-white"); icon.classList.remove("text-primary/20", "dark:text-white/20"); }
                            if (title) { title.classList.add("text-primary", "dark:text-white"); }
                            if (text) { text.classList.add("text-primary/100", "dark:text-white/100"); text.classList.remove("text-primary/60", "dark:text-white/60"); }
                        },
                        onLeaveBack: () => {
                            if (icon) { icon.classList.remove("text-primary", "dark:text-white"); icon.classList.add("text-primary/20", "dark:text-white/20"); }
                            if (title) { title.classList.remove("text-primary", "dark:text-white"); }
                            if (text) { text.classList.remove("text-primary/100", "dark:text-white/100"); text.classList.add("text-primary/60", "dark:text-white/60"); }
                        }
                    });
                });
            }

            // Process step number light-up on scroll (desktop + mobile)
            gsap.utils.toArray(".process-step").forEach((step: any) => {
                const stepNum = step.querySelector(".step-number");
                if (stepNum) {
                    gsap.fromTo(stepNum,
                        { opacity: 0.3 },
                        {
                            opacity: 1,
                            color: 'currentColor',
                            scrollTrigger: {
                                trigger: step,
                                start: "top 75%",
                                end: "top 40%",
                                scrub: true,
                            }
                        }
                    );
                }
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    // Carousel Auto-Scroll
    useEffect(() => {
        if (featuredProjects.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [featuredProjects.length]);

    const nextSlide = () => featuredProjects.length > 0 && setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    const prevSlide = () => featuredProjects.length > 0 && setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);

    const activeProject = featuredProjects[currentSlide];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main ref={mainRef} className="flex-grow bg-white dark:bg-background-dark">

                {/* HERO SECTION */}
                <section className="relative flex flex-col lg:flex-row min-h-[90vh] border-b border-neutral-100 dark:border-white/5" aria-label="Welcome section">
                    {/* Left: Text Content */}
                    <div className="w-full lg:w-[40%] p-8 pt-24 md:p-16 lg:p-24 flex flex-col justify-center gap-12 lg:border-r border-neutral-100 dark:border-white/5 hero-text">
                        <div className="flex flex-col gap-6">
                            <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">00 — INTRO</span>
                            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-primary dark:text-white">
                                Architecture shaped by idea, context, and precision.
                            </h1>
                            <p className="text-lg lg:text-xl font-light text-primary/60 dark:text-white/60 max-w-md leading-relaxed">
                                VARTEX creates spaces that endure. We blend functional rigor with artistic intuition to define the modern landscape.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/portfolio" aria-label="View our project archive" className="bg-primary dark:bg-white text-white dark:text-primary px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-black dark:hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center">
                                View Projects
                            </Link>
                            <Link href="/about" aria-label="Learn about our architectural philosophy" className="border border-neutral-200 dark:border-white/10 text-primary dark:text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-neutral-50 dark:hover:bg-white/5 transition-all duration-300 flex items-center justify-center">
                                Our Philosophy
                            </Link>
                        </div>
                    </div>

                    {/* Right: Architectural Imagery Carousel */}
                    <div
                        className="w-full lg:w-[60%] h-[60vh] lg:h-auto relative overflow-hidden bg-neutral-900 hero-image-container border-t lg:border-t-0 border-neutral-100 dark:border-white/5 group cursor-pointer lg:cursor-default"
                        onClick={nextSlide}
                    >
                        {featuredProjects.map((project, index) => (
                            <div
                                key={project.id || project.slug}
                                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0"
                                    }`}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    priority={index === 0}
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="object-cover"
                                />
                                {/* Gradient for text visibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                            </div>
                        ))}

                        {/* Slide Indicators */}
                        <div className="absolute top-8 right-8 z-20 flex gap-2" onClick={(e) => e.stopPropagation()}>
                            {featuredProjects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-1 transition-all duration-500 rounded-full ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div
                            className="absolute inset-y-0 left-0 right-0 hidden lg:flex items-center justify-between px-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={prevSlide} className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextSlide} className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Featured Tag — Liquid Glass / See-through */}
                        {activeProject && (
                            <Link
                                href={`/project/${activeProject.id || activeProject.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="absolute bottom-4 left-4 md:bottom-10 md:left-10 p-4 md:p-8 backdrop-blur-xl border border-white/40 dark:border-white/20 rounded-xl md:rounded-2xl shadow-2xl flex flex-col gap-1 md:gap-2 min-w-[160px] md:min-w-[280px] overflow-hidden z-20 group/tag transition-all hover:scale-[1.02]"
                                style={{
                                    background: currentSlide === 1
                                        ? 'linear-gradient(135deg, rgba(30,30,35,0.4) 0%, rgba(10,10,15,0.2) 100%)'
                                        : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(200,200,210,0.05) 100%)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
                                    border: currentSlide === 1 ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.2)',
                                }}
                            >
                                {/* Metallic shimmer overlay */}
                                <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 45%, transparent 50%)',
                                }} />

                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-mono text-[9px] tracking-widest text-white/90 uppercase relative z-10 font-bold drop-shadow-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        Featured Project
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 text-white/60 group-hover/tag:text-white transition-colors" />
                                </div>

                                <h3 className="text-lg md:text-2xl font-black tracking-tight text-white relative z-10 drop-shadow-md">
                                    {activeProject.title}
                                </h3>
                                <p className="font-mono text-[9px] tracking-widest text-white/70 uppercase relative z-10 drop-shadow-sm font-semibold">
                                    {activeProject.location} — {activeProject.year}
                                </p>
                            </Link>
                        )}
                    </div>
                </section>

                {/* PHILOSOPHY SECTION */}
                <section className="px-8 lg:px-24 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-neutral-100 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900/20" aria-label="Our practice philosophy">
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">01 — PHILOSOPHY</span>
                        <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-primary dark:text-white">Negative Space as Structure</h2>
                    </div>
                    <div className="lg:col-span-1 border-r border-neutral-200 dark:border-white/10 hidden lg:block h-32 self-center"></div>
                    <div className="lg:col-span-7">
                        <p className="text-2xl lg:text-3xl font-light leading-snug text-primary/80 dark:text-white/80 max-w-3xl">
                            We believe a building is not just a structure, but a dialogue between the inhabitant and the environment. Every line drawn serves a purpose; every void creates meaning. Simplicity is the ultimate sophistication.
                        </p>
                    </div>
                </section>

                {/* SELECTED WORKS */}
                <section className="px-8 lg:px-24 py-24 lg:py-40 flex flex-col gap-24" aria-label="Selected architectural works">
                    <div className="flex justify-between items-end border-b border-neutral-100 dark:border-white/5 pb-8">
                        <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-primary dark:text-white">Selected Works</h2>
                        <Link href="/portfolio" aria-label="View all archived projects" className="font-mono text-[10px] tracking-[0.3em] text-primary/40 dark:text-white/40 hover:text-primary dark:hover:text-white transition-colors uppercase">
                            VIEW ALL ARCHIVE
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        {selectedWorks.slice(0, 2).map((project) => (
                            <Link key={project.id || project.slug} href={`/project/${project.id || project.slug}`} aria-label={`View ${project.title} project details`} className="group flex flex-col gap-10 fade-in">
                                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-sm">
                                    <Image
                                        src={project.image}
                                        className="object-cover transition-all duration-700 group-hover:scale-105"
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                                    />
                                    <div className="absolute top-6 right-6 p-4 bg-white/90 dark:bg-black/90 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 flex items-center justify-center">
                                        <ArrowUpRight className="w-4 h-4 text-primary dark:text-white" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-primary dark:text-white">{project.title}</h3>
                                    <div className="grid grid-cols-3 border-t border-neutral-100 dark:border-white/5 pt-6 font-mono text-[9px] uppercase tracking-widest text-primary/40 dark:text-white/40">
                                        <div className="flex flex-col gap-2">
                                            <span>LOCATION</span>
                                            <span className="text-primary dark:text-white text-[10px] font-bold uppercase">{project.location}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span>YEAR</span>
                                            <span className="text-primary dark:text-white text-[10px] font-bold">{project.year}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span>TYPE</span>
                                            <span className="text-primary dark:text-white text-[10px] font-bold uppercase">{project.category}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* SPECIALIZATIONS */}
                <section className="px-8 lg:px-24 py-24 lg:py-40 bg-neutral-50 dark:bg-neutral-900/10 border-y border-neutral-100 dark:border-white/5" aria-label="Core architectural specializations">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 dark:bg-neutral-800">
                        {/* Item 1 */}
                        <div className="bg-white dark:bg-background-dark p-12 flex flex-col gap-8 group service-card">
                            <HomeIcon className="w-10 h-10 text-primary/20 dark:text-white/20 group-hover:text-primary dark:group-hover:text-white transition-colors duration-500 icon-layer" />
                            <div className="flex flex-col gap-4">
                                <h4 className="text-xl font-bold uppercase tracking-tight text-primary dark:text-white transition-colors duration-500 title-layer">Architectural Design</h4>
                                <p className="text-xs text-primary/60 dark:text-white/60 leading-relaxed italic transition-colors duration-500 text-layer">Crafting spaces that balance structural integrity with openness to nature.</p>
                            </div>
                            <span className="font-mono text-[9px] text-primary/20 dark:text-white/20">01</span>
                        </div>
                        {/* Item 2 */}
                        <div className="bg-white dark:bg-background-dark p-12 flex flex-col gap-8 group service-card">
                            <Building2 className="w-10 h-10 text-primary/20 dark:text-white/20 group-hover:text-primary dark:group-hover:text-white transition-colors duration-500 icon-layer" />
                            <div className="flex flex-col gap-4">
                                <h4 className="text-xl font-bold uppercase tracking-tight text-primary dark:text-white transition-colors duration-500 title-layer">Urban Planning</h4>
                                <p className="text-xs text-primary/60 dark:text-white/60 leading-relaxed italic transition-colors duration-500 text-layer">Integrating structures into the city fabric with social and spatial awareness.</p>
                            </div>
                            <span className="font-mono text-[9px] text-primary/20 dark:text-white/20">02</span>
                        </div>
                        {/* Item 3 */}
                        <div className="bg-white dark:bg-background-dark p-12 flex flex-col gap-8 group service-card">
                            <Sofa className="w-10 h-10 text-primary/20 dark:text-white/20 group-hover:text-primary dark:group-hover:text-white transition-colors duration-500 icon-layer" />
                            <div className="flex flex-col gap-4">
                                <h4 className="text-xl font-bold uppercase tracking-tight text-primary dark:text-white transition-colors duration-500 title-layer">Interior Architecture</h4>
                                <p className="text-xs text-primary/60 dark:text-white/60 leading-relaxed italic transition-colors duration-500 text-layer">Curating the inner volume through materiality, light, and proportion.</p>
                            </div>
                            <span className="font-mono text-[9px] text-primary/20 dark:text-white/20">03</span>
                        </div>
                        {/* Item 4 */}
                        <div className="bg-white dark:bg-background-dark p-12 flex flex-col gap-8 group service-card">
                            <Trees className="w-10 h-10 text-primary/20 dark:text-white/20 group-hover:text-primary dark:group-hover:text-white transition-colors duration-500 icon-layer" />
                            <div className="flex flex-col gap-4">
                                <h4 className="text-xl font-bold uppercase tracking-tight text-primary dark:text-white transition-colors duration-500 title-layer">Landscape</h4>
                                <p className="text-xs text-primary/60 dark:text-white/60 leading-relaxed italic transition-colors duration-500 text-layer">Blurring the boundary between the built form and its organic surroundings.</p>
                            </div>
                            <span className="font-mono text-[9px] text-primary/20 dark:text-white/20">04</span>
                        </div>
                    </div>
                </section>

                {/* PROCESS SECTION */}
                <section className="px-8 lg:px-24 py-24 lg:py-40 flex flex-col gap-24" aria-label="Our architectural process">
                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">02 — PROCESS</span>
                        <div className="flex justify-between items-end">
                            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-primary dark:text-white">From Sketch to Stone</h2>
                            <Link href="/process" className="font-mono text-[10px] tracking-[0.3em] text-primary/40 dark:text-white/40 hover:text-primary dark:hover:text-white transition-colors uppercase hidden sm:block">
                                VIEW DETAILED PROCESS
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative process-steps-container">
                        {/* Connection Line — Base */}
                        <div className="absolute top-4 left-0 w-full h-[1px] bg-neutral-100 dark:bg-white/5 hidden md:block"></div>
                        {/* Connection Line — Progress Fill */}
                        <div className="absolute top-4 left-0 w-full h-[1px] bg-primary dark:bg-white hidden md:block origin-left scale-x-0 progress-line"></div>

                        {/* Step 01 */}
                        <div className="flex flex-col gap-8 relative process-step">
                            <div className="w-8 h-8 rounded-full border-2 border-primary dark:border-white bg-white dark:bg-background-dark flex items-center justify-center z-10 process-dot overflow-hidden">
                                <div className="w-full h-full bg-primary dark:bg-white scale-0 dot-fill"></div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="font-mono text-[10px] tracking-widest text-primary/40 dark:text-white/40 uppercase step-number">STEP 01</span>
                                <h4 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Conception</h4>
                                <p className="text-sm text-primary/60 dark:text-white/60 leading-relaxed max-w-xs italic">
                                    We begin by understanding the site's unique constraints and the client's vision, sketching initial frames that respect the context.
                                </p>
                            </div>
                        </div>

                        {/* Step 02 */}
                        <div className="flex flex-col gap-8 relative process-step">
                            <div className="w-8 h-8 rounded-full border-2 border-neutral-200 dark:border-white/10 bg-white dark:bg-background-dark flex items-center justify-center z-10 process-dot overflow-hidden">
                                <div className="w-full h-full bg-primary dark:bg-white scale-0 dot-fill"></div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="font-mono text-[10px] tracking-widest text-primary/40 dark:text-white/40 uppercase step-number">STEP 02</span>
                                <h4 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Schematic Design</h4>
                                <p className="text-sm text-primary/60 dark:text-white/60 leading-relaxed max-w-xs italic">
                                    Translating sketches into rigorous technical drawings and 3D models, refining materials, light, and structural integrity.
                                </p>
                            </div>
                        </div>

                        {/* Step 03 */}
                        <div className="flex flex-col gap-8 relative process-step">
                            <div className="w-8 h-8 rounded-full border-2 border-neutral-200 dark:border-white/10 bg-white dark:bg-background-dark flex items-center justify-center z-10 process-dot overflow-hidden">
                                <div className="w-full h-full bg-primary dark:bg-white scale-0 dot-fill"></div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="font-mono text-[10px] tracking-widest text-primary/40 dark:text-white/40 uppercase step-number">STEP 03</span>
                                <h4 className="text-2xl font-bold tracking-tight text-primary dark:text-white">Realization</h4>
                                <p className="text-sm text-primary/60 dark:text-white/60 leading-relaxed max-w-xs italic">
                                    Overseeing construction with obsessive attention to detail, ensuring the final built form matches the purity of the original idea.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="px-8 lg:px-24 py-40 lg:py-64 bg-primary dark:bg-[#111] text-white overflow-hidden relative group" aria-label="Start a project">
                    {/* Background SVG Grid Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg className="w-full h-full" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <defs>
                                <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center gap-12 max-w-4xl mx-auto">
                        <h2 className="text-7xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none">LET'S BUILD.</h2>
                        <div className="flex flex-col gap-6 max-w-2xl">
                            <div className="pt-8 flex justify-center">
                                <Link href="/contact" aria-label="Contact us to start a conversation" className="bg-white text-primary px-12 py-6 rounded-sm font-bold uppercase tracking-[0.3em] text-sm hover:bg-neutral-100 transition-all duration-300">
                                    START A CONVERSATION
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
