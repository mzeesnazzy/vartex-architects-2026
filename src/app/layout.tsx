import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";


const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
    variable: "--font-ibm-plex-mono",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
    title: {
        default: "Vartex Architects | Architecture, Interior Design & 3D Visualization",
        template: "%s | Vartex Architects"
    },
    description: "Vartex Architects is a specialized studio focusing on high-end residential, commercial and hospitality projects. We provide a complete design experience from conceptual visualization to architectural execution.",
    metadataBase: new URL("https://vartexarchitects.com"),
    keywords: ["Architecture", "Sustainable Design", "Vartex Architects", "Vertex Architects", "Vortex Architects", "Modern Architecture", "Industrial Design", "Residential Architecture", "Enugu Architects", "Lagos Architects", "Architect near me", "Nigerian Architects"],
    authors: [{ name: "Vartex Studio" }],
    creator: "Vartex Studio",
    publisher: "Vartex Studio",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Vartex Architects | Architecture, Interior Design & 3D Visualization",
        description: "Vartex Architects is a specialized studio focusing on high-end residential, commercial and hospitality projects. We provide a complete design experience.",
        url: 'https://vartexarchitects.com',
        siteName: 'Vartex Architects',
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Vartex Architects Logo",
            },
        ],
        locale: 'en_US',
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Vartex Architects | Architecture, Interior Design & 3D Visualization",
        description: "Vartex Architects is a specialized studio focusing on high-end residential, commercial and hospitality projects. We provide a complete design experience.",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};


const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vartex Architects",
    "url": "https://vartexarchitects.com",
    "logo": "https://vartexarchitects.com/og-image.jpg",
    "sameAs": [
        "https://instagram.com/vartex.architects"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+2348000000000",
        "contactType": "customer service",
        "email": "info@vartexarchitects.com"
    }
}

const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalBusiness",
    "name": "Vartex Architects",
    "image": "https://vartexarchitects.com/og-image.jpg",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressRegion": "Lagos State",
        "addressCountry": "Nigeria"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 6.5244,
        "longitude": 3.3792
    },
    "url": "https://vartexarchitects.com",
    "telephone": "+2348000000000",
    "priceRange": "$$"
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
                />
            </head>
            <body className={`${inter.variable} ${ibmPlexMono.variable} antialiased bg-white dark:bg-[#191919] text-[#292929] dark:text-white min-h-screen relative`}>
                {/* Corner Axis Marks */}
                <div className="fixed top-5 left-5 w-5 h-5 border-t border-l border-gray-300 dark:border-gray-700 opacity-40 z-50 pointer-events-none"></div>
                <div className="fixed top-5 right-5 w-5 h-5 border-t border-r border-gray-300 dark:border-gray-700 opacity-40 z-50 pointer-events-none"></div>
                <div className="fixed bottom-5 left-5 w-5 h-5 border-b border-l border-gray-300 dark:border-gray-700 opacity-40 z-50 pointer-events-none"></div>
                <div className="fixed bottom-5 right-5 w-5 h-5 border-b border-r border-gray-300 dark:border-gray-700 opacity-40 z-50 pointer-events-none"></div>


                <SmoothScroll>
                    <div className="flex flex-col min-h-screen">
                        {children}
                    </div>
                </SmoothScroll>

                {/* Google Analytics (GA4) Tracking */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-KGYN2FS582"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-KGYN2FS582');
                    `}
                </Script>
            </body>
        </html>
    );
}
