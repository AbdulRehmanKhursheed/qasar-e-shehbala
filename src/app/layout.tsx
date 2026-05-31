import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c9a227",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "sherwani",
    "prince coat",
    "groom wear Pakistan",
    "sherwani tailor Rawalpindi",
    "made to measure sherwani",
    "dulha ki sherwani",
    "prince coat banwana",
    "groom wear Saddar",
    "wedding menswear Pakistan",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: { type: "website", locale: "en_PK", url: SITE.url, siteName: SITE.name },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full">
        <JsonLd data={localBusinessJsonLd()} />
        {children}
      </body>
    </html>
  );
}
