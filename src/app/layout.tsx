import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://giftmangifts.com"),
  title: {
    default: "Gift Man | Brooklyn Gifts and Souvenirs",
    template: "%s | Gift Man",
  },
  description:
    "Gift Man is a Park Slope Brooklyn gift shop with souvenirs, local apparel, mugs, books, baby gifts, and custom embroidery.",
  openGraph: {
    title: "Gift Man | Brooklyn Gifts and Souvenirs",
    description:
      "Brooklyn souvenirs, NYC gifts, local apparel, mugs, baby gifts, and custom embroidery from a family-owned Park Slope shop.",
    url: "https://giftmangifts.com",
    siteName: "Gift Man",
    images: [{ url: "/files/logo.webp", width: 336, height: 336, alt: "Gift Man" }],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Gift Man",
    url: "https://giftmangifts.com",
    telephone: "+1-718-499-0721",
    email: "giftmangifts@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "176 5th Ave",
      addressLocality: "Brooklyn",
      addressRegion: "NY",
      postalCode: "11217",
      addressCountry: "US",
    },
    openingHours: ["Mo-Fr 10:00-18:00", "Sa 11:00-18:00", "Su 11:00-17:00"],
  };

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-cream-50 text-ink-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
