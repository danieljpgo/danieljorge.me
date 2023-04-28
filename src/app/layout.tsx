import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "~/styles/globals.css";
import { genericMetadata } from "~/lib/metadata";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className="pl-safe-left pt-safe-top pb-safe-bottom pr-safe-right antialiased selection:bg-[#add7ff]/25">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Daniel Jorge",
  description: "Developer, writer.",
  themeColor: { color: "#ffffff" },
  icons: { shortcut: "/favicon.ico" },
  colorScheme: "light", // @TODO: change when add dark mode
  authors: [{ name: "Daniel Jorge", url: "https://danieljorge.me" }],
  openGraph: genericMetadata.openGraph,
  twitter: genericMetadata.twitter,
  robots: {
    index: true,
    follow: true,
    // nocache: true, // @TODO: verificar a necessidade ?
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true, // ?
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
  // icons: {
  //   shortcut: "/favicon.ico", @TODO auto?
  // },
};

/* <meta property="author" content="Daniel Jorge"></meta> */
/* <meta property="og:image" itemProp="image" content={image} /> */

// alternates: RSS FEED
// formatDetection: { email: false, address: false, telephone: false }. // for web apps
// applicationName: 'Next.js', // just for web apps
// category ??
// generator: 'Next.js',
// referrer: 'origin-when-cross-origin',

// mobile-web-app-capable" content="yes" />
// apple-mobile-web-app-capable" content="yes" />
// apple-mobile-web-app-status-bar-style"
// metadataBase: new URL("https://danieljorge.me"),
