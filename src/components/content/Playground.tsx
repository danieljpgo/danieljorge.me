import { cn } from "~/lib/tailwindcss";

type PlaygroundProps = {
  children: React.ReactNode;
  prefer?: "pointer";
  variant?: "light" | "dark";
};

export function Playground(props: PlaygroundProps) {
  const { children, variant } = props;

  return (
    <div
      className={cn(
        "not-prose -mx-4 mb-5 grid min-h-[300px] w-[calc(100%+2rem)] place-items-center rounded-lg border border-gray-200 px-6 py-8 sm:mx-0 sm:w-full md:p-10",
        variant === "dark" && "bg-gray-900",
      )}
    >
      {children}
      {/* @TODO: show warning for non pointer device */}
    </div>
  );
}
