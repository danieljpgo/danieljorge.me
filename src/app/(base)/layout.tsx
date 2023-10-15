type BaseLayoutProps = {
  children: React.ReactNode;
};
export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="mx-auto grid max-w-2xl gap-8 px-8 pb-8 pt-16 md:px-0">
      {children}
    </main>
  );
}
