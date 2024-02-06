import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { genericMetadata, genericViewport } from "~/lib/metadata";
import "~/styles/globals.css";

export const metadata = genericMetadata;
export const viewport = genericViewport;

type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className="pb-safe-bottom pl-safe-left pr-safe-right pt-safe-top antialiased selection:bg-[#717cb425]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
