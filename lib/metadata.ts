import type { Metadata, Viewport } from "next";
import { OG } from "./content";

export const baseUrl = process.env.VERCEL_URL
  ? "https://" + process.env.VERCEL_URL
  : "http://localhost:3000";

export const genericViewport: Viewport = {
  themeColor: "#fff",
  colorScheme: "light",
};

export const genericMetadata = {
  metadataBase: new URL(baseUrl),
  title: "Daniel Jorge",
  description: "Developer, writer.",
  icons: {
    icon: [
      { url: "/icon.svg", rel: "icon", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any", rel: "icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: { statusBarStyle: "black-translucent" },
  authors: [{ name: "Daniel Jorge", url: "https://danieljorge.me" }],
  openGraph: {
    type: "website",
    title: "Daniel Jorge",
    description: "Frontend Engineer",
    siteName: "Daniel Jorge",
    url: baseUrl,
    images: {
      width: 1200,
      height: 630,
      type: "image/png",
      url: `/api/og?type=${OG.HOME}`,
    },
    locale: "en-US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@danieljpgo",
    creator: "@danieljpgo",
    title: "Daniel Jorge",
    description: "Frontend Engineer",
    images: {
      width: 1200,
      height: 630,
      type: "image/png",
      url: `/api/og?type=${OG.HOME}`,
    },
  },
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
} satisfies Metadata;

// @TODO: study more about other metadata
// <meta property="author" content="Daniel Jorge"></meta>
// <meta property="og:image" itemProp="image" content={image} />
// alternates: RSS FEED
// formatDetection: { email: false, address: false, telephone: false }. // for web apps
// applicationName: 'Next.js', // just for web apps
// category ??
// generator: 'Next.js',
// referrer: 'origin-when-cross-origin',
// mobile-web-app-capable" content="yes" />
// apple-mobile-web-app-capable" content="yes" />
// metadataBase: new URL("https://danieljorge.me"),
// verification: {
//   google: 'google', // @TODO
// },
// add?
// publisher: 'Daniel Jorge',
// creator: 'Daniel Jorge',
// verification: {
//   google: 'google', // @TODO
//   yandex: 'yandex',
//   yahoo: 'yahoo',
//   other: {
//     me: ['my-email', 'my-link'],
//   },
// },
// robots: {
//   googleBot: {
//     // noimageindex: true, // ?
//   },
// nocache: true, // @TODO: verificar a necessidade ?
