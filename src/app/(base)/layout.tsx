type BaseLayoutProps = {
  children: React.ReactNode;
};

// px-6 py-12

export default function BaseLayout({ children }: BaseLayoutProps) {
  return <main className="mx-auto max-w-2xl px-6 pb-4 pt-16">{children}</main>;
  // return <main className="mx-auto max-w-md px-10 pt-16 pb-4">{children}</main>;
}
