type BaseLayoutProps = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="relative flex flex-row-reverse justify-center gap-2 px-8 pt-16 pb-4 md:px-0">
      {children}
    </main>
  );
}
//
// mx-auto max-w-2xl

// @verificar se essa é a melhor forma de lidar com as mesmas rotas (slug)
// alinhamento entre uma página e outra deve ser a mesma
// organizar o html para ficar o mais bontio e semantico possivel
