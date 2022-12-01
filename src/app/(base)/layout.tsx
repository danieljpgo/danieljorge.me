type BaseLayoutProps = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="mx-auto grid max-w-2xl gap-8 px-10  pt-16 pb-4">
      {children}
    </main>
  );
}
