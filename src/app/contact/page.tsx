"use client";

import { useActionState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { contactInquiryAction } from "./actions";
import { CheckCircle, ChevronDown } from "lucide-react";

const initialState = {
    message: "",
    errors: {} as Record<string, string[]>,
    success: false,
};

export default function Contact() {
    const mainRef = useRef(null);
    const [state, formAction, isPending] = useActionState(contactInquiryAction, initialState);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".fade-in", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (state.success) {
            gsap.to(".form-container", {
                opacity: 0,
                y: -20,
                duration: 0.5,
                display: "none"
            });
            gsap.from(".success-message", {
                opacity: 0,
                y: 20,
                duration: 0.5,
                delay: 0.5,
                display: "flex"
            });
        }
    }, [state.success]);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
            <Header />

            <main ref={mainRef} className="flex-grow border-t border-neutral-100 dark:border-white/5 relative">

                {/* Hero Heading */}
                <div className="px-8 lg:px-24 pt-24 lg:pt-24 pb-12 lg:pb-16 fade-in">
                    <h1 className="text-5xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-primary dark:text-white">
                        Let&apos;s build<br />with clarity.
                    </h1>
                </div>

                {/* Form Section — Full Width */}
                <div className="px-8 lg:px-24 pb-24 lg:pb-32 relative">

                    {/* Success Message */}
                    <div className="hidden success-message absolute inset-0 bg-white dark:bg-background-dark p-8 lg:p-24 flex-col justify-center gap-8 items-center text-center z-20">
                        <CheckCircle className="w-16 h-16 text-primary dark:text-white" />
                        <div className="flex flex-col gap-4">
                            <h2 className="text-4xl font-bold tracking-tighter text-primary dark:text-white uppercase">Inquiry Received.</h2>
                            <p className="text-primary/60 dark:text-white/60 font-mono text-[10px] tracking-widest uppercase max-w-sm">
                                A CONFIRMATION EMAIL HAS BEEN SENT TO YOUR INBOX. OUR STUDIO TEAM WILL RESPOND WITHIN 48 BUSINESS HOURS.
                            </p>
                        </div>
                        <button onClick={() => window.location.reload()} className="mt-8 border border-neutral-200 dark:border-white/10 px-8 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                            SEND ANOTHER INQUIRY
                        </button>
                    </div>

                    <div className="form-container max-w-3xl flex flex-col gap-12 fade-in">
                        <span className="font-mono text-[9px] tracking-[0.4em] text-primary/30 dark:text-white/30 uppercase">PROJECT INQUIRY</span>

                        <form action={formAction} className="flex flex-col gap-10" aria-label="Send us an inquiry">

                            {/* Row 1: Name + Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="full-name" className="font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase flex justify-between">
                                        FULL NAME
                                        {state.errors?.name && <span className="text-red-500 lowercase tracking-normal italic opacity-100">{state.errors.name[0]}</span>}
                                    </label>
                                    <input
                                        id="full-name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        autoComplete="name"
                                        required
                                        className={`bg-transparent border-b ${state.errors?.name ? 'border-red-500/50' : 'border-neutral-300 dark:border-white/10'} py-4 focus:border-primary dark:focus:border-white outline-none transition-colors text-xl font-light text-primary dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600`}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase flex justify-between">
                                        EMAIL ADDRESS
                                        {state.errors?.email && <span className="text-red-500 lowercase tracking-normal italic opacity-100">{state.errors.email[0]}</span>}
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        className={`bg-transparent border-b ${state.errors?.email ? 'border-red-500/50' : 'border-neutral-300 dark:border-white/10'} py-4 focus:border-primary dark:focus:border-white outline-none transition-colors text-xl font-light text-primary dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600`}
                                    />
                                </div>
                            </div>

                            {/* Row 2: Phone + Project Type */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="phone" className="font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase flex justify-between">
                                        PHONE NUMBER
                                        {state.errors?.phone && <span className="text-red-500 lowercase tracking-normal italic opacity-100">{state.errors.phone[0]}</span>}
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+234 800 000 0000"
                                        autoComplete="tel"
                                        required
                                        className={`bg-transparent border-b ${state.errors?.phone ? 'border-red-500/50' : 'border-neutral-300 dark:border-white/10'} py-4 focus:border-primary dark:focus:border-white outline-none transition-colors text-xl font-light text-primary dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600`}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 relative">
                                    <label htmlFor="project-type" className="font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase">PROJECT TYPE</label>
                                    <select id="project-type" name="type" className="bg-transparent border-b border-neutral-300 dark:border-white/10 py-4 focus:border-primary dark:focus:border-white outline-none transition-colors text-xl font-light text-primary dark:text-white appearance-none cursor-pointer">
                                        <option value="architectural" className="bg-white dark:bg-neutral-900 text-primary dark:text-white">Architectural</option>
                                        <option value="commercial" className="bg-white dark:bg-neutral-900 text-primary dark:text-white">Commercial</option>
                                        <option value="urban" className="bg-white dark:bg-neutral-900 text-primary dark:text-white">Urban Planning</option>
                                        <option value="interior" className="bg-white dark:bg-neutral-900 text-primary dark:text-white">Interior</option>
                                    </select>
                                    <ChevronDown className="absolute bottom-5 right-0 pointer-events-none opacity-40 w-5 h-5" />
                                </div>
                            </div>

                            {/* Row 3: Site Location */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="site-location" className="font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase flex justify-between">
                                    SITE LOCATION
                                    {state.errors?.location && <span className="text-red-500 lowercase tracking-normal italic opacity-100">{state.errors.location[0]}</span>}
                                </label>
                                <input
                                    id="site-location"
                                    name="location"
                                    type="text"
                                    placeholder="City, Country"
                                    required
                                    className={`bg-transparent border-b ${state.errors?.location ? 'border-red-500/50' : 'border-neutral-300 dark:border-white/10'} py-4 focus:border-primary dark:focus:border-white outline-none transition-colors text-xl font-light text-primary dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600`}
                                />
                            </div>

                            {/* Row 4: Project Brief */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="project-brief" className="font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase">PROJECT BRIEF</label>
                                <textarea
                                    id="project-brief"
                                    name="brief"
                                    rows={2}
                                    placeholder="Describe your vision and requirements..."
                                    className="bg-transparent border-b border-neutral-300 dark:border-white/10 py-4 focus:border-primary dark:focus:border-white outline-none transition-colors text-xl font-light text-primary dark:text-white resize-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-4">
                                <p className="max-w-[300px] text-[8px] font-mono leading-relaxed text-primary/40 dark:text-white/40 uppercase tracking-widest text-center sm:text-left">
                                    BY SENDING THIS INQUIRY YOU AGREE TO OUR PRIVACY POLICY AND THE STORAGE OF YOUR DATA FOR ARCHITECTURAL CONSULTATION.
                                </p>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    aria-label="Submit inquiry form"
                                    className="bg-primary dark:bg-white text-white dark:text-primary px-12 py-5 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-black dark:hover:bg-neutral-200 transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                                >
                                    {isPending ? "PROCESSING..." : "SEND INQUIRY"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
