import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider } from "@/hooks/useLanguage";
import ParticleBackground from "@/components/background/ParticleBackground";
import PageViewTracker from "@/components/PageViewTracker";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://www.cappafe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cappafe — Dikey Entegre Otomotiv Dış Aksesuar Üreticisi",
    template: "%s — Cappafe",
  },
  description:
    "Ham ABS levhadan bitmiş ürüne. Kaput deflektörü, rüzgar deflektörü, dodik ve ticari araç aksesuarlarında dikey entegre üretici. Bursa, Türkiye merkezli, İngiltere, Avrupa, Türkiye ve Balkanlar'a distribütör ağıyla ulaşır.",
  keywords: [
    "kaput deflektörü",
    "rüzgar deflektörü",
    "dodik",
    "otomotiv aksesuar üreticisi",
    "ticari araç aksesuarları",
    "Cappafe",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Cappafe",
    title: "Cappafe — Dikey Entegre Otomotiv Dış Aksesuar Üreticisi",
    description:
      "Ham ABS levhadan bitmiş ürüne. Tek grup, tam kontrol. 3.000+ ürün SKU, ISO 9001 / 14001 / 45001.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cappafe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cappafe — Dikey Entegre Otomotiv Dış Aksesuar Üreticisi",
    description:
      "Ham ABS levhadan bitmiş ürüne. Tek grup, tam kontrol. 3.000+ ürün SKU.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#101113" },
  ],
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('cappafe_theme');
    if (stored === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {}
})();
`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cappafe",
  url: siteUrl,
  logo: `${siteUrl}/logo-new.png`,
  description:
    "Dikey entegre otomotiv dış aksesuar üreticisi. Kaput deflektörü, rüzgar deflektörü, dodik ve ticari araç aksesuarları.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ovaakça Santral Mh. İstanbul Cd. No:646",
    addressLocality: "Osmangazi / Bursa",
    addressCountry: "TR",
  },
  email: "info@cappafe.com",
  sameAs: [
    "https://www.cappafe.com.tr",
    "https://uk.cappafe.com",
    "https://www.linkedin.com/company/cappafe/?originalSubdomain=tr",
    "https://www.instagram.com/cappafe/",
    "https://www.tiktok.com/@cappafe.car.parts",
    "https://www.facebook.com/cappafe/?locale=tr_TR",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>
          <LanguageProvider>
            <ParticleBackground />
            <PageViewTracker />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
