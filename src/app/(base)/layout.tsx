type BaseLayoutProps = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="mx-auto max-w-2xl flex-1 px-10 pt-16 pb-4">
      {children}
    </main>
  );
}
