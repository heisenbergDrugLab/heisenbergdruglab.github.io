import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://heisenbergdruglab.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Voxel | Premium Web Development & Digital Solutions in Bangalore",
    template: "%s | Voxel Digital Agency"
  },
  description: "Voxel is a premium digital agency in Bangalore offering web development, website design, graphic design, SEO optimization, and web hosting services. We craft innovative digital solutions that elevate your brand.",
  keywords: [
    "Voxel",
    "digital solutions",
    "web development Bangalore",
    "website design India",
    "graphic design agency",
    "SEO services Bangalore",
    "web hosting India",
    "premium web development",
    "digital agency Karnataka",
    "website building",
    "UI UX design",
    "Next.js development",
    "React development",
    "modern web design",
    "responsive website",
    "ecommerce website",
    "WordPress development"
  ],
  authors: [{ name: "Voxel Digital Agency", url: siteUrl }],
  creator: "Voxel",
  publisher: "Voxel Digital Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Voxel Digital Agency",
    title: "Voxel | Premium Web Development & Digital Solutions in Bangalore",
    description: "Crafting Digital Excellence. Premium web development, graphic design, SEO, and hosting services in Bangalore, India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Voxel Digital Agency - Premium Web Development in Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxel | Premium Digital Solutions Bangalore",
    description: "Crafting Digital Excellence. Web Development, Design & SEO Services.",
    images: ["/og-image.png"],
    creator: "@voxeldigital",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Technology",
  verification: {
    google: "EaeIaXMAG8qKn6QiQLonZFLZQ9JPaGK7nu_PNoKk9sI",
  },
};

import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/ui/Header";
import SmoothScroll from "@/components/ui/SmoothScroll";

import { TransitionProvider } from '@/context/TransitionContext';
import { UIProvider } from '@/context/UIContext';
import PixelOverlay from '@/components/ui/PixelOverlay';
import Chatbot from '@/components/ui/Chatbot';

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Voxel Digital Agency",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/voxel-logo.webp`
      },
      "description": "Premium digital agency specializing in web development, graphic design, SEO, and hosting services.",
      "foundingDate": "2024",
      "founders": [
        { "@type": "Person", "name": "Sharan", "jobTitle": "CEO" },
        { "@type": "Person", "name": "Selva", "jobTitle": "CTO" }
      ],
      "areaServed": {
        "@type": "Place",
        "name": "Bangalore, Karnataka, India"
      },
      "sameAs": []
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Voxel Digital Agency",
      "publisher": { "@id": `${siteUrl}/#organization` },
      "description": "Premium web development and digital solutions in Bangalore"
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      "name": "Voxel Digital Agency",
      "description": "Premium digital agency offering web development, graphic design, SEO optimization, and web hosting services in Bangalore, India.",
      "url": siteUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      },
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphic Design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Optimization" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Hosting" } }
        ]
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased overflow-x-hidden" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} font-sans bg-black-void text-white selection:bg-gold-electric selection:text-black-void overflow-x-hidden max-w-[100vw]`}
      >
        <UIProvider>
          <TransitionProvider>
            <CustomCursor />
            <Header />
            <PixelOverlay />
            <SmoothScroll>
              {children}
            </SmoothScroll>
            <Chatbot />

          </TransitionProvider>
        </UIProvider>
      </body>
    </html>
  );
}
