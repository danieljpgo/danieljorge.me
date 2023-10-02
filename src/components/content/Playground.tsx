import { cn } from "~/lib/tailwindcss";

type PlaygroundProps = {
  children: React.ReactNode;
  description?: string;
  prefer?: "pointer";
  variant?: "light" | "dark";
};

export function Playground(props: PlaygroundProps) {
  const { children, description, variant } = props;

  return (
    <>
      <div
        className={cn(
          "not-prose -mx-2 mb-5 grid min-h-[300px] w-[calc(100%+1rem)] place-items-center rounded-lg border border-gray-200 px-6 py-8 sm:mx-0 sm:w-full md:p-10",
          variant === "dark" && "bg-gray-900",
        )}
      >
        {children}
      </div>
      {description && (
        <aside className="mb-6 px-2 text-center text-sm font-normal text-gray-500">
          {description}
        </aside>
      )}
    </>
  );
}

/* @TODO: show warning for non pointer device */
