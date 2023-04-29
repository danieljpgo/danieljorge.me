import type { Metadata } from "next";

export const genericMetadata = {
  title: "Daniel Jorge",
  description: "Developer, writer.",
  themeColor: { color: "#ffffff" },
  icons: { shortcut: "/favicon.ico" },
  colorScheme: "light", // @TODO: change when add dark mode
  authors: [{ name: "Daniel Jorge", url: "https://danieljorge.me" }],
  openGraph: {
    type: "website",
    url: "https://danieljorge.me",
    title: "Daniel Jorge",
    description: "Frontend Engineer",
    siteName: "Daniel Jorge",
    images: [
      {
        url: "https://danieljorge.me/api/og?title=Daniel+Jorge&description=Frontend+Engineer&type=home",
        width: 1200, // width: 1920,
        height: 630, // height: 1080,
        type: "image/png",
        // alt: "", //@TODO: redesign og first
      },
    ],
    locale: "en-US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@danieljpgo",
    creator: "@danieljpgo",
    title: "Daniel Jorge",
    description: "Frontend Engineer",
    images: {
      url: "https://danieljorge.me/api/og?title=Daniel+Jorge&description=Frontend+Engineer&type=home",
      type: "image/png",
      // alt: "", //@TODO: redesign og first
    },
    // creatorId: "",
    // siteId: '',
  },
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
} satisfies Metadata;

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
