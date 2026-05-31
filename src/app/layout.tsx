import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDFAF4",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  category: "shopping",
  keywords: ["sherwani","prince coat","groom wear Pakistan","sherwani tailor Rawalpindi","made to measure sherwani","dulha ki sherwani","prince coat banwana","groom wear Saddar","wedding menswear Pakistan"],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: SITE.url },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: SITE.logo, type: "image/jpeg" }],
    shortcut: [{ url: SITE.logo }],
    apple: [{ url: SITE.logo }],
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: `${SITE.url}${SITE.ogImage}`, width: 1280, height: 1225, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [`${SITE.url}${SITE.ogImage}`],
  },
  appleWebApp: { capable: true, title: SITE.name, statusBarStyle: "default" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full">
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
