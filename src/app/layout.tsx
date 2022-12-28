import { Analytics } from "~/components";
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
