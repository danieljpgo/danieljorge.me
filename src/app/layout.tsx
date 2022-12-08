import "~/styles/globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className="pl-safe-left pt-safe-top pb-safe-bottom pr-safe-right antialiased">
        {children}
      </body>
    </html>
  );
}
// @TODO add custom select color
// antialiased selection:bg-purple-500/90 selection:text-white
