import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


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
    description: "Shaping the modern landscape through mathematical rigor and artistic intuition.",
    keywords: ["Architecture", "Sustainable Design", "Vartex Architects", "Modern Architecture", "Industrial Design", "Residential Architecture", "Enugu Architects", "Lagos Architects"],
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
        description: "Shaping the modern landscape through mathematical rigor and artistic intuition.",
        url: 'https://vartex.pro',
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
        description: "Shaping the modern landscape through mathematical rigor and artistic intuition.",
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light" suppressHydrationWarning>
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
            </body>
        </html>
    );
}
