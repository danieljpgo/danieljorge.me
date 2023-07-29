import type { ComponentPropsWithRef } from "react";
import { cn } from "~/lib/tailwindcss";

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
} as const;

type AnchorProps = ComponentPropsWithRef<"a"> & {
  size?: keyof typeof sizes;
};

export default function Anchor(props: AnchorProps) {
  const { children, className, size = "sm", ...rest } = props;

  return (
    <a
      className={cn(
        "text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300",
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
