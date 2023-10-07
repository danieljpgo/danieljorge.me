import { cn } from "~/lib/tailwindcss";

type PlaygroundProps = {
  children: React.ReactNode;
  description?: string;
  warning?: "hover-none";
  variant?: "light" | "dark"; // @TODO: improve naming
};

export function Playground(props: PlaygroundProps) {
  const { children, description, warning, variant } = props;

  return (
    <>
      <div
        className={cn(
          "not-prose -mx-2 mb-5 grid min-h-[300px] w-[calc(100%+1rem)] place-items-center rounded-lg border border-gray-200 px-6 py-8 sm:mx-0 sm:w-full md:p-10",
          variant === "dark" && "bg-gray-900",
        )}
      >
        {warning === "hover-none" && (
          <p className="mb-6 hidden w-full items-center gap-1 justify-self-start rounded-lg border border-yellow-900/30 bg-yellow-950 p-2 text-sm text-yellow-500 hover-none:flex">
            <svg
              width="16"
              height="16"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              color="currentColor"
            >
              <path
                d="M12 7v6M12 17.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            This prototype requires a pointer device.
          </p>
        )}
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

// @TODO improve here
