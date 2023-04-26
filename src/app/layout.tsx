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

export const metadata: Metadata = {
  title: {
    default: "Daniel Jorge",
    template: "%s | Daniel Jorge",
  },
  description: "Developer, writer.",
  openGraph: {
    title: "Daniel Jorge",
    description: "Developer, writer.",
    url: "http://danieljorge.me/",
    siteName: "Daniel Jorge",
    // images: [
    //   {
    //     url: "http://danieljorge.me/og.jpg",
    //     width: 1920,
    //     height: 1080,
    //   },
    // ],
    locale: "en-US",
    type: "website",
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
  twitter: {
    title: "Daniel Jorge",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  // verification: {
  //   google: "",
  //   yandex: "",
  // },
};
