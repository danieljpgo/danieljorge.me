import { GithubIcon, LinkedinIcon, TwitterIcon } from "~/components";

type ContentLayoutProps = {
  children: React.ReactNode;
};

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <main className="relative flex flex-row-reverse justify-center gap-16 px-8 pt-16 xl:gap-12 2xl:gap-20">
        {children}
      </main>
      <footer className="relative flex flex-row-reverse justify-center gap-16 px-8 pb-10 xl:gap-12 xl:pb-16 2xl:gap-20">
        <div className="hidden w-full max-w-[14rem] lg:block xl:max-w-[16rem]" />
        <div className="flex w-full max-w-2xl items-end justify-between">
          <div className="flex flex-col gap-1 self-center lg:gap-2">
            <h1 className="text-base font-medium leading-4 text-gray-800 antialiased lg:text-lg lg:leading-4">
              Daniel Jorge
            </h1>
            <p className="text-sm font-medium leading-4 text-slate-500 antialiased lg:text-base lg:leading-4">
              Frontend Engineer
            </p>
          </div>
          <ul aria-label="Social links" className="flex gap-3">
            <li>
              <a
                aria-label="Github"
                href="https://github.com/danieljpgo"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
              >
                <GithubIcon />
              </a>
            </li>
            <li>
              <a
                aria-label="Twitter"
                href="https://twitter.com/danieljpgo"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
              >
                <TwitterIcon />
              </a>
            </li>
            <li>
              <a
                aria-label="Linkedin"
                href="https://www.linkedin.com/in/danieljpgo/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
              >
                <LinkedinIcon />
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden w-full max-w-[14rem] xl:block xl:max-w-[16rem]" />
      </footer>
    </>
  );
}

// @TODO Melhorar container -> padding só no conteudo e não na página como um todo
// @TODO verificar se essa é a melhor forma de lidar com as mesmas rotas (slug)
// @TODO Aumentar o peso da fonte caso estiver no link corrent
