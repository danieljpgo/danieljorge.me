import "~/styles/globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className="pl-safe-left pt-safe-top pb-safe-bottom pr-safe-right">
        {children}
      </body>
    </html>
  );
}
