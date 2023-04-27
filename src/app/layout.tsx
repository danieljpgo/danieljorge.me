import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "~/styles/globals.css";

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

//missing favicon?

{
  /* <meta property="author" content="Daniel Jorge"></meta> */
}

export const metadata: Metadata = {
  title: "Daniel Jorge",
  description: "Developer, writer.",
  // icons: {
  //   shortcut: "/favicon.ico", @TODO auto?
  // },
  //   viewport: {
  //     initialScale: '',
  // viewportFit: 'cover'
  //   },
  themeColor: {
    color: "#ffffff",
  },
  authors: [{ name: "Daniel Jorge", url: "https://danieljorge.me" }],
  openGraph: {
    type: "website",
    url: "https://danieljorge.me/",
    title: "Daniel Jorge",
    description: "Developer, writer.",
    siteName: "Daniel Jorge",
    images: [
      {
        url: "https://danieljorge.me/api/og?title=Daniel+Jorge&description=Frontend+Engineer&type=home",
        width: 1200,
        height: 630,
        // width: 1920,
        // height: 1080,
      },
    ],
    locale: "en-US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@danieljpgo",
    creator: "@danieljpgo",
    title: "Daniel Jorge",
    description: "Developer, writer.",
    images:
      "https://danieljorge.me/api/og?title=Daniel+Jorge&description=Frontend+Engineer&type=home",
  },
  // @TODO: Entender melhor
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

  // verification: {
  //   google: "",
  //   yandex: "",
  // },
  // title: {
  // default: "Daniel Jorge",
  // template: "%s | Daniel Jorge",
  // },
};

// mobile-web-app-capable" content="yes" />
// apple-mobile-web-app-capable" content="yes" />
// apple-mobile-web-app-status-bar-style"
