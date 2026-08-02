import type { Metadata } from "next";
import { Fredoka, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LOST KID — Puffer Bags & Accessories",
    template: "%s | LOST KID",
  },
  description:
    "Shop LOST KID's original quilted puffer tote bags and accessories. Cozy streetwear for the playfully bold.",
  keywords: ["puffer bag", "tote bag", "streetwear", "accessories", "lost kid"],
  authors: [{ name: "LOST KID" }],
  creator: "LOST KID",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lostkid.co",
    siteName: "LOST KID",
    title: "LOST KID — Puffer Bags & Accessories",
    description:
      "Shop LOST KID's original quilted puffer tote bags and accessories.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOST KID — Puffer Bags & Accessories",
    description: "Shop LOST KID's original quilted puffer tote bags and accessories.",
    images: ["/images/og-image.jpg"],
    creator: "@lostkid",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
