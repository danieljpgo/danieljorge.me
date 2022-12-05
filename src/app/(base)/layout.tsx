type BaseLayoutProps = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="mx-auto max-w-2xl px-8 pt-16 pb-4 md:px-0">
      {children}
    </main>
  );
}
