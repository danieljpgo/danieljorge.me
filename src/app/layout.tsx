import { Analytics } from "@vercel/analytics/react";
import { genericMetadata } from "~/lib/metadata";
import "~/styles/globals.css";

export const metadata = genericMetadata;

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
      </body>
    </html>
  );
}
