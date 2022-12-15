type ContentLayoutProps = {
  children: React.ReactNode;
};

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <main className="relative flex flex-row-reverse justify-center gap-16 px-8 pt-16 pb-4 xl:gap-12 2xl:gap-20">
      {children}
    </main>
  );
}
//
// mx-auto max-w-2xl

// @verificar se essa é a melhor forma de lidar com as mesmas rotas (slug)
// alinhamento entre uma página e outra deve ser a mesma
// organizar o html para ficar o mais bontio e semantico possivel
